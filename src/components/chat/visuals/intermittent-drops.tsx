"use client";

const CAUSES = [
  {
    title: "Overheating",
    description: "Modem or router running hot in enclosed space",
    color: "#ef4444",
    icon: "heat",
  },
  {
    title: "Loose Cables",
    description: "Coax, Ethernet, or power not fully seated",
    color: "#f59e0b",
    icon: "cable",
  },
  {
    title: "Wi-Fi Interference",
    description: "Microwaves, baby monitors, or neighbor networks",
    color: "#8b5cf6",
    icon: "interference",
  },
  {
    title: "Peak Congestion",
    description: "Too many users at the same time (6-10 PM)",
    color: "#3b82f6",
    icon: "congestion",
  },
  {
    title: "Firmware Bug",
    description: "Outdated modem or router software",
    color: "#06b6d4",
    icon: "firmware",
  },
  {
    title: "ISP Line Issue",
    description: "Signal degradation from the provider side",
    color: "#ec4899",
    icon: "isp",
  },
];

function CauseIcon({ icon, color }: { icon: string; color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="16" fill={color} opacity="0.08" />
      <circle cx="18" cy="18" r="11" fill={color} opacity="0.08" />
      {icon === "heat" && (
        <>
          <path d="M14 24 Q14 16 18 13 Q22 16 22 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <line x1="18" y1="17" x2="18" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="15" y1="15" x2="15" y2="11" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          <line x1="21" y1="15" x2="21" y2="11" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        </>
      )}
      {icon === "cable" && (
        <>
          <line x1="12" y1="24" x2="18" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="18" x2="24" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
          <circle cx="24" cy="12" r="2" fill={color} opacity="0.3" />
        </>
      )}
      {icon === "interference" && (
        <>
          <circle cx="18" cy="20" r="2" fill={color} />
          <path d="M14 16 a5.5 5.5 0 0 1 8 0" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 13 a8.5 8.5 0 0 1 12 0" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="11" x2="24" y2="9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="11" x2="22" y2="9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
      {icon === "congestion" && (
        <>
          <circle cx="14" cy="16" r="2.5" fill={color} opacity="0.6" />
          <circle cx="18" cy="14" r="2.5" fill={color} opacity="0.8" />
          <circle cx="22" cy="16" r="2.5" fill={color} opacity="0.6" />
          <circle cx="16" cy="20" r="2.5" fill={color} opacity="0.5" />
          <circle cx="20" cy="20" r="2.5" fill={color} opacity="0.5" />
        </>
      )}
      {icon === "firmware" && (
        <>
          <rect x="12" y="13" width="12" height="10" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
          <line x1="15" y1="16" x2="21" y2="16" stroke={color} strokeWidth="1" strokeLinecap="round" />
          <line x1="15" y1="19" x2="19" y2="19" stroke={color} strokeWidth="1" strokeLinecap="round" />
        </>
      )}
      {icon === "isp" && (
        <>
          <circle cx="18" cy="16" r="6" fill="none" stroke={color} strokeWidth="1.5" />
          <ellipse cx="18" cy="16" rx="3" ry="6" fill="none" stroke={color} strokeWidth="0.8" />
          <line x1="12" y1="16" x2="24" y2="16" stroke={color} strokeWidth="0.8" />
        </>
      )}
    </svg>
  );
}

export function IntermittentDrops() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Common Causes of Intermittent Drops
        </p>
      </div>
      <div className="p-4">
        {/* Signal timeline showing drops */}
        <svg
          viewBox="0 0 400 70"
          className="mb-3 w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text x="200" y="12" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">
            Connection Timeline
          </text>

          {/* Baseline */}
          <line x1="20" y1="55" x2="380" y2="55" stroke="#e2e8f0" strokeWidth="1" />

          {/* Good signal */}
          <line x1="20" y1="28" x2="80" y2="28" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          {/* Drop */}
          <line x1="80" y1="28" x2="85" y2="52" stroke="#ef4444" strokeWidth="2" />
          <line x1="85" y1="52" x2="110" y2="52" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="110" y1="52" x2="115" y2="28" stroke="#22c55e" strokeWidth="2" />
          {/* Good */}
          <line x1="115" y1="28" x2="190" y2="28" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          {/* Short drop */}
          <line x1="190" y1="28" x2="195" y2="52" stroke="#ef4444" strokeWidth="2" />
          <line x1="195" y1="52" x2="210" y2="52" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="210" y1="52" x2="215" y2="28" stroke="#22c55e" strokeWidth="2" />
          {/* Good */}
          <line x1="215" y1="28" x2="280" y2="28" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          {/* Drop */}
          <line x1="280" y1="28" x2="285" y2="52" stroke="#ef4444" strokeWidth="2" />
          <line x1="285" y1="52" x2="320" y2="52" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="320" y1="52" x2="325" y2="28" stroke="#22c55e" strokeWidth="2" />
          {/* Good */}
          <line x1="325" y1="28" x2="380" y2="28" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />

          {/* Labels */}
          <text x="20" y="24" fill="#22c55e" fontSize="7" fontFamily="system-ui, sans-serif">Connected</text>
          <text x="20" y="65" fill="#ef4444" fontSize="7" fontFamily="system-ui, sans-serif">Dropped</text>

          {/* Drop markers */}
          {[97, 202, 302].map((x) => (
            <g key={x}>
              <line x1={x} y1="18" x2={x} y2="55" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
            </g>
          ))}
        </svg>

        <div className="grid grid-cols-3 gap-3">
          {CAUSES.map((cause) => (
            <div key={cause.title} className="flex flex-col items-center text-center">
              <CauseIcon icon={cause.icon} color={cause.color} />
              <p className="mt-1 text-[11px] font-medium leading-tight">
                {cause.title}
              </p>
              <p className="mt-0.5 text-[9px] leading-tight text-muted-foreground">
                {cause.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
