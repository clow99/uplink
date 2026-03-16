"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Wifi,
  Radio,
  Router,
  Activity,
  Gauge,
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Cable,
  Zap,
  RefreshCw,
  Smartphone,
  Package,
  Gamepad2,
  BookOpen,
  Network,
  BarChart3,
} from "lucide-react";

interface ResourceLink {
  icon: React.ElementType;
  label: string;
  message: string;
}

const QUICK_LINKS: ResourceLink[] = [
  {
    icon: Radio,
    label: "Understanding Wi-Fi Bands",
    message: "Can you explain the difference between 2.4GHz and 5GHz Wi-Fi bands?",
  },
  {
    icon: Router,
    label: "Modem vs Router",
    message: "What's the difference between a modem and a router?",
  },
  {
    icon: Activity,
    label: "Modem Light Status Guide",
    message: "Can you help me understand the lights on my modem?",
  },
  {
    icon: Globe,
    label: "How DNS Works",
    message: "Can you explain how DNS works and why websites might not load even when I'm connected?",
  },
  {
    icon: Cable,
    label: "Fiber vs DSL vs Cable",
    message: "What are the differences between fiber, DSL, and cable internet connections?",
  },
  {
    icon: Zap,
    label: "Speed Test Guide",
    message: "How do I run an accurate speed test to check my internet speed?",
  },
  {
    icon: MapPin,
    label: "Router Placement Tips",
    message: "Where should I place my router for the best Wi-Fi coverage?",
  },
];

const TROUBLESHOOTING_FLOWS: ResourceLink[] = [
  {
    icon: Wifi,
    label: "No Internet Troubleshooter",
    message: "My internet is completely down and I need step-by-step help to fix it.",
  },
  {
    icon: Gauge,
    label: "Slow Speed Troubleshooter",
    message: "I'm experiencing very slow internet speeds and need help diagnosing the issue.",
  },
  {
    icon: MapPin,
    label: "Wi-Fi Coverage Helper",
    message: "I have poor Wi-Fi coverage in parts of my home. Can you help me improve it?",
  },
  {
    icon: RefreshCw,
    label: "Intermittent Drops Fixer",
    message: "My internet keeps disconnecting and reconnecting. Can you help me figure out why?",
  },
  {
    icon: Smartphone,
    label: "Single Device Not Connecting",
    message: "One of my devices won't connect to Wi-Fi but everything else works fine.",
  },
  {
    icon: Package,
    label: "New Modem Setup",
    message: "I just got a new modem and need step-by-step help setting it up.",
  },
  {
    icon: Gamepad2,
    label: "Gaming Lag Troubleshooter",
    message: "I'm experiencing high ping and lag while gaming. Can you help me reduce it?",
  },
];

const LEARN_MORE: ResourceLink[] = [
  {
    icon: Network,
    label: "What is NAT and Port Forwarding?",
    message: "Can you explain what NAT is and when I would need port forwarding?",
  },
  {
    icon: BarChart3,
    label: "Latency, Jitter, and Packet Loss",
    message: "What are latency, jitter, and packet loss, and how do they affect my internet?",
  },
  {
    icon: Radio,
    label: "Mesh Network Setup Guide",
    message: "How do I set up a mesh Wi-Fi system to cover my whole home?",
  },
];

interface ResourcesPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTopicSelect: (message: string) => void;
}

export function ResourcesPanel({
  open,
  onOpenChange,
  onTopicSelect,
}: ResourcesPanelProps) {
  function handleClick(message: string) {
    onTopicSelect(message);
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Resources</SheetTitle>
          <SheetDescription>
            Quick links and guided troubleshooting flows
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4">
          <section>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Quick Links
            </h3>
            <div className="flex flex-col gap-1">
              {QUICK_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleClick(link.message)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent"
                >
                  <link.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </section>

          <Separator />

          <section>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Troubleshooting Flows
            </h3>
            <div className="flex flex-col gap-1">
              {TROUBLESHOOTING_FLOWS.map((flow) => (
                <button
                  key={flow.label}
                  onClick={() => handleClick(flow.message)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent"
                >
                  <flow.icon className="h-4 w-4 shrink-0 text-primary" />
                  <span>{flow.label}</span>
                </button>
              ))}
            </div>
          </section>

          <Separator />

          <section>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Learn More
            </h3>
            <div className="flex flex-col gap-1">
              {LEARN_MORE.map((topic) => (
                <button
                  key={topic.label}
                  onClick={() => handleClick(topic.message)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent"
                >
                  <topic.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>{topic.label}</span>
                </button>
              ))}
            </div>
          </section>

          <Separator />

          <section>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Contact Support
            </h3>
            <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-4 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>1-800-555-0199</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span>support@uplink.example</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0" />
                <span>Mon - Sun, 7 AM - 11 PM ET</span>
              </div>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
