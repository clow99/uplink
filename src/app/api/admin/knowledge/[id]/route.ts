import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";

interface ChunkRow {
  title: string;
  body: string;
  metadata: Record<string, unknown>;
  file_path: string;
  chunk_index: number;
  updated_at: Date;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const guard = await requireAdmin();
  if (guard.error) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  const { id } = await params;
  const filePath = decodeURIComponent(id);

  const chunks = await prisma.$queryRawUnsafe<ChunkRow[]>(
    `SELECT title, body, metadata, file_path, chunk_index, updated_at
     FROM knowledge_documents
     WHERE file_path = $1
     ORDER BY chunk_index ASC`,
    filePath,
  );

  if (chunks.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const fullBody = chunks.map((c) => c.body).join("\n\n");

  return NextResponse.json({
    filePath: chunks[0].file_path,
    title: chunks[0].title,
    body: fullBody,
    metadata: chunks[0].metadata,
    chunkCount: chunks.length,
    updatedAt: chunks[chunks.length - 1].updated_at,
  });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const guard = await requireAdmin();
  if (guard.error) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  const { id } = await params;
  const filePath = decodeURIComponent(id);

  const result = await prisma.$executeRawUnsafe(
    `DELETE FROM knowledge_documents WHERE file_path = $1`,
    filePath,
  );

  if (result === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, deleted: result });
}
