import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { WifiSignalResult, TestStatus } from "../../shared/types";

const execFileAsync = promisify(execFile);

function signalStatus(dbm: number): TestStatus {
  if (dbm >= -50) return "pass";
  if (dbm >= -70) return "warn";
  return "fail";
}

function percentToDbm(percent: number): number {
  return Math.round((percent / 2) - 100);
}

async function scanWindows(): Promise<WifiSignalResult> {
  const { stdout } = await execFileAsync("netsh", [
    "wlan", "show", "interfaces",
  ]);

  const get = (key: string): string => {
    const re = new RegExp(`^\\s*${key}\\s*:\\s*(.+)$`, "mi");
    return re.exec(stdout)?.[1]?.trim() ?? "";
  };

  const signalStr = get("Signal").replace("%", "");
  const signalPercent = parseInt(signalStr, 10) || 0;
  const signalDbm = percentToDbm(signalPercent);
  const channel = parseInt(get("Channel"), 10) || 0;
  const freq = parseInt(get("Band")?.replace(/[^0-9.]/g, ""), 10) || 0;

  return {
    ssid: get("SSID"),
    bssid: get("BSSID"),
    signalDbm,
    signalPercent,
    channel,
    frequency: freq,
    radioType: get("Radio type"),
    noiseDbm: null,
    status: signalStatus(signalDbm),
  };
}

async function scanMac(): Promise<WifiSignalResult> {
  const airportPath =
    "/System/Library/PrivateFrameworks/Apple80211.framework/Resources/airport";

  const { stdout } = await execFileAsync(airportPath, ["-I"]);

  const get = (key: string): string => {
    const re = new RegExp(`^\\s*${key}:\\s*(.+)$`, "mi");
    return re.exec(stdout)?.[1]?.trim() ?? "";
  };

  const signalDbm = parseInt(get("agrCtlRSSI"), 10) || -100;
  const noiseDbm = parseInt(get("agrCtlNoise"), 10) || null;
  const channel = parseInt(get("channel")?.split(",")[0], 10) || 0;

  const signalPercent = Math.max(0, Math.min(100, (signalDbm + 100) * 2));

  return {
    ssid: get("SSID"),
    bssid: get("BSSID"),
    signalDbm,
    signalPercent,
    channel,
    frequency: channel <= 14 ? 2400 : 5000,
    radioType: get("lastTxRate") ? `${get("lastTxRate")} Mbps` : "unknown",
    noiseDbm,
    status: signalStatus(signalDbm),
  };
}

async function scanLinux(): Promise<WifiSignalResult> {
  const { stdout } = await execFileAsync("nmcli", [
    "-t", "-f", "active,ssid,bssid,signal,chan,freq", "dev", "wifi",
  ]);

  const activeLine = stdout
    .split("\n")
    .find((l) => l.startsWith("yes:"));

  if (!activeLine) {
    throw new Error("No active Wi-Fi connection found");
  }

  const parts = activeLine.split(":");
  const signalPercent = parseInt(parts[3], 10) || 0;
  const signalDbm = percentToDbm(signalPercent);
  const channel = parseInt(parts[4], 10) || 0;
  const freq = parseInt(parts[5], 10) || 0;

  return {
    ssid: parts[1] || "",
    bssid: parts[2] || "",
    signalDbm,
    signalPercent,
    channel,
    frequency: freq,
    radioType: freq >= 5000 ? "802.11ac" : "802.11n",
    noiseDbm: null,
    status: signalStatus(signalDbm),
  };
}

export async function scanWifi(): Promise<WifiSignalResult> {
  switch (process.platform) {
    case "win32":
      return scanWindows();
    case "darwin":
      return scanMac();
    case "linux":
      return scanLinux();
    default:
      throw new Error(`Unsupported platform: ${process.platform}`);
  }
}
