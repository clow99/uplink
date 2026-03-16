"use client";

const CABLES = [
  {
    name: "Ethernet (RJ45)",
    color: "#3b82f6",
    use: "Router to device, Modem to Router",
    tip: "Best for speed tests and gaming",
    shape: "rect" as const,
  },
  {
    name: "Coaxial",
    color: "#f59e0b",
    use: "Wall outlet to cable modem",
    tip: "Round connector with center pin",
    shape: "circle" as const,
  },
  {
    name: "Fiber Optic",
    color: "#22c55e",
    use: "Wall outlet to ONT",
    tip: "Small square connector, do not bend",
    shape: "diamond" as const,
  },
  {
    name: "Phone / DSL",
    color: "#a855f7",
    use: "Wall jack to DSL modem",
    tip: "Looks like small Ethernet (RJ11)",
    shape: "rect" as const,
  },
];

export function CableTypesGuide() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Cable Types Identification
        </p>
      </div>
      <div className="p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/cable-types.png"
          alt="Ethernet, Coaxial, and Fiber Optic cable connectors"
          className="mb-4 w-full rounded-lg"
        />
      </div>
      <div className="grid grid-cols-1 gap-2 px-4 pb-4">
        {CABLES.map((cable) => (
          <div
            key={cable.name}
            className="flex items-start gap-3 rounded-lg border p-3"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" className="shrink-0">
              <rect width="32" height="32" rx="6" fill={cable.color} opacity="0.1" />
              {cable.shape === "rect" && (
                <rect
                  x="8"
                  y="11"
                  width="16"
                  height="10"
                  rx="2"
                  fill={cable.color}
                />
              )}
              {cable.shape === "circle" && (
                <>
                  <circle cx="16" cy="16" r="8" fill={cable.color} />
                  <circle cx="16" cy="16" r="2" fill="white" />
                </>
              )}
              {cable.shape === "diamond" && (
                <rect
                  x="10"
                  y="10"
                  width="12"
                  height="12"
                  rx="2"
                  fill={cable.color}
                  transform="rotate(45 16 16)"
                />
              )}
            </svg>
            <div className="min-w-0">
              <p className="text-xs font-semibold" style={{ color: cable.color }}>
                {cable.name}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {cable.use}
              </p>
              <p className="mt-0.5 text-[10px] italic text-muted-foreground/70">
                {cable.tip}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
