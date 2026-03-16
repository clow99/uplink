"use client";

const STEPS = [
  {
    step: 1,
    title: "Unplug modem",
    description: "Remove the power cable from your modem",
    icon: "unplug",
    color: "#ef4444",
  },
  {
    step: 2,
    title: "Wait 30 seconds",
    description: "Let the modem fully power down",
    icon: "wait",
    color: "#f59e0b",
  },
  {
    step: 3,
    title: "Plug back in",
    description: "Reconnect the power cable",
    icon: "plugin",
    color: "#22c55e",
  },
  {
    step: 4,
    title: "Wait 3-5 minutes",
    description: "All lights should turn solid",
    icon: "lights",
    color: "#3b82f6",
  },
  {
    step: 5,
    title: "Restart router",
    description: "If separate, restart router now",
    icon: "router",
    color: "#8b5cf6",
  },
  {
    step: 6,
    title: "Test connection",
    description: "Try loading a website",
    icon: "test",
    color: "#06b6d4",
  },
];

function StepIcon({ icon, color }: { icon: string; color: string }) {
  return (
    <svg width="56" height="56" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="22" fill={color} opacity="0.08" />
      <circle cx="24" cy="24" r="16" fill={color} opacity="0.08" />
      {icon === "unplug" && (
        <>
          {/* Plug shape */}
          <rect x="17" y="18" width="14" height="16" rx="3" fill="none" stroke={color} strokeWidth="2" />
          <line x1="21" y1="18" x2="21" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="27" y1="18" x2="27" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="34" x2="24" y2="38" stroke={color} strokeWidth="2" strokeLinecap="round" />
          {/* Disconnect arrow */}
          <path d="M34 16 L38 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M36 12 L38 12 L38 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </>
      )}
      {icon === "wait" && (
        <>
          <circle cx="24" cy="24" r="11" stroke={color} strokeWidth="2" fill="none" />
          <line x1="24" y1="18" x2="24" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="24" x2="29" y2="27" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <text x="24" y="42" textAnchor="middle" fill={color} fontSize="7" fontWeight="700" fontFamily="system-ui, sans-serif">30s</text>
        </>
      )}
      {icon === "plugin" && (
        <>
          <rect x="17" y="18" width="14" height="16" rx="3" fill={color} opacity="0.2" />
          <rect x="17" y="18" width="14" height="16" rx="3" fill="none" stroke={color} strokeWidth="2" />
          <line x1="21" y1="18" x2="21" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="27" y1="18" x2="27" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="34" x2="24" y2="38" stroke={color} strokeWidth="2" strokeLinecap="round" />
          {/* Connect arrow */}
          <path d="M38 16 L34 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M34 16 L34 20 L38 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </>
      )}
      {icon === "lights" && (
        <>
          <rect x="14" y="20" width="20" height="12" rx="3" fill={color} opacity="0.15" />
          <rect x="14" y="20" width="20" height="12" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
          <circle cx="20" cy="26" r="2.5" fill={color}>
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0s" />
          </circle>
          <circle cx="27" cy="26" r="2.5" fill={color}>
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle cx="34" cy="26" r="2.5" fill={color}>
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1s" />
          </circle>
          <text x="24" y="42" textAnchor="middle" fill={color} fontSize="6" fontWeight="600" fontFamily="system-ui, sans-serif">3-5 min</text>
        </>
      )}
      {icon === "router" && (
        <>
          <rect x="14" y="24" width="20" height="10" rx="3" fill={color} opacity="0.2" />
          <rect x="14" y="24" width="20" height="10" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
          <line x1="20" y1="24" x2="20" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="24" x2="28" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
          {/* Circular restart arrow */}
          <path d="M34 18 A6 6 0 1 0 38 24" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <polygon points="38,24 36,20 40,21" fill={color} />
        </>
      )}
      {icon === "test" && (
        <>
          {/* Browser window */}
          <rect x="14" y="16" width="20" height="18" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
          <line x1="14" y1="21" x2="34" y2="21" stroke={color} strokeWidth="1" />
          <circle cx="17" cy="18.5" r="1" fill={color} />
          <circle cx="20.5" cy="18.5" r="1" fill={color} />
          {/* Checkmark */}
          <path d="M20 27 L23 30 L30 23" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </>
      )}
    </svg>
  );
}

export function RebootSteps() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-5 py-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          How to Reboot Your Modem & Router
        </p>
      </div>
      <div className="p-4">
        {/* Progress arrow connecting steps */}
        <svg viewBox="0 0 440 8" className="mb-1 w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="20%" stopColor="#f59e0b" />
              <stop offset="40%" stopColor="#22c55e" />
              <stop offset="60%" stopColor="#3b82f6" />
              <stop offset="80%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <rect x="20" y="2" width="400" height="4" rx="2" fill="url(#progressGrad)" opacity="0.3" />
          <polygon points="420,4 414,0 414,8" fill="#06b6d4" opacity="0.5" />
        </svg>

        <div className="grid grid-cols-3 gap-4">
          {STEPS.map((s) => (
            <div key={s.step} className="flex flex-col items-center text-center">
              <div className="relative">
                <StepIcon icon={s.icon} color={s.color} />
                <span
                  className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: s.color }}
                >
                  {s.step}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium leading-tight">
                {s.title}
              </p>
              <p className="mt-0.5 text-xs leading-tight text-muted-foreground">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
