import { useDesktopDiagnostics } from "../hooks/use-desktop-diagnostics";
import { StatusBadge } from "../components/status-badge";
import { SignalGauge } from "../components/signal-gauge";

export function DashboardPage() {
  const { phase, wifi, channels, network, report, error, runAll } =
    useDesktopDiagnostics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Run all diagnostics at once for a complete picture
          </p>
        </div>
        <button
          onClick={runAll}
          disabled={phase === "scanning"}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {phase === "scanning" ? "Scanning..." : "Run Full Scan"}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {report && (
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Overall Status</h2>
            <StatusBadge status={report.overallStatus} />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Scanned at{" "}
            {new Date(report.timestamp).toLocaleString()}
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {/* Wi-Fi card */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 text-sm font-semibold">Wi-Fi Signal</h3>
          {wifi ? (
            <div className="flex flex-col items-center gap-2">
              <SignalGauge
                dbm={wifi.signalDbm}
                percent={wifi.signalPercent}
                status={wifi.status}
              />
              <div className="mt-2 space-y-1 text-center text-xs text-muted-foreground">
                <p className="font-medium text-foreground">{wifi.ssid}</p>
                <p>Ch {wifi.channel} / {wifi.radioType}</p>
              </div>
            </div>
          ) : (
            <p className="py-6 text-center text-xs text-muted-foreground">
              {phase === "scanning" ? "Scanning..." : "No data yet"}
            </p>
          )}
        </div>

        {/* Channel card */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 text-sm font-semibold">Channel Congestion</h3>
          {channels ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <StatusBadge status={channels.status} />
                {channels.recommendedChannel && (
                  <span className="text-xs text-muted-foreground">
                    Best: Ch {channels.recommendedChannel}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {channels.networks.length} networks found
              </p>
            </div>
          ) : (
            <p className="py-6 text-center text-xs text-muted-foreground">
              {phase === "scanning" ? "Scanning..." : "No data yet"}
            </p>
          )}
        </div>

        {/* Network card */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 text-sm font-semibold">Network Devices</h3>
          {network ? (
            <div className="space-y-2">
              <StatusBadge status={network.status} />
              <p className="text-xs text-muted-foreground">
                {network.devices.length} devices on{" "}
                {network.subnetCidr ?? "local network"}
              </p>
              {network.gatewayIp && (
                <p className="text-xs text-muted-foreground">
                  Gateway: {network.gatewayIp}
                </p>
              )}
            </div>
          ) : (
            <p className="py-6 text-center text-xs text-muted-foreground">
              {phase === "scanning" ? "Scanning..." : "No data yet"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
