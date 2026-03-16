"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Play,
  Square,
  Share2,
  Download,
  Monitor,
  Apple,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useNetworkDiagnostics } from "@/lib/hooks/use-network-diagnostics";
import { DiagnosticResultsView } from "@/components/diagnostics/diagnostic-results";
import { DesktopReportView } from "@/components/diagnostics/desktop-report-view";
import { useChatContext } from "@/components/chat/chat-context";
import type { DiagnosticResults, StoredDiagnosticReport } from "@/types/diagnostics";

function formatResultsForChat(results: DiagnosticResults): string {
  const parts: string[] = [
    "I just ran a network diagnostic from the Diagnostics page. Here are my results:",
  ];

  if (results.connectivity) {
    const c = results.connectivity;
    parts.push(
      `Connectivity: ${c.apiReachable ? "Online" : c.navigatorOnline ? "Unreachable" : "Offline"}${c.apiResponseMs ? ` (${Math.round(c.apiResponseMs)}ms response)` : ""}`,
    );
  }

  if (results.speedEstimation?.supported) {
    const s = results.speedEstimation;
    const speedParts: string[] = [];
    if (s.effectiveType) speedParts.push(s.effectiveType.toUpperCase());
    if (s.downlinkMbps !== null) speedParts.push(`~${s.downlinkMbps} Mbps`);
    parts.push(`Speed Estimate: ${speedParts.join(", ") || "N/A"}`);
  }

  if (results.latency) {
    const l = results.latency;
    parts.push(`Latency: avg ${l.avgMs}ms (min ${l.minMs}ms, max ${l.maxMs}ms), jitter ${l.jitterMs}ms`);
  }

  if (results.dns) {
    parts.push(`DNS Resolution: avg ${results.dns.avgMs}ms`);
  }

  if (results.stability) {
    const st = results.stability;
    parts.push(
      `Stability: ${st.packetLossPercent}% packet loss (${st.successfulPings}/${st.totalPings} pings)`,
    );
  }

  parts.push("Can you help me interpret these results and suggest any improvements?");

  return parts.join("\n");
}

function LinuxIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.368 1.884 1.43.868.065 1.157-.41 1.517-.865.391-.47.862-.963 1.467-1.07.423-.067.616.266.822.465.199.199.395.135.596 0 .199-.132.398-.334.465-.86.019-.199-.066-.597-.265-.799-.199-.202-.531-.332-.862-.332-.332 0-.663.132-.862.332-.2.199-.333.4-.465.596-.122.196-.267.335-.534.402-.199.067-.465-.065-.598-.265a2.15 2.15 0 01-.329-.729 2.566 2.566 0 01.06-.533c.074-.468.195-1.004-.131-1.572-.262-.465-.79-.793-1.46-.859-.622-.064-1.034.066-1.398.332-.156.137-.338.191-.463.135a.35.35 0 01-.198-.33c0-.066.021-.2.063-.332a8.17 8.17 0 00.305-2.3c-.004-.866-.114-1.71-.336-2.39-.222-.675-.544-1.182-.886-1.584l.004-.006c-.205-.26-.379-.463-.496-.622-.084-.125-.156-.198-.172-.262-.015-.067 0-.134.063-.267.064-.13.192-.332.384-.597.392-.533.985-1.18 1.382-2.078.199-.465.332-.997.332-1.598 0-.599-.133-1.265-.398-2.03-.534-1.532-1.479-3.44-1.11-5.17C17.25.29 16.048 0 14.895 0h-.002c-.27 0-.54.016-.803.047-.71.073-1.327.268-1.586.468" />
    </svg>
  );
}

const PLATFORMS = [
  {
    name: "Windows",
    icon: Monitor,
    label: "Windows 10+",
    file: "uplink-desktop-setup.exe",
  },
  {
    name: "macOS",
    icon: Apple,
    label: "macOS 12+",
    file: "uplink-desktop.dmg",
  },
  {
    name: "Linux",
    icon: LinuxIcon,
    label: ".deb / .rpm",
    file: "uplink-desktop.deb",
  },
] as const;

export default function DiagnosticsPage() {
  const { phase, progress, results, runDiagnostics, cancel } = useNetworkDiagnostics();
  const { sendToChat } = useChatContext();
  const [desktopReports, setDesktopReports] = useState<StoredDiagnosticReport[]>([]);

  const hasResults = results.overallStatus !== null;

  useEffect(() => {
    fetch("/api/diagnostics/report")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setDesktopReports(data))
      .catch(() => {});
  }, []);

  return (
    <ScrollArea className="h-full">
      <div className="mx-auto max-w-5xl space-y-8 px-6 py-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Network Diagnostics</h1>
          <p className="text-sm text-muted-foreground">
            Run live tests to check your connection health
          </p>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {phase !== "running" ? (
              <Button onClick={runDiagnostics} className="gap-2">
                <Play className="h-4 w-4" />
                {hasResults ? "Run Again" : "Run Diagnostics"}
              </Button>
            ) : (
              <Button variant="outline" onClick={cancel} className="gap-2">
                <Square className="h-4 w-4" />
                Cancel
              </Button>
            )}

            {hasResults && phase !== "running" && (
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => sendToChat(formatResultsForChat(results))}
              >
                <Share2 className="h-4 w-4" />
                Share with Support
              </Button>
            )}
          </div>

          {phase === "running" && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex items-center gap-2">
                <Activity
                  className={cn("h-3.5 w-3.5 text-primary", "animate-pulse")}
                />
                <p className="text-xs text-muted-foreground">
                  Running diagnostics... {progress}%
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <DiagnosticResultsView results={results} />

        {/* Timestamp */}
        {results.ranAt && phase !== "running" && (
          <p className="text-xs text-muted-foreground">
            Last run: {new Date(results.ranAt).toLocaleString()}
          </p>
        )}

        {/* Desktop reports */}
        <DesktopReportView reports={desktopReports} />

        {/* Desktop app download section */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Download className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold">
                  Uplink Desktop Diagnostics
                </h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  Go beyond browser-based tests. The desktop app measures Wi-Fi
                  signal strength, scans for channel congestion, discovers
                  devices on your local network, and generates reports you can
                  share with support.
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                {PLATFORMS.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <button
                      key={platform.name}
                      disabled
                      className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 px-4 py-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">
                          {platform.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {platform.label}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-muted-foreground/60">
                Downloads will be available once the first release is published.
                The app is open source and runs locally on your machine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
