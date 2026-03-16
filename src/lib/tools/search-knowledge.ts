import { prisma } from "@/lib/db";
import { embedText } from "@/lib/embeddings";
import type {
  ToolEnvelope,
  SearchKnowledgeParams,
  SearchKnowledgeResult,
} from "@/types";

interface RawSearchRow {
  id: string;
  title: string;
  body: string;
  metadata: Record<string, unknown>;
  file_path: string;
  similarity: number;
}

export async function searchKnowledge(
  params: SearchKnowledgeParams,
): Promise<ToolEnvelope<{ results: SearchKnowledgeResult[] }>> {
  try {
    const queryEmbedding = await embedText(params.query);
    const limit = Math.min(params.limit ?? 5, 10);
    const vecLiteral = `[${queryEmbedding.join(",")}]`;

    const whereClauses: string[] = ["embedding IS NOT NULL"];
    const values: unknown[] = [];
    let paramIdx = 1;

    if (params.filters) {
      for (const [key, value] of Object.entries(params.filters)) {
        if (value) {
          whereClauses.push(`metadata->>'${key}' = $${paramIdx}`);
          values.push(value);
          paramIdx++;
        }
      }
    }

    const whereSQL = whereClauses.join(" AND ");

    const rows = await prisma.$queryRawUnsafe<RawSearchRow[]>(
      `SELECT id, title, body, metadata, file_path,
              1 - (embedding <=> '${vecLiteral}'::vector) as similarity
       FROM knowledge_documents
       WHERE ${whereSQL}
       ORDER BY embedding <=> '${vecLiteral}'::vector
       LIMIT ${limit}`,
      ...values,
    );

    const results: SearchKnowledgeResult[] = rows.map((row) => ({
      document_id: row.id,
      title: row.title,
      source_type: (row.metadata as Record<string, string>).source_type ?? "unknown",
      snippet: row.body.slice(0, 500),
      score: Number(row.similarity),
      last_updated: (row.metadata as Record<string, string>).last_updated ?? "",
    }));

    return { success: true, data: { results }, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return {
      success: false,
      data: null,
      error: { code: "RETRIEVAL_UNAVAILABLE", message },
    };
  }
}
