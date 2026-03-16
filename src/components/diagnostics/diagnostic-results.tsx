"use client";

import {
  Wifi,
  Gauge,
  Timer,
  Globe,
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DiagnosticResults, TestStatus } from "@/types/diagnostics";
import { TestCard } from "./test-card";

const OVERALL_CONFIG: Record<TestStatus, { icon: typeof CheckCircle2; color: string; bg: string; border: string; label: string; description: string }> = {
  pass: {
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
    label: "Network Healthy",
    description: "All diagnostics passed. Your connection looks good.",
  },
  warn: {
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
    label: "Potential Issues Detected",
    description: "Some tests returned warnings. Review the details below.",
  },
  fail: {
    icon: XCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    label: "Issues Found",
    description: "One or more tests failed. See details below for recommendations.",
  },
};

function connectivityDetail(apiMs: number | null, reachable: boolean): string {
  if (!reachable) return "Could not reach the server. Check your connection.";
  if (apiMs === null) return "";
  if (apiMs > 3000) return `Server responded in ${Math.round(apiMs)}ms (slow)`;
  return `Server responded in ${Math.round(apiMs)}ms`;
}

function speedDetail(effectiveType: string | null, downlink: number | null): string {
  const parts: string[] = [];
  if (effectiveType) parts.push(`Connection type: ${effectiveType.toUpperCase()}`);
  if (downlink !== null) parts.push(`Estimated bandwidth: ${downlink} Mbps`);
  return parts.join(" / ") || "Unable to estimate";
}

function latencyDetail(min: number, max: number): string {
  return `Range: ${min}ms - ${max}ms`;
}

interface DiagnosticResultsViewProps {
  results: DiagnosticResults;
}

export function DiagnosticResultsView({ results }: DiagnosticResultsViewProps) {
  const { connectivity, speedEstimation, latency, dns, stability, overallStatus } = results;

  return (
    <div className="space-y-6">
      {overallStatus && (
        <OverallBanner status={overallStatus} />
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <TestCard
          icon={Wifi}
          title="Connectivity"
          status={connectivity?.status ?? null}
          metric={
            connectivity
              ? connectivity.apiReachable
                ? "Online"
                : connectivity.navigatorOnline
                  ? "Unreachable"
                  : "Offline"
              : undefined
          }
          detail={
            connectivity
              ? connectivityDetail(connectivity.apiResponseMs, connectivity.apiReachable)
              : undefined
          }
        />

        <TestCard
          icon={Gauge}
          title="Speed Estimate"
          status={speedEstimation?.supported ? speedEstimation.status : null}
          unsupported={speedEstimation !== null && !speedEstimation.supported}
          metric={
            speedEstimation?.supported && speedEstimation.downlinkMbps !== null
              ? String(speedEstimation.downlinkMbps)
              : speedEstimation?.supported
                ? "N/A"
                : undefined
          }
          unit={
            speedEstimation?.supported && speedEstimation.downlinkMbps !== null
              ? "Mbps"
              : undefined
          }
          detail={
            speedEstimation?.supported
              ? speedDetail(speedEstimation.effectiveType, speedEstimation.downlinkMbps)
              : undefined
          }
        />

        <TestCard
          icon={Timer}
          title="Latency"
          status={latency?.status ?? null}
          metric={latency ? String(latency.avgMs) : undefined}
          unit={latency ? "ms avg" : undefined}
          detail={latency ? latencyDetail(latency.minMs, latency.maxMs) : undefined}
          secondaryMetric={
            latency
              ? {
                  label: "Jitter",
                  value: `${latency.jitterMs}ms`,
                  status: latency.jitterStatus,
                }
              : undefined
          }
        />

        <TestCard
          icon={Globe}
          title="DNS Resolution"
          status={dns?.status ?? null}
          metric={dns ? String(dns.avgMs) : undefined}
          unit={dns ? "ms avg" : undefined}
          detail={
            dns
              ? dns.samples.length > 0
                ? `Based on ${dns.samples.length} lookups`
                : "DNS timing not captured (may be cached)"
              : undefined
          }
        />

        <TestCard
          icon={Activity}
          title="Connection Stability"
          status={stability?.status ?? null}
          metric={stability ? String(stability.packetLossPercent) : undefined}
          unit={stability ? "% loss" : undefined}
          detail={
            stability
              ? `${stability.successfulPings}/${stability.totalPings} pings succeeded`
              : undefined
          }
        />
      </div>
    </div>
  );
}

function OverallBanner({ status }: { status: TestStatus }) {
  const cfg = OVERALL_CONFIG[status];
  const Icon = cfg.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl border p-5",
        cfg.bg,
        cfg.border,
      )}
    >
      <div className={cn("flex h-12 w-12 items-center justify-center rounded-full", cfg.bg)}>
        <Icon className={cn("h-6 w-6", cfg.color)} />
      </div>
      <div>
        <h2 className={cn("text-lg font-semibold", cfg.color)}>{cfg.label}</h2>
        <p className="text-sm text-muted-foreground">{cfg.description}</p>
      </div>
    </div>
  );
}
