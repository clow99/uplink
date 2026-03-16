import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { embedText } from "@/lib/embeddings";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, body: docBody, metadata, filePath, chunkIndex } = body;

  if (!title || !docBody || !filePath) {
    return NextResponse.json(
      { error: "title, body, and filePath are required" },
      { status: 400 },
    );
  }

  const embedding = await embedText(`${title}\n\n${docBody}`);
  const vecLiteral = `[${embedding.join(",")}]`;

  await prisma.$executeRawUnsafe(
    `INSERT INTO knowledge_documents (id, title, body, embedding, metadata, file_path, chunk_index, created_at, updated_at)
     VALUES (gen_random_uuid(), $1, $2, $3::vector, $4::jsonb, $5, $6, NOW(), NOW())
     ON CONFLICT (file_path, chunk_index) DO UPDATE
     SET title = $1, body = $2, embedding = $3::vector, metadata = $4::jsonb, updated_at = NOW()`,
    title,
    docBody,
    vecLiteral,
    JSON.stringify(metadata ?? {}),
    filePath,
    chunkIndex ?? 0,
  );

  return NextResponse.json({ ok: true });
}
