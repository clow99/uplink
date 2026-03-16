"use client";

export function NatPortForwarding() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-5 py-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          NAT & Port Forwarding
        </p>
      </div>
      <div className="p-4">
        <svg
          viewBox="0 0 460 340"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* --- NAT Section --- */}
          <text x="230" y="16" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
            How NAT Works
          </text>

          {/* Local devices with icons */}
          {[
            { label: "Phone", ip: "192.168.1.10", y: 40 },
            { label: "Laptop", ip: "192.168.1.20", y: 80 },
            { label: "TV", ip: "192.168.1.30", y: 120 },
          ].map((d) => (
            <g key={d.label}>
              <rect x="10" y={d.y} width="105" height="28" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
              {/* Device icon */}
              {d.label === "Phone" && (
                <rect x="16" y={d.y + 6} width="10" height="16" rx="2" fill="none" stroke="#1e40af" strokeWidth="1.2" />
              )}
              {d.label === "Laptop" && (
                <g>
                  <rect x="14" y={d.y + 6} width="14" height="10" rx="1.5" fill="none" stroke="#1e40af" strokeWidth="1.2" />
                  <rect x="12" y={d.y + 16} width="18" height="2" rx="1" fill="#1e40af" opacity="0.3" />
                </g>
              )}
              {d.label === "TV" && (
                <g>
                  <rect x="14" y={d.y + 5} width="14" height="10" rx="1.5" fill="none" stroke="#1e40af" strokeWidth="1.2" />
                  <rect x="18" y={d.y + 15} width="6" height="3" rx="1" fill="#1e40af" opacity="0.3" />
                </g>
              )}
              <text x="68" y={d.y + 13} textAnchor="middle" fill="#1e40af" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif">
                {d.label}
              </text>
              <text x="68" y={d.y + 23} textAnchor="middle" fill="#3b82f6" fontSize="7.5" fontFamily="system-ui, sans-serif">
                {d.ip}
              </text>
              <line x1="115" y1={d.y + 14} x2="165" y2="94" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="4 2" />
            </g>
          ))}

          {/* Router / NAT box */}
          <rect x="165" y="60" width="100" height="68" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          {/* Router antennas */}
          <line x1="195" y1="60" x2="193" y2="52" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="215" y1="60" x2="215" y2="50" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="235" y1="60" x2="237" y2="52" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
          <text x="215" y="82" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="system-ui, sans-serif">Router</text>
          <rect x="180" y="88" width="70" height="20" rx="4" fill="#334155" />
          <text x="215" y="101" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">
            NAT
          </text>
          <text x="215" y="122" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="system-ui, sans-serif">
            Translates addresses
          </text>

          {/* Arrow to internet */}
          <line x1="265" y1="94" x2="330" y2="94" stroke="#22c55e" strokeWidth="2" />
          <polygon points="330,94 323,89 323,99" fill="#22c55e" />
          <text x="298" y="86" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="system-ui, sans-serif">
            Single public IP
          </text>

          {/* Internet cloud */}
          <ellipse cx="390" cy="94" rx="55" ry="32" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.2" />
          <ellipse cx="375" cy="78" rx="14" ry="9" fill="#f0fdf4" />
          <ellipse cx="405" cy="78" rx="12" ry="8" fill="#f0fdf4" />
          <text x="390" y="91" textAnchor="middle" fill="#16a34a" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
            Internet
          </text>
          <text x="390" y="103" textAnchor="middle" fill="#4ade80" fontSize="7.5" fontFamily="system-ui, sans-serif">
            73.42.198.5
          </text>

          {/* Divider */}
          <line x1="20" y1="165" x2="440" y2="165" stroke="#e2e8f0" strokeWidth="1" />

          {/* --- Port Forwarding Section --- */}
          <text x="230" y="185" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
            Port Forwarding
          </text>

          {/* Internet source */}
          <ellipse cx="70" cy="265" rx="50" ry="28" fill="#faf5ff" stroke="#c4b5fd" strokeWidth="1.2" />
          <text x="70" y="262" textAnchor="middle" fill="#7c3aed" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif">
            Incoming
          </text>
          <text x="70" y="274" textAnchor="middle" fill="#a78bfa" fontSize="7.5" fontFamily="system-ui, sans-serif">
            Port 3074
          </text>

          {/* Arrow to router */}
          <line x1="120" y1="265" x2="185" y2="265" stroke="#8b5cf6" strokeWidth="2" />
          <polygon points="185,265 178,260 178,270" fill="#8b5cf6" />

          {/* Router box */}
          <rect x="185" y="240" width="90" height="50" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <text x="230" y="258" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="system-ui, sans-serif">Router</text>
          <text x="230" y="272" textAnchor="middle" fill="#f59e0b" fontSize="7.5" fontWeight="600" fontFamily="system-ui, sans-serif">
            Port 3074 &rarr; .50
          </text>
          <text x="230" y="284" textAnchor="middle" fill="#64748b" fontSize="6.5" fontFamily="system-ui, sans-serif">
            Forward rule
          </text>

          {/* Forwarded device */}
          <line x1="275" y1="255" x2="340" y2="230" stroke="#22c55e" strokeWidth="2" />
          <polygon points="340,230 332,229 335,237" fill="#22c55e" />

          {/* Blocked device */}
          <line x1="275" y1="275" x2="340" y2="300" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5" />

          {/* Target device (game console) */}
          <rect x="340" y="210" width="110" height="36" rx="6" fill="#dcfce7" stroke="#86efac" strokeWidth="1" />
          {/* Console icon */}
          <rect x="348" y="218" width="18" height="12" rx="3" fill="#22c55e" opacity="0.3" />
          <circle cx="353" cy="224" r="1.5" fill="#166534" />
          <circle cx="360" cy="224" r="1.5" fill="#166534" />
          <text x="400" y="226" textAnchor="middle" fill="#166534" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif">
            Game Console
          </text>
          <text x="395" y="238" textAnchor="middle" fill="#22c55e" fontSize="7.5" fontFamily="system-ui, sans-serif">
            192.168.1.50
          </text>

          {/* Other device (blocked) */}
          <rect x="340" y="282" width="110" height="36" rx="6" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" opacity="0.6" />
          <text x="395" y="298" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif" opacity="0.6">
            Other Devices
          </text>
          <text x="395" y="310" textAnchor="middle" fill="#ef4444" fontSize="7.5" fontFamily="system-ui, sans-serif" opacity="0.6">
            Not forwarded
          </text>

          {/* Legend */}
          <rect x="10" y="200" width="130" height="22" rx="4" fill="#f0fdf4" />
          <circle cx="22" cy="211" r="4" fill="#22c55e" />
          <text x="30" y="214" fill="#166534" fontSize="7.5" fontFamily="system-ui, sans-serif">
            Traffic forwarded
          </text>
          <rect x="10" y="225" width="130" height="22" rx="4" fill="#fef2f2" />
          <circle cx="22" cy="236" r="4" fill="#ef4444" opacity="0.5" />
          <text x="30" y="239" fill="#991b1b" fontSize="7.5" fontFamily="system-ui, sans-serif">
            Traffic blocked (default)
          </text>
        </svg>
      </div>
    </div>
  );
}
