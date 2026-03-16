"use client";

import { createContext, useContext, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

type SendFn = (message: string) => void;

interface ChatContextValue {
  registerSend: (fn: SendFn) => void;
  sendToChat: (message: string) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const sendRef = useRef<SendFn | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const registerSend = useCallback((fn: SendFn) => {
    sendRef.current = fn;
  }, []);

  const sendToChat = useCallback(
    (message: string) => {
      if (pathname === "/chat" && sendRef.current) {
        sendRef.current(message);
      } else {
        router.push(`/chat?q=${encodeURIComponent(message)}`);
      }
    },
    [pathname, router],
  );

  return (
    <ChatContext.Provider value={{ registerSend, sendToChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
}
