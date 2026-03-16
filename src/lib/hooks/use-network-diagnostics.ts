"use client";

import { useCallback, useRef, useState } from "react";
import type {
  ConnectivityResult,
  SpeedEstimationResult,
  LatencyResult,
  DnsResult,
  StabilityResult,
  DiagnosticResults,
  DiagnosticPhase,
  TestStatus,
} from "@/types/diagnostics";
import { EMPTY_RESULTS } from "@/types/diagnostics";

const PING_URL = "/api/diagnostics/ping";
const LATENCY_SAMPLE_COUNT = 10;
const STABILITY_PING_COUNT = 20;
const STABILITY_INTERVAL_MS = 1000;

interface NetworkConnection {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
}

function stddev(values: number[], mean: number): number {
  if (values.length < 2) return 0;
  const sqDiffs = values.map((v) => (v - mean) ** 2);
  return Math.sqrt(sqDiffs.reduce((a, b) => a + b, 0) / values.length);
}

function worstStatus(...statuses: TestStatus[]): TestStatus {
  if (statuses.includes("fail")) return "fail";
  if (statuses.includes("warn")) return "warn";
  return "pass";
}

// --- Individual test runners ---

async function runConnectivityTest(): Promise<ConnectivityResult> {
  const online = navigator.onLine;
  if (!online) {
    return { navigatorOnline: false, apiReachable: false, apiResponseMs: null, status: "fail" };
  }

  try {
    const start = performance.now();
    const res = await fetch(`${PING_URL}?_=${Date.now()}`, { cache: "no-store" });
    const elapsed = performance.now() - start;

    if (!res.ok) {
      return { navigatorOnline: true, apiReachable: false, apiResponseMs: elapsed, status: "fail" };
    }

    const status: TestStatus = elapsed > 3000 ? "warn" : "pass";
    return { navigatorOnline: true, apiReachable: true, apiResponseMs: elapsed, status };
  } catch {
    return { navigatorOnline: true, apiReachable: false, apiResponseMs: null, status: "fail" };
  }
}

function runSpeedEstimation(): SpeedEstimationResult {
  const conn = (navigator as Navigator & { connection?: NetworkConnection }).connection;

  if (!conn) {
    return { supported: false, effectiveType: null, downlinkMbps: null, rttMs: null, status: "pass" };
  }

  const effectiveType = conn.effectiveType ?? null;
  const downlink = conn.downlink ?? null;
  const rtt = conn.rtt ?? null;

  let status: TestStatus = "pass";
  if (effectiveType) {
    if (effectiveType === "slow-2g" || effectiveType === "2g") {
      status = "fail";
    } else if (effectiveType === "3g") {
      status = "warn";
    }
  } else if (downlink !== null) {
    if (downlink < 2) {
      status = "fail";
    } else if (downlink <= 10) {
      status = "warn";
    }
  }

  return { supported: true, effectiveType, downlinkMbps: downlink, rttMs: rtt, status };
}

async function runLatencyTest(signal: AbortSignal): Promise<LatencyResult> {
  const samples: number[] = [];

  for (let i = 0; i < LATENCY_SAMPLE_COUNT; i++) {
    if (signal.aborted) break;
    try {
      const start = performance.now();
      await fetch(`${PING_URL}?seq=${i}&_=${Date.now()}`, { cache: "no-store", signal });
      samples.push(performance.now() - start);
    } catch {
      if (signal.aborted) break;
    }
  }

  if (samples.length === 0) {
    return { samples: [], minMs: 0, avgMs: 0, maxMs: 0, jitterMs: 0, status: "fail", jitterStatus: "fail" };
  }

  const min = Math.min(...samples);
  const max = Math.max(...samples);
  const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
  const jitter = stddev(samples, avg);

  let status: TestStatus = "pass";
  if (avg > 150) status = "fail";
  else if (avg > 50) status = "warn";

  let jitterStatus: TestStatus = "pass";
  if (jitter > 30) jitterStatus = "fail";
  else if (jitter > 10) jitterStatus = "warn";

  return {
    samples: samples.map((s) => Math.round(s * 100) / 100),
    minMs: Math.round(min * 100) / 100,
    avgMs: Math.round(avg * 100) / 100,
    maxMs: Math.round(max * 100) / 100,
    jitterMs: Math.round(jitter * 100) / 100,
    status,
    jitterStatus,
  };
}

function getDnsTimingFromPerformance(): number[] {
  const entries = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
  const pingEntries = entries.filter((e) => e.name.includes(PING_URL));
  return pingEntries
    .map((e) => e.domainLookupEnd - e.domainLookupStart)
    .filter((v) => v >= 0);
}

