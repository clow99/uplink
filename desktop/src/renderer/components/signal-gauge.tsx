import type { TestStatus } from "../../shared/types";

interface SignalGaugeProps {
  dbm: number;
  percent: number;
  status: TestStatus;
}

const STATUS_COLORS: Record<TestStatus, string> = {
  pass: "#22c55e",
  warn: "#f59e0b",
  fail: "#ef4444",
};

export function SignalGauge({ dbm, percent, status }: SignalGaugeProps) {
  const color = STATUS_COLORS[status];
  const radius = 70;
  const stroke = 10;
  const circumference = Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="180" height="100" viewBox="0 0 180 100">
        <path
          d="M 10 90 A 70 70 0 0 1 170 90"
          fill="none"
          stroke="hsl(224 12% 18%)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <path
          d="M 10 90 A 70 70 0 0 1 170 90"
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
        <text
          x="90"
          y="75"
          textAnchor="middle"
          fill={color}
          fontSize="28"
          fontWeight="700"
        >
          {dbm}
        </text>
        <text
          x="90"
          y="92"
          textAnchor="middle"
          fill="hsl(218 10% 55%)"
          fontSize="11"
        >
          dBm
        </text>
      </svg>
      <div className="text-center">
        <div className="text-xs text-muted-foreground">{percent}% signal</div>
      </div>
    </div>
  );
}
