"use client";

const LEVELS = [
  { label: "Excellent", dbm: "-30 to -50 dBm", bars: 4, color: "#22c55e", description: "Right next to the router" },
  { label: "Good", dbm: "-50 to -60 dBm", bars: 3, color: "#84cc16", description: "Same room or one room away" },
  { label: "Fair", dbm: "-60 to -70 dBm", bars: 2, color: "#f59e0b", description: "A couple rooms away, through walls" },
  { label: "Weak", dbm: "-70 to -80 dBm", bars: 1, color: "#ef4444", description: "Far from router, many walls" },
  { label: "Unusable", dbm: "Below -80 dBm", bars: 0, color: "#94a3b8", description: "Too far or too many obstructions" },
];

function SignalBars({ bars, color }: { bars: number; color: string }) {
  return (
    <svg width="32" height="28" viewBox="0 0 32 28">
      {[0, 1, 2, 3].map((i) => {
        const height = 8 + i * 5;
        const y = 28 - height;
        const active = i < bars;
        return (
          <rect
            key={i}
            x={2 + i * 8}
            y={y}
            width="6"
            height={height}
            rx="1.5"
            fill={active ? color : "#e2e8f0"}
          />
        );
      })}
    </svg>
  );
}

export function SignalStrength() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Wi-Fi Signal Strength Guide
        </p>
      </div>
      <div className="p-4">
        <svg
          viewBox="0 0 440 120"
          className="mb-3 w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Signal strength scale */}
          <text x="220" y="14" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif">
            Signal Strength Scale (dBm)
          </text>

          {/* Gradient bar */}
          <defs>
            <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="35%" stopColor="#84cc16" />
              <stop offset="55%" stopColor="#f59e0b" />
              <stop offset="75%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          <rect x="20" y="28" width="400" height="14" rx="7" fill="url(#signalGradient)" />

          {/* Scale markers */}
          {[
            { x: 20, label: "-30" },
            { x: 120, label: "-50" },
            { x: 220, label: "-60" },
            { x: 300, label: "-70" },
            { x: 360, label: "-80" },
            { x: 420, label: "-90" },
          ].map((m) => (
            <g key={m.label}>
              <line x1={m.x} y1="44" x2={m.x} y2="50" stroke="#94a3b8" strokeWidth="1" />
              <text x={m.x} y="60" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="system-ui, sans-serif">
                {m.label}
              </text>
            </g>
          ))}

          {/* Zone labels */}
          <text x="70" y="78" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">Excellent</text>
          <text x="170" y="78" textAnchor="middle" fill="#84cc16" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">Good</text>
          <text x="260" y="78" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">Fair</text>
          <text x="330" y="78" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">Weak</text>
          <text x="400" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">No signal</text>

          {/* Router icon at strong end */}
          <rect x="25" y="90" width="20" height="14" rx="3" fill="#22c55e" />
          <line x1="31" y1="90" x2="31" y2="84" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="39" y1="90" x2="39" y2="86" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
          <text x="56" y="100" fill="#64748b" fontSize="7" fontFamily="system-ui, sans-serif">Router</text>

          {/* Distance arrow */}
          <line x1="85" y1="97" x2="400" y2="97" stroke="#cbd5e1" strokeWidth="1" />
          <polygon points="400,97 394,93 394,101" fill="#cbd5e1" />
          <text x="240" y="115" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="system-ui, sans-serif">
            Distance / obstructions increase
          </text>
        </svg>

        <div className="space-y-1.5">
          {LEVELS.map((level) => (
            <div key={level.label} className="flex items-center gap-3 rounded-lg border p-2">
              <SignalBars bars={level.bars} color={level.color} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold" style={{ color: level.color }}>{level.label}</span>
                  <span className="text-[10px] text-muted-foreground">{level.dbm}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">{level.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
