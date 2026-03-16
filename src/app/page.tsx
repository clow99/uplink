import Image from "next/image";
import Link from "next/link";
import {
  Wifi,
  MessageCircle,
  Zap,
  Shield,
  Activity,
  BookOpen,
  ArrowRight,
  Search,
  ClipboardCheck,
  ArrowDown,
  ArrowUp,
  Timer,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: MessageCircle,
    title: "AI Chat Support",
    description:
      "Get instant answers to internet, Wi-Fi, modem, and router questions from an AI assistant trained on ISP knowledge.",
  },
  {
    icon: Activity,
    title: "Live Diagnostics",
    description:
      "Monitor connection health, uptime, and speed metrics in real time from your personalized dashboard.",
  },
  {
    icon: Zap,
    title: "Instant Troubleshooting",
    description:
      "Step-by-step guided fixes for common issues like slow speeds, dropped connections, and device problems.",
  },
  {
    icon: Shield,
    title: "Smart Knowledge Base",
    description:
      "Backed by a comprehensive library of networking articles, guides, and best practices.",
  },
  {
    icon: Wifi,
    title: "Wi-Fi Optimization",
    description:
      "Get tailored recommendations for router placement, band selection, and coverage improvements.",
  },
  {
    icon: BookOpen,
    title: "Learn As You Go",
    description:
      "Understand DNS, NAT, latency, mesh networks, and more through conversational explanations.",
  },
];

const STATS = [
  { value: "24/7", label: "AI support availability" },
  { value: "< 2s", label: "Average response time" },
  { value: "50+", label: "Knowledge articles" },
  { value: "99.9%", label: "Platform uptime" },
];

const STEPS = [
  {
    icon: MessageCircle,
    title: "Describe your issue",
    description: "Type your problem or pick from common issues",
  },
  {
    icon: Search,
    title: "AI searches knowledge",
    description: "Semantic search across 50+ expert articles",
  },
  {
    icon: ClipboardCheck,
    title: "Get guided steps",
    description: "Clear, step-by-step resolution you can follow",
  },
];

