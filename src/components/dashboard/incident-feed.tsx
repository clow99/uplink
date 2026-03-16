"use client";

import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Search,
  Eye,
  Calendar,
} from "lucide-react";
import type { Incident } from "@/lib/mock-data";

const STATUS_CONFIG = {
  resolved: {
    icon: CheckCircle2,
    color: "text-success",
    label: "Resolved",
  },
  investigating: {
    icon: Search,
    color: "text-warning",
    label: "Investigating",
  },
  monitoring: {
    icon: Eye,
    color: "text-primary",
    label: "Monitoring",
  },
  scheduled: {
    icon: Calendar,
    color: "text-muted-foreground",
    label: "Scheduled",
  },
} as const;

const SEVERITY_STYLES = {
  minor: "bg-muted text-muted-foreground",
  major: "bg-warning/10 text-warning",
  critical: "bg-destructive/10 text-destructive",
} as const;

function formatIncidentDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

interface IncidentFeedProps {
  incidents: Incident[];
}

export function IncidentFeed({ incidents }: IncidentFeedProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold">Recent Incidents</h3>
        <p className="text-sm text-muted-foreground">
          Latest updates and scheduled maintenance
        </p>
      </div>

      {incidents.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No recent incidents
        </p>
      ) : (
        <div className="space-y-3">
          {incidents.map((incident) => {
            const statusCfg = STATUS_CONFIG[incident.status];
            const StatusIcon = statusCfg.icon;

            return (
              <div
                key={incident.id}
                className="rounded-xl border bg-card p-4"
              >
                <div className="flex items-start gap-3">
                  <StatusIcon
                    className={cn("mt-0.5 h-4 w-4 shrink-0", statusCfg.color)}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-medium">
                        {incident.title}
                      </h4>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase",
                          SEVERITY_STYLES[incident.severity],
                        )}
                      >
                        {incident.severity}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {incident.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span>
                        {statusCfg.label} &middot;{" "}
                        {formatIncidentDate(incident.date)}
                      </span>
                      {incident.resolvedAt && (
                        <span>
                          Resolved {formatIncidentDate(incident.resolvedAt)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
