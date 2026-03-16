"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, XCircle, Wrench } from "lucide-react";
import type { ServiceHealth } from "@/lib/mock-data";
import { getOverallStatus } from "@/lib/mock-data";

const STATUS_CONFIG = {
  operational: {
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
    dot: "bg-success",
  },
  degraded: {
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
    dot: "bg-warning",
  },
  outage: {
    icon: XCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    dot: "bg-destructive",
  },
  maintenance: {
    icon: Wrench,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    dot: "bg-primary",
  },
} as const;

interface StatusOverviewProps {
  services: ServiceHealth[];
}

export function StatusOverview({ services }: StatusOverviewProps) {
  const overall = getOverallStatus(services);
  const config = STATUS_CONFIG[overall.level];
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      <div
        className={cn(
          "flex items-center gap-4 rounded-xl border p-5",
          config.bg,
          config.border,
        )}
      >
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            config.bg,
          )}
        >
          <Icon className={cn("h-6 w-6", config.color)} />
        </div>
        <div>
          <h2 className={cn("text-lg font-semibold", config.color)}>
            {overall.label}
          </h2>
          <p className="text-sm text-muted-foreground">
            {overall.description}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {services.map((service) => {
          const sConfig = STATUS_CONFIG[service.status];
          return (
            <div
              key={service.name}
              className="flex items-center gap-3 rounded-lg border bg-card p-4"
            >
              <span
                className={cn(
                  "h-2.5 w-2.5 shrink-0 rounded-full",
                  sConfig.dot,
                )}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{service.name}</p>
                <p className="text-xs capitalize text-muted-foreground">
                  {service.status}
                </p>
              </div>
              <span className="text-xs font-medium tabular-nums text-muted-foreground">
                {service.uptime30d}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
