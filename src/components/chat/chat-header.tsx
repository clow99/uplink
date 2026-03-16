"use client";

import {
  MoreVertical,
  MessageSquarePlus,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatHeaderProps {
  onNewConversation: () => void;
  onOpenResources: () => void;
}

export function ChatHeader({
  onNewConversation,
  onOpenResources,
}: ChatHeaderProps) {
  return (
    <header className="flex items-center gap-2.5 border-b px-4 py-2.5">
      <div>
        <h1 className="text-sm font-semibold leading-tight">Chat Support</h1>
        <p className="text-xs text-muted-foreground">
          AI-powered troubleshooting
        </p>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 text-xs text-muted-foreground"
          onClick={onNewConversation}
        >
          <MessageSquarePlus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">New Chat</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onNewConversation}>
                <MessageSquarePlus className="h-4 w-4" />
                New Conversation
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onOpenResources}>
                <BookOpen className="h-4 w-4" />
                Resources
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
