export type Mode = "customer" | "copilot" | "hybrid";

export interface SupportResponse {
  customer_response: string;
  diagnosis_notes: string;
  likely_causes: string[];
  evidence: string[];
  next_best_question: string;
  next_steps: string[];
  escalation_recommended: boolean;
  escalation_reason: string;
  confidence: "low" | "medium" | "high";
  suggested_visuals: string[];
}

export const EMPTY_SUPPORT_RESPONSE: SupportResponse = {
  customer_response: "",
  diagnosis_notes: "",
  likely_causes: [],
  evidence: [],
  next_best_question: "",
  next_steps: [],
  escalation_recommended: false,
  escalation_reason: "",
  confidence: "low",
  suggested_visuals: [],
};

export interface ToolEnvelope<T = unknown> {
  success: boolean;
  data: T | null;
  error: { code: string; message: string } | null;
}

export interface SearchKnowledgeParams {
  query: string;
  filters?: {
    symptom_type?: string;
    device_model?: string;
    service_type?: string;
    audience?: string;
    source_type?: string;
  };
  limit?: number;
}

export interface SearchKnowledgeResult {
  document_id: string;
  title: string;
  source_type: string;
  snippet: string;
  score: number;
  last_updated: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  structuredResponse?: SupportResponse;
  createdAt: string;
}

export interface ImageAttachment {
  base64: string;
  mimeType: "image/jpeg" | "image/png" | "image/webp" | "image/gif";
}

export interface ChatRequest {
  conversationId?: string;
  message: string;
  mode?: Mode;
  image?: ImageAttachment;
}

export interface ChatResponse {
  conversationId: string;
  message: ChatMessage;
}
