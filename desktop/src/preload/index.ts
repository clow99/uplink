import { contextBridge, ipcRenderer } from "electron";
import type { UplinkAPI } from "../shared/types";

const api: UplinkAPI = {
  scanWifi: () => ipcRenderer.invoke("diagnostics:wifi-signal"),
  scanChannels: () => ipcRenderer.invoke("diagnostics:channel-scan"),
  scanNetwork: () => ipcRenderer.invoke("diagnostics:network-scan"),
  runAll: () => ipcRenderer.invoke("diagnostics:run-all"),
  uploadReport: (report, serverUrl) =>
    ipcRenderer.invoke("report:upload", report, serverUrl),
  saveReport: (report) => ipcRenderer.invoke("report:save", report),
  getPlatform: () => ipcRenderer.invoke("get-platform"),
};

contextBridge.exposeInMainWorld("uplink", api);
