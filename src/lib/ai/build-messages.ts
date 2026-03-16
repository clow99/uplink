import type {
  ChatCompletionMessageParam,
  ChatCompletionContentPart,
} from "openai/resources/chat/completions";
import type { Mode, SearchKnowledgeResult, ImageAttachment } from "@/types";
import { getSystemPrompt } from "./system-prompt";

interface ConversationMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export function buildMessages(opts: {
  mode: Mode;
  availableTools: string[];
  history: ConversationMessage[];
  retrievedDocs: SearchKnowledgeResult[];
  userMessage: string;
  image?: ImageAttachment;
}): ChatCompletionMessageParam[] {
  const messages: ChatCompletionMessageParam[] = [];

  messages.push({
    role: "system",
    content: getSystemPrompt(opts.mode, opts.availableTools, !!opts.image),
  });

  if (opts.retrievedDocs.length > 0) {
    const docsBlock = opts.retrievedDocs
      .map(
        (d, i) =>
          `[${i + 1}] ${d.title} (${d.source_type}, score ${d.score.toFixed(2)})\n${d.snippet}`,
      )
      .join("\n\n");

    messages.push({
      role: "system",
      content: `Retrieved knowledge base documents:\n\n${docsBlock}`,
    });
  }

  for (const msg of opts.history) {
    messages.push({ role: msg.role, content: msg.content });
  }

  if (opts.image) {
    const parts: ChatCompletionContentPart[] = [
      { type: "text", text: opts.userMessage },
      {
        type: "image_url",
        image_url: {
          url: `data:${opts.image.mimeType};base64,${opts.image.base64}`,
          detail: "high",
        },
      },
    ];
    messages.push({ role: "user", content: parts });
  } else {
    messages.push({ role: "user", content: opts.userMessage });
  }

  return messages;
}
