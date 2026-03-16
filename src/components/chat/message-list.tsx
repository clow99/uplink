"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./message-bubble";
import { WelcomePresets } from "./welcome-presets";
import { Wifi } from "lucide-react";
import type { SupportResponse } from "@/types";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
  structuredResponse?: SupportResponse;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  onPresetSelect: (message: string) => void;
  onLearnMore?: (query: string) => void;
}

export function MessageList({
  messages,
  isLoading,
  onPresetSelect,
  onLearnMore,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return <WelcomePresets onSelect={onPresetSelect} />;
  }

  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col gap-1 py-4">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            role={msg.role}
            content={msg.content}
            imageUrl={msg.imageUrl}
            suggestedVisuals={msg.structuredResponse?.suggested_visuals}
            onLearnMore={onLearnMore}
          />
        ))}
        {isLoading && (
          <div className="flex gap-3 px-4 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Wifi className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
              <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
