export type TestStatus = "pass" | "warn" | "fail";

export interface WifiSignalResult {
  ssid: string;
  bssid: string;
  signalDbm: number;
  signalPercent: number;
  channel: number;
  frequency: number;
  radioType: string;
  noiseDbm: number | null;
  status: TestStatus;
}

export interface NearbyNetwork {
  ssid: string;
  bssid: string;
  signalDbm: number;
  channel: number;
  security: string;
}

export interface ChannelCongestion {
  count: number;
  avgSignal: number;
}

export interface ChannelScanResult {
  networks: NearbyNetwork[];
  channelCongestion: Record<number, ChannelCongestion>;
  recommendedChannel: number | null;
  status: TestStatus;
}

export interface NetworkDevice {
  ip: string;
  mac: string;
  hostname: string | null;
  isGateway: boolean;
}

export interface NetworkScanResult {
  devices: NetworkDevice[];
  gatewayIp: string | null;
  subnetCidr: string | null;
  status: TestStatus;
}

export interface DesktopDiagnosticReport {
  version: string;
  platform: NodeJS.Platform;
  timestamp: string;
  wifi: WifiSignalResult | null;
  channels: ChannelScanResult | null;
  network: NetworkScanResult | null;
  overallStatus: TestStatus;
}

export interface UplinkAPI {
  scanWifi(): Promise<WifiSignalResult>;
  scanChannels(): Promise<ChannelScanResult>;
  scanNetwork(): Promise<NetworkScanResult>;
  runAll(): Promise<DesktopDiagnosticReport>;
  uploadReport(
    report: DesktopDiagnosticReport,
    serverUrl: string,
  ): Promise<{ ok: boolean; id?: string }>;
  saveReport(report: DesktopDiagnosticReport): Promise<string>;
  getPlatform(): Promise<NodeJS.Platform>;
}

declare global {
  interface Window {
    uplink: UplinkAPI;
  }
}
