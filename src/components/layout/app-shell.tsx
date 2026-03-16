"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SidebarContent } from "./app-sidebar";
import { ChatProvider } from "@/components/chat/chat-context";

interface AppShellProps {
  children: React.ReactNode;
  userRole?: string;
}

export function AppShell({ children, userRole }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ChatProvider>
      <div className="flex h-dvh overflow-hidden">
        <aside className="hidden w-64 shrink-0 flex-col border-r bg-sidebar lg:flex">
          <SidebarContent userRole={userRole} />
        </aside>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side="left"
            className="w-64 p-0"
            showCloseButton={false}
          >
            <SidebarContent onNavigate={() => setMobileOpen(false)} userRole={userRole} />
          </SheetContent>
        </Sheet>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2 border-b px-4 py-3 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Uplink"
                width={24}
                height={24}
                className="rounded-md"
              />
              <span className="text-sm font-semibold">Uplink</span>
            </div>
          </div>

          <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </ChatProvider>
  );
}
