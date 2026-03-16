import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PrismaClient } from "@prisma/client";
import OpenAI from "openai";
import { chunkText } from "../src/lib/knowledge/chunk";

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const KNOWLEDGE_DIR = path.join(process.cwd(), "knowledge");
const EMBEDDING_MODEL = "text-embedding-3-small";

async function embedText(text: string): Promise<number[]> {
  const res = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text.slice(0, 8000),
  });
  return res.data[0].embedding;
}

function findMarkdownFiles(dir: string): string[] {
  const files: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath));
    } else if (
      entry.name.endsWith(".md") &&
      entry.name !== "TAXONOMY.md" &&
      entry.name !== "README.md"
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

async function ingestFile(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(raw);

  const title = frontmatter.title || path.basename(filePath, ".md");
  const metadata = {
    title,
    device_model: frontmatter.device_model || "",
    service_type: frontmatter.service_type || "",
    symptom_type: frontmatter.symptom_type || "",
    audience: frontmatter.audience || "both",
    source_type: frontmatter.source_type || "",
    region: frontmatter.region || "",
    last_updated: frontmatter.last_updated || new Date().toISOString().slice(0, 10),
    tags: frontmatter.tags || [],
  };

  const relativePath = path.relative(KNOWLEDGE_DIR, filePath).replace(/\\/g, "/");
  const chunks = chunkText(content.trim());

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const textForEmbedding = `${title}\n\n${chunk}`;

    console.log(
      `  Embedding ${relativePath} chunk ${i + 1}/${chunks.length} (${chunk.length} chars)`,
    );

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
      JSON.stringify(metadata),
      relativePath,
      i,
    );
  }

  // Clean up old chunks that no longer exist (file shortened)
  await prisma.$executeRawUnsafe(
    `DELETE FROM knowledge_documents WHERE file_path = $1 AND chunk_index >= $2`,
    relativePath,
    chunks.length,
  );
}

async function main() {
  console.log("Scanning knowledge directory...");
  const files = findMarkdownFiles(KNOWLEDGE_DIR);
  console.log(`Found ${files.length} articles\n`);

  for (const file of files) {
    const relative = path.relative(KNOWLEDGE_DIR, file).replace(/\\/g, "/");
    console.log(`Processing: ${relative}`);
    await ingestFile(file);
    console.log(`  Done.\n`);
  }

  console.log(`Ingestion complete. ${files.length} articles processed.`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("Ingestion failed:", err);
  process.exit(1);
});
