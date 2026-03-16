import { useState } from "react";
import { useDesktopDiagnostics } from "../hooks/use-desktop-diagnostics";
import { StatusBadge } from "../components/status-badge";

export function ReportPage() {
  const { phase, report, runAll, saveReport, uploadReport } =
    useDesktopDiagnostics();
  const [serverUrl, setServerUrl] = useState("http://localhost:3000");
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [savedPath, setSavedPath] = useState("");

  const handleSave = async () => {
    const path = await saveReport();
    if (path) setSavedPath(path);
  };

  const handleUpload = async () => {
    setUploadStatus("uploading");
    const ok = await uploadReport(serverUrl);
    setUploadStatus(ok ? "success" : "error");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Report</h1>
          <p className="text-sm text-muted-foreground">
            Generate, save, or upload a full diagnostic report
          </p>
        </div>
        <button
          onClick={runAll}
          disabled={phase === "scanning"}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {phase === "scanning" ? "Generating..." : "Generate Report"}
        </button>
      </div>

      {report ? (
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">Report Summary</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(report.timestamp).toLocaleString()} / {report.platform} / v{report.version}
                </p>
              </div>
              <StatusBadge status={report.overallStatus} />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <SummaryCard
                title="Wi-Fi"
                status={report.wifi?.status ?? null}
                detail={report.wifi ? `${report.wifi.signalDbm} dBm / ${report.wifi.ssid}` : "Not scanned"}
              />
              <SummaryCard
                title="Channels"
                status={report.channels?.status ?? null}
                detail={
                  report.channels
                    ? `${report.channels.networks.length} networks`
                    : "Not scanned"
                }
              />
              <SummaryCard
                title="Network"
                status={report.network?.status ?? null}
                detail={
                  report.network
                    ? `${report.network.devices.length} devices`
                    : "Not scanned"
                }
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Save locally */}
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <h3 className="text-sm font-semibold">Save Locally</h3>
              <p className="text-xs text-muted-foreground">
                Export the report as a JSON file to your computer
              </p>
              <button
                onClick={handleSave}
                className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/80"
              >
                Save as JSON
              </button>
              {savedPath && (
                <p className="text-xs text-success">Saved to: {savedPath}</p>
              )}
            </div>

            {/* Upload to Uplink */}
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <h3 className="text-sm font-semibold">Upload to Uplink</h3>
              <p className="text-xs text-muted-foreground">
                Share the report with your Uplink web dashboard
              </p>
              <input
                type="text"
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
                placeholder="https://your-uplink-server.com"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={handleUpload}
                disabled={uploadStatus === "uploading"}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {uploadStatus === "uploading" ? "Uploading..." : "Upload Report"}
              </button>
              {uploadStatus === "success" && (
                <p className="text-xs text-success">
                  Report uploaded successfully
                </p>
              )}
              {uploadStatus === "error" && (
                <p className="text-xs text-destructive">
                  Upload failed. Check the server URL and try again.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-muted-foreground/25 p-12 text-center">
          <p className="text-sm text-muted-foreground">
            Click "Generate Report" to run all diagnostics and create a shareable report
          </p>
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  title,
  status,
  detail,
}: {
  title: string;
  status: "pass" | "warn" | "fail" | null;
  detail: string;
}) {
  return (
    <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium">{title}</span>
        {status && <StatusBadge status={status} />}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}
