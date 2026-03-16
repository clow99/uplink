"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Wifi, User } from "lucide-react";
import { MessageActions } from "./message-actions";
import { MarkdownMessage } from "./markdown-message";
import { ChatVisual } from "./visuals";
import { matchVisuals, type VisualId } from "@/lib/visual-matcher";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
  suggestedVisuals?: string[];
  onLearnMore?: (query: string) => void;
}

export function MessageBubble({ role, content, imageUrl, suggestedVisuals, onLearnMore }: MessageBubbleProps) {
  const isUser = role === "user";

  const visuals = useMemo(
    () => {
      if (isUser) return [];
      if (suggestedVisuals && suggestedVisuals.length > 0) {
        return suggestedVisuals as VisualId[];
      }
      return matchVisuals(content);
    },
    [content, isUser, suggestedVisuals],
  );

  return (
    <div
      className={cn(
        "group flex gap-3 px-4 py-3",
        isUser ? "flex-row-reverse" : "",
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Wifi className="h-4 w-4" />}
      </div>
      <div className="flex max-w-[75%] flex-col gap-2">
        {isUser && imageUrl && (
          <div className="flex justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Uploaded equipment photo"
              className="max-h-48 max-w-60 rounded-xl border object-cover"
            />
          </div>
        )}
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-muted text-foreground rounded-tl-sm",
          )}
        >
          {isUser ? (
            content.split("\n").map((line, i) => (
              <p key={i} className={i > 0 ? "mt-2" : ""}>
                {line}
              </p>
            ))
          ) : (
            <MarkdownMessage content={content} onLearnMore={onLearnMore} />
          )}
        </div>
        {visuals.length > 0 && (
          <div className="flex max-w-3xl flex-col gap-2">
            {visuals.map((id) => (
              <ChatVisual key={id} visualId={id} />
            ))}
          </div>
        )}
        {!isUser && <MessageActions content={content} />}
      </div>
    </div>
  );
}
