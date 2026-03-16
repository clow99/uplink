import { useDesktopDiagnostics } from "../hooks/use-desktop-diagnostics";
import { ChannelChart } from "../components/channel-chart";
import { StatusBadge } from "../components/status-badge";

export function ChannelMapPage() {
  const { phase, channels, error, scanChannels } = useDesktopDiagnostics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Channel Map</h1>
          <p className="text-sm text-muted-foreground">
            Scan nearby networks and find the least congested channel
          </p>
        </div>
        <button
          onClick={scanChannels}
          disabled={phase === "scanning"}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {phase === "scanning" ? "Scanning..." : "Scan Channels"}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {channels ? (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <StatusBadge status={channels.status} />
            <span className="text-sm text-muted-foreground">
              {channels.networks.length} networks detected
            </span>
            {channels.recommendedChannel && (
              <span className="text-sm font-medium text-primary">
                Recommended: Channel {channels.recommendedChannel}
              </span>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <ChannelChart
              congestion={channels.channelCongestion}
              recommendedChannel={channels.recommendedChannel}
            />
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-3 text-sm font-semibold">Nearby Networks</h3>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">SSID</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Channel</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Signal</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Security</th>
                  </tr>
                </thead>
                <tbody>
                  {channels.networks.map((net, i) => (
                    <tr key={`${net.bssid}-${i}`} className="border-b border-border/50 last:border-0">
                      <td className="px-3 py-2 text-xs">{net.ssid}</td>
                      <td className="px-3 py-2 text-xs">{net.channel}</td>
                      <td className="px-3 py-2 text-xs font-mono">{net.signalDbm} dBm</td>
                      <td className="px-3 py-2 text-xs text-muted-foreground">{net.security}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-muted-foreground/25 p-12 text-center">
          <p className="text-sm text-muted-foreground">
            Click "Scan Channels" to detect nearby networks
          </p>
        </div>
      )}
    </div>
  );
}
