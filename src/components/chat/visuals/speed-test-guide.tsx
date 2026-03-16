"use client";

const STEPS = [
  { num: 1, text: "Connect via Ethernet cable for accuracy" },
  { num: 2, text: "Close all other apps and downloads" },
  { num: 3, text: "Go to fast.com or speedtest.net" },
  { num: 4, text: "Run the test and note your results" },
];

export function SpeedTestGuide() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          How to Run an Accurate Speed Test
        </p>
      </div>
      <div className="p-4">
        <div className="mb-4 flex items-center justify-center">
          <svg
            viewBox="0 0 260 140"
            width="260"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Laptop illustration */}
            <rect x="65" y="10" width="130" height="85" rx="6" fill="#1e293b" />
            <rect x="65" y="10" width="130" height="85" rx="6" fill="none" stroke="#475569" strokeWidth="1.5" />

            {/* Screen */}
            <rect x="72" y="17" width="116" height="65" rx="3" fill="#0f172a" />

            {/* Gauge on screen */}
            <path
              d="M 100 68 A 30 30 0 0 1 160 68"
              fill="none"
              stroke="#334155"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 100 68 A 30 30 0 0 1 152 46"
              fill="none"
              stroke="url(#screenSpeedGradient)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="screenSpeedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>

            {/* Needle */}
            <line x1="130" y1="68" x2="150" y2="50" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="130" cy="68" r="3" fill="white" />

            {/* Speed text on screen */}
            <text x="130" y="60" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">Mbps</text>

            {/* Webcam dot */}
            <circle cx="130" cy="13" r="1.5" fill="#475569" />

            {/* Laptop base */}
            <rect x="55" y="95" width="150" height="6" rx="3" fill="#334155" />
            <rect x="55" y="95" width="150" height="6" rx="3" fill="none" stroke="#475569" strokeWidth="1" />

            {/* Ethernet cable going to laptop */}
            <path d="M50 60 Q58 60 65 55" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" />
            <rect x="35" y="54" width="16" height="12" rx="2" fill="#3b82f6" />
            <rect x="38" y="57" width="4" height="6" rx="0.5" fill="white" opacity="0.5" />
            <rect x="44" y="57" width="4" height="6" rx="0.5" fill="white" opacity="0.5" />
            <text x="43" y="78" textAnchor="middle" fill="#3b82f6" fontSize="6" fontFamily="system-ui, sans-serif">Ethernet</text>

            {/* Results below */}
            <g>
              <rect x="30" y="110" width="60" height="24" rx="4" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="0.8" />
              <text x="60" y="120" textAnchor="middle" fill="#64748b" fontSize="5.5" fontFamily="system-ui, sans-serif">Download</text>
              <text x="60" y="130" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif">250 Mbps</text>
            </g>
            <g>
              <rect x="100" y="110" width="60" height="24" rx="4" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="0.8" />
              <text x="130" y="120" textAnchor="middle" fill="#64748b" fontSize="5.5" fontFamily="system-ui, sans-serif">Upload</text>
              <text x="130" y="130" textAnchor="middle" fill="#3b82f6" fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif">25 Mbps</text>
            </g>
            <g>
              <rect x="170" y="110" width="60" height="24" rx="4" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="0.8" />
              <text x="200" y="120" textAnchor="middle" fill="#64748b" fontSize="5.5" fontFamily="system-ui, sans-serif">Ping</text>
              <text x="200" y="130" textAnchor="middle" fill="#8b5cf6" fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif">12 ms</text>
            </g>
          </svg>
        </div>

        <div className="space-y-2">
          {STEPS.map((step) => (
            <div key={step.num} className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {step.num}
              </span>
              <p className="text-xs text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-md bg-blue-50 p-2.5">
          <p className="text-[11px] font-medium text-blue-800">
            Always test with Ethernet first. Wi-Fi speed tests show your wireless performance,
            not your actual internet speed.
          </p>
        </div>
      </div>
    </div>
  );
}
