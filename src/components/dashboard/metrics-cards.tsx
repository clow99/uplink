"use client";

import { ArrowDown, ArrowUp, Timer } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { SpeedMetrics } from "@/lib/mock-data";

interface MetricsCardsProps {
  metrics: SpeedMetrics;
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const downloadPct = Math.min(
    (metrics.download / metrics.planDownload) * 100,
    100,
  );
  const uploadPct = Math.min(
    (metrics.upload / metrics.planUpload) * 100,
    100,
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold">Your Connection</h3>
        <p className="text-sm text-muted-foreground">
          Current speed metrics for your plan
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ArrowDown className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wide">
              Download
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold tabular-nums">
            {metrics.download}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              Mbps
            </span>
          </p>
          <div className="mt-3 space-y-1">
            <Progress value={downloadPct} className="h-1.5" />
            <p className="text-[11px] text-muted-foreground">
              {Math.round(downloadPct)}% of {metrics.planDownload} Mbps plan
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ArrowUp className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wide">
              Upload
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold tabular-nums">
            {metrics.upload}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              Mbps
            </span>
          </p>
          <div className="mt-3 space-y-1">
            <Progress value={uploadPct} className="h-1.5" />
            <p className="text-[11px] text-muted-foreground">
              {Math.round(uploadPct)}% of {metrics.planUpload} Mbps plan
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Timer className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wide">
              Latency
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold tabular-nums">
            {metrics.latency}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              ms
            </span>
          </p>
          <div className="mt-3">
            <p className="text-[11px] text-muted-foreground">
              {metrics.latency < 20
                ? "Excellent - great for gaming and video calls"
                : metrics.latency < 50
                  ? "Good - suitable for most activities"
                  : "Elevated - may affect real-time applications"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
