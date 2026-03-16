"use client";

const SIGNS = [
  {
    title: "All devices offline",
    description: "If nothing connects — Wi-Fi, Ethernet, or mobile hotspot — it may be an area outage",
    isOutage: true,
  },
  {
    title: "Modem lights abnormal",
    description: "Power is on but Online/DS/US lights are off or blinking continuously",
    isOutage: true,
  },
  {
    title: "Neighbors also affected",
    description: "If nearby homes on the same ISP have no internet, it's likely an outage",
    isOutage: true,
  },
  {
    title: "Only one device affected",
    description: "Other devices work fine — this points to a device issue, not an outage",
    isOutage: false,
  },
  {
    title: "Wi-Fi works, pages slow",
    description: "You can connect to Wi-Fi but browsing is slow — likely congestion, not an outage",
    isOutage: false,
  },
];

export function OutageCheck() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Is It an Outage?
        </p>
      </div>
      <div className="p-4">
        <svg
          viewBox="0 0 440 140"
          className="mb-3 w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ISP cloud */}
          <ellipse cx="80" cy="70" rx="55" ry="35" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
          <text x="80" y="65" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">ISP</text>
          <text x="80" y="78" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="system-ui, sans-serif">Service Down</text>

          {/* Break indicator */}
          <line x1="135" y1="70" x2="175" y2="70" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
          <g>
            <line x1="150" y1="55" x2="160" y2="85" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
            <line x1="160" y1="55" x2="150" y2="85" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Modem */}
          <rect x="180" y="48" width="55" height="44" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="195" cy="63" r="3" fill="#94a3b8" />
          <circle cx="207" cy="63" r="3" fill="#94a3b8" />
          <circle cx="219" cy="63" r="3" fill="#94a3b8" />
          <text x="207" y="83" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="600" fontFamily="system-ui, sans-serif">Modem</text>

          {/* Arrow */}
          <line x1="240" y1="70" x2="270" y2="70" stroke="#cbd5e1" strokeWidth="1.5" />

          {/* Router */}
          <rect x="275" y="48" width="55" height="44" rx="6" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="292" y1="52" x2="292" y2="58" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="302" y1="50" x2="302" y2="58" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="312" y1="52" x2="312" y2="58" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
          <text x="302" y="83" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="600" fontFamily="system-ui, sans-serif">Router</text>

          {/* Devices with X marks */}
          {[
            { y: 30, label: "Phone" },
            { y: 70, label: "Laptop" },
            { y: 110, label: "TV" },
          ].map((d) => (
            <g key={d.label}>
              <line x1="330" y1="70" x2="380" y2={d.y} stroke="#fca5a5" strokeWidth="1" strokeDasharray="3 2" />
              <rect x="380" y={d.y - 10} width="50" height="20" rx="4" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
              <text x="405" y={d.y + 4} textAnchor="middle" fill="#dc2626" fontSize="8" fontFamily="system-ui, sans-serif">{d.label}</text>
            </g>
          ))}

          {/* Area outage label */}
          <rect x="40" y="112" width="100" height="20" rx="4" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
          <text x="90" y="125" textAnchor="middle" fill="#dc2626" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">
            Area Outage
          </text>
        </svg>

        <p className="mb-2 text-[11px] font-medium text-muted-foreground">Signs to look for:</p>
        <div className="space-y-1.5">
          {SIGNS.map((sign) => (
            <div key={sign.title} className="flex items-start gap-2 rounded-lg border p-2.5">
              <span
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                  sign.isOutage ? "bg-destructive" : "bg-success"
                }`}
              >
                {sign.isOutage ? "!" : "\u2713"}
              </span>
              <div>
                <p className="text-xs font-medium">{sign.title}</p>
                <p className="text-[10px] text-muted-foreground">{sign.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
