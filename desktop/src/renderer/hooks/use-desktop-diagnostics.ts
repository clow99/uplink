import { useState, useCallback } from "react";
import type {
  WifiSignalResult,
  ChannelScanResult,
  NetworkScanResult,
  DesktopDiagnosticReport,
} from "../../shared/types";

export type ScanPhase = "idle" | "scanning" | "complete" | "error";

interface DiagnosticsState {
  phase: ScanPhase;
  wifi: WifiSignalResult | null;
  channels: ChannelScanResult | null;
  network: NetworkScanResult | null;
  report: DesktopDiagnosticReport | null;
  error: string | null;
}

const INITIAL_STATE: DiagnosticsState = {
  phase: "idle",
  wifi: null,
  channels: null,
  network: null,
  report: null,
  error: null,
};

export function useDesktopDiagnostics() {
  const [state, setState] = useState<DiagnosticsState>(INITIAL_STATE);

  const scanWifi = useCallback(async () => {
    setState((s) => ({ ...s, phase: "scanning", error: null }));
    try {
      const wifi = await window.uplink.scanWifi();
      setState((s) => ({ ...s, wifi, phase: "complete" }));
      return wifi;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Wi-Fi scan failed";
      setState((s) => ({ ...s, phase: "error", error: msg }));
      return null;
    }
  }, []);

  const scanChannels = useCallback(async () => {
    setState((s) => ({ ...s, phase: "scanning", error: null }));
    try {
      const channels = await window.uplink.scanChannels();
      setState((s) => ({ ...s, channels, phase: "complete" }));
      return channels;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Channel scan failed";
      setState((s) => ({ ...s, phase: "error", error: msg }));
      return null;
    }
  }, []);

  const scanNetwork = useCallback(async () => {
    setState((s) => ({ ...s, phase: "scanning", error: null }));
    try {
      const network = await window.uplink.scanNetwork();
      setState((s) => ({ ...s, network, phase: "complete" }));
      return network;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Network scan failed";
      setState((s) => ({ ...s, phase: "error", error: msg }));
      return null;
    }
  }, []);

  const runAll = useCallback(async () => {
    setState({ ...INITIAL_STATE, phase: "scanning" });
    try {
      const report = await window.uplink.runAll();
      setState({
        phase: "complete",
        wifi: report.wifi,
        channels: report.channels,
        network: report.network,
        report,
        error: null,
      });
      return report;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Full scan failed";
      setState((s) => ({ ...s, phase: "error", error: msg }));
      return null;
    }
  }, []);

  const uploadReport = useCallback(
    async (serverUrl: string) => {
      if (!state.report) return false;
      const result = await window.uplink.uploadReport(state.report, serverUrl);
      return result.ok;
    },
    [state.report],
  );

  const saveReport = useCallback(async () => {
    if (!state.report) return "";
    return window.uplink.saveReport(state.report);
  }, [state.report]);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    ...state,
    scanWifi,
    scanChannels,
    scanNetwork,
    runAll,
    uploadReport,
    saveReport,
    reset,
  };
}
