"use client";

import { Activity, Play, Square, Share2, Download, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useNetworkDiagnostics } from "@/lib/hooks/use-network-diagnostics";
import { DiagnosticResultsView } from "@/components/diagnostics/diagnostic-results";
import { useChatContext } from "@/components/chat/chat-context";
import type { DiagnosticResults } from "@/types/diagnostics";

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

export default function DiagnosticsPage() {
  const { phase, progress, results, runDiagnostics, cancel } = useNetworkDiagnostics();
  const { sendToChat } = useChatContext();

  const hasResults = results.overallStatus !== null;

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

        {/* Future tool callout */}
        <div className="rounded-xl border border-dashed border-muted-foreground/25 p-5">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Download className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold">Need deeper diagnostics?</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                Browser-based tests can check connectivity, latency, and stability, but
                cannot measure Wi-Fi signal strength, channel congestion, or scan your
                local network. A downloadable diagnostic tool for these advanced checks
                is coming soon.
              </p>
              <div className="flex items-center gap-1.5 pt-1 text-[11px] text-muted-foreground/60">
                <Info className="h-3 w-3" />
                <span>Desktop app for Windows, macOS, and Linux planned</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
