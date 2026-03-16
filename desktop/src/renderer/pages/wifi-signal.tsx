import { useDesktopDiagnostics } from "../hooks/use-desktop-diagnostics";
import { SignalGauge } from "../components/signal-gauge";
import { StatusBadge } from "../components/status-badge";

export function WifiSignalPage() {
  const { phase, wifi, error, scanWifi } = useDesktopDiagnostics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Wi-Fi Signal</h1>
          <p className="text-sm text-muted-foreground">
            Measure signal strength and connection quality
          </p>
        </div>
        <button
          onClick={scanWifi}
          disabled={phase === "scanning"}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {phase === "scanning" ? "Scanning..." : "Scan Wi-Fi"}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {wifi ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col items-center rounded-xl border border-border bg-card p-8">
            <SignalGauge
              dbm={wifi.signalDbm}
              percent={wifi.signalPercent}
              status={wifi.status}
            />
            <StatusBadge
              status={wifi.status}
              label={
                wifi.status === "pass"
                  ? "Excellent"
                  : wifi.status === "warn"
                    ? "Fair"
                    : "Weak"
              }
            />
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 text-sm font-semibold">Connection Details</h3>
            <dl className="space-y-3">
              <Row label="SSID" value={wifi.ssid} />
              <Row label="BSSID" value={wifi.bssid} mono />
              <Row label="Channel" value={String(wifi.channel)} />
              <Row
                label="Frequency"
                value={wifi.frequency ? `${wifi.frequency} MHz` : "--"}
              />
              <Row label="Radio Type" value={wifi.radioType || "--"} />
              <Row label="Signal" value={`${wifi.signalDbm} dBm (${wifi.signalPercent}%)`} />
              {wifi.noiseDbm !== null && (
                <Row label="Noise" value={`${wifi.noiseDbm} dBm`} />
              )}
            </dl>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-muted-foreground/25 p-12 text-center">
          <p className="text-sm text-muted-foreground">
            Click "Scan Wi-Fi" to measure your signal strength
          </p>
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={mono ? "font-mono text-xs" : ""}>{value}</dd>
    </div>
  );
}
