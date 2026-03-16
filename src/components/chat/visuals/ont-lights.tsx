"use client";

const LIGHTS = [
  { label: "Power", color: "#22c55e", status: "Solid = unit is on" },
  { label: "PON", color: "#22c55e", status: "Solid = fiber link active" },
  { label: "LOS", color: "#ef4444", status: "Off = good, Red = fiber fault" },
  { label: "LAN 1", color: "#3b82f6", status: "Blink = Ethernet active" },
  { label: "LAN 2", color: "#3b82f6", status: "Blink = Ethernet active" },
  { label: "POTS", color: "#a855f7", status: "Solid = phone line active" },
];

export function OntLights() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          ONT (Fiber) Light Status Guide
        </p>
      </div>
      <div className="p-4">
        <svg
          viewBox="0 0 400 310"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ONT device illustration */}
          <rect x="120" y="8" width="160" height="110" rx="10" fill="#1e293b" />
          <rect x="120" y="8" width="160" height="110" rx="10" fill="none" stroke="#475569" strokeWidth="1.5" />

          {/* Brand area */}
          <rect x="145" y="18" width="110" height="14" rx="3" fill="#334155" />
          <text x="200" y="28" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">
            FIBER ONT
          </text>

          {/* Ventilation holes */}
          {Array.from({ length: 4 }).map((_, i) => (
            <line key={`vent-${i}`} x1={260 + i * 5} y1="20" x2={260 + i * 5} y2="30" stroke="#334155" strokeWidth="0.8" />
          ))}

          {/* LED panel */}
          <rect x="140" y="42" width="120" height="32" rx="4" fill="#0f172a" />
          {LIGHTS.map((light, i) => {
            const x = 152 + i * 20;
            const isLos = light.label === "LOS";
            const isLan = light.label.startsWith("LAN");
            return (
              <g key={light.label}>
                <circle cx={x} cy="54" r="5" fill={isLos ? "#334155" : light.color} opacity={isLos ? 1 : 0.8}>
                  {isLan && (
                    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite" />
                  )}
                </circle>
                <circle cx={x} cy="54" r="7" fill="none" stroke={isLos ? "#334155" : light.color} strokeWidth="0.5" opacity="0.3" />
                <text x={x} y="68" textAnchor="middle" fill="#64748b" fontSize="5" fontFamily="system-ui, sans-serif">
                  {light.label}
                </text>
              </g>
            );
          })}

          {/* Fiber port on side */}
          <rect x="265" y="50" width="8" height="20" rx="2" fill="#22c55e" opacity="0.3" />
          <rect x="265" y="50" width="8" height="20" rx="2" fill="none" stroke="#22c55e" strokeWidth="0.8" />
          <text x="280" y="63" fill="#22c55e" fontSize="5" fontFamily="system-ui, sans-serif">FIBER</text>

          {/* Bottom ports */}
          <rect x="142" y="86" width="16" height="10" rx="2" fill="#334155" />
          <text x="150" y="106" textAnchor="middle" fill="#64748b" fontSize="5" fontFamily="system-ui, sans-serif">LAN1</text>
          <rect x="164" y="86" width="16" height="10" rx="2" fill="#334155" />
          <text x="172" y="106" textAnchor="middle" fill="#64748b" fontSize="5" fontFamily="system-ui, sans-serif">LAN2</text>
          <rect x="186" y="86" width="16" height="10" rx="2" fill="#334155" />
          <text x="194" y="106" textAnchor="middle" fill="#64748b" fontSize="5" fontFamily="system-ui, sans-serif">TEL</text>
          <rect x="220" y="86" width="12" height="10" rx="2" fill="#334155" />
          <text x="226" y="106" textAnchor="middle" fill="#64748b" fontSize="5" fontFamily="system-ui, sans-serif">PWR</text>

          {/* Fiber cable illustration */}
          <path d="M273 60 Q310 60 320 45 Q330 30 360 30" stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="360" cy="30" r="4" fill="#22c55e" opacity="0.2" />
          <rect x="356" y="27" width="8" height="6" rx="1" fill="#22c55e" />
          <text x="375" y="33" fill="#22c55e" fontSize="6" fontFamily="system-ui, sans-serif">SC/APC</text>

          {/* LED legend panel */}
          <rect x="20" y="130" width="360" height="105" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
          <text x="200" y="148" textAnchor="middle" fill="#334155" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif">
            Light Meanings
          </text>

          {LIGHTS.map((light, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const x = 40 + col * 118;
            const y = 165 + row * 28;
            return (
              <g key={`legend-${light.label}`}>
                <circle cx={x} cy={y} r="4" fill={light.color} />
                <text x={x + 10} y={y + 1} fill="#334155" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">
                  {light.label}
                </text>
                <text x={x + 10} y={y + 12} fill="#64748b" fontSize="7" fontFamily="system-ui, sans-serif">
                  {light.status}
                </text>
              </g>
            );
          })}

          {/* Healthy pattern */}
          <rect x="20" y="245" width="170" height="55" rx="6" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
          <text x="105" y="262" textAnchor="middle" fill="#166534" fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif">
            Healthy ONT
          </text>
          <text x="105" y="276" textAnchor="middle" fill="#166534" fontSize="7" fontFamily="system-ui, sans-serif">
            Power: Solid, PON: Solid
          </text>
          <text x="105" y="288" textAnchor="middle" fill="#166534" fontSize="7" fontFamily="system-ui, sans-serif">
            LOS: Off, LAN: Blinking
          </text>

          {/* Problem pattern */}
          <rect x="210" y="245" width="170" height="55" rx="6" fill="#fef2f2" stroke="#fecaca" strokeWidth="1" />
          <text x="295" y="262" textAnchor="middle" fill="#991b1b" fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif">
            Fiber Problem
          </text>
          <text x="295" y="276" textAnchor="middle" fill="#991b1b" fontSize="7" fontFamily="system-ui, sans-serif">
            LOS: Red or Blinking
          </text>
          <text x="295" y="288" textAnchor="middle" fill="#991b1b" fontSize="7" fontFamily="system-ui, sans-serif">
            Contact support immediately
          </text>
        </svg>

        <div className="mt-2 rounded-md bg-amber-50 p-2.5">
          <p className="text-[11px] font-medium text-amber-800">
            If the LOS light is red, there may be a break in your fiber line. Do not
            bend or disconnect the fiber cable — contact support for a technician visit.
          </p>
        </div>
      </div>
    </div>
  );
}
