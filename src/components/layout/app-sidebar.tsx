"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  MessageCircle,
  Activity,
  BookOpen,
  HelpCircle,
  LogOut,
  ChevronRight,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useChatContext } from "@/components/chat/chat-context";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: MessageCircle, label: "Chat Support", href: "/chat" },
  { icon: Activity, label: "Network Diagnostics", href: "/diagnostics" },
];

const RESOURCE_LINKS = [
  {
    label: "Wi-Fi Bands Guide",
    query: "Can you explain the difference between 2.4GHz and 5GHz Wi-Fi bands?",
  },
  {
    label: "Modem vs Router",
    query: "What's the difference between a modem and a router?",
  },
  {
    label: "Modem Light Guide",
    query: "Can you help me understand the lights on my modem?",
  },
  {
    label: "How DNS Works",
    query: "Can you explain how DNS works and why websites might not load even when I'm connected?",
  },
  {
    label: "Fiber vs DSL vs Cable",
    query: "What are the differences between fiber, DSL, and cable internet connections?",
  },
  {
    label: "Speed Test Guide",
    query: "How do I run an accurate speed test to check my internet speed?",
  },
  {
    label: "Router Placement Tips",
    query: "Where should I place my router for the best Wi-Fi coverage?",
  },
];

const QUICK_HELP = [
  {
    label: "No Internet",
    query: "My internet is completely down and I need step-by-step help.",
  },
  {
    label: "Slow Speeds",
    query: "I'm experiencing very slow internet speeds and need help.",
  },
  {
    label: "Wi-Fi Coverage",
    query: "I have poor Wi-Fi coverage in parts of my home.",
  },
  {
    label: "Intermittent Drops",
    query: "My internet keeps disconnecting and reconnecting. Can you help me figure out why?",
  },
  {
    label: "Device Not Connecting",
    query: "One of my devices won't connect to Wi-Fi but everything else works fine.",
  },
  {
    label: "New Modem Setup",
    query: "I just got a new modem and need step-by-step help setting it up.",
  },
  {
    label: "Gaming Lag",
    query: "I'm experiencing high ping and lag while gaming. Can you help me reduce it?",
  },
];

const LEARN_MORE_LINKS = [
  {
    label: "NAT & Port Forwarding",
    query: "Can you explain what NAT is and when I would need port forwarding?",
  },
  {
    label: "Latency, Jitter & Packet Loss",
    query: "What are latency, jitter, and packet loss, and how do they affect my internet?",
  },
  {
    label: "Mesh Network Setup",
    query: "How do I set up a mesh Wi-Fi system to cover my whole home?",
  },
];

interface SidebarContentProps {
  onNavigate?: () => void;
}

export function SidebarContent({ onNavigate }: SidebarContentProps) {
  const pathname = usePathname();
  const { sendToChat } = useChatContext();

  function handleTopicClick(query: string) {
    sendToChat(query);
    onNavigate?.();
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-3 pt-2">
        <Image
          src="/logo.png"
          alt="Uplink"
          width={64}
          height={64}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-xl font-semibold leading-tight">Uplink</h1>
          <p className="text-[12px] text-muted-foreground">ISP Portal</p>
        </div>
      </div>

      <Separator />

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>

        <Separator className="my-4" />

        <div>
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Resources
          </p>
          <div className="space-y-0.5">
            {RESOURCE_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleTopicClick(link.query)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <BookOpen className="h-3.5 w-3.5 shrink-0" />
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        <div>
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Quick Help
          </p>
          <div className="space-y-0.5">
            {QUICK_HELP.map((item) => (
              <button
                key={item.label}
                onClick={() => handleTopicClick(item.query)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="h-3.5 w-3.5 shrink-0" />
                  {item.label}
                </span>
                <ChevronRight className="h-3 w-3 opacity-50" />
              </button>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        <div>
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Learn More
          </p>
          <div className="space-y-0.5">
            {LEARN_MORE_LINKS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleTopicClick(item.query)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Lightbulb className="h-3.5 w-3.5 shrink-0" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <Separator />

      <div className="flex items-center gap-3 px-4 py-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs">CU</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">Customer</p>
          <p className="truncate text-[11px] text-muted-foreground">
            Residential Plan
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 text-muted-foreground"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
