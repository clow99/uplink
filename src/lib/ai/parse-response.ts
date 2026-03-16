import { z } from "zod";
import type { SupportResponse } from "@/types";
import { EMPTY_SUPPORT_RESPONSE } from "@/types";

const SupportResponseSchema = z.object({
  customer_response: z.string(),
  diagnosis_notes: z.string(),
  likely_causes: z.array(z.string()),
  evidence: z.array(z.string()),
  next_best_question: z.string(),
  next_steps: z.array(z.string()),
  escalation_recommended: z.boolean(),
  escalation_reason: z.string(),
  confidence: z.enum(["low", "medium", "high"]),
  suggested_visuals: z.array(z.string()).default([]),
});

export function parseResponse(raw: string): SupportResponse {
  try {
    const json = JSON.parse(raw);
    const parsed = SupportResponseSchema.safeParse(json);
    if (parsed.success) return parsed.data;

    // Partial match — fill missing fields with defaults
    return { ...EMPTY_SUPPORT_RESPONSE, ...json };
  } catch {
    return {
      ...EMPTY_SUPPORT_RESPONSE,
      customer_response: raw,
      diagnosis_notes: "Model returned non-JSON; raw text used as customer response.",
      confidence: "low",
    };
  }
}
