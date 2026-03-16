import type { NetworkDevice } from "../../shared/types";

interface DeviceTableProps {
  devices: NetworkDevice[];
}

export function DeviceTable({ devices }: DeviceTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
              IP Address
            </th>
            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
              MAC Address
            </th>
            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
              Hostname
            </th>
            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {devices.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-8 text-center text-muted-foreground"
              >
                No devices found. Run a network scan to discover devices.
              </td>
            </tr>
          ) : (
            devices.map((device) => (
              <tr
                key={`${device.ip}-${device.mac}`}
                className="border-b border-border/50 last:border-0"
              >
                <td className="px-4 py-2.5 font-mono text-xs">
                  {device.ip}
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                  {device.mac}
                </td>
                <td className="px-4 py-2.5 text-xs">
                  {device.hostname ?? (
                    <span className="text-muted-foreground/50">--</span>
                  )}
                </td>
                <td className="px-4 py-2.5">
                  {device.isGateway ? (
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                      Gateway
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Device</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
