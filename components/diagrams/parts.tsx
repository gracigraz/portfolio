import type { ReactNode } from "react";

export type Tone = "plain" | "strong" | "ok" | "warn";

const fills: Record<Tone, string> = {
  plain: "var(--bg)",
  strong: "var(--ink)",
  ok: "var(--accent)",
  warn: "var(--highlight)",
};

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

// A small play-button badge in YouTube's shape, 16 x 12.
export function VideoBadge() {
  return (
    <g aria-hidden="true">
      <rect width="16" height="12" rx="3" fill="#ff0033" />
      <path d="M6.4 3.4v5.2L10.8 6z" fill="#fff" />
    </g>
  );
}

// A richer diagram node: icon tile, title, one-line detail, step number.
export function Node({
  x,
  y,
  width = 160,
  height = 60,
  title,
  detail,
  icon,
  step,
  tone = "plain",
  mono = false,
}: {
  x: number;
  y: number;
  width?: number;
  height?: number;
  title: string;
  detail: string;
  icon: ReactNode;
  step: string;
  tone?: Tone;
  mono?: boolean;
}) {
  const strong = tone === "strong";
  const cy = y + height / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={12}
        fill={fills[tone]}
        fillOpacity={tone === "ok" || tone === "warn" ? 0.6 : 1}
        stroke={tone === "plain" ? "var(--line)" : "none"}
        className="diagram-box"
      />
      <rect
        x={x + 10}
        y={cy - 13}
        width={26}
        height={26}
        rx={8}
        fill={strong ? "rgb(255 255 255 / 0.14)" : "var(--surface)"}
      />
      <g
        transform={`translate(${x + 15} ${cy - 8})`}
        color={strong ? "var(--bg)" : "var(--ink)"}
      >
        {icon}
      </g>
      <text
        x={x + 46}
        y={cy - 4}
        fill={strong ? "var(--bg)" : "var(--ink)"}
        fontSize="11"
        fontWeight="600"
      >
        {title}
      </text>
      <text
        x={x + 46}
        y={cy + 11}
        fill={strong ? "var(--bg)" : "var(--ink-muted)"}
        fillOpacity={strong ? 0.75 : 1}
        fontSize="9"
        fontFamily={
          mono ? "ui-monospace, SFMono-Regular, Menlo, monospace" : undefined
        }
      >
        {detail}
      </text>
      <text
        x={x + width - 10}
        y={y + 15}
        fill={strong ? "var(--bg)" : "var(--ink-muted)"}
        fillOpacity={0.7}
        fontSize="8"
        textAnchor="end"
      >
        {step}
      </text>
    </g>
  );
}

const iconStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const DiagramIcons = {
  video: (
    <g transform="translate(0 2)">
      <VideoBadge />
    </g>
  ),
  link: (
    <g {...iconStroke}>
      <path d="M6.5 9.5l3-3" />
      <path d="M7.2 4.8l1-1a2.6 2.6 0 0 1 3.7 3.7l-1 1" />
      <path d="M8.8 11.2l-1 1a2.6 2.6 0 0 1-3.7-3.7l1-1" />
    </g>
  ),
  page: (
    <g {...iconStroke}>
      <rect x="2" y="3" width="12" height="10" rx="2" />
      <path d="M2 6.2h12" />
    </g>
  ),
  cart: (
    <g {...iconStroke}>
      <path d="M1.8 2.8h2l1.6 7h7l1.5-5H4.8" />
      <circle cx="6.5" cy="13" r="0.9" />
      <circle cx="11.5" cy="13" r="0.9" />
    </g>
  ),
  bolt: <path d="M9.2 1.5 3.6 9h4.3l-1 5.5L12.4 7H8.1z" fill="currentColor" />,
  monitor: (
    <g {...iconStroke}>
      <rect x="1.5" y="2.5" width="13" height="9" rx="1.5" />
      <path d="M5.5 14h5M8 11.5V14" />
    </g>
  ),
  server: (
    <g {...iconStroke}>
      <rect x="2" y="2.5" width="12" height="4.5" rx="1.2" />
      <rect x="2" y="9" width="12" height="4.5" rx="1.2" />
      <path d="M4.6 4.75h.01M4.6 11.25h.01" strokeWidth="2" />
    </g>
  ),
  database: (
    <g {...iconStroke}>
      <ellipse cx="8" cy="3.8" rx="5.5" ry="2" />
      <path d="M2.5 3.8v8.4c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2V3.8" />
      <path d="M2.5 8c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2" />
    </g>
  ),
  doc: (
    <g {...iconStroke}>
      <path d="M4 1.8h5.2L12.5 5v9.2H4z" />
      <path d="M9 1.8V5h3.5M6 8.5h4.5M6 11h4.5" />
    </g>
  ),
  copy: (
    <g {...iconStroke}>
      <rect x="5" y="5" width="9" height="9" rx="1.5" />
      <path d="M11 5V3.2A1.2 1.2 0 0 0 9.8 2H3.2A1.2 1.2 0 0 0 2 3.2v6.6A1.2 1.2 0 0 0 3.2 11H5" />
    </g>
  ),
  shield: (
    <g {...iconStroke}>
      <path d="M8 1.8 13 3.6v4.2c0 3-2.2 5.3-5 6.4-2.8-1.1-5-3.4-5-6.4V3.6z" />
      <path d="M5.8 8l1.6 1.6 3-3" />
    </g>
  ),
  refresh: (
    <g {...iconStroke}>
      <path d="M13 8a5 5 0 1 1-1.5-3.6" />
      <path d="M13 2.5v3.3H9.7" />
    </g>
  ),
  table: (
    <g {...iconStroke}>
      <rect x="2" y="2.5" width="12" height="11" rx="1.5" />
      <path d="M2 6h12M2 9.5h12M6.5 6v7.5" />
    </g>
  ),
  list: (
    <g {...iconStroke}>
      <path d="M5.5 4.5h8M5.5 8h8M5.5 11.5h8" />
      <path d="M2.6 4.5h.01M2.6 8h.01M2.6 11.5h.01" strokeWidth="2" />
    </g>
  ),
  mail: (
    <g {...iconStroke}>
      <rect x="1.8" y="3.5" width="12.4" height="9" rx="1.5" />
      <path d="M2.4 4.4 8 8.6l5.6-4.2" />
    </g>
  ),
  pen: (
    <g {...iconStroke}>
      <path d="M10.5 2.5l3 3L6 13H3v-3z" />
      <path d="M9 4l3 3" />
    </g>
  ),
  clock: (
    <g {...iconStroke}>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.8V8l2.2 1.4" />
    </g>
  ),
  chat: (
    <g {...iconStroke}>
      <path d="M2.5 3.5h11v7.2H7.2L4.4 13v-2.3H2.5z" />
    </g>
  ),
  check: (
    <g {...iconStroke}>
      <circle cx="8" cy="8" r="6" />
      <path d="M5.4 8.2l1.8 1.8 3.4-3.6" />
    </g>
  ),
  alert: (
    <g {...iconStroke}>
      <path d="M8 2.2 14.5 13.5h-13z" />
      <path d="M8 6.5v3.2M8 11.6h.01" />
    </g>
  ),
  sidebar: (
    <g {...iconStroke}>
      <rect x="2" y="2.5" width="12" height="11" rx="1.5" />
      <path d="M6 2.5v11M8.5 6h3.5M8.5 9h3.5" />
    </g>
  ),
  signature: (
    <g {...iconStroke}>
      <path d="M2 11.5c2-3 3.5-6 4.5-6s-.5 4 1 4 2-3 3-3 1 2 3.5 2" />
      <path d="M2 14h12" />
    </g>
  ),
  download: (
    <g {...iconStroke}>
      <path d="M8 2.5v8M4.8 7.5 8 10.7l3.2-3.2M3 13.5h10" />
    </g>
  ),
  chart: (
    <g fill="currentColor">
      <rect x="2.5" y="8" width="2.6" height="5.5" rx="0.6" />
      <rect x="6.7" y="5" width="2.6" height="8.5" rx="0.6" />
      <rect x="10.9" y="2.5" width="2.6" height="11" rx="0.6" />
    </g>
  ),
};

// A small pill label placed on a connector.
export function Pill({
  x,
  y,
  width,
  label,
}: {
  x: number;
  y: number;
  width: number;
  label: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={18}
        rx={9}
        fill="var(--bg)"
        stroke="var(--line)"
      />
      <text
        x={x + width / 2}
        y={y + 12}
        fontSize="8.5"
        fill="var(--ink-muted)"
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}
