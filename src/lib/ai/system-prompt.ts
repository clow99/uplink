import fs from "fs";
import path from "path";
import type { Mode } from "@/types";

let cached: string | null = null;

function loadPrompt(): string {
  if (cached) return cached;
  cached = fs.readFileSync(
    path.join(process.cwd(), "prompts", "SYSTEM_PROMPT.md"),
    "utf-8",
  );
  return cached;
}

export function getSystemPrompt(
  mode: Mode,
  availableTools: string[],
  hasImage = false,
): string {
  const base = loadPrompt();
  const parts = [
    base,
    "",
    "## Current request context",
    "",
    `Mode: ${mode}`,
    `Available tools: ${availableTools.length ? availableTools.join(", ") : "none"}`,
    `Image attached: ${hasImage ? "yes" : "no"}`,
  ];

  if (hasImage) {
    parts.push(
      "",
      "The user has attached a photo of their equipment. Follow the equipment image analysis instructions above.",
    );
  }

  parts.push(
    "",
    "Respond with a single JSON object matching the SupportResponse schema. Do not wrap it in markdown code fences.",
  );

  return parts.join("\n");
}
