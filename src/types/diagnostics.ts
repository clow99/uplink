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

export const EMPTY_RESULTS: DiagnosticResults = {
  connectivity: null,
  speedEstimation: null,
  latency: null,
  dns: null,
  stability: null,
  overallStatus: null,
  ranAt: null,
};
