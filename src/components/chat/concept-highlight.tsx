"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import type { Concept } from "@/lib/concepts";
import { getCategoryMeta } from "@/lib/concepts";

interface ConceptHighlightProps {
  concept: Concept;
  matchedText: string;
  onLearnMore?: (query: string) => void;
}

export function ConceptHighlight({
  concept,
  matchedText,
  onLearnMore,
}: ConceptHighlightProps) {
  const categoryMeta = getCategoryMeta(concept.category);

  return (
    <HoverCard openDelay={300} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className="inline cursor-help border-b border-dashed border-primary/40 font-medium text-primary/80 transition-colors hover:border-primary hover:text-primary"
        >
          {matchedText}
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="center"
        className="w-80"
        sideOffset={8}
      >
        <div className="space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-semibold leading-tight">
              {concept.term}
            </h4>
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                categoryMeta.color,
              )}
            >
              {categoryMeta.label}
            </span>
          </div>

          <p className="text-sm leading-snug text-foreground">
            {concept.definition}
          </p>

          {concept.detail && (
            <p className="text-xs leading-relaxed text-muted-foreground">
              {concept.detail}
            </p>
          )}

          {concept.learnMore && onLearnMore && (
            <button
              type="button"
              onClick={() => onLearnMore(concept.learnMore!)}
              className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              <BookOpen className="h-3 w-3" />
              Ask about this
            </button>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
