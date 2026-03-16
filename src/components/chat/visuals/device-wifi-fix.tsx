"use client";

const STEPS = [
  {
    step: 1,
    title: "Restart your device",
    description: "Turn Wi-Fi off, wait 10 seconds, turn it back on — or fully restart the device",
    icon: "restart",
    color: "#ef4444",
  },
  {
    step: 2,
    title: "Forget the network",
    description: "Go to Wi-Fi settings, tap your network, and select \"Forget\" or \"Remove\"",
    icon: "forget",
    color: "#f59e0b",
  },
  {
    step: 3,
    title: "Reconnect with password",
    description: "Find your network in the list and enter the Wi-Fi password again",
    icon: "reconnect",
    color: "#22c55e",
  },
  {
    step: 4,
    title: "Try the other band",
    description: "If you see both 2.4 GHz and 5 GHz networks, try connecting to the other one",
    icon: "band",
    color: "#3b82f6",
  },
  {
    step: 5,
    title: "Check for updates",
    description: "Install any pending OS or driver updates on your device",
    icon: "update",
    color: "#8b5cf6",
  },
  {
    step: 6,
    title: "Restart the router",
    description: "If it still won't connect, restart the router and try again",
    icon: "router",
    color: "#06b6d4",
  },
];

function StepIcon({ icon, color }: { icon: string; color: string }) {
  return (
    <svg width="52" height="52" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18" fill={color} opacity="0.08" />
      <circle cx="20" cy="20" r="12" fill={color} opacity="0.06" />
      {icon === "restart" && (
        <>
          {/* Phone outline */}
          <rect x="13" y="10" width="14" height="22" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
          <line x1="18" y1="29" x2="22" y2="29" stroke={color} strokeWidth="1" strokeLinecap="round" />
          {/* Restart arrow */}
          <path d="M23 16 A4 4 0 1 1 19 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <polygon points="23,16 21,13 25,14" fill={color} />
        </>
      )}
      {icon === "forget" && (
        <>
          {/* Phone with Wi-Fi */}
          <rect x="13" y="10" width="14" height="22" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
          <path d="M17 20 a0.3 0.3 0 1 0 0.01 0" fill={color} />
          <path d="M15 17 a4 4 0 0 1 6 0" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M13.5 15 a6.5 6.5 0 0 1 9 0" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          {/* X over Wi-Fi */}
          <line x1="14" y1="14" x2="24" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      {icon === "reconnect" && (
        <>
          {/* Phone with Wi-Fi */}
          <rect x="13" y="10" width="14" height="22" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
          <path d="M17 20 a0.3 0.3 0 1 0 0.01 0" fill={color} />
          <path d="M15 17 a4 4 0 0 1 6 0" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M13.5 15 a6.5 6.5 0 0 1 9 0" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          {/* Checkmark */}
          <path d="M24 15 L26 17 L30 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </>
      )}
      {icon === "band" && (
        <>
          {/* Two frequency labels */}
          <rect x="8" y="14" width="11" height="14" rx="2" fill={color} opacity="0.15" stroke={color} strokeWidth="1" />
          <text x="13.5" y="22" textAnchor="middle" fill={color} fontSize="5" fontWeight="700" fontFamily="system-ui">2.4</text>
          <rect x="21" y="14" width="11" height="14" rx="2" fill={color} opacity="0.15" stroke={color} strokeWidth="1" />
          <text x="26.5" y="22" textAnchor="middle" fill={color} fontSize="5.5" fontWeight="700" fontFamily="system-ui">5G</text>
          {/* Switch arrow */}
          <path d="M16 30 L24 30" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <polygon points="24,30 21,28 21,32" fill={color} />
        </>
      )}
      {icon === "update" && (
        <>
          {/* Phone outline */}
          <rect x="13" y="10" width="14" height="22" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
          {/* Download arrow */}
          <line x1="20" y1="16" x2="20" y2="24" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M17 22 L20 25 L23 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Progress bar */}
          <rect x="15" y="27" width="10" height="2" rx="1" fill={color} opacity="0.3" />
          <rect x="15" y="27" width="6" height="2" rx="1" fill={color} />
        </>
      )}
      {icon === "router" && (
        <>
          {/* Router */}
          <rect x="11" y="20" width="18" height="10" rx="3" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" />
          <line x1="16" y1="20" x2="16" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="20" x2="24" y2="15" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          {/* Restart arrow */}
          <path d="M30 16 A5 5 0 1 0 34 20" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <polygon points="34,20 32,17 36,18" fill={color} />
        </>
      )}
    </svg>
  );
}

export function DeviceWifiFix() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-5 py-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Fix a Device That Won&apos;t Connect to Wi-Fi
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 p-5">
        {STEPS.map((s) => (
          <div key={s.step} className="flex flex-col items-center text-center">
            <div className="relative">
              <StepIcon icon={s.icon} color={s.color} />
              <span
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{ backgroundColor: s.color }}
              >
                {s.step}
              </span>
            </div>
            <p className="mt-1.5 text-sm font-medium leading-tight">
              {s.title}
            </p>
            <p className="mt-0.5 text-xs leading-tight text-muted-foreground">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
