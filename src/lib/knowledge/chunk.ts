const MAX_CHUNK_CHARS = 6000;
const OVERLAP_CHARS = 400;

export function chunkText(text: string): string[] {
  if (text.length <= MAX_CHUNK_CHARS) return [text];

  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    let end = start + MAX_CHUNK_CHARS;

    if (end < text.length) {
      const lastNewline = text.lastIndexOf("\n", end);
      if (lastNewline > start + MAX_CHUNK_CHARS / 2) {
        end = lastNewline;
      }
    }

    chunks.push(text.slice(start, end));
    start = end - OVERLAP_CHARS;
    if (start < 0) start = 0;
    if (end >= text.length) break;
  }

  return chunks;
}
