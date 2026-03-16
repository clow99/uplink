import { searchKnowledge } from "./search-knowledge";
import type { ToolDefinition } from "./types";
import type { SearchKnowledgeParams, SearchKnowledgeResult } from "@/types";

type AnyToolDef = ToolDefinition<unknown, unknown>;

const tools: Map<string, AnyToolDef> = new Map();

const searchKnowledgeTool: ToolDefinition<
  SearchKnowledgeParams,
  { results: SearchKnowledgeResult[] }
> = {
  name: "search_knowledge",
  description: "Search help docs, manuals, runbooks, and policy documents.",
  execute: searchKnowledge,
};

tools.set(searchKnowledgeTool.name, searchKnowledgeTool as AnyToolDef);

export function getAvailableToolNames(): string[] {
  return Array.from(tools.keys());
}

export function getTool(name: string): AnyToolDef | undefined {
  return tools.get(name);
}

export async function executeTool(
  name: string,
  params: unknown,
): Promise<{ result: unknown; success: boolean; durationMs: number }> {
  const tool = tools.get(name);
  if (!tool) {
    return {
      result: { success: false, data: null, error: { code: "UNKNOWN_TOOL", message: `Tool ${name} not found` } },
      success: false,
      durationMs: 0,
    };
  }

  const start = Date.now();
  const result = await tool.execute(params);
  const durationMs = Date.now() - start;

  return {
    result,
    success: (result as { success: boolean }).success,
    durationMs,
  };
}
