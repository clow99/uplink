"use client";

import {
  useState,
  useRef,
  useCallback,
  type FormEvent,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { ArrowUp, Paperclip, X, ImageIcon } from "lucide-react";
import { SuggestionChips } from "./suggestion-chips";
import type { ImageAttachment } from "@/types";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB

interface ChatInputProps {
  onSend: (message: string, image?: ImageAttachment) => void;
  disabled: boolean;
  showSuggestions: boolean;
  contextualSuggestion?: string;
}

export function ChatInput({ onSend, disabled, showSuggestions, contextualSuggestion }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageAttachment, setImageAttachment] = useState<ImageAttachment | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearImage = useCallback(() => {
    setImagePreview(null);
    setImageAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if ((!trimmed && !imageAttachment) || disabled) return;
    onSend(trimmed || "What equipment is this? Please identify it and analyze what you can see.", imageAttachment ?? undefined);
    setValue("");
    clearImage();
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  function handleInput() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      alert("Please upload a JPEG, PNG, WebP, or GIF image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("Image must be under 4 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setImagePreview(dataUrl);

      const base64 = dataUrl.split(",")[1];
      setImageAttachment({
        base64,
        mimeType: file.type as ImageAttachment["mimeType"],
      });
    };
    reader.readAsDataURL(file);
  }

  const canSend = value.trim() || imageAttachment;

  return (
    <div className="border-t bg-background">
      {showSuggestions && (
        <div className="px-4 pt-3">
          <SuggestionChips onSelect={(msg) => onSend(msg)} contextualSuggestion={contextualSuggestion} disabled={disabled} />
        </div>
      )}

      {imagePreview && (
        <div className="px-4 pt-3">
          <div className="relative inline-block">
            <Image
              src={imagePreview}
              alt="Upload preview"
              width={120}
              height={120}
              className="rounded-lg border object-cover"
              style={{ width: 120, height: 120 }}
              unoptimized
            />
            <button
              type="button"
              onClick={clearImage}
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
            >
              <X className="h-3 w-3" />
            </button>
            <div className="absolute bottom-1 left-1 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
              <ImageIcon className="h-3 w-3" />
              Equipment photo
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 px-4 py-3"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          onChange={handleFileSelect}
          className="hidden"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={disabled}
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0 rounded-xl text-muted-foreground"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Upload equipment photo</TooltipContent>
        </Tooltip>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder={imageAttachment ? "Describe what you need help with (optional)..." : "Describe your issue..."}
          rows={1}
          disabled={disabled}
          className="flex-1 resize-none rounded-xl border bg-muted/50 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
        />
        <Button
          type="submit"
          size="icon"
          disabled={disabled || !canSend}
          className="shrink-0 rounded-xl"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </form>
      <p className="px-4 pb-2 text-center text-[11px] text-muted-foreground/60">
        Press Enter to send, Shift + Enter for new line
      </p>
    </div>
  );
}
