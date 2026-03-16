"use client";

export function NetworkTopology() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Home Network Layout
        </p>
      </div>
      <div className="p-4">
        <svg
          viewBox="0 0 480 240"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* === ISP Cloud === */}
          <ellipse cx="55" cy="80" rx="42" ry="30" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
          <ellipse cx="42" cy="65" rx="16" ry="10" fill="#eff6ff" />
          <ellipse cx="68" cy="65" rx="14" ry="9" fill="#eff6ff" />
          <text x="55" y="76" textAnchor="middle" fill="#2563eb" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">ISP</text>
          <text x="55" y="88" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="system-ui, sans-serif">Internet</text>

          {/* Cable from ISP to Modem */}
          <line x1="97" y1="80" x2="140" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 3" />
          <text x="118" y="72" textAnchor="middle" fill="#94a3b8" fontSize="6.5" fontFamily="system-ui, sans-serif">Coax / Fiber</text>

          {/* === Modem === */}
          <rect x="140" y="50" width="72" height="60" rx="8" fill="#1e293b" />
          <rect x="140" y="50" width="72" height="60" rx="8" fill="none" stroke="#475569" strokeWidth="1.5" />

          {/* Modem LEDs */}
          <circle cx="155" cy="66" r="3" fill="#22c55e" />
          <circle cx="165" cy="66" r="3" fill="#22c55e" />
          <circle cx="175" cy="66" r="3" fill="#22c55e" />
          <circle cx="185" cy="66" r="3" fill="#3b82f6">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
          </circle>

          {/* Modem ports at bottom */}
          <rect x="148" y="86" width="10" height="8" rx="1.5" fill="#334155" />
          <rect x="162" y="86" width="10" height="8" rx="1.5" fill="#334155" />
          <rect x="176" y="86" width="16" height="8" rx="1.5" fill="#334155" />

          <text x="176" y="120" textAnchor="middle" fill="#334155" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif">Modem</text>
          <text x="176" y="130" textAnchor="middle" fill="#94a3b8" fontSize="6.5" fontFamily="system-ui, sans-serif">Connects to ISP</text>

          {/* Ethernet from Modem to Router */}
          <line x1="212" y1="80" x2="260" y2="80" stroke="#3b82f6" strokeWidth="2" />
          <text x="236" y="72" textAnchor="middle" fill="#3b82f6" fontSize="6.5" fontFamily="system-ui, sans-serif">Ethernet</text>

          {/* === Router === */}
          <rect x="260" y="50" width="72" height="60" rx="8" fill="#1e293b" />
          <rect x="260" y="50" width="72" height="60" rx="8" fill="none" stroke="#3b82f6" strokeWidth="1.5" />

          {/* Router antennas */}
          <line x1="278" y1="50" x2="275" y2="36" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          <circle cx="275" cy="34" r="2" fill="#3b82f6" />
          <line x1="296" y1="50" x2="296" y2="34" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          <circle cx="296" cy="32" r="2" fill="#3b82f6" />
          <line x1="314" y1="50" x2="317" y2="36" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          <circle cx="317" cy="34" r="2" fill="#3b82f6" />

          {/* Router LEDs */}
          <circle cx="275" cy="66" r="2.5" fill="#22c55e" />
          <circle cx="284" cy="66" r="2.5" fill="#22c55e" />
          <circle cx="293" cy="66" r="2.5" fill="#3b82f6" />

          {/* Router ports */}
          <rect x="268" y="86" width="10" height="8" rx="1.5" fill="#f59e0b" />
          <rect x="282" y="86" width="10" height="8" rx="1.5" fill="#334155" />
          <rect x="296" y="86" width="10" height="8" rx="1.5" fill="#334155" />
          <rect x="310" y="86" width="10" height="8" rx="1.5" fill="#334155" />

          <text x="296" y="120" textAnchor="middle" fill="#334155" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif">Router</text>
          <text x="296" y="130" textAnchor="middle" fill="#94a3b8" fontSize="6.5" fontFamily="system-ui, sans-serif">Creates your network</text>

          {/* Wi-Fi waves from router */}
          {[16, 24, 32].map((r, i) => (
            <path
              key={r}
              d={`M ${340 + i * 3} ${80 - r} A ${r} ${r} 0 0 1 ${340 + i * 3} ${80 + r}`}
              fill="none"
              stroke="#93c5fd"
              strokeWidth="1.2"
              opacity={0.6 - i * 0.15}
            />
          ))}

          {/* === Devices === */}
          {/* Phone */}
          <g>
            <line x1="370" y1="55" x2="410" y2="30" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 2" />
            <rect x="410" y="16" width="36" height="28" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.2" />
            <rect x="415" y="20" width="26" height="16" rx="2" fill="#dbeafe" />
            <line x1="424" y1="40" x2="432" y2="40" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
            <text x="428" y="50" textAnchor="middle" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">Phone</text>
          </g>

          {/* Laptop */}
          <g>
            <line x1="370" y1="75" x2="410" y2="80" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 2" />
            <rect x="410" y="66" width="38" height="24" rx="3" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.2" />
            <rect x="414" y="69" width="30" height="16" rx="1.5" fill="#dbeafe" />
            <rect x="406" y="90" width="46" height="3" rx="1.5" fill="#e2e8f0" />
            <text x="429" y="102" textAnchor="middle" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">Laptop</text>
          </g>

          {/* TV */}
          <g>
            <line x1="370" y1="95" x2="410" y2="130" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 2" />
            <rect x="408" y="118" width="44" height="26" rx="3" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.2" />
            <rect x="412" y="121" width="36" height="18" rx="1.5" fill="#dbeafe" />
            <rect x="424" y="144" width="12" height="3" rx="1.5" fill="#cbd5e1" />
            <rect x="418" y="147" width="24" height="2" rx="1" fill="#e2e8f0" />
            <text x="430" y="158" textAnchor="middle" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">Smart TV</text>
          </g>

          {/* Wired device via Ethernet */}
          <g>
            <line x1="296" y1="110" x2="296" y2="170" stroke="#3b82f6" strokeWidth="1.5" />
            <rect x="274" y="170" width="44" height="26" rx="4" fill="#f8fafc" stroke="#3b82f6" strokeWidth="1.2" />
            <rect x="278" y="174" width="36" height="16" rx="1.5" fill="#dbeafe" />
            <text x="296" y="205" textAnchor="middle" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">Desktop</text>
            <text x="296" y="215" textAnchor="middle" fill="#3b82f6" fontSize="6" fontFamily="system-ui, sans-serif">(Wired)</text>
          </g>

          {/* Legend */}
          <g>
            <line x1="20" y1="170" x2="40" y2="170" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 3" />
            <text x="45" y="173" fill="#64748b" fontSize="7" fontFamily="system-ui, sans-serif">Coax / Fiber / DSL</text>

            <line x1="20" y1="185" x2="40" y2="185" stroke="#3b82f6" strokeWidth="2" />
            <text x="45" y="188" fill="#64748b" fontSize="7" fontFamily="system-ui, sans-serif">Ethernet (wired)</text>

            <line x1="20" y1="200" x2="40" y2="200" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 2" />
            <text x="45" y="203" fill="#64748b" fontSize="7" fontFamily="system-ui, sans-serif">Wi-Fi (wireless)</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
