"use client";

const METRICS = [
  {
    label: "Ping (Latency)",
    value: "20 ms",
    description: "Time for data to travel to a server and back",
    color: "#22c55e",
    barWidth: 40,
  },
  {
    label: "Jitter",
    value: "5 ms",
    description: "Variation in ping — lower is more stable",
    color: "#f59e0b",
    barWidth: 25,
  },
  {
    label: "Packet Loss",
    value: "0%",
    description: "Data that never arrives — any loss causes issues",
    color: "#ef4444",
    barWidth: 10,
  },
];

export function LatencyVisual() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Latency, Jitter & Packet Loss
        </p>
      </div>
      <div className="p-4">
        <svg
          viewBox="0 0 460 200"
          className="mb-3 w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ping timeline */}
          <text x="12" y="16" fill="#64748b" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif">
            Ping Timeline
          </text>

          {/* Baseline */}
          <line x1="12" y1="80" x2="448" y2="80" stroke="#e2e8f0" strokeWidth="1" />

          {/* Good ping signals — steady */}
          {Array.from({ length: 12 }).map((_, i) => {
            const x = 30 + i * 35;
            const y = 55 + Math.sin(i * 0.3) * 3;
            return (
              <g key={`ping-${i}`}>
                <line x1={x} y1="80" x2={x} y2={y} stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
                <circle cx={x} cy={y} r="3" fill="#22c55e" />
              </g>
            );
          })}

          {/* Good label */}
          <rect x="12" y="88" width="56" height="16" rx="3" fill="#dcfce7" />
          <text x="40" y="99" textAnchor="middle" fill="#166534" fontSize="7.5" fontWeight="600" fontFamily="system-ui, sans-serif">
            Low ping
          </text>

          {/* Jitter visualization — middle section */}
          <text x="12" y="128" fill="#64748b" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif">
            Jitter Effect
          </text>

          {/* Baseline for jitter */}
          <line x1="12" y1="170" x2="220" y2="170" stroke="#e2e8f0" strokeWidth="1" />

          {/* Steady (low jitter) */}
          {Array.from({ length: 5 }).map((_, i) => {
            const x = 30 + i * 35;
            return (
              <g key={`jitter-low-${i}`}>
                <line x1={x} y1="170" x2={x} y2="150" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
                <circle cx={x} cy="150" r="2.5" fill="#22c55e" />
              </g>
            );
          })}
          <text x="100" y="185" textAnchor="middle" fill="#22c55e" fontSize="7" fontFamily="system-ui, sans-serif">
            Stable (low jitter)
          </text>

          {/* Unstable (high jitter) */}
          <line x1="240" y1="170" x2="448" y2="170" stroke="#e2e8f0" strokeWidth="1" />
          {[145, 160, 135, 170, 140].map((h, i) => {
            const x = 260 + i * 35;
            return (
              <g key={`jitter-high-${i}`}>
                <line x1={x} y1="170" x2={x} y2={h} stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                <circle cx={x} cy={h} r="2.5" fill="#f59e0b" />
              </g>
            );
          })}
          <text x="350" y="185" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="system-ui, sans-serif">
            Unstable (high jitter)
          </text>

          {/* Packet loss indicators */}
          {[2, 7].map((i) => {
            const x = 30 + i * 35;
            return (
              <g key={`loss-${i}`}>
                <line x1={x - 4} y1="56" x2={x + 4} y2="64" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                <line x1={x + 4} y1="56" x2={x - 4} y2="64" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
              </g>
            );
          })}
          <rect x="80" y="88" width="80" height="16" rx="3" fill="#fef2f2" />
          <text x="120" y="99" textAnchor="middle" fill="#991b1b" fontSize="7.5" fontWeight="600" fontFamily="system-ui, sans-serif">
            Packet loss
          </text>
        </svg>

        <div className="space-y-2">
          {METRICS.map((m) => (
            <div key={m.label} className="flex items-center gap-3 rounded-lg border p-2.5">
              <div className="flex w-8 items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 28 28">
                  <circle cx="14" cy="14" r="12" fill={m.color} opacity="0.12" />
                  <text x="14" y="18" textAnchor="middle" fill={m.color} fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
                    {m.value.split(" ")[0]}
                  </text>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold" style={{ color: m.color }}>{m.label}</p>
                  <span className="text-[10px] text-muted-foreground">Good: {m.value}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">{m.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 rounded-md bg-amber-50 p-2.5">
          <p className="text-[11px] font-medium text-amber-800">
            High latency causes lag in games and video calls. High jitter makes calls choppy.
            Any packet loss above 1% causes noticeable issues.
          </p>
        </div>
      </div>
    </div>
  );
}