function buildDnsResult(timings: number[]): DnsResult {
  if (timings.length === 0) {
    return { avgMs: 0, samples: [], status: "pass" };
  }

  const avg = timings.reduce((a, b) => a + b, 0) / timings.length;

  let status: TestStatus = "pass";
  if (avg > 200) status = "fail";
  else if (avg > 50) status = "warn";

  return {
    avgMs: Math.round(avg * 100) / 100,
    samples: timings.map((t) => Math.round(t * 100) / 100),
    status,
  };
}

async function runStabilityTest(
  signal: AbortSignal,
  onPing: () => void,
): Promise<StabilityResult> {
  let successful = 0;
  let total = 0;

  for (let i = 0; i < STABILITY_PING_COUNT; i++) {
    if (signal.aborted) break;
    total++;
    try {
      const res = await fetch(`${PING_URL}?stab=${i}&_=${Date.now()}`, {
        cache: "no-store",
        signal,
      });
      if (res.ok) successful++;
    } catch {
      if (signal.aborted) break;
    }
    onPing();

    if (i < STABILITY_PING_COUNT - 1 && !signal.aborted) {
      await new Promise((r) => setTimeout(r, STABILITY_INTERVAL_MS));
    }
  }

  const loss = total > 0 ? ((total - successful) / total) * 100 : 100;

  let status: TestStatus = "pass";
  if (loss > 5) status = "fail";
  else if (loss > 1) status = "warn";

  return {
    totalPings: total,
    successfulPings: successful,
    packetLossPercent: Math.round(loss * 100) / 100,
    status,
  };
}

// --- Main hook ---

export function useNetworkDiagnostics() {
  const [phase, setPhase] = useState<DiagnosticPhase>("idle");
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<DiagnosticResults>(EMPTY_RESULTS);
  const abortRef = useRef<AbortController | null>(null);

  const runDiagnostics = useCallback(async () => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setPhase("running");
    setProgress(0);
    setResults(EMPTY_RESULTS);
    performance.clearResourceTimings();

    const totalWeight = 100;
    const weights = { connectivity: 5, speed: 5, latency: 25, stability: 55, dns: 5, finalize: 5 };
    let accumulated = 0;

    const advance = (weight: number) => {
      accumulated += weight;
      setProgress(Math.min(Math.round((accumulated / totalWeight) * 100), 100));
    };

    try {
      // 1. Connectivity
      const connectivity = await runConnectivityTest();
      setResults((prev) => ({ ...prev, connectivity }));
      advance(weights.connectivity);

      if (connectivity.status === "fail") {
        setResults((prev) => ({
          ...prev,
          overallStatus: "fail",
          ranAt: new Date().toISOString(),
        }));
        setProgress(100);
        setPhase("complete");
        return;
      }

      // 2. Speed estimation (synchronous)
      const speedEstimation = runSpeedEstimation();
      setResults((prev) => ({ ...prev, speedEstimation }));
      advance(weights.speed);

      if (ac.signal.aborted) return;

      // 3. Latency + jitter
      const latency = await runLatencyTest(ac.signal);
      setResults((prev) => ({ ...prev, latency }));
      advance(weights.latency);

      if (ac.signal.aborted) return;

      // 4. Stability
      let stabilityPingsCompleted = 0;
      const stability = await runStabilityTest(ac.signal, () => {
        stabilityPingsCompleted++;
        const stabilityProgress =
          weights.connectivity +
          weights.speed +
          weights.latency +
          (stabilityPingsCompleted / STABILITY_PING_COUNT) * weights.stability;
        setProgress(Math.min(Math.round((stabilityProgress / totalWeight) * 100), 100));
      });
      setResults((prev) => ({ ...prev, stability }));
      accumulated = weights.connectivity + weights.speed + weights.latency + weights.stability;

      if (ac.signal.aborted) return;

      // 5. DNS (derived from resource timing entries collected during latency + stability)
      const dnsTimings = getDnsTimingFromPerformance();
      const dns = buildDnsResult(dnsTimings);
      setResults((prev) => ({ ...prev, dns }));
      advance(weights.dns);

      // 6. Overall status
      const allStatuses: TestStatus[] = [
        connectivity.status,
        latency.status,
        latency.jitterStatus,
        dns.status,
        stability.status,
      ];
      if (speedEstimation.supported) {
        allStatuses.push(speedEstimation.status);
      }
      const overallStatus = worstStatus(...allStatuses);

      setResults((prev) => ({
        ...prev,
        overallStatus,
        ranAt: new Date().toISOString(),
      }));
      advance(weights.finalize);
      setPhase("complete");
    } catch {
      if (!ac.signal.aborted) {
        setPhase("complete");
        setResults((prev) => ({
          ...prev,
          overallStatus: "fail",
          ranAt: new Date().toISOString(),
        }));
        setProgress(100);
      }
    }
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    setPhase("idle");
    setProgress(0);
  }, []);

  return { phase, progress, results, runDiagnostics, cancel };
}
