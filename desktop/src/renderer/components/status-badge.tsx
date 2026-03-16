import type { TestStatus } from "../../shared/types";

interface StatusBadgeProps {
  status: TestStatus;
  label?: string;
}

const CONFIG: Record<TestStatus, { bg: string; text: string; defaultLabel: string }> = {
  pass: { bg: "bg-success/15", text: "text-success", defaultLabel: "Healthy" },
  warn: { bg: "bg-warning/15", text: "text-warning", defaultLabel: "Warning" },
  fail: { bg: "bg-destructive/15", text: "text-destructive", defaultLabel: "Issue" },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const cfg = CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${cfg.bg} ${cfg.text}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "pass"
            ? "bg-success"
            : status === "warn"
              ? "bg-warning"
              : "bg-destructive"
        }`}
      />
      {label ?? cfg.defaultLabel}
    </span>
  );
}
