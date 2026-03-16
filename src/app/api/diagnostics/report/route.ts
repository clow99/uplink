import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const wifiSchema = z.object({
  ssid: z.string(),
  bssid: z.string(),
  signalDbm: z.number(),
  signalPercent: z.number(),
  channel: z.number(),
  frequency: z.number(),
  radioType: z.string(),
  noiseDbm: z.number().nullable(),
  status: z.enum(["pass", "warn", "fail"]),
});

const nearbyNetworkSchema = z.object({
  ssid: z.string(),
  bssid: z.string(),
  signalDbm: z.number(),
  channel: z.number(),
  security: z.string(),
});

const channelCongestionSchema = z.record(
  z.string(),
  z.object({ count: z.number(), avgSignal: z.number() }),
);

const channelScanSchema = z.object({
  networks: z.array(nearbyNetworkSchema),
  channelCongestion: channelCongestionSchema,
  recommendedChannel: z.number().nullable(),
  status: z.enum(["pass", "warn", "fail"]),
});

const networkDeviceSchema = z.object({
  ip: z.string(),
  mac: z.string(),
  hostname: z.string().nullable(),
  isGateway: z.boolean(),
});

const networkScanSchema = z.object({
  devices: z.array(networkDeviceSchema),
  gatewayIp: z.string().nullable(),
  subnetCidr: z.string().nullable(),
  status: z.enum(["pass", "warn", "fail"]),
});

const reportSchema = z.object({
  version: z.string(),
  platform: z.string(),
  timestamp: z.string(),
  wifi: wifiSchema.nullable(),
  channels: channelScanSchema.nullable(),
  network: networkScanSchema.nullable(),
  overallStatus: z.enum(["pass", "warn", "fail"]),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = reportSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid report data", details: parsed.error.issues },
      { status: 400 },
    );
  }

  const report = await prisma.diagnosticReport.create({
    data: {
      userId: session.user.id,
      platform: parsed.data.platform,
      reportJson: parsed.data as unknown as Record<string, unknown>,
      overallStatus: parsed.data.overallStatus,
    },
  });

  return NextResponse.json({ id: report.id }, { status: 201 });
}

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reports = await prisma.diagnosticReport.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return NextResponse.json(reports);
}
