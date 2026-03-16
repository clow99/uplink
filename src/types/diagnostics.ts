export type TestStatus = "pass" | "warn" | "fail";

export type DiagnosticPhase =
  | "idle"
  | "running"
  | "complete";

export interface ConnectivityResult {
  navigatorOnline: boolean;
  apiReachable: boolean;
  apiResponseMs: number | null;
  status: TestStatus;
}

export interface SpeedEstimationResult {
  supported: boolean;
  effectiveType: string | null;
  downlinkMbps: number | null;
  rttMs: number | null;
  status: TestStatus;
}

export interface LatencyResult {
  samples: number[];
  minMs: number;
  avgMs: number;
  maxMs: number;
  jitterMs: number;
  status: TestStatus;
  jitterStatus: TestStatus;
}

export interface DnsResult {
  avgMs: number;
  samples: number[];
  status: TestStatus;
}

export interface StabilityResult {
  totalPings: number;
  successfulPings: number;
  packetLossPercent: number;
  status: TestStatus;
}

export interface DiagnosticResults {
  connectivity: ConnectivityResult | null;
  speedEstimation: SpeedEstimationResult | null;
  latency: LatencyResult | null;
  dns: DnsResult | null;
  stability: StabilityResult | null;
  overallStatus: TestStatus | null;
  ranAt: string | null;
}

// Desktop diagnostic types (from Electron app uploads)

export interface DesktopWifiResult {
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

export interface DesktopNearbyNetwork {
  ssid: string;
  bssid: string;
  signalDbm: number;
  channel: number;
  security: string;
}

export interface DesktopChannelScanResult {
  networks: DesktopNearbyNetwork[];
  channelCongestion: Record<string, { count: number; avgSignal: number }>;
  recommendedChannel: number | null;
  status: TestStatus;
}

export interface DesktopNetworkDevice {
  ip: string;
  mac: string;
  hostname: string | null;
  isGateway: boolean;
}

export interface DesktopNetworkScanResult {
  devices: DesktopNetworkDevice[];
  gatewayIp: string | null;
  subnetCidr: string | null;
  status: TestStatus;
}

export interface DesktopDiagnosticReport {
  version: string;
  platform: string;
  timestamp: string;
  wifi: DesktopWifiResult | null;
  channels: DesktopChannelScanResult | null;
  network: DesktopNetworkScanResult | null;
  overallStatus: TestStatus;
}

export interface StoredDiagnosticReport {
  id: string;
  userId: string;
  platform: string;
  reportJson: DesktopDiagnosticReport;
  overallStatus: string;
  createdAt: string;
}

export const EMPTY_RESULTS: DiagnosticResults = {
  connectivity: null,
  speedEstimation: null,
  latency: null,
  dns: null,
  stability: null,
  overallStatus: null,
  ranAt: null,
};
