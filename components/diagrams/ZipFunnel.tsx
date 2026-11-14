import { ArrowMarker } from "@/components/diagrams/parts";

const buckets = [
  { count: 147, label: "already synced", tone: "var(--accent)" },
  { count: 32, label: "no file attached", tone: "var(--line)" },
  { count: 17, label: "outside date window", tone: "var(--highlight)" },
  { count: 14, label: "no agreement", tone: "var(--line)" },
  { count: 5, label: "attachment type", tone: "var(--highlight)" },
];

const BAR_X = 190;
const BAR_MAX = 110;
const ROW_H = 30;
const TOP = 26;

export function ZipFunnel() {
  const max = Math.max(...buckets.map((bucket) => bucket.count));

  return (
    <svg
      viewBox="0 14 440 172"
      role="img"
      aria-label="Audit of 215 vendors: 147 were already synced, 32 had no file attached, 17 were outside the date window, 14 had no agreement, and 5 had an excluded attachment type."
      className="h-auto w-full font-sans"
    >
      <ArrowMarker id="zip-arrow" />
      <path
        d={`M88 ${TOP + 74}H${BAR_X - 12}`}
        stroke="var(--ink)"
        strokeWidth="1.5"
        markerEnd="url(#zip-arrow)"
      />
      <rect x={10} y={TOP} width={70} height={148} rx={10} fill="var(--ink)" />
      <text
        x={45}
        y={TOP + 66}
        fill="var(--bg)"
        fontSize="22"
        textAnchor="middle"
        className="font-serif"
      >
        215
      </text>
      <text
        x={45}
        y={TOP + 90}
        fill="var(--bg)"
        fontSize="10"
        textAnchor="middle"
      >
        vendors
      </text>
      {buckets.map((bucket, i) => {
        const y = TOP + 4 + i * ROW_H;
        const width = Math.max(4, (bucket.count / max) * BAR_MAX);
        return (
          <g key={bucket.label}>
            <rect
              x={BAR_X}
              y={y}
              width={width}
              height={20}
              rx={5}
              fill={bucket.tone}
            />
            <text
              x={BAR_X + width + 8}
              y={y + 14}
              fill="var(--ink)"
              fontSize="11"
            >
              <tspan fontWeight="600">{bucket.count}</tspan> {bucket.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
