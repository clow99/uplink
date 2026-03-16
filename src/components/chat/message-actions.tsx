"use client";

import { useState } from "react";
import { Copy, Check, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface MessageActionsProps {
  content: string;
}

type Feedback = "up" | "down" | null;

export function MessageActions({ content }: MessageActionsProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleFeedback(value: Feedback) {
    setFeedback((prev) => (prev === value ? null : value));
  }

  return (
    <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {copied ? "Copied" : "Copy"}
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={() => handleFeedback("up")}
          >
            <ThumbsUp
              className={`h-3.5 w-3.5 ${feedback === "up" ? "fill-current text-primary" : ""}`}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Helpful</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={() => handleFeedback("down")}
          >
            <ThumbsDown
              className={`h-3.5 w-3.5 ${feedback === "down" ? "fill-current text-destructive" : ""}`}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Not helpful</TooltipContent>
      </Tooltip>
    </div>
  );
}
