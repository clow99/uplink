"use client";

import { Wifi, Radio, Monitor, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type {
  StoredDiagnosticReport,
  TestStatus,
} from "@/types/diagnostics";
import { TestCard } from "./test-card";

const STATUS_LABELS: Record<TestStatus, string> = {
  pass: "Healthy",
  warn: "Warning",
  fail: "Issue Found",
};

const STATUS_COLORS: Record<TestStatus, { bg: string; text: string; dot: string }> = {
  pass: { bg: "bg-success/10", text: "text-success", dot: "bg-success" },
  warn: { bg: "bg-warning/10", text: "text-warning", dot: "bg-warning" },
  fail: { bg: "bg-destructive/10", text: "text-destructive", dot: "bg-destructive" },
};

interface DesktopReportViewProps {
  reports: StoredDiagnosticReport[];
}

export function DesktopReportView({ reports }: DesktopReportViewProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (reports.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold">Desktop Diagnostic Reports</h2>
      <div className="space-y-2">
        {reports.map((report) => {
          const isExpanded = expandedId === report.id;
          const data = report.reportJson;
          const status = report.overallStatus as TestStatus;
          const colors = STATUS_COLORS[status];

          return (
            <div
              key={report.id}
              className="rounded-xl border border-border bg-card"
            >
              <button
                onClick={() =>
                  setExpandedId(isExpanded ? null : report.id)
                }
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                      colors.bg,
                      colors.text,
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full", colors.dot)} />
                    {STATUS_LABELS[status]}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {data.platform} / v{data.version}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {new Date(report.createdAt).toLocaleString()}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-border p-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <TestCard
                      icon={Wifi}
                      title="Wi-Fi Signal"
                      status={data.wifi?.status ?? null}
                      metric={
                        data.wifi
                          ? String(data.wifi.signalDbm)
                          : undefined
                      }
                      unit={data.wifi ? "dBm" : undefined}
                      detail={
                        data.wifi
                          ? `${data.wifi.ssid} / Ch ${data.wifi.channel}`
                          : "Not scanned"
                      }
                    />
                    <TestCard
                      icon={Radio}
                      title="Channel Congestion"
                      status={data.channels?.status ?? null}
                      metric={
                        data.channels
                          ? String(data.channels.networks.length)
                          : undefined
                      }
                      unit={data.channels ? "networks" : undefined}
                      detail={
                        data.channels?.recommendedChannel
                          ? `Best channel: ${data.channels.recommendedChannel}`
                          : data.channels
                            ? "No recommendation"
                            : "Not scanned"
                      }
                    />
                    <TestCard
                      icon={Monitor}
                      title="Network Devices"
                      status={data.network?.status ?? null}
                      metric={
                        data.network
                          ? String(data.network.devices.length)
                          : undefined
                      }
                      unit={data.network ? "devices" : undefined}
                      detail={
                        data.network
                          ? `Subnet: ${data.network.subnetCidr ?? "unknown"}`
                          : "Not scanned"
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
