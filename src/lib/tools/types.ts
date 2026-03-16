import type { ToolEnvelope } from "@/types";

export interface ToolDefinition<TParams = unknown, TResult = unknown> {
  name: string;
  description: string;
  execute: (params: TParams) => Promise<ToolEnvelope<TResult>>;
}
