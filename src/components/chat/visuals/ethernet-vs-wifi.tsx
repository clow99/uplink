"use client";

export function EthernetVsWifi() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Ethernet vs Wi-Fi
        </p>
      </div>
      <div className="grid grid-cols-2 divide-x">
        {/* Ethernet column */}
        <div className="p-4">
          <div className="mb-3 flex flex-col items-center">
            <svg width="90" height="60" viewBox="0 0 90 60">
              {/* Router */}
              <rect x="5" y="20" width="24" height="16" rx="3" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.2" />
              <line x1="12" y1="20" x2="12" y2="15" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="22" y1="20" x2="22" y2="16" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
              {/* Ethernet cable */}
              <path d="M29 28 Q45 28 45 24 Q45 20 60 20" stroke="#3b82f6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* RJ45 connector */}
              <rect x="28" y="24" width="6" height="8" rx="1" fill="#3b82f6" />
              {/* Laptop */}
              <rect x="58" y="12" width="28" height="20" rx="3" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.2" />
              <rect x="61" y="15" width="22" height="13" rx="1.5" fill="#dbeafe" />
              <rect x="54" y="32" width="36" height="3" rx="1.5" fill="#e2e8f0" />
              {/* Speed label */}
              <text x="45" y="50" textAnchor="middle" fill="#3b82f6" fontSize="7" fontWeight="700" fontFamily="system-ui, sans-serif">Direct Cable</text>
            </svg>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 28 28">
              <rect width="28" height="28" rx="6" fill="#dbeafe" />
              <rect x="6" y="10" width="16" height="9" rx="2" fill="#3b82f6" />
              <rect x="8" y="12" width="3" height="5" rx="0.5" fill="white" opacity="0.7" />
              <rect x="12.5" y="12" width="3" height="5" rx="0.5" fill="white" opacity="0.7" />
              <rect x="17" y="12" width="3" height="5" rx="0.5" fill="white" opacity="0.7" />
            </svg>
            <span className="text-sm font-semibold text-primary">Ethernet</span>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex gap-2">
              <span className="mt-0.5 text-primary">&#x2022;</span>
              Fastest, most stable connection
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-primary">&#x2022;</span>
              No interference or signal loss
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-primary">&#x2022;</span>
              Best for gaming and speed tests
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-primary">&#x2022;</span>
              Requires a cable to the router
            </li>
          </ul>
          <div className="mt-3 rounded-md bg-blue-50 p-2 text-[11px] text-blue-700">
            Use Ethernet to test if a problem is your Wi-Fi or your service.
          </div>
        </div>

        {/* Wi-Fi column */}
        <div className="p-4">
          <div className="mb-3 flex flex-col items-center">
            <svg width="90" height="60" viewBox="0 0 90 60">
              {/* Router */}
              <rect x="5" y="20" width="24" height="16" rx="3" fill="#1e293b" stroke="#22c55e" strokeWidth="1.2" />
              <line x1="12" y1="20" x2="12" y2="15" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="22" y1="20" x2="22" y2="16" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
              {/* Wi-Fi waves */}
              {[8, 14, 20].map((r, i) => (
                <path
                  key={r}
                  d={`M ${35 + i * 2} ${28 - r} A ${r} ${r} 0 0 1 ${35 + i * 2} ${28 + r}`}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="1.2"
                  opacity={0.5 - i * 0.12}
                />
              ))}
              {/* Phone */}
              <rect x="62" y="14" width="18" height="28" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.2" />
              <rect x="65" y="18" width="12" height="18" rx="1.5" fill="#dcfce7" />
              <line x1="68" y1="40" x2="74" y2="40" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
              {/* Signal bars on phone */}
              <rect x="67" y="27" width="2" height="5" rx="0.5" fill="#22c55e" />
              <rect x="70" y="25" width="2" height="7" rx="0.5" fill="#22c55e" />
              <rect x="73" y="23" width="2" height="9" rx="0.5" fill="#22c55e" />
              <text x="45" y="50" textAnchor="middle" fill="#22c55e" fontSize="7" fontWeight="700" fontFamily="system-ui, sans-serif">Wireless</text>
            </svg>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 28 28">
              <rect width="28" height="28" rx="6" fill="#dcfce7" />
              <path d="M14 20 a0.5 0.5 0 1 0 0.01 0" fill="#22c55e" />
              <path d="M9.5 15 a6.4 6.4 0 0 1 9 0" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M7 12 a10 10 0 0 1 14 0" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="text-sm font-semibold text-success">Wi-Fi</span>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex gap-2">
              <span className="mt-0.5 text-success">&#x2022;</span>
              Convenient, no cables needed
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-success">&#x2022;</span>
              Works anywhere in range
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-success">&#x2022;</span>
              Good for phones and tablets
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-success">&#x2022;</span>
              Subject to interference and range limits
            </li>
          </ul>
          <div className="mt-3 rounded-md bg-green-50 p-2 text-[11px] text-green-700">
            If Ethernet works but Wi-Fi doesn&apos;t, the issue is your router or signal.
          </div>
        </div>
      </div>
    </div>
  );
}
