"use client";

import type { LucideIcon } from "lucide-react";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TestStatus } from "@/types/diagnostics";

const STATUS_CONFIG: Record<
  TestStatus,
  { icon: LucideIcon; color: string; bg: string; border: string; label: string }
> = {
  pass: {
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
    label: "Pass",
  },
  warn: {
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
    label: "Warning",
  },
  fail: {
    icon: XCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    label: "Fail",
  },
};

interface TestCardProps {
  icon: LucideIcon;
  title: string;
  status: TestStatus | null;
  metric?: string;
  unit?: string;
  detail?: string;
  secondaryMetric?: { label: string; value: string; status?: TestStatus };
  unsupported?: boolean;
}

export function TestCard({
  icon: Icon,
  title,
  status,
  metric,
  unit,
  detail,
  secondaryMetric,
  unsupported,
}: TestCardProps) {
  if (unsupported) {
    return (
      <div className="rounded-xl border bg-card p-5">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon className="h-4 w-4" />
          <span className="text-xs font-medium uppercase tracking-wide">{title}</span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Not available in this browser
        </p>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="rounded-xl border bg-card p-5">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon className="h-4 w-4" />
          <span className="text-xs font-medium uppercase tracking-wide">{title}</span>
        </div>
        <p className="mt-3 text-2xl font-bold tabular-nums text-muted-foreground/40">--</p>
        <p className="mt-1 text-[11px] text-muted-foreground">Waiting to run</p>
      </div>
    );
  }

  const cfg = STATUS_CONFIG[status];
  const StatusIcon = cfg.icon;

  return (
    <div className={cn("rounded-xl border p-5", cfg.border, "bg-card")}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon className="h-4 w-4" />
          <span className="text-xs font-medium uppercase tracking-wide">{title}</span>
        </div>
        <div className={cn("flex items-center gap-1", cfg.color)}>
          <StatusIcon className="h-3.5 w-3.5" />
          <span className="text-[11px] font-medium">{cfg.label}</span>
        </div>
      </div>

      {metric && (
        <p className="mt-3 text-2xl font-bold tabular-nums">
          {metric}
          {unit && (
            <span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span>
          )}
        </p>
      )}

      {secondaryMetric && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{secondaryMetric.label}:</span>
          <span
            className={cn(
              "text-xs font-medium tabular-nums",
              secondaryMetric.status
                ? STATUS_CONFIG[secondaryMetric.status].color
                : "text-foreground",
            )}
          >
            {secondaryMetric.value}
          </span>
        </div>
      )}

      {detail && <p className="mt-2 text-[11px] text-muted-foreground">{detail}</p>}
    </div>
  );
}
