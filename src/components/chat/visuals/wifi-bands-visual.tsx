"use client";

export function WifiBandsVisual() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Wi-Fi Bands Compared
        </p>
      </div>
      <div className="p-4">
        <svg
          viewBox="0 0 460 280"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* === 2.4 GHz Section === */}
          <text x="120" y="18" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="700" fontFamily="system-ui, sans-serif">2.4 GHz</text>

          {/* House outline with rooms */}
          <rect x="20" y="30" width="200" height="130" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
          {/* Room dividers */}
          <line x1="90" y1="30" x2="90" y2="100" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="150" y1="60" x2="150" y2="160" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="90" y1="100" x2="150" y2="100" stroke="#e2e8f0" strokeWidth="1" />

          {/* Range circles - large (penetrates walls) */}
          <circle cx="55" cy="65" r="85" fill="#dbeafe" opacity="0.15" stroke="#93c5fd" strokeWidth="0.8" strokeDasharray="4 2" />
          <circle cx="55" cy="65" r="55" fill="#dbeafe" opacity="0.2" />
          <circle cx="55" cy="65" r="30" fill="#dbeafe" opacity="0.25" />

          {/* Router */}
          <rect x="43" y="57" width="24" height="16" rx="3" fill="#3b82f6" />
          <line x1="50" y1="57" x2="50" y2="50" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="60" y1="57" x2="60" y2="48" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />

          {/* Devices with signal - all connected */}
          {[
            { x: 120, y: 70, label: "Laptop", connected: true },
            { x: 170, y: 130, label: "Phone", connected: true },
            { x: 60, y: 140, label: "Tablet", connected: true },
          ].map((d) => (
            <g key={`24-${d.label}`}>
              <rect x={d.x - 14} y={d.y - 8} width="28" height="16" rx="3" fill="#f0f9ff" stroke="#93c5fd" strokeWidth="0.8" />
              <text x={d.x} y={d.y + 3} textAnchor="middle" fill="#2563eb" fontSize="6" fontFamily="system-ui, sans-serif">{d.label}</text>
              <circle cx={d.x + 16} cy={d.y - 6} r="3" fill="#22c55e" />
            </g>
          ))}

          {/* Wall penetration arrows */}
          <path d="M90 65 L105 65" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />
          <text x="98" y="58" textAnchor="middle" fill="#3b82f6" fontSize="5.5" fontFamily="system-ui, sans-serif">Through wall</text>

          {/* Labels */}
          <text x="120" y="175" textAnchor="middle" fill="#2563eb" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif">Longer Range</text>
          <text x="120" y="186" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="system-ui, sans-serif">Penetrates walls better</text>

          {/* === 5 GHz Section === */}
          <text x="350" y="18" textAnchor="middle" fill="#16a34a" fontSize="13" fontWeight="700" fontFamily="system-ui, sans-serif">5 GHz</text>

          {/* House outline with rooms */}
          <rect x="250" y="30" width="200" height="130" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="320" y1="30" x2="320" y2="100" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="380" y1="60" x2="380" y2="160" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="320" y1="100" x2="380" y2="100" stroke="#e2e8f0" strokeWidth="1" />

          {/* Range circles - small (blocked by walls) */}
          <circle cx="285" cy="65" r="45" fill="#dcfce7" opacity="0.2" stroke="#86efac" strokeWidth="0.8" strokeDasharray="4 2" />
          <circle cx="285" cy="65" r="25" fill="#dcfce7" opacity="0.3" />

          {/* Router */}
          <rect x="273" y="57" width="24" height="16" rx="3" fill="#22c55e" />
          <line x1="280" y1="57" x2="280" y2="50" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="290" y1="57" x2="290" y2="48" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />

          {/* Devices - some disconnected beyond walls */}
          <g>
            <rect x="286" y="90" width="28" height="16" rx="3" fill="#f0fdf4" stroke="#86efac" strokeWidth="0.8" />
            <text x="300" y="101" textAnchor="middle" fill="#16a34a" fontSize="6" fontFamily="system-ui, sans-serif">Laptop</text>
            <circle cx="316" cy="92" r="3" fill="#22c55e" />
          </g>
          <g>
            <rect x="386" y="122" width="28" height="16" rx="3" fill="#fef2f2" stroke="#fca5a5" strokeWidth="0.8" />
            <text x="400" y="133" textAnchor="middle" fill="#dc2626" fontSize="6" fontFamily="system-ui, sans-serif">Phone</text>
            <circle cx="416" cy="124" r="3" fill="#ef4444" />
          </g>
          <g>
            <rect x="276" y="132" width="28" height="16" rx="3" fill="#f0fdf4" stroke="#86efac" strokeWidth="0.8" />
            <text x="290" y="143" textAnchor="middle" fill="#16a34a" fontSize="6" fontFamily="system-ui, sans-serif">Tablet</text>
            <circle cx="306" cy="134" r="3" fill="#22c55e" />
          </g>

          {/* Wall block indicator */}
          <line x1="320" y1="65" x2="335" y2="65" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="327" y1="58" x2="327" y2="72" stroke="#ef4444" strokeWidth="2" />
          <text x="328" y="54" textAnchor="middle" fill="#ef4444" fontSize="5.5" fontFamily="system-ui, sans-serif">Blocked</text>

          <text x="350" y="175" textAnchor="middle" fill="#16a34a" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif">Shorter Range</text>
          <text x="350" y="186" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="system-ui, sans-serif">Much faster speeds</text>

          {/* === VS Divider === */}
          <text x="230" y="100" textAnchor="middle" fill="#cbd5e1" fontSize="18" fontWeight="700" fontFamily="system-ui, sans-serif">vs</text>

          {/* === Comparison bars === */}
          <rect x="20" y="200" width="420" height="70" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

          {/* Speed comparison */}
          <text x="40" y="218" fill="#64748b" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">Speed</text>
          <rect x="90" y="210" width="140" height="10" rx="5" fill="#e2e8f0" />
          <rect x="90" y="210" width="40" height="10" rx="5" fill="#3b82f6" />
          <text x="140" y="218" fill="#64748b" fontSize="7" fontFamily="system-ui, sans-serif">50-100 Mbps</text>

          <rect x="280" y="210" width="140" height="10" rx="5" fill="#e2e8f0" />
          <rect x="280" y="210" width="120" height="10" rx="5" fill="#22c55e" />
          <text x="410" y="218" fill="#64748b" fontSize="7" fontFamily="system-ui, sans-serif">200-800 Mbps</text>

          {/* Range comparison */}
          <text x="40" y="240" fill="#64748b" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">Range</text>
          <rect x="90" y="232" width="140" height="10" rx="5" fill="#e2e8f0" />
          <rect x="90" y="232" width="120" height="10" rx="5" fill="#3b82f6" />
          <text x="220" y="240" fill="#64748b" fontSize="7" fontFamily="system-ui, sans-serif">~45m / 150ft</text>

          <rect x="280" y="232" width="140" height="10" rx="5" fill="#e2e8f0" />
          <rect x="280" y="232" width="50" height="10" rx="5" fill="#22c55e" />
          <text x="340" y="240" fill="#64748b" fontSize="7" fontFamily="system-ui, sans-serif">~15m / 50ft</text>

          {/* Interference */}
          <text x="40" y="260" fill="#64748b" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">Crowding</text>
          <text x="160" y="260" textAnchor="middle" fill="#f59e0b" fontSize="7.5" fontWeight="600" fontFamily="system-ui, sans-serif">More crowded</text>
          <text x="350" y="260" textAnchor="middle" fill="#22c55e" fontSize="7.5" fontWeight="600" fontFamily="system-ui, sans-serif">Less interference</text>

          {/* Arrow marker definition */}
          <defs>
            <marker id="arrowBlue" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
              <polygon points="0 0, 6 2, 0 4" fill="#3b82f6" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
}
