"use client";

export function ModemVsRouter() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-5 py-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Modem vs Router
        </p>
      </div>
      <div className="grid grid-cols-2 divide-x">
        {/* Modem column */}
        <div className="p-5">
          <div className="mb-4 flex flex-col items-center">
            <svg width="80" height="70" viewBox="0 0 80 70">
              {/* Modem body */}
              <rect x="15" y="10" width="50" height="40" rx="6" fill="#1e293b" />
              <rect x="15" y="10" width="50" height="40" rx="6" fill="none" stroke="#475569" strokeWidth="1.5" />
              {/* LEDs */}
              <circle cx="26" cy="24" r="3" fill="#22c55e" />
              <circle cx="35" cy="24" r="3" fill="#22c55e" />
              <circle cx="44" cy="24" r="3" fill="#22c55e" />
              <circle cx="53" cy="24" r="3" fill="#3b82f6">
                <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
              </circle>
              {/* Port labels */}
              <rect x="22" y="35" width="12" height="8" rx="1.5" fill="#334155" />
              <rect x="38" y="35" width="12" height="8" rx="1.5" fill="#334155" />
              <rect x="54" y="35" width="8" height="8" rx="1.5" fill="#334155" />
              {/* Coax cable */}
              <path d="M10 30 Q14 30 15 28" stroke="#f59e0b" strokeWidth="2" fill="none" strokeLinecap="round" />
              <circle cx="8" cy="30" r="3" fill="#f59e0b" opacity="0.3" />
              <circle cx="8" cy="30" r="1.5" fill="#f59e0b" />
              <text x="40" y="62" textAnchor="middle" fill="#3b82f6" fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif">Modem</text>
            </svg>
          </div>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="mt-0.5 text-primary">&#x2022;</span>
              Connects to your ISP
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-primary">&#x2022;</span>
              Translates the ISP signal
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-primary">&#x2022;</span>
              Usually 1 Ethernet port
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-primary">&#x2022;</span>
              No Wi-Fi on its own
            </li>
          </ul>
          <div className="mt-4 rounded-md bg-blue-50 p-2.5 text-xs text-blue-700">
            If the modem is offline, nothing works.
          </div>
        </div>

        {/* Router column */}
        <div className="p-5">
          <div className="mb-4 flex flex-col items-center">
            <svg width="80" height="70" viewBox="0 0 80 70">
              {/* Router body */}
              <rect x="15" y="22" width="50" height="28" rx="6" fill="#1e293b" />
              <rect x="15" y="22" width="50" height="28" rx="6" fill="none" stroke="#22c55e" strokeWidth="1.5" />
              {/* Antennas */}
              <line x1="25" y1="22" x2="22" y2="8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <circle cx="22" cy="6" r="2" fill="#22c55e" />
              <line x1="40" y1="22" x2="40" y2="6" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <circle cx="40" cy="4" r="2" fill="#22c55e" />
              <line x1="55" y1="22" x2="58" y2="8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <circle cx="58" cy="6" r="2" fill="#22c55e" />
              {/* LEDs */}
              <circle cx="26" cy="32" r="2" fill="#22c55e" />
              <circle cx="33" cy="32" r="2" fill="#22c55e" />
              {/* Ports */}
              <rect x="22" y="40" width="10" height="6" rx="1" fill="#f59e0b" />
              <rect x="35" y="40" width="10" height="6" rx="1" fill="#334155" />
              <rect x="48" y="40" width="10" height="6" rx="1" fill="#334155" />
              {/* Wi-Fi waves */}
              {[8, 13, 18].map((r, i) => (
                <path
                  key={r}
                  d={`M ${65 + i} ${36 - r} A ${r} ${r} 0 0 1 ${65 + i} ${36 + r}`}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="1"
                  opacity={0.5 - i * 0.12}
                />
              ))}
              <text x="40" y="62" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif">Router</text>
            </svg>
          </div>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="mt-0.5 text-success">&#x2022;</span>
              Creates your Wi-Fi network
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-success">&#x2022;</span>
              Shares connection to devices
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-success">&#x2022;</span>
              Multiple Ethernet ports
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-success">&#x2022;</span>
              Assigns local IP addresses
            </li>
          </ul>
          <div className="mt-4 rounded-md bg-green-50 p-2.5 text-xs text-green-700">
            If the router is off, Wi-Fi stops but modem may still be online.
          </div>
        </div>
      </div>
    </div>
  );
}
