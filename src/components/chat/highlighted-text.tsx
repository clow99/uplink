"use client";

import type { ReactNode } from "react";
import { findConceptsInText } from "@/lib/concepts";
import { ConceptHighlight } from "./concept-highlight";

interface HighlightedTextProps {
  text: string;
  onLearnMore?: (query: string) => void;
}

export function HighlightedText({ text, onLearnMore }: HighlightedTextProps) {
  const matches = findConceptsInText(text);

  if (matches.length === 0) {
    return <>{text}</>;
  }

  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of matches) {
    if (match.index > cursor) {
      parts.push(text.slice(cursor, match.index));
    }

    parts.push(
      <ConceptHighlight
        key={`${match.index}-${match.concept.term}`}
        concept={match.concept}
        matchedText={match.matchedText}
        onLearnMore={onLearnMore}
      />,
    );

    cursor = match.index + match.length;
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return <>{parts}</>;
}
