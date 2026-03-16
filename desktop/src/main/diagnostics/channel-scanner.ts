import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type {
  ChannelScanResult,
  NearbyNetwork,
  ChannelCongestion,
  TestStatus,
} from "../../shared/types";

const execFileAsync = promisify(execFile);

function buildCongestionMap(
  networks: NearbyNetwork[],
): Record<number, ChannelCongestion> {
  const map: Record<number, ChannelCongestion> = {};

  for (const net of networks) {
    if (!map[net.channel]) {
      map[net.channel] = { count: 0, avgSignal: 0 };
    }
    map[net.channel].count += 1;
    map[net.channel].avgSignal += net.signalDbm;
  }

  for (const ch of Object.keys(map)) {
    const entry = map[Number(ch)];
    entry.avgSignal = Math.round(entry.avgSignal / entry.count);
  }

  return map;
}

function recommendChannel(
  congestion: Record<number, ChannelCongestion>,
): number | null {
  const preferred = [1, 6, 11];
  let best: number | null = null;
  let lowestCount = Infinity;

  for (const ch of preferred) {
    const count = congestion[ch]?.count ?? 0;
    if (count < lowestCount) {
      lowestCount = count;
      best = ch;
    }
  }

  return best;
}

function congestionStatus(
  congestion: Record<number, ChannelCongestion>,
): TestStatus {
  const maxCount = Math.max(
    0,
    ...Object.values(congestion).map((c) => c.count),
  );
  if (maxCount >= 8) return "fail";
  if (maxCount >= 4) return "warn";
  return "pass";
}

async function scanWindows(): Promise<NearbyNetwork[]> {
  const { stdout } = await execFileAsync("netsh", [
    "wlan", "show", "networks", "mode=bssid",
  ]);

  const networks: NearbyNetwork[] = [];
  const blocks = stdout.split(/\nSSID \d+ :/i);

  for (const block of blocks) {
    const get = (key: string): string => {
      const re = new RegExp(`^\\s*${key}\\s*:\\s*(.+)$`, "mi");
      return re.exec(block)?.[1]?.trim() ?? "";
    };

    const ssid = get("SSID")?.replace(/^\d+\s*:\s*/, "") || get("^SSID");
    const bssidMatches = block.match(/BSSID \d+\s*:\s*(.+)/gi) || [];

    for (const bssidLine of bssidMatches) {
      const bssid = bssidLine.replace(/BSSID \d+\s*:\s*/i, "").trim();
      const signalMatch = block.match(/Signal\s*:\s*(\d+)%/i);
      const channelMatch = block.match(/Channel\s*:\s*(\d+)/i);
      const authMatch = block.match(/Authentication\s*:\s*(.+)/im);

      const signalPercent = parseInt(signalMatch?.[1] ?? "0", 10);

      networks.push({
        ssid: ssid || "(hidden)",
        bssid,
        signalDbm: Math.round((signalPercent / 2) - 100),
        channel: parseInt(channelMatch?.[1] ?? "0", 10),
        security: authMatch?.[1]?.trim() ?? "unknown",
      });
    }
  }

  return networks;
}

async function scanMac(): Promise<NearbyNetwork[]> {
  const airportPath =
    "/System/Library/PrivateFrameworks/Apple80211.framework/Resources/airport";

  const { stdout } = await execFileAsync(airportPath, ["-s"]);

  const lines = stdout.split("\n").slice(1);
  const networks: NearbyNetwork[] = [];

  for (const line of lines) {
    if (!line.trim()) continue;
    const match = line.match(
      /^\s*(.+?)\s+([\da-f:]{17})\s+(-?\d+)\s+[\d,+-]+\s+\w+\s+(\d+)\s+(.*)$/i,
    );
    if (!match) continue;

    networks.push({
      ssid: match[1].trim() || "(hidden)",
      bssid: match[2],
      signalDbm: parseInt(match[3], 10),
      channel: parseInt(match[4], 10),
      security: match[5]?.trim() || "none",
    });
  }

  return networks;
}

async function scanLinux(): Promise<NearbyNetwork[]> {
  const { stdout } = await execFileAsync("nmcli", [
    "-t", "-f", "ssid,bssid,signal,chan,security", "dev", "wifi", "list",
  ]);

  const networks: NearbyNetwork[] = [];

  for (const line of stdout.split("\n")) {
    if (!line.trim()) continue;
    const parts = line.split(":");
    if (parts.length < 5) continue;

    const signalPercent = parseInt(parts[2], 10) || 0;

    networks.push({
      ssid: parts[0] || "(hidden)",
      bssid: parts[1],
      signalDbm: Math.round((signalPercent / 2) - 100),
      channel: parseInt(parts[3], 10) || 0,
      security: parts[4] || "none",
    });
  }

  return networks;
}

export async function scanChannels(): Promise<ChannelScanResult> {
  let networks: NearbyNetwork[];

  switch (process.platform) {
    case "win32":
      networks = await scanWindows();
      break;
    case "darwin":
      networks = await scanMac();
      break;
    case "linux":
      networks = await scanLinux();
      break;
    default:
      throw new Error(`Unsupported platform: ${process.platform}`);
  }

  const channelCongestion = buildCongestionMap(networks);
  const recommendedChannel = recommendChannel(channelCongestion);
  const status = congestionStatus(channelCongestion);

  return { networks, channelCongestion, recommendedChannel, status };
}
