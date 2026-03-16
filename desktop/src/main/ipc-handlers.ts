import { ipcMain, dialog, app } from "electron";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { scanWifi } from "./diagnostics/wifi-scanner";
import { scanChannels } from "./diagnostics/channel-scanner";
import { scanNetwork } from "./diagnostics/network-scanner";
import type { DesktopDiagnosticReport, TestStatus } from "../shared/types";

function worstStatus(...statuses: TestStatus[]): TestStatus {
  if (statuses.includes("fail")) return "fail";
  if (statuses.includes("warn")) return "warn";
  return "pass";
}

async function buildReport(): Promise<DesktopDiagnosticReport> {
  const [wifi, channels, network] = await Promise.allSettled([
    scanWifi(),
    scanChannels(),
    scanNetwork(),
  ]);

  const wifiResult = wifi.status === "fulfilled" ? wifi.value : null;
  const channelsResult = channels.status === "fulfilled" ? channels.value : null;
  const networkResult = network.status === "fulfilled" ? network.value : null;

  const statuses: TestStatus[] = [];
  if (wifiResult) statuses.push(wifiResult.status);
  if (channelsResult) statuses.push(channelsResult.status);
  if (networkResult) statuses.push(networkResult.status);

  return {
    version: app.getVersion(),
    platform: process.platform,
    timestamp: new Date().toISOString(),
    wifi: wifiResult,
    channels: channelsResult,
    network: networkResult,
    overallStatus: statuses.length > 0 ? worstStatus(...statuses) : "fail",
  };
}

export function registerIpcHandlers() {
  ipcMain.handle("diagnostics:wifi-signal", async () => {
    return scanWifi();
  });

  ipcMain.handle("diagnostics:channel-scan", async () => {
    return scanChannels();
  });

  ipcMain.handle("diagnostics:network-scan", async () => {
    return scanNetwork();
  });

  ipcMain.handle("diagnostics:run-all", async () => {
    return buildReport();
  });

  ipcMain.handle(
    "report:upload",
    async (_event, report: DesktopDiagnosticReport, serverUrl: string) => {
      try {
        const res = await fetch(`${serverUrl}/api/diagnostics/report`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(report),
        });

        if (!res.ok) {
          return { ok: false };
        }

        const data = await res.json();
        return { ok: true, id: data.id };
      } catch {
        return { ok: false };
      }
    },
  );

  ipcMain.handle(
    "report:save",
    async (_event, report: DesktopDiagnosticReport) => {
      const { canceled, filePath } = await dialog.showSaveDialog({
        title: "Save Diagnostic Report",
        defaultPath: path.join(
          app.getPath("documents"),
          `uplink-report-${new Date().toISOString().slice(0, 10)}.json`,
        ),
        filters: [{ name: "JSON", extensions: ["json"] }],
      });

      if (canceled || !filePath) {
        return "";
      }

      await writeFile(filePath, JSON.stringify(report, null, 2), "utf-8");
      return filePath;
    },
  );

  ipcMain.handle("get-platform", () => {
    return process.platform;
  });
}
