"use client";

import { Children, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { HighlightedText } from "./highlighted-text";

interface MarkdownMessageProps {
  content: string;
  onLearnMore?: (query: string) => void;
}

function highlightText(
  children: ReactNode,
  onLearnMore?: (query: string) => void,
): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string") {
      return <HighlightedText text={child} onLearnMore={onLearnMore} />;
    }
    return child;
  });
}

export function MarkdownMessage({ content, onLearnMore }: MarkdownMessageProps) {
  const components: Components = {
    p: ({ children }) => (
      <p className="mb-2 last:mb-0">
        {highlightText(children, onLearnMore)}
      </p>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold">
        {highlightText(children, onLearnMore)}
      </strong>
    ),
    em: ({ children }) => (
      <em>{highlightText(children, onLearnMore)}</em>
    ),
    ol: ({ children }) => (
      <ol className="mb-2 ml-5 list-decimal space-y-1.5 last:mb-0">
        {children}
      </ol>
    ),
    ul: ({ children }) => (
      <ul className="mb-2 ml-5 list-disc space-y-1.5 last:mb-0">
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li className="pl-0.5 [&>p]:mb-1 [&>p:last-child]:mb-0">
        {highlightText(children, onLearnMore)}
      </li>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 hover:text-primary/80"
      >
        {highlightText(children, onLearnMore)}
      </a>
    ),
    pre: ({ children }) => (
      <pre className="my-2 overflow-x-auto rounded-lg bg-black/5 p-3 font-mono text-xs last:mb-0">
        {children}
      </pre>
    ),
    code: ({ children }) => (
      <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[0.85em]">
        {children}
      </code>
    ),
    img: ({ src, alt }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ""}
        className="my-2 max-w-full rounded-lg border"
        loading="lazy"
      />
    ),
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
