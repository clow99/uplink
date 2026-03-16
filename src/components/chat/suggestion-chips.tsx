"use client";

import { cn } from "@/lib/utils";

const FOLLOW_UP_SUGGESTIONS = [
  "That didn't work, what else can I try?",
  "Can you explain that in more detail?",
  "I'd like to speak with a person",
];

interface SuggestionChipsProps {
  onSelect: (message: string) => void;
  contextualSuggestion?: string;
  disabled?: boolean;
  className?: string;
}

export function SuggestionChips({
  onSelect,
  contextualSuggestion,
  disabled,
  className,
}: SuggestionChipsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {contextualSuggestion && (
        <button
          onClick={() => onSelect(contextualSuggestion)}
          disabled={disabled}
          className="rounded-full border border-primary/50 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20 disabled:pointer-events-none disabled:opacity-50"
        >
          {contextualSuggestion}
        </button>
      )}
      {FOLLOW_UP_SUGGESTIONS.map((text) => (
        <button
          key={text}
          onClick={() => onSelect(text)}
          disabled={disabled}
          className="rounded-full border bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
        >
          {text}
        </button>
      ))}
    </div>
  );
}
