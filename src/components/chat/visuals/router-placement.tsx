"use client";

const TIPS = [
  {
    icon: "center",
    title: "Central location",
    description: "Place in the center of your home for even coverage",
    good: true,
  },
  {
    icon: "elevated",
    title: "Elevated position",
    description: "Put on a shelf or mount on a wall, not on the floor",
    good: true,
  },
  {
    icon: "open",
    title: "Open space",
    description: "Keep away from metal objects, thick walls, and corners",
    good: true,
  },
  {
    icon: "interference",
    title: "Away from interference",
    description: "Keep away from microwaves, baby monitors, and cordless phones",
    good: true,
  },
  {
    icon: "closet",
    title: "Not in a closet",
    description: "Enclosed spaces block signal significantly",
    good: false,
  },
  {
    icon: "floor",
    title: "Not on the floor",
    description: "Floor placement wastes signal downward",
    good: false,
  },
];

export function RouterPlacement() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/50 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Router Placement Guide
        </p>
      </div>
      <div className="p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/router-placement.png"
          alt="House floor plan showing optimal Wi-Fi router placement in center"
          className="mb-3 w-full rounded-lg"
        />

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
