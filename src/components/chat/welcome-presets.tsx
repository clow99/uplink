"use client";

import Image from "next/image";
import {
  WifiOff,
  Gauge,
  Radio,
  Activity,
  WifiZero,
  RefreshCw,
  Package,
  Gamepad2,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Preset {
  icon: LucideIcon;
  label: string;
  message: string;
  description: string;
}

const PRESETS: Preset[] = [
  {
    icon: WifiOff,
    label: "Internet is down",
    message: "My internet is completely down and nothing is loading.",
    description: "No connection on any device",
  },
  {
    icon: Gauge,
    label: "Slow speeds",
    message: "My internet speeds are much slower than usual.",
    description: "Pages load slowly or buffer",
  },
  {
    icon: Radio,
    label: "Wi-Fi coverage",
    message: "I have Wi-Fi coverage issues in parts of my home.",
    description: "Weak signal in some rooms",
  },
  {
    icon: Activity,
    label: "Modem lights",
    message: "The lights on my modem are blinking abnormally and I need help understanding what they mean.",
    description: "Unusual blinking patterns",
  },
  {
    icon: WifiZero,
    label: "Can't connect",
    message: "My device can't connect to the Wi-Fi network.",
    description: "Network visible but won't join",
  },
  {
    icon: RefreshCw,
    label: "Intermittent drops",
    message: "My internet keeps disconnecting and reconnecting intermittently.",
    description: "Connection drops randomly",
  },
  {
    icon: Package,
    label: "New equipment setup",
    message: "I just got new equipment and need help setting it up.",
    description: "Modem, router, or mesh setup",
  },
  {
    icon: Gamepad2,
    label: "Gaming lag",
    message: "I'm experiencing lag and high ping while gaming online.",
    description: "High latency during games",
  },
  {
    icon: Globe,
    label: "DNS issues",
    message: "Websites aren't loading but my connection seems active.",
    description: "Connected but sites won't load",
  },
];

interface WelcomePresetsProps {
  onSelect: (message: string) => void;
}

export function WelcomePresets({ onSelect }: WelcomePresetsProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
      <div className="mb-8 text-center">
        <Image
          src="/logo.png"
          alt="Uplink"
          width={48}
          height={48}
          className="mx-auto mb-3 rounded-xl"
        />
        <h2 className="text-xl font-semibold text-foreground">
          How can I help?
        </h2>
        <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
          Select a common issue below or describe your problem in the chat.
        </p>
      </div>
      <div className="grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => onSelect(preset.message)}
            className="group flex flex-col items-start gap-2 rounded-xl border bg-card p-4 text-left transition-colors hover:border-primary/40 hover:bg-accent"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
              <preset.icon className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-sm font-medium leading-tight text-foreground">
                {preset.label}
              </p>
              <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                {preset.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
