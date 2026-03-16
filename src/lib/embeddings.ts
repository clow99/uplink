import { getOpenAI } from "./ai/openai";

const EMBEDDING_MODEL = "text-embedding-3-small";
const EMBEDDING_DIMENSIONS = 1536;

export { EMBEDDING_DIMENSIONS };

export async function embedText(text: string): Promise<number[]> {
  const response = await getOpenAI().embeddings.create({
    model: EMBEDDING_MODEL,
    input: text.slice(0, 8000),
  });
  return response.data[0].embedding;
}

export async function embedBatch(texts: string[]): Promise<number[][]> {
  const trimmed = texts.map((t) => t.slice(0, 8000));
  const response = await getOpenAI().embeddings.create({
    model: EMBEDDING_MODEL,
    input: trimmed,
  });
  return response.data.map((d) => d.embedding);
}
