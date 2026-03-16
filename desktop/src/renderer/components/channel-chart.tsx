import type { ChannelCongestion } from "../../shared/types";

interface ChannelChartProps {
  congestion: Record<number, ChannelCongestion>;
  recommendedChannel: number | null;
}

const CHANNELS_2G = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const CHANNELS_5G = [36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 149, 153, 157, 161, 165];

function BarGroup({
  channels,
  congestion,
  recommendedChannel,
  label,
}: {
  channels: number[];
  congestion: Record<number, ChannelCongestion>;
  recommendedChannel: number | null;
  label: string;
}) {
  const maxCount = Math.max(
    1,
    ...channels.map((ch) => congestion[ch]?.count ?? 0),
  );

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-medium text-muted-foreground">{label}</h4>
      <div className="flex items-end gap-1" style={{ height: 120 }}>
        {channels.map((ch) => {
          const count = congestion[ch]?.count ?? 0;
          const heightPct = maxCount > 0 ? (count / maxCount) * 100 : 0;
          const isRecommended = ch === recommendedChannel;

          let barColor = "bg-muted-foreground/30";
          if (count > 0) {
            if (count >= 6) barColor = "bg-destructive";
            else if (count >= 3) barColor = "bg-warning";
            else barColor = "bg-success";
          }

          return (
            <div key={ch} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-[9px] text-muted-foreground">{count || ""}</span>
              <div className="relative w-full" style={{ height: 80 }}>
                <div
                  className={`absolute bottom-0 w-full rounded-t ${barColor} ${
                    isRecommended ? "ring-2 ring-primary ring-offset-1 ring-offset-background" : ""
                  }`}
                  style={{
                    height: `${Math.max(heightPct, count > 0 ? 8 : 2)}%`,
                    transition: "height 0.5s ease",
                  }}
                />
              </div>
              <span
                className={`text-[9px] ${
                  isRecommended
                    ? "font-bold text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {ch}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ChannelChart({ congestion, recommendedChannel }: ChannelChartProps) {
  const has5G = CHANNELS_5G.some((ch) => congestion[ch]?.count > 0);

  return (
    <div className="space-y-6">
      <BarGroup
        channels={CHANNELS_2G}
        congestion={congestion}
        recommendedChannel={recommendedChannel}
        label="2.4 GHz Channels"
      />
      {has5G && (
        <BarGroup
          channels={CHANNELS_5G.filter((ch) => congestion[ch]?.count > 0)}
          congestion={congestion}
          recommendedChannel={null}
          label="5 GHz Channels (active)"
        />
      )}
    </div>
  );
}
