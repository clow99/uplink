"use client";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import type { ServiceHealth } from "@/lib/mock-data";

function uptimeColor(uptime: number): string {
  if (uptime >= 99.9) return "bg-success";
  if (uptime >= 99) return "bg-warning";
  return "bg-destructive";
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface UptimeChartProps {
  services: ServiceHealth[];
}

export function UptimeChart({ services }: UptimeChartProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold">90-Day Uptime</h3>
        <p className="text-sm text-muted-foreground">
          Service availability over the last 90 days
        </p>
      </div>

      <div className="space-y-5">
        {services.map((service) => (
          <div key={service.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{service.name}</p>
              <span className="text-xs font-medium tabular-nums text-muted-foreground">
                {service.uptime30d}% (30d)
              </span>
            </div>
            <div className="flex gap-px">
              {service.uptimeHistory.map((day) => (
                <Tooltip key={day.date}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "h-8 flex-1 rounded-[2px] transition-opacity hover:opacity-80",
                        uptimeColor(day.uptime),
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    <span className="font-medium">{formatDate(day.date)}</span>
                    <span className="ml-2 tabular-nums">{day.uptime}%</span>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>90 days ago</span>
              <span>Today</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-success" />
          <span>100% - 99.9%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-warning" />
          <span>99% - 99.9%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-destructive" />
          <span>Below 99%</span>
        </div>
      </div>
    </div>
  );
}
