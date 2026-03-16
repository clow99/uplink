import { execFile } from "node:child_process";
import { promisify } from "node:util";
import dns from "node:dns";
import os from "node:os";
import type { NetworkScanResult, NetworkDevice, TestStatus } from "../../shared/types";

const execFileAsync = promisify(execFile);
const reverseLookup = promisify(dns.reverse);

function getLocalSubnet(): { ip: string; cidr: string } | null {
  const interfaces = os.networkInterfaces();

  for (const iface of Object.values(interfaces)) {
    if (!iface) continue;
    for (const info of iface) {
      if (info.family === "IPv4" && !info.internal) {
        const parts = info.address.split(".");
        return {
          ip: info.address,
          cidr: `${parts[0]}.${parts[1]}.${parts[2]}.0/24`,
        };
      }
    }
  }

  return null;
}

function getDefaultGateway(): string | null {
  const subnet = getLocalSubnet();
  if (!subnet) return null;
  const parts = subnet.ip.split(".");
  return `${parts[0]}.${parts[1]}.${parts[2]}.1`;
}

async function parseArpTable(): Promise<Map<string, string>> {
  const entries = new Map<string, string>();

  try {
    const args = process.platform === "win32" ? ["-a"] : ["-a"];
    const cmd = "arp";
    const { stdout } = await execFileAsync(cmd, args);

    const ipMacRe =
      /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+([0-9a-fA-F:-]{11,17})/g;
    let match: RegExpExecArray | null;

    while ((match = ipMacRe.exec(stdout)) !== null) {
      const ip = match[1];
      const mac = match[2].toLowerCase().replace(/-/g, ":");
      if (mac !== "ff:ff:ff:ff:ff:ff" && mac !== "00:00:00:00:00:00") {
        entries.set(ip, mac);
      }
    }
  } catch {
    // ARP not available
  }

  return entries;
}

async function pingSweep(subnetBase: string): Promise<void> {
  const promises: Promise<void>[] = [];

  for (let i = 1; i <= 254; i++) {
    const ip = `${subnetBase}.${i}`;
    const args =
      process.platform === "win32"
        ? ["-n", "1", "-w", "200", ip]
        : ["-c", "1", "-W", "1", ip];

    promises.push(
      execFileAsync("ping", args)
        .then(() => {})
        .catch(() => {}),
    );
  }

  await Promise.all(promises);
}

async function resolveHostname(ip: string): Promise<string | null> {
  try {
    const names = await reverseLookup(ip);
    return names[0] ?? null;
  } catch {
    return null;
  }
}

export async function scanNetwork(): Promise<NetworkScanResult> {
  const subnet = getLocalSubnet();
  const gatewayIp = getDefaultGateway();

  if (subnet) {
    const base = subnet.ip.split(".").slice(0, 3).join(".");
    await pingSweep(base);
  }

  const arpEntries = await parseArpTable();
  const devices: NetworkDevice[] = [];

  const hostnamePromises = Array.from(arpEntries.entries()).map(
    async ([ip, mac]) => {
      const hostname = await resolveHostname(ip);
      devices.push({
        ip,
        mac,
        hostname,
        isGateway: ip === gatewayIp,
      });
    },
  );

  await Promise.all(hostnamePromises);

  devices.sort((a, b) => {
    const aParts = a.ip.split(".").map(Number);
    const bParts = b.ip.split(".").map(Number);
    for (let i = 0; i < 4; i++) {
      if (aParts[i] !== bParts[i]) return aParts[i] - bParts[i];
    }
    return 0;
  });

  const status: TestStatus =
    devices.length === 0 ? "fail" : devices.length <= 2 ? "warn" : "pass";

  return {
    devices,
    gatewayIp,
    subnetCidr: subnet?.cidr ?? null,
    status,
  };
}
