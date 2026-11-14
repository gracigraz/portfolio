export type Tone = "plain" | "strong" | "ok" | "warn";

const fills: Record<Tone, string> = {
  plain: "var(--bg)",
  strong: "var(--ink)",
  ok: "var(--accent)",
  warn: "var(--highlight)",
};

export function Box({
  x,
  y,
  width = 104,
  height = 40,
  label,
  tone = "plain",
}: {
  x: number;
  y: number;
  width?: number;
  height?: number;
  label: string;
  tone?: Tone;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={10}
        fill={fills[tone]}
        fillOpacity={tone === "ok" || tone === "warn" ? 0.6 : 1}
        stroke={tone === "plain" ? "var(--line)" : "none"}
      />
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill={tone === "strong" ? "var(--bg)" : "var(--ink)"}
        fontSize="11"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {label}
      </text>
    </g>
  );
}

export function ArrowMarker({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 8 8"
        refX="7"
        refY="4"
        markerWidth="7"
        markerHeight="7"
        orient="auto"
      >
        <path d="M0 0l8 4-8 4z" fill="var(--ink)" />
      </marker>
    </defs>
  );
}
