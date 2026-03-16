"use client";

const TIPS = [
  {
    title: "Space nodes evenly",
    description: "Place mesh nodes 1-2 rooms apart for overlapping coverage",
    good: true,
  },
  {
    title: "Line of sight helps",
    description: "Fewer walls between nodes means stronger backhaul signal",
    good: true,
  },
  {
    title: "Elevated placement",
    description: "Put nodes on shelves or tables, not on the floor",
    good: true,
  },
  {
    title: "Main node near modem",
    description: "Connect the primary node to your modem via Ethernet",
    good: true,
  },
  {
    title: "Avoid stacking in one room",
    description: "Nodes too close together waste coverage and cause interference",
    good: false,
  },
  {
    title: "Don't hide behind furniture",
    description: "Large metal objects and fish tanks block Wi-Fi signal",
    good: false,
  },
];

export function MeshNetwork() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Mesh Network Setup Guide
        </p>
      </div>
      <div className="p-4">
        <svg
          viewBox="0 0 420 200"
          className="mb-3 w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* House outline */}
          <rect x="20" y="10" width="380" height="180" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* Room dividers */}
          <line x1="160" y1="10" x2="160" y2="120" stroke="#e2e8f0" strokeWidth="1.5" />
          <line x1="290" y1="70" x2="290" y2="190" stroke="#e2e8f0" strokeWidth="1.5" />
          <line x1="160" y1="120" x2="290" y2="120" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* Room labels */}
          <text x="90" y="180" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="system-ui, sans-serif">Living Room</text>
          <text x="225" y="28" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="system-ui, sans-serif">Kitchen</text>
          <text x="355" y="28" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="system-ui, sans-serif">Bedroom</text>
          <text x="225" y="180" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="system-ui, sans-serif">Office</text>
          <text x="355" y="180" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="system-ui, sans-serif">Bathroom</text>

          {/* Signal coverage gradients */}
          <defs>
            <radialGradient id="mesh1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="mesh2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="mesh3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="90" cy="70" r="80" fill="url(#mesh1)" />
          <circle cx="225" cy="65" r="70" fill="url(#mesh2)" />
          <circle cx="355" cy="145" r="65" fill="url(#mesh3)" />

          {/* Connection lines between nodes */}
          <line x1="90" y1="70" x2="225" y2="65" stroke="#22c55e" strokeWidth="2" strokeDasharray="5 3" opacity="0.4" />
          <line x1="225" y1="65" x2="355" y2="145" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 3" opacity="0.4" />

          {/* Modem + Ethernet to main node */}
          <rect x="38" y="30" width="24" height="16" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <circle cx="44" cy="38" r="1.5" fill="#22c55e" />
          <circle cx="50" cy="38" r="1.5" fill="#22c55e" />
          <circle cx="56" cy="38" r="1.5" fill="#22c55e" />
          <text x="50" y="56" textAnchor="middle" fill="#64748b" fontSize="6" fontFamily="system-ui, sans-serif">Modem</text>
          <line x1="62" y1="38" x2="78" y2="58" stroke="#3b82f6" strokeWidth="1.5" />

          {/* Main node */}
          <circle cx="90" cy="70" r="14" fill="#22c55e" opacity="0.12" />
          <rect x="82" y="64" width="16" height="10" rx="3" fill="#22c55e" />
          <line x1="87" y1="64" x2="87" y2="58" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="93" y1="64" x2="93" y2="59" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
          <text x="90" y="90" textAnchor="middle" fill="#22c55e" fontSize="7" fontWeight="600" fontFamily="system-ui, sans-serif">Main Node</text>

          {/* Second node */}
          <circle cx="225" cy="65" r="14" fill="#3b82f6" opacity="0.12" />
          <rect x="217" y="59" width="16" height="10" rx="3" fill="#3b82f6" />
          <line x1="222" y1="59" x2="222" y2="53" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="228" y1="59" x2="228" y2="54" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
          <text x="225" y="85" textAnchor="middle" fill="#3b82f6" fontSize="7" fontWeight="600" fontFamily="system-ui, sans-serif">Node 2</text>

          {/* Third node */}
          <circle cx="355" cy="145" r="14" fill="#8b5cf6" opacity="0.12" />
          <rect x="347" y="139" width="16" height="10" rx="3" fill="#8b5cf6" />
          <line x1="352" y1="139" x2="352" y2="133" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="358" y1="139" x2="358" y2="134" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
          <text x="355" y="165" textAnchor="middle" fill="#8b5cf6" fontSize="7" fontWeight="600" fontFamily="system-ui, sans-serif">Node 3</text>

          {/* Devices connected to nodes */}
          {/* Living room devices */}
          <rect x="55" y="110" width="22" height="14" rx="3" fill="#f8fafc" stroke="#22c55e" strokeWidth="0.8" />
          <text x="66" y="120" textAnchor="middle" fill="#475569" fontSize="5" fontFamily="system-ui, sans-serif">TV</text>
          <rect x="105" y="110" width="22" height="14" rx="3" fill="#f8fafc" stroke="#22c55e" strokeWidth="0.8" />
          <text x="116" y="120" textAnchor="middle" fill="#475569" fontSize="5" fontFamily="system-ui, sans-serif">Phone</text>

          {/* Kitchen device */}
          <rect x="195" y="95" width="22" height="14" rx="3" fill="#f8fafc" stroke="#3b82f6" strokeWidth="0.8" />
          <text x="206" y="105" textAnchor="middle" fill="#475569" fontSize="5" fontFamily="system-ui, sans-serif">Tablet</text>

          {/* Bedroom device */}
          <rect x="330" y="105" width="22" height="14" rx="3" fill="#f8fafc" stroke="#8b5cf6" strokeWidth="0.8" />
          <text x="341" y="115" textAnchor="middle" fill="#475569" fontSize="5" fontFamily="system-ui, sans-serif">Laptop</text>
        </svg>

        <div className="grid grid-cols-1 gap-2">
          {TIPS.map((tip) => (
            <div
              key={tip.title}
              className="flex items-start gap-2 rounded-lg border p-2.5"
            >
              <span
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                  tip.good ? "bg-success" : "bg-destructive"
                }`}
              >
                {tip.good ? "\u2713" : "\u2717"}
              </span>
              <div>
                <p className="text-xs font-medium">{tip.title}</p>
                <p className="text-[10px] text-muted-foreground">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
