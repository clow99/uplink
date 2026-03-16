import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getOpenAI } from "@/lib/ai/openai";
import { buildMessages } from "@/lib/ai/build-messages";
import { parseResponse } from "@/lib/ai/parse-response";
import { getAvailableToolNames, executeTool } from "@/lib/tools/registry";
import type {
  Mode,
  ChatRequest,
  ChatResponse,
  SupportResponse,
  SearchKnowledgeResult,
  ImageAttachment,
} from "@/types";

const HISTORY_LIMIT = 20;
const VALID_IMAGE_TYPES: string[] = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function validateImage(image: ImageAttachment): string | null {
  if (!VALID_IMAGE_TYPES.includes(image.mimeType)) {
    return "Unsupported image type";
  }
  const sizeBytes = (image.base64.length * 3) / 4;
  if (sizeBytes > 5 * 1024 * 1024) {
    return "Image exceeds 5 MB limit";
  }
  return null;
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: ChatRequest = await req.json();
  const { message, mode: requestedMode, image } = body;
  let { conversationId } = body;

  if (!message?.trim() && !image) {
    return NextResponse.json({ error: "Message or image is required" }, { status: 400 });
  }

  if (image) {
    const imageError = validateImage(image);
    if (imageError) {
      return NextResponse.json({ error: imageError }, { status: 400 });
    }
  }

  const mode: Mode = requestedMode ?? "customer";

  // Load or create conversation
  let conversation;
  if (conversationId) {
    conversation = await prisma.conversation.findFirst({
      where: { id: conversationId, userId: session.user.id },
    });
    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }
  } else {
    conversation = await prisma.conversation.create({
      data: { userId: session.user.id, mode },
    });
    conversationId = conversation.id;
  }

  const textContent = message?.trim() || "Please identify this equipment and analyze what you can see.";

  // Store user message
  const userMsg = await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: "user",
      content: image ? `[Image attached] ${textContent}` : textContent,
    },
  });

  // Load recent history
  const historyRows = await prisma.message.findMany({
    where: { conversationId: conversation.id },
    orderBy: { createdAt: "asc" },
    take: HISTORY_LIMIT,
    select: { role: true, content: true },
  });

  const history = historyRows
    .slice(0, -1)
    .map((m) => ({
      role: m.role as "user" | "assistant" | "system",
      content: m.content,
    }));

  // Run search_knowledge with equipment-oriented query when image is present
  const availableTools = getAvailableToolNames();
  let retrievedDocs: SearchKnowledgeResult[] = [];
  let toolCallRecord: { result: unknown; success: boolean; durationMs: number } | null = null;

  const knowledgeQuery = image
    ? `${textContent} equipment identification modem router lights connections`
    : textContent;

  try {
    const toolResult = await executeTool("search_knowledge", {
      query: knowledgeQuery,
      limit: 3,
    });
    toolCallRecord = toolResult;

    const envelope = toolResult.result as {
      success: boolean;
      data: { results: SearchKnowledgeResult[] } | null;
    };
    if (envelope.success && envelope.data) {
      retrievedDocs = envelope.data.results;
    }
  } catch {
    // search_knowledge failed -- continue without retrieved docs
  }

  // Build prompt and call OpenAI
  const messages = buildMessages({
    mode,
    availableTools,
    history,
    retrievedDocs,
    userMessage: textContent,
    image: image ?? undefined,
  });

  let structured: SupportResponse;
  let rawContent: string;

  try {
    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o",
      messages,
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 2048,
    });

    rawContent = completion.choices[0]?.message?.content ?? "";
    structured = parseResponse(rawContent);
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "LLM request failed", detail: errMsg },
      { status: 502 },
    );
  }

  // Store assistant message
  const assistantMsg = await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: "assistant",
      content: structured.customer_response || rawContent,
      structuredResponse: JSON.parse(JSON.stringify(structured)),
    },
  });

  // Log tool call
  if (toolCallRecord) {
    await prisma.toolCall.create({
      data: {
        messageId: assistantMsg.id,
        toolName: "search_knowledge",
        params: { query: knowledgeQuery, limit: 3 },
        result: JSON.parse(JSON.stringify(toolCallRecord.result)),
        success: toolCallRecord.success,
        durationMs: toolCallRecord.durationMs,
      },
    });
  }

  // Update conversation title from first message
  if (!conversation.title) {
    const title = image
      ? `Equipment photo: ${textContent.slice(0, 80)}`
      : textContent.slice(0, 100);
    await prisma.conversation.update({
      where: { id: conversation.id },
      data: { title },
    });
  }

  const response: ChatResponse = {
    conversationId: conversation.id,
    message: {
      id: assistantMsg.id,
      role: "assistant",
      content: structured.customer_response || rawContent,
      structuredResponse: structured,
      createdAt: assistantMsg.createdAt.toISOString(),
    },
  };

  return NextResponse.json(response);
}
