"use client";

const TYPES = [
  {
    name: "Fiber",
    color: "#22c55e",
    download: "1-10 Gbps",
    upload: "1-10 Gbps",
    latency: "1-5 ms",
    reliability: "Excellent",
    barWidth: 180,
    connectorType: "SC/APC",
  },
  {
    name: "Cable",
    color: "#3b82f6",
    download: "100-1200 Mbps",
    upload: "5-50 Mbps",
    latency: "10-30 ms",
    reliability: "Good",
    barWidth: 110,
    connectorType: "Coax F-type",
  },
  {
    name: "DSL",
    color: "#a855f7",
    download: "5-100 Mbps",
    upload: "1-10 Mbps",
    latency: "20-50 ms",
    reliability: "Fair",
    barWidth: 50,
    connectorType: "RJ-11",
  },
];

function ConnectorIcon({ type, color }: { type: string; color: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill={color} opacity="0.1" />
      {type === "SC/APC" && (
        <>
          <rect x="10" y="12" width="12" height="8" rx="2" fill={color} />
          <line x1="22" y1="16" x2="26" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="26" cy="16" r="1" fill={color} />
        </>
      )}
      {type === "Coax F-type" && (
        <>
          <circle cx="16" cy="16" r="7" fill="none" stroke={color} strokeWidth="1.5" />
          <circle cx="16" cy="16" r="3" fill="none" stroke={color} strokeWidth="1" />
          <circle cx="16" cy="16" r="1" fill={color} />
        </>
      )}
      {type === "RJ-11" && (
        <>
          <rect x="9" y="11" width="14" height="10" rx="2" fill={color} opacity="0.3" />
          <rect x="9" y="11" width="14" height="10" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
          <rect x="12" y="13" width="2" height="6" rx="0.5" fill={color} />
          <rect x="16" y="13" width="2" height="6" rx="0.5" fill={color} />
          <rect x="20" y="13" width="2" height="6" rx="0.5" fill={color} />
        </>
      )}
    </svg>
  );
}

export function FiberVsDslVsCable() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Connection Types Compared
        </p>
      </div>
      <div className="p-4">
        <svg
          viewBox="0 0 440 240"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {TYPES.map((t, i) => {
            const y = 10 + i * 76;
            return (
              <g key={t.name}>
                {/* Row background */}
                <rect x="0" y={y} width="440" height="66" rx="8" fill={t.color} opacity="0.04" />
                <rect x="0" y={y} width="440" height="66" rx="8" fill="none" stroke={t.color} strokeWidth="1" opacity="0.25" />

                {/* Connector illustration */}
                {t.connectorType === "SC/APC" && (
                  <g>
                    <rect x="12" y={y + 14} width="30" height="14" rx="3" fill={t.color} opacity="0.15" stroke={t.color} strokeWidth="1" />
                    <line x1="42" y1={y + 21} x2="50" y2={y + 21} stroke={t.color} strokeWidth="2" strokeLinecap="round" />
                    <circle cx="51" cy={y + 21} r="2" fill={t.color} />
                    <rect x="12" y={y + 34} width="40" height="3" rx="1.5" fill={t.color} opacity="0.3" />
                    <text x="32" y={y + 44} textAnchor="middle" fill={t.color} fontSize="5" fontFamily="system-ui, sans-serif">{t.connectorType}</text>
                  </g>
                )}
                {t.connectorType === "Coax F-type" && (
                  <g>
                    <circle cx="32" cy={y + 22} r="10" fill="none" stroke={t.color} strokeWidth="1.5" />
                    <circle cx="32" cy={y + 22} r="5" fill="none" stroke={t.color} strokeWidth="1" />
                    <circle cx="32" cy={y + 22} r="1.5" fill={t.color} />
                    <rect x="12" y={y + 38} width="40" height="3" rx="1.5" fill={t.color} opacity="0.3" />
                    <text x="32" y={y + 48} textAnchor="middle" fill={t.color} fontSize="5" fontFamily="system-ui, sans-serif">{t.connectorType}</text>
                  </g>
                )}
                {t.connectorType === "RJ-11" && (
                  <g>
                    <rect x="18" y={y + 14} width="28" height="16" rx="3" fill={t.color} opacity="0.1" stroke={t.color} strokeWidth="1.5" />
                    <rect x="23" y={y + 17} width="3" height="10" rx="0.5" fill={t.color} opacity="0.5" />
                    <rect x="29" y={y + 17} width="3" height="10" rx="0.5" fill={t.color} opacity="0.5" />
                    <rect x="35" y={y + 17} width="3" height="10" rx="0.5" fill={t.color} opacity="0.5" />
                    <rect x="12" y={y + 38} width="40" height="3" rx="1.5" fill={t.color} opacity="0.3" />
                    <text x="32" y={y + 48} textAnchor="middle" fill={t.color} fontSize="5" fontFamily="system-ui, sans-serif">{t.connectorType}</text>
                  </g>
                )}

                {/* Name */}
                <text x="68" y={y + 22} fill={t.color} fontSize="14" fontWeight="700" fontFamily="system-ui, sans-serif">{t.name}</text>

                {/* Speed info */}
                <text x="68" y={y + 38} fill="#64748b" fontSize="8" fontFamily="system-ui, sans-serif">
                  DL: {t.download}
                </text>
                <text x="68" y={y + 50} fill="#64748b" fontSize="8" fontFamily="system-ui, sans-serif">
                  UL: {t.upload}
                </text>

                {/* Speed bar */}
                <text x="235" y={y + 18} fill="#64748b" fontSize="8" fontFamily="system-ui, sans-serif">Speed</text>
                <rect x="235" y={y + 24} width="190" height="8" rx="4" fill="#e2e8f0" />
                <rect x="235" y={y + 24} width={t.barWidth} height="8" rx="4" fill={t.color} />

                {/* Latency and reliability */}
                <text x="235" y={y + 48} fill="#64748b" fontSize="8" fontFamily="system-ui, sans-serif">
                  Latency: {t.latency}
                </text>
                <text x="350" y={y + 48} fill={t.color} fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">
                  {t.reliability}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