function HeroVisual() {
  return (
    <div className="relative w-full max-w-md">
      <div className="animate-hero-glow absolute -inset-6 rounded-3xl bg-primary/[0.07] blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/90 shadow-2xl shadow-primary/10 backdrop-blur-sm">
        <div className="flex items-center gap-2 border-b border-border/40 bg-muted/30 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
          <span className="ml-3 text-xs font-medium text-muted-foreground">
            Uplink Chat
          </span>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex justify-end">
            <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
              My internet keeps dropping every few minutes
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
              <Wifi className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-2 rounded-2xl rounded-tl-sm bg-muted/80 px-4 py-3 text-sm">
              <p>Let&apos;s troubleshoot step by step:</p>
              <div className="space-y-1.5">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                  <span className="text-muted-foreground">
                    Check modem &mdash; is{" "}
                    <span className="text-foreground">Online</span> light solid?
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border border-border" />
                  <span className="text-muted-foreground">
                    Restart: unplug for{" "}
                    <span className="text-foreground">30 seconds</span>
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border border-border" />
                  <span className="text-muted-foreground">
                    Test with Ethernet cable
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pl-11">
            {["Check modem", "Restart modem", "Test Ethernet"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-primary/20 bg-primary/[0.08] px-3 py-1 text-xs font-medium text-primary"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -top-3 -right-3 z-10 flex items-center gap-1.5 rounded-full border border-success/30 bg-card px-3 py-1.5 text-xs shadow-lg">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        <span className="font-medium text-success">Online</span>
      </div>

      <div className="absolute -bottom-3 -left-3 z-10 flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs shadow-lg">
        <ArrowDown className="h-3 w-3 text-primary" />
        <span className="font-bold tabular-nums">485</span>
        <span className="text-muted-foreground">Mbps</span>
      </div>
    </div>
  );
}

function ChatPreview() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-2xl shadow-primary/5 backdrop-blur-sm">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-border/40 bg-muted/30 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-destructive/60" />
          <span className="h-3 w-3 rounded-full bg-warning/60" />
          <span className="h-3 w-3 rounded-full bg-success/60" />
          <span className="ml-3 text-xs font-medium text-muted-foreground">Uplink Chat</span>
        </div>

        <div className="space-y-4 p-5">
          {/* User message */}
          <div className="flex justify-end">
            <div className="max-w-xs rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
              My internet keeps dropping every few minutes
            </div>
          </div>

          {/* Assistant message */}
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
              <Wifi className="h-4 w-4 text-primary" />
            </div>
            <div className="max-w-sm space-y-2 rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm text-foreground">
              <p>Intermittent drops are frustrating! Let&apos;s troubleshoot step by step:</p>
              <ol className="ml-4 list-decimal space-y-1 text-muted-foreground">
                <li>Check your modem lights &mdash; is the <span className="text-foreground">Online</span> light solid green?</li>
                <li>Restart your modem: unplug for <span className="text-foreground">30 seconds</span>, then plug back in</li>
                <li>Test with an Ethernet cable to rule out Wi-Fi issues</li>
              </ol>
              <p className="text-muted-foreground">Which step would you like to start with?</p>
            </div>
          </div>

          {/* Suggestion chips */}
          <div className="flex flex-wrap gap-2 pl-11">
            {["Check modem lights", "Restart modem", "Test with Ethernet"].map(
              (chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-primary/20 bg-primary/[0.08] px-3 py-1 text-xs font-medium text-primary"
                >
                  {chip}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardMockup() {
  const bars = [98, 100, 100, 97, 100, 100, 99, 100, 100, 95, 100, 100];
  return (
    <div className="mx-auto max-w-3xl [perspective:1200px]">
      <div className="animate-float rounded-2xl border border-border/50 bg-card/90 shadow-2xl shadow-primary/5 backdrop-blur-sm transition-transform duration-500 sm:[transform:rotateY(-2deg)_rotateX(2deg)]">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-border/40 bg-muted/30 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-destructive/60" />
          <span className="h-3 w-3 rounded-full bg-warning/60" />
          <span className="h-3 w-3 rounded-full bg-success/60" />
          <span className="ml-3 text-xs font-medium text-muted-foreground">Uplink Dashboard</span>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {/* Status bar */}
          <div className="flex items-center gap-3 rounded-xl border border-success/20 bg-success/[0.06] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm font-semibold text-success">All Systems Operational</p>
              <p className="text-xs text-muted-foreground">All 5 services running normally</p>
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: ArrowDown, label: "Download", value: "485", unit: "Mbps", pct: 97 },
              { icon: ArrowUp, label: "Upload", value: "42", unit: "Mbps", pct: 84 },
              { icon: Timer, label: "Latency", value: "12", unit: "ms", pct: 0 },
            ].map((m) => (
              <div key={m.label} className="rounded-xl border bg-background/50 p-4">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <m.icon className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-medium uppercase tracking-wide">{m.label}</span>
                </div>
                <p className="mt-2 text-xl font-bold tabular-nums">
                  {m.value}
                  <span className="ml-1 text-xs font-normal text-muted-foreground">{m.unit}</span>
                </p>
                {m.pct > 0 && (
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${m.pct}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Uptime chart */}
          <div className="rounded-xl border bg-background/50 p-4">
            <p className="mb-3 text-xs font-medium text-muted-foreground">Uptime &mdash; Last 12 months</p>
            <div className="flex items-end gap-1.5">
              {bars.map((pct, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-sm bg-success/70"
                    style={{ height: `${pct * 0.4}px` }}
                  />
                  <span className="text-[8px] tabular-nums text-muted-foreground">
                    {pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopicCardSvg({ type }: { type: "wifi" | "modem" | "speed" | "network" }) {
  switch (type) {
    case "wifi":
      return (
        <svg viewBox="0 0 80 60" className="h-14 w-auto" xmlns="http://www.w3.org/2000/svg">
          {/* House */}
          <polygon points="40,5 10,25 70,25" fill="none" stroke="#334155" strokeWidth="1.5" />
          <rect x="15" y="25" width="50" height="30" rx="2" fill="none" stroke="#334155" strokeWidth="1.5" />
          {/* Signal waves */}
          <path d="M32,38 Q40,28 48,38" fill="none" stroke="#3abff8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <path d="M35,35 Q40,30 45,35" fill="none" stroke="#3abff8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <circle cx="40" cy="38" r="2" fill="#3abff8" />
        </svg>
      );
    case "modem":
      return (
        <svg viewBox="0 0 80 60" className="h-14 w-auto" xmlns="http://www.w3.org/2000/svg">
          {/* Modem body */}
          <rect x="20" y="12" width="40" height="36" rx="5" fill="#1a2332" stroke="#334155" strokeWidth="1.5" />
          {/* LEDs */}
          <circle cx="32" cy="24" r="3" fill="#22c55e">
            <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="40" cy="24" r="3" fill="#22c55e" />
          <circle cx="48" cy="24" r="3" fill="#3abff8">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
          </circle>
          {/* Vent lines */}
          <line x1="30" y1="34" x2="50" y2="34" stroke="#334155" strokeWidth="0.8" />
          <line x1="30" y1="38" x2="50" y2="38" stroke="#334155" strokeWidth="0.8" />
          <line x1="30" y1="42" x2="50" y2="42" stroke="#334155" strokeWidth="0.8" />
        </svg>
      );
    case "speed":
      return (
        <svg viewBox="0 0 80 60" className="h-14 w-auto" xmlns="http://www.w3.org/2000/svg">
          {/* Gauge arc */}
          <path d="M15,48 A30,30 0 0,1 65,48" fill="none" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          <path d="M15,48 A30,30 0 0,1 58,28" fill="none" stroke="#3abff8" strokeWidth="4" strokeLinecap="round" />
          {/* Needle */}
          <line x1="40" y1="48" x2="55" y2="32" stroke="#3abff8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="40" cy="48" r="3" fill="#3abff8" />
          {/* Speed label */}
          <text x="40" y="58" textAnchor="middle" fill="#7c8ca1" fontSize="7" fontFamily="system-ui, sans-serif">Mbps</text>
        </svg>
      );
    case "network":
      return (
        <svg viewBox="0 0 80 60" className="h-14 w-auto" xmlns="http://www.w3.org/2000/svg">
          {/* Lines */}
          <line x1="40" y1="15" x2="20" y2="45" stroke="#334155" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="40" y1="15" x2="60" y2="45" stroke="#334155" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="40" y1="15" x2="40" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="3 2" />
          {/* Router node */}
          <rect x="30" y="8" width="20" height="14" rx="3" fill="#1a2332" stroke="#3abff8" strokeWidth="1.5" />
          <circle cx="36" cy="15" r="1.5" fill="#3abff8" />
          <circle cx="44" cy="15" r="1.5" fill="#22c55e" />
          {/* Device nodes */}
          <circle cx="20" cy="48" r="6" fill="#1a2332" stroke="#334155" strokeWidth="1.5" />
          <circle cx="40" cy="52" r="6" fill="#1a2332" stroke="#334155" strokeWidth="1.5" />
          <circle cx="60" cy="48" r="6" fill="#1a2332" stroke="#334155" strokeWidth="1.5" />
          <circle cx="20" cy="48" r="2" fill="#22c55e" opacity="0.7" />
          <circle cx="40" cy="52" r="2" fill="#22c55e" opacity="0.7" />
          <circle cx="60" cy="48" r="2" fill="#22c55e" opacity="0.7" />
        </svg>
      );
  }
}

const TOPIC_CARDS: { type: "wifi" | "modem" | "speed" | "network"; title: string; description: string }[] = [
  { type: "wifi", title: "Wi-Fi Coverage", description: "Optimize signal strength across every room" },
  { type: "modem", title: "Modem Lights", description: "Decode LED patterns and fix issues fast" },
  { type: "speed", title: "Speed Test", description: "Measure and improve your connection speed" },
  { type: "network", title: "Network Setup", description: "Configure routers, mesh, and devices" },
];

export default function HomePage() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-background">
      {/* Gradient backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[120px]" />
        <div className="absolute top-[40%] -right-[15%] h-[600px] w-[600px] rounded-full bg-primary/[0.04] blur-[100px]" />
        <div className="absolute top-[80%] -left-[10%] h-[500px] w-[500px] rounded-full bg-primary/[0.03] blur-[100px]" />
      </div>

      {/* ── Navigation ── */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Uplink" width={36} height={36} className="rounded-lg" priority />
          <span className="text-lg font-semibold">Uplink</span>
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-12 sm:pt-20 lg:pb-24">
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />

        <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="text-center lg:text-left">
            <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.08] px-4 py-1.5 text-sm text-primary">
              <Zap className="h-3.5 w-3.5" />
              AI-Powered ISP Support
            </div>
            <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight [animation-delay:100ms] sm:text-5xl lg:text-6xl">
              Internet issues?
              <br />
              <span className="hero-gradient-text">Solved in seconds.</span>
            </h1>
            <p className="animate-fade-in-up mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground [animation-delay:200ms] lg:mx-0">
              Uplink is your AI support assistant for troubleshooting internet,
              Wi-Fi, modem, and router problems &mdash; with real-time diagnostics
              and guided fixes.
            </p>
            <div className="animate-fade-in-up mt-10 flex flex-col items-center justify-center gap-3 [animation-delay:300ms] sm:flex-row lg:justify-start">
              <Button size="lg" className="group" asChild>
                <Link href="/login">
                  Start Chatting
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/login">View Dashboard</Link>
              </Button>
            </div>
          </div>

          <div className="animate-fade-in-up flex justify-center [animation-delay:200ms] lg:justify-end">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-12">
        <div className="grid grid-cols-2 gap-6 rounded-2xl border border-border/40 bg-card/40 px-6 py-8 backdrop-blur-sm sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-border/30">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <span className="text-3xl font-bold tabular-nums text-primary sm:text-4xl">
                {stat.value}
              </span>
              <span className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Chat Preview ── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            See it in action
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Describe your problem in plain language and get clear, step-by-step
            guidance instantly.
          </p>
        </div>
        <ChatPreview />
      </section>

      {/* ── Features ── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Everything you need, one conversation away
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            From quick fixes to deep networking knowledge, Uplink handles it all
            through a single intelligent interface.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:border-primary/20 hover:bg-card"
            >
              {/* Decorative accent */}
              <svg
                className="pointer-events-none absolute -top-2 -right-2 h-16 w-16 text-primary/[0.06] transition-colors group-hover:text-primary/[0.12]"
                viewBox="0 0 60 60"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="40" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="40" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="40" cy="20" r="3" fill="currentColor" />
              </svg>

              <div className="relative">
                <div className="mb-4 inline-flex rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 p-3">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            How it works
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Three simple steps from &ldquo;something&apos;s wrong&rdquo; to
            &ldquo;all fixed.&rdquo;
          </p>
        </div>

        <div className="relative grid gap-8 sm:grid-cols-3 sm:gap-4">
          {/* Connecting line (desktop) */}
          <svg
            className="pointer-events-none absolute top-10 left-[16.7%] right-[16.7%] hidden h-[2px] sm:block"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <line
              x1="0" y1="1" x2="100%" y2="1"
              stroke="#3abff8"
              strokeWidth="2"
              strokeDasharray="6 4"
              className="animate-marching-ants"
              opacity="0.3"
            />
          </svg>

          {STEPS.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <div className="relative z-10 mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
                <step.icon className="h-7 w-7 text-primary" />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
              </div>
              <h3 className="mb-1 font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dashboard Preview ── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Your connection, at a glance
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            A real-time dashboard with speed metrics, uptime tracking, and
            service status &mdash; all in one place.
          </p>
        </div>
        <DashboardMockup />
      </section>

      {/* ── Visual Topic Cards ── */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            What can Uplink help with?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            From Wi-Fi dead zones to blinking modem lights, we&apos;ve got you covered.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TOPIC_CARDS.map((card) => (
            <Link
              key={card.type}
              href="/login"
              className="group flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-card/50 p-5 text-center backdrop-blur-sm transition-all duration-200 hover:scale-[1.03] hover:border-primary/30 hover:bg-card"
            >
              <TopicCardSvg type={card.type} />
              <div>
                <p className="text-sm font-semibold">{card.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/[0.08] to-transparent p-10 text-center sm:p-14">
          {/* Decorative signal arcs */}
          <svg
            aria-hidden
            className="pointer-events-none absolute -top-6 -right-6 h-40 w-40 text-primary/[0.06]"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="20" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="100" cy="20" r="50" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="100" cy="20" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
          <svg
            aria-hidden
            className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 text-primary/[0.05]"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="100" r="25" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="20" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>

          <h2 className="relative text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to fix your connection?
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-muted-foreground">
            Sign in or create a free account to start chatting with Uplink and
            get your internet back on track.
          </p>
          <div className="relative mt-8">
            <Button size="lg" asChild>
              <Link href="/login">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-border/40 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Uplink" width={24} height={24} className="rounded" />
            <span className="text-sm font-medium text-muted-foreground">Uplink</span>
          </div>
          <p className="text-xs text-muted-foreground">
            AI-powered ISP support assistant
          </p>
        </div>
      </footer>
    </div>
  );
}
