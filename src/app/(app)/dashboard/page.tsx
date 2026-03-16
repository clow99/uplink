"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusOverview } from "@/components/dashboard/status-overview";
import { UptimeChart } from "@/components/dashboard/uptime-chart";
import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { IncidentFeed } from "@/components/dashboard/incident-feed";
import {
  getServiceHealth,
  getSpeedMetrics,
  getIncidents,
} from "@/lib/mock-data";

export default function DashboardPage() {
  const services = getServiceHealth();
  const metrics = getSpeedMetrics();
  const incidents = getIncidents();

  return (
    <ScrollArea className="h-full">
      <div className="mx-auto max-w-5xl space-y-8 px-6 py-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Service status, uptime, and connection metrics
          </p>
        </div>

        <StatusOverview services={services} />
        <MetricsCards metrics={metrics} />
        <UptimeChart services={services} />
        <IncidentFeed incidents={incidents} />
      </div>
    </ScrollArea>
  );
}
