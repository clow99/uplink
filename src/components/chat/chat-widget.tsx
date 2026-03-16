"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";
import { ChatHeader } from "./chat-header";
import { ResourcesPanel } from "./resources-panel";
import { useChatContext } from "./chat-context";
import type { ChatResponse, ImageAttachment, SupportResponse } from "@/types";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
  structuredResponse?: SupportResponse;
}

export function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const lastProcessedQuery = useRef<string | null>(null);
  const { registerSend } = useChatContext();

  const handleSend = useCallback(
    async (text: string, image?: ImageAttachment) => {
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
        imageUrl: image ? `data:${image.mimeType};base64,${image.base64}` : undefined,
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversationId,
            message: text,
            mode: "customer",
            image: image ?? undefined,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error ?? `Request failed (${res.status})`);
        }

        const data: ChatResponse = await res.json();
        setConversationId(data.conversationId);

        const assistantMsg: Message = {
          id: data.message.id,
          role: "assistant",
          content: data.message.content,
          structuredResponse: data.message.structuredResponse,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        const errMsg =
          err instanceof Error ? err.message : "Something went wrong";
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: "assistant",
            content: `Sorry, I ran into a problem: ${errMsg}. Please try again.`,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [conversationId],
  );

  const handleTextOnlySend = useCallback(
    (text: string) => handleSend(text),
    [handleSend],
  );

  useEffect(() => {
    registerSend(handleTextOnlySend);
  }, [registerSend, handleTextOnlySend]);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q && q !== lastProcessedQuery.current) {
      lastProcessedQuery.current = q;
      router.replace("/chat", { scroll: false });
      handleSend(q);
    }
  }, [searchParams, handleSend, router]);

  const handleNewConversation = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    lastProcessedQuery.current = null;
  }, []);

  const hasMessages = messages.length > 0;

  const contextualSuggestion = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      if (msg.role === "assistant" && msg.structuredResponse?.next_best_question) {
        return msg.structuredResponse.next_best_question;
      }
    }
    return undefined;
  }, [messages]);

  return (
    <div className="flex h-full flex-col">
      <ChatHeader
        onNewConversation={handleNewConversation}
        onOpenResources={() => setResourcesOpen(true)}
      />
      <div className="flex min-h-0 flex-1 flex-col">
        <MessageList
          messages={messages}
          isLoading={isLoading}
          onPresetSelect={handleTextOnlySend}
          onLearnMore={handleTextOnlySend}
        />
        <ChatInput
          onSend={handleSend}
          disabled={isLoading}
          showSuggestions={hasMessages && !isLoading}
          contextualSuggestion={contextualSuggestion}
        />
      </div>
      <ResourcesPanel
        open={resourcesOpen}
        onOpenChange={setResourcesOpen}
        onTopicSelect={handleTextOnlySend}
      />
    </div>
  );
}
