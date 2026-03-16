"use client";

const STEPS = [
  { label: "You type\nexample.com", x: 10, color: "#3b82f6", icon: "browser" },
  { label: "DNS\nResolver", x: 125, color: "#8b5cf6", icon: "resolver" },
  { label: "Root\nServer", x: 240, color: "#f59e0b", icon: "server" },
  { label: "IP Address\n93.184.216.34", x: 355, color: "#22c55e", icon: "connect" },
];

export function DnsFlow() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          How DNS Resolution Works
        </p>
      </div>
      <div className="p-4">
        <svg
          viewBox="0 0 460 200"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {STEPS.map((step, i) => (
            <g key={step.label}>
              {/* Step container */}
              <rect
                x={step.x}
                y="20"
                width="95"
                height="70"
                rx="10"
                fill={step.color}
                opacity="0.06"
              />
              <rect
                x={step.x}
                y="20"
                width="95"
                height="70"
                rx="10"
                fill="none"
                stroke={step.color}
                strokeWidth="1.5"
              />

              {/* Icon area */}
              {step.icon === "browser" && (
                <g>
                  <rect x={step.x + 30} y="28" width="35" height="24" rx="3" fill="none" stroke={step.color} strokeWidth="1.5" />
                  <line x1={step.x + 30} y1="34" x2={step.x + 65} y2="34" stroke={step.color} strokeWidth="1" />
                  <circle cx={step.x + 34} cy="31" r="1.2" fill={step.color} />
                  <circle cx={step.x + 38} cy="31" r="1.2" fill={step.color} />
                  <rect x={step.x + 34} y="38" width="27" height="3" rx="1" fill={step.color} opacity="0.3" />
                  <rect x={step.x + 34} y="44" width="18" height="3" rx="1" fill={step.color} opacity="0.2" />
                </g>
              )}
              {step.icon === "resolver" && (
                <g>
                  <circle cx={step.x + 47} cy="40" r="12" fill="none" stroke={step.color} strokeWidth="1.5" />
                  <text x={step.x + 47} y="38" textAnchor="middle" fill={step.color} fontSize="6" fontWeight="700" fontFamily="system-ui, sans-serif">DNS</text>
                  <text x={step.x + 47} y="46" textAnchor="middle" fill={step.color} fontSize="5" fontFamily="system-ui, sans-serif">lookup</text>
                </g>
              )}
              {step.icon === "server" && (
                <g>
                  <rect x={step.x + 34} y="28" width="27" height="8" rx="2" fill={step.color} opacity="0.2" stroke={step.color} strokeWidth="1" />
                  <rect x={step.x + 34} y="38" width="27" height="8" rx="2" fill={step.color} opacity="0.2" stroke={step.color} strokeWidth="1" />
                  <rect x={step.x + 34} y="48" width="27" height="8" rx="2" fill={step.color} opacity="0.2" stroke={step.color} strokeWidth="1" />
                  <circle cx={step.x + 38} cy="32" r="1.5" fill={step.color} />
                  <circle cx={step.x + 38} cy="42" r="1.5" fill={step.color} />
                  <circle cx={step.x + 38} cy="52" r="1.5" fill={step.color} />
                </g>
              )}
              {step.icon === "connect" && (
                <g>
                  <circle cx={step.x + 47} cy="40" r="12" fill={step.color} opacity="0.15" />
                  <path d={`M ${step.x + 41} 40 L ${step.x + 45} 44 L ${step.x + 53} 36`} stroke={step.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </g>
              )}

              {/* Step label */}
              {step.label.split("\n").map((line, li) => (
                <text
                  key={li}
                  x={step.x + 47}
                  y={66 + li * 12}
                  textAnchor="middle"
                  fill={step.color}
                  fontSize="9"
                  fontWeight="600"
                  fontFamily="system-ui, sans-serif"
                >
                  {line}
                </text>
              ))}

              {/* Arrow to next step */}
              {i < STEPS.length - 1 && (
                <>
                  <line
                    x1={step.x + 95}
                    y1="55"
                    x2={STEPS[i + 1].x}
                    y2="55"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  <polygon
                    points={`${STEPS[i + 1].x - 1},55 ${STEPS[i + 1].x - 7},51 ${STEPS[i + 1].x - 7},59`}
                    fill="#94a3b8"
                  />
                </>
              )}
            </g>
          ))}

          {/* Description labels */}
          <text x="57" y="115" textAnchor="middle" fill="#64748b" fontSize="7.5" fontFamily="system-ui, sans-serif">Your browser</text>
          <text x="172" y="115" textAnchor="middle" fill="#64748b" fontSize="7.5" fontFamily="system-ui, sans-serif">Looks up the name</text>
          <text x="287" y="115" textAnchor="middle" fill="#64748b" fontSize="7.5" fontFamily="system-ui, sans-serif">Finds the record</text>
          <text x="402" y="115" textAnchor="middle" fill="#64748b" fontSize="7.5" fontFamily="system-ui, sans-serif">Connects you</text>

          {/* Warning box */}
          <rect x="30" y="135" width="400" height="50" rx="8" fill="#fef3c7" stroke="#fde68a" strokeWidth="1" />
          <text x="230" y="153" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif">
            If DNS fails, websites won&apos;t load even though your internet is connected.
          </text>
          <text x="230" y="168" textAnchor="middle" fill="#92400e" fontSize="8" fontFamily="system-ui, sans-serif">
            Fix: Try changing DNS to 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare)
          </text>
          <text x="230" y="180" textAnchor="middle" fill="#92400e" fontSize="7.5" fontFamily="system-ui, sans-serif">
            or run &quot;ipconfig /flushdns&quot; (Windows) / &quot;sudo dscacheutil -flushcache&quot; (Mac)
          </text>
        </svg>
      </div>
    </div>
  );
}
