import { FlowDot } from "@/components/diagrams/FlowDot";
import { ArrowMarker, Box } from "@/components/diagrams/parts";

export function AttributionFlow() {
  return (
    <svg
      viewBox="0 30 400 140"
      role="img"
      aria-label="Attribution flow: a YouTube video links to a tracked URL, the landing page saves the source in a cookie, days later the purchase fires a sale event with the same source, and the dashboard credits the revenue to that video."
      className="h-auto w-full font-sans"
    >
      <ArrowMarker id="attribution-arrow" />
      <g
        stroke="var(--ink)"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#attribution-arrow)"
      >
        <path d="M114 60H146" />
        <path d="M252 60H284" />
        <path d="M338 80V118" />
        <path d="M286 140H254" />
        <path d="M148 140H116" />
      </g>

      <g fill="var(--ink-muted)" fontSize="9" textAnchor="end">
        <text x="331" y="96">
          cookie keeps the source
        </text>
        <text x="331" y="108">
          days later
        </text>
      </g>

      <FlowDot path="M62 60H338V140H62" duration={5} />

      <Box x={10} y={40} label="YouTube video" />
      <Box x={148} y={40} label="Tracked link" />
      <Box x={286} y={40} label="Landing page" />
      <Box x={286} y={120} label="Purchase" />
      <Box x={148} y={120} label="Sale event" tone="strong" />
      <Box x={10} y={120} label="Revenue per video" tone="ok" />
    </svg>
  );
}
