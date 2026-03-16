"use client";

const LIGHTS = [
  { label: "Power", color: "#22c55e", status: "Solid = on, Off = no power" },
  { label: "Online", color: "#22c55e", status: "Solid = connected to ISP" },
  { label: "DS", color: "#22c55e", status: "Solid = receiving data" },
  { label: "US", color: "#22c55e", status: "Solid = sending data" },
  { label: "LAN", color: "#3b82f6", status: "Blink = Ethernet active" },
  { label: "Wi-Fi", color: "#3b82f6", status: "Solid = broadcasting" },
];

export function ModemLightsDiagram() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Modem Light Status Guide
        </p>
      </div>
      <div className="p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/modem-front-panel.png"
          alt="Generic cable modem showing LED indicator lights"
          className="mx-auto mb-4 h-auto max-h-48 w-auto rounded-lg"
        />
        <svg
          viewBox="0 0 400 260"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Modem body */}
          <rect x="30" y="10" width="340" height="100" rx="12" fill="#1e293b" />
          <rect x="30" y="10" width="340" height="100" rx="12" fill="none" stroke="#334155" strokeWidth="1.5" />

          {/* Brand label */}
          <rect x="55" y="18" width="80" height="12" rx="3" fill="#334155" />
          <text x="95" y="27" textAnchor="middle" fill="#94a3b8" fontSize="7" fontWeight="600" fontFamily="system-ui, sans-serif">CABLE MODEM</text>

          {/* Ventilation lines */}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1={300 + i * 12}
              y1="20"
              x2={300 + i * 12}
              y2="38"
              stroke="#334155"
              strokeWidth="1"
              strokeLinecap="round"
            />
          ))}

          {/* LED panel background */}
          <rect x="50" y="42" width="300" height="32" rx="4" fill="#0f172a" />

          {/* LED lights */}
          {LIGHTS.map((light, i) => {
            const x = 78 + i * 48;
            const isBlinking = light.label === "LAN";
            return (
              <g key={light.label}>
                {/* Glow ring */}
                <circle cx={x} cy="58" r="9" fill={light.color} opacity="0.15" />
                {/* LED */}
                <circle cx={x} cy="58" r="5" fill={light.color}>
                  {isBlinking && (
                    <animate
                      attributeName="opacity"
                      values="1;0.2;1"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
                {/* Label */}
                <text
                  x={x}
                  y="82"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="8"
                  fontFamily="system-ui, sans-serif"
                >
                  {light.label}
                </text>
              </g>
            );
          })}

          {/* Ports at bottom */}
          <rect x="55" y="88" width="14" height="10" rx="2" fill="#334155" />
          <text x="62" y="106" textAnchor="middle" fill="#64748b" fontSize="5" fontFamily="system-ui, sans-serif">COAX</text>
          <rect x="80" y="88" width="14" height="10" rx="2" fill="#334155" />
          <text x="87" y="106" textAnchor="middle" fill="#64748b" fontSize="5" fontFamily="system-ui, sans-serif">ETH</text>
          <rect x="330" y="88" width="14" height="10" rx="2" fill="#334155" />
          <text x="337" y="106" textAnchor="middle" fill="#64748b" fontSize="5" fontFamily="system-ui, sans-serif">PWR</text>

          {/* Legend panel */}
          <rect x="30" y="120" width="340" height="80" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
          <text x="200" y="138" textAnchor="middle" fill="#334155" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif">
            Light Meanings
          </text>

          {LIGHTS.map((light, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const x = 50 + col * 112;
            const y = 155 + row * 22;
            return (
              <g key={`legend-${light.label}`}>
                <circle cx={x} cy={y - 3} r="4" fill={light.color} />
                <text x={x + 10} y={y} fill="#334155" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">
                  {light.label}:
                </text>
                <text x={x + 10} y={y + 11} fill="#64748b" fontSize="7.5" fontFamily="system-ui, sans-serif">
                  {light.status}
                </text>
              </g>
            );
          })}

          {/* Healthy vs Problem status boxes */}
          <rect x="30" y="210" width="160" height="40" rx="6" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
          <text x="110" y="226" textAnchor="middle" fill="#166534" fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif">
            All Good
          </text>
          <text x="110" y="240" textAnchor="middle" fill="#166534" fontSize="7" fontFamily="system-ui, sans-serif">
            All lights solid green/blue
          </text>

          <rect x="210" y="210" width="160" height="40" rx="6" fill="#fef2f2" stroke="#fecaca" strokeWidth="1" />
          <text x="290" y="226" textAnchor="middle" fill="#991b1b" fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif">
            Problem
          </text>
          <text x="290" y="240" textAnchor="middle" fill="#991b1b" fontSize="7" fontFamily="system-ui, sans-serif">
            Online light off or blinking
          </text>
        </svg>
      </div>
    </div>
  );
}
