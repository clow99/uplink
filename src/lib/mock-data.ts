type ServiceStatusLevel = "operational" | "degraded" | "outage" | "maintenance";

export interface DayUptime {
  date: string;
  uptime: number;
}

export interface ServiceHealth {
  name: string;
  status: ServiceStatusLevel;
  uptime30d: number;
  uptimeHistory: DayUptime[];
}

export interface SpeedMetrics {
  download: number;
  upload: number;
  latency: number;
  planDownload: number;
  planUpload: number;
}

export interface Incident {
  id: string;
  title: string;
  status: "resolved" | "investigating" | "monitoring" | "scheduled";
  severity: "minor" | "major" | "critical";
  date: string;
  description: string;
  resolvedAt?: string;
}

function seededValue(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function generateUptimeHistory(serviceSeed: number, days: number): DayUptime[] {
  const history: DayUptime[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    const dayVal = seededValue(serviceSeed + i * 7 + d.getMonth());

    let uptime: number;
    if (dayVal > 0.95) {
      uptime = 95 + seededValue(serviceSeed + i * 13) * 4.5;
    } else if (dayVal > 0.88) {
      uptime = 99 + seededValue(serviceSeed + i * 17) * 0.9;
    } else {
      uptime = 100;
    }

    history.push({ date: dateStr, uptime: Math.round(uptime * 100) / 100 });
  }

  return history;
}

export function getServiceHealth(): ServiceHealth[] {
  const services = [
    { name: "Internet", seed: 1 },
    { name: "DNS", seed: 2 },
    { name: "Email", seed: 3 },
    { name: "Streaming / IPTV", seed: 4 },
    { name: "VoIP / Phone", seed: 5 },
  ];

  return services.map(({ name, seed }) => {
    const history = generateUptimeHistory(seed, 90);
    const last30 = history.slice(-30);
    const avg30 =
      last30.reduce((sum, d) => sum + d.uptime, 0) / last30.length;

    const today = history[history.length - 1];
    let status: ServiceStatusLevel = "operational";
    if (today.uptime < 99) status = "outage";
    else if (today.uptime < 99.9) status = "degraded";

    return {
      name,
      status,
      uptime30d: Math.round(avg30 * 100) / 100,
      uptimeHistory: history,
    };
  });
}

export function getSpeedMetrics(): SpeedMetrics {
  return {
    download: 487,
    upload: 23,
    latency: 12,
    planDownload: 500,
    planUpload: 25,
  };
}

export function getIncidents(): Incident[] {
  return [
    {
      id: "inc-001",
      title: "Scheduled Maintenance: Network Core Upgrade",
      status: "scheduled",
      severity: "minor",
      date: "2026-03-20T02:00:00Z",
      description:
        "Planned maintenance window for core network equipment. Brief interruptions possible between 2:00 AM - 4:00 AM ET.",
    },
    {
      id: "inc-002",
      title: "Intermittent Connectivity Issues - Northeast Region",
      status: "resolved",
      severity: "major",
      date: "2026-03-12T14:30:00Z",
      description:
        "Some customers in the Northeast experienced intermittent connection drops due to a fiber cut on a major trunk line.",
      resolvedAt: "2026-03-12T18:45:00Z",
    },
    {
      id: "inc-003",
      title: "DNS Resolution Delays",
      status: "resolved",
      severity: "minor",
      date: "2026-03-08T09:15:00Z",
      description:
        "DNS queries experienced elevated response times. Root cause identified as cache invalidation storm after config update.",
      resolvedAt: "2026-03-08T10:30:00Z",
    },
    {
      id: "inc-004",
      title: "Email Service Degradation",
      status: "resolved",
      severity: "minor",
      date: "2026-02-28T16:00:00Z",
      description:
        "Email delivery delays of up to 15 minutes due to elevated queue depth on outbound mail servers.",
      resolvedAt: "2026-02-28T17:20:00Z",
    },
  ];
}

export function getOverallStatus(
  services: ServiceHealth[],
): { level: ServiceStatusLevel; label: string; description: string } {
  const hasOutage = services.some((s) => s.status === "outage");
  const hasDegraded = services.some((s) => s.status === "degraded");
  const hasMaintenance = services.some((s) => s.status === "maintenance");

  if (hasOutage) {
    return {
      level: "outage",
      label: "Service Outage",
      description: "One or more services are currently experiencing an outage.",
    };
  }
  if (hasDegraded) {
    return {
      level: "degraded",
      label: "Partial Degradation",
      description: "Some services are experiencing reduced performance.",
    };
  }
  if (hasMaintenance) {
    return {
      level: "maintenance",
      label: "Scheduled Maintenance",
      description: "Maintenance is in progress on one or more services.",
    };
  }
  return {
    level: "operational",
    label: "All Systems Operational",
    description: "All services are running normally.",
  };
}
