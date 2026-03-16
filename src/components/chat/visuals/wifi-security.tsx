"use client";

const PROTOCOLS = [
  {
    name: "Open (No Password)",
    security: "None",
    color: "#ef4444",
    icon: "open",
    description: "Anyone can connect and see your traffic",
    recommendation: "Never use for home networks",
  },
  {
    name: "WEP",
    security: "Very Weak",
    color: "#f59e0b",
    icon: "weak",
    description: "Easily cracked in minutes with free tools",
    recommendation: "Upgrade immediately if your router uses this",
  },
  {
    name: "WPA2 (AES)",
    security: "Strong",
    color: "#22c55e",
    icon: "strong",
    description: "Current standard — good protection with a strong password",
    recommendation: "Use this if WPA3 is not available",
  },
  {
    name: "WPA3",
    security: "Strongest",
    color: "#3b82f6",
    icon: "best",
    description: "Latest standard with improved encryption and brute-force protection",
    recommendation: "Best option — use if your router and devices support it",
  },
];

function SecurityIcon({ icon, color }: { icon: string; color: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill={color} opacity="0.1" />
      {icon === "open" && (
        <>
          <path d="M12 15 V12 A4 4 0 0 1 20 12" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          <rect x="10" y="15" width="12" height="9" rx="2" fill={color} opacity="0.3" />
          <rect x="10" y="15" width="12" height="9" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
        </>
      )}
      {icon === "weak" && (
        <>
          <path d="M12 15 V12 A4 4 0 0 1 20 12 V15" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          <rect x="10" y="15" width="12" height="9" rx="2" fill={color} opacity="0.3" />
          <rect x="10" y="15" width="12" height="9" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
          <line x1="13" y1="18" x2="19" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="19" y1="18" x2="13" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
      {icon === "strong" && (
        <>
          <path d="M12 15 V12 A4 4 0 0 1 20 12 V15" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          <rect x="10" y="15" width="12" height="9" rx="2" fill={color} opacity="0.3" />
          <rect x="10" y="15" width="12" height="9" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
          <circle cx="16" cy="19" r="1.5" fill={color} />
        </>
      )}
      {icon === "best" && (
        <>
          <path d="M12 15 V12 A4 4 0 0 1 20 12 V15" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          <rect x="10" y="15" width="12" height="9" rx="2" fill={color} opacity="0.3" />
          <rect x="10" y="15" width="12" height="9" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
          <path d="M14 19.5 L15.5 21 L18.5 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </>
      )}
    </svg>
  );
}

export function WifiSecurity() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Wi-Fi Security Protocols
        </p>
      </div>
      <div className="p-4">
        <svg
          viewBox="0 0 440 70"
          className="mb-3 w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Security scale */}
          <text x="220" y="14" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif">
            Security Level
          </text>

          {/* Bar background */}
          <rect x="20" y="24" width="400" height="12" rx="6" fill="#f1f5f9" />

          {/* Colored segments */}
          <rect x="20" y="24" width="100" height="12" rx="6" fill="#ef4444" opacity="0.7" />
          <rect x="120" y="24" width="100" height="12" fill="#f59e0b" opacity="0.7" />
          <rect x="220" y="24" width="100" height="12" fill="#22c55e" opacity="0.7" />
          <rect x="320" y="24" width="100" height="12" rx="6" fill="#3b82f6" opacity="0.7" />

          {/* Labels */}
          <text x="70" y="52" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">Open</text>
          <text x="170" y="52" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">WEP</text>
          <text x="270" y="52" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">WPA2</text>
          <text x="370" y="52" textAnchor="middle" fill="#3b82f6" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">WPA3</text>

          {/* Arrow */}
          <line x1="30" y1="64" x2="410" y2="64" stroke="#cbd5e1" strokeWidth="1" />
          <polygon points="410,64 404,60 404,68" fill="#cbd5e1" />
        </svg>

        <div className="space-y-2">
          {PROTOCOLS.map((p) => (
            <div key={p.name} className="flex items-start gap-3 rounded-lg border p-3">
              <SecurityIcon icon={p.icon} color={p.color} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold" style={{ color: p.color }}>{p.name}</span>
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.security}
                  </span>
                </div>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{p.description}</p>
                <p className="mt-0.5 text-[10px] font-medium italic text-muted-foreground/80">{p.recommendation}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 rounded-md bg-blue-50 p-2.5">
          <p className="text-[11px] font-medium text-blue-800">
            Check your security: Go to Wi-Fi settings on your device, tap your network name,
            and look for &quot;Security&quot; or &quot;Encryption type.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
