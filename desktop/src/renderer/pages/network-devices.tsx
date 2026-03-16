import { useDesktopDiagnostics } from "../hooks/use-desktop-diagnostics";
import { DeviceTable } from "../components/device-table";
import { StatusBadge } from "../components/status-badge";

export function NetworkDevicesPage() {
  const { phase, network, error, scanNetwork } = useDesktopDiagnostics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Network Devices</h1>
          <p className="text-sm text-muted-foreground">
            Discover devices on your local network
          </p>
        </div>
        <button
          onClick={scanNetwork}
          disabled={phase === "scanning"}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {phase === "scanning" ? "Scanning..." : "Scan Network"}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {phase === "scanning" && (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Scanning local network... This may take up to 30 seconds.
          </p>
        </div>
      )}

      {network ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <StatusBadge status={network.status} />
            <span className="text-sm text-muted-foreground">
              {network.devices.length} device{network.devices.length !== 1 ? "s" : ""} found
            </span>
            {network.subnetCidr && (
              <span className="text-sm font-mono text-muted-foreground">
                {network.subnetCidr}
              </span>
            )}
          </div>
          <DeviceTable devices={network.devices} />
        </div>
      ) : phase !== "scanning" ? (
        <div className="rounded-xl border border-dashed border-muted-foreground/25 p-12 text-center">
          <p className="text-sm text-muted-foreground">
            Click "Scan Network" to discover devices on your LAN
          </p>
        </div>
      ) : null}
    </div>
  );
}
