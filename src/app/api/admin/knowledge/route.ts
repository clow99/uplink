import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { embedText } from "@/lib/embeddings";
import { chunkText } from "@/lib/knowledge/chunk";
import { requireAdmin } from "@/lib/admin";

interface DocRow {
  filePath: string;
  title: string;
  metadata: Record<string, unknown>;
  chunkCount: bigint;
  updatedAt: Date;
}

export async function GET(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard.error) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? "";
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? 20)));
  const offset = (page - 1) * limit;

  const searchFilter = search
    ? `WHERE d.title ILIKE $1 OR d.file_path ILIKE $1`
    : "";
  const params = search ? [`%${search}%`] : [];

  const docs = await prisma.$queryRawUnsafe<DocRow[]>(
    `SELECT
       d.file_path AS "filePath",
       (array_agg(d.title ORDER BY d.chunk_index))[1] AS title,
       (array_agg(d.metadata ORDER BY d.chunk_index))[1]::jsonb AS metadata,
       COUNT(*)::bigint AS "chunkCount",
       MAX(d.updated_at) AS "updatedAt"
     FROM knowledge_documents d
     ${searchFilter}
     GROUP BY d.file_path
     ORDER BY MAX(d.updated_at) DESC
     LIMIT ${limit} OFFSET ${offset}`,
    ...params,
  );

  const countResult = await prisma.$queryRawUnsafe<[{ count: bigint }]>(
    `SELECT COUNT(DISTINCT file_path)::bigint AS count
     FROM knowledge_documents d
     ${searchFilter}`,
    ...params,
  );

  const total = Number(countResult[0].count);

  const items = docs.map((d) => ({
    filePath: d.filePath,
    title: d.title,
    metadata: d.metadata,
    chunkCount: Number(d.chunkCount),
    updatedAt: d.updatedAt,
  }));

  return NextResponse.json({ items, total, page, limit });
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard.error) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  const body = await req.json();
  const { title, body: docBody, metadata, filePath } = body;

  if (!title || !docBody || !filePath) {
    return NextResponse.json(
      { error: "title, body, and filePath are required" },
      { status: 400 },
    );
  }

  const chunks = chunkText(docBody.trim());

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const textForEmbedding = `${title}\n\n${chunk}`;
    const embedding = await embedText(textForEmbedding);
    const vecLiteral = `[${embedding.join(",")}]`;

    await prisma.$executeRawUnsafe(
      `INSERT INTO knowledge_documents (id, title, body, embedding, metadata, file_path, chunk_index, created_at, updated_at)
       VALUES (gen_random_uuid(), $1, $2, $3::vector, $4::jsonb, $5, $6, NOW(), NOW())
       ON CONFLICT (file_path, chunk_index) DO UPDATE
       SET title = $1, body = $2, embedding = $3::vector, metadata = $4::jsonb, updated_at = NOW()`,
      title,
      chunk,
      vecLiteral,
      JSON.stringify(metadata ?? {}),
      filePath,
      i,
    );
  }

  await prisma.$executeRawUnsafe(
    `DELETE FROM knowledge_documents WHERE file_path = $1 AND chunk_index >= $2`,
    filePath,
    chunks.length,
  );

  return NextResponse.json({ ok: true, chunkCount: chunks.length });
}
