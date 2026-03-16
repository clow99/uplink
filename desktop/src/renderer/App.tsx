import { useState } from "react";
import { DashboardPage } from "./pages/dashboard";
import { WifiSignalPage } from "./pages/wifi-signal";
import { ChannelMapPage } from "./pages/channel-map";
import { NetworkDevicesPage } from "./pages/network-devices";
import { ReportPage } from "./pages/report";

type Page = "dashboard" | "wifi" | "channels" | "network" | "report";

const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "grid" },
  { id: "wifi", label: "Wi-Fi Signal", icon: "wifi" },
  { id: "channels", label: "Channel Map", icon: "radio" },
  { id: "network", label: "Devices", icon: "network" },
  { id: "report", label: "Report", icon: "file" },
];

function NavIcon({ icon, className }: { icon: string; className?: string }) {
  const cn = className ?? "h-4 w-4";

  switch (icon) {
    case "grid":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
        </svg>
      );
    case "wifi":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>
      );
    case "radio":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="2" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
        </svg>
      );
    case "network":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="2" width="6" height="6" rx="1" /><rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><line x1="12" y1="12" x2="12" y2="8" />
        </svg>
      );
    case "file":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    default:
      return null;
  }
}

function PageContent({ page }: { page: Page }) {
  switch (page) {
    case "dashboard":
      return <DashboardPage />;
    case "wifi":
      return <WifiSignalPage />;
    case "channels":
      return <ChannelMapPage />;
    case "network":
      return <NetworkDevicesPage />;
    case "report":
      return <ReportPage />;
  }
}

export function App() {
  const [page, setPage] = useState<Page>("dashboard");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="flex w-52 shrink-0 flex-col border-r border-border bg-sidebar">
        {/* Drag region for macOS titlebar */}
        <div className="h-8 shrink-0" style={{ WebkitAppRegion: "drag" } as React.CSSProperties} />

        <div className="px-4 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <NavIcon icon="wifi" className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm font-bold tracking-tight">
              Uplink Desktop
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 px-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                page === item.id
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
              }`}
            >
              <NavIcon icon={item.icon} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <p className="text-[10px] text-muted-foreground/60">
            Uplink Desktop v0.1.0
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        <PageContent page={page} />
      </main>
    </div>
  );
}
