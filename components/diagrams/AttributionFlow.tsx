import { useId } from "react";
import { FlowDot } from "@/components/diagrams/FlowDot";
import { ArrowMarker, DiagramIcons, Node } from "@/components/diagrams/parts";

export function AttributionFlow() {
  const arrowId = useId();
  return (
    <svg
      viewBox="0 6 580 198"
      role="img"
      aria-label="Attribution flow: a YouTube video links to a tracked URL; the landing page saves the source in a cookie for 30 days; days later, in the same browser, the purchase on the thank-you page fires a sale event to the Edge API with the same source, and the dashboard credits the revenue to that video."
      className="h-auto w-full font-sans"
    >
      <ArrowMarker id={arrowId} />
      <g
        className="diagram-flow"
        stroke="var(--ink)"
        strokeWidth="1.5"
        fill="none"
        markerEnd={`url(#${arrowId})`}
      >
        <path d="M170 44H208" />
        <path d="M370 44H408" />
        <path d="M490 74V134" />
        <path d="M410 166H372" />
        <path d="M210 166H172" />
      </g>

      <g>
        <rect
          x="360"
          y="95"
          width="122"
          height="18"
          rx="9"
          fill="var(--bg)"
          stroke="var(--line)"
        />
        <text
          x="421"
          y="107"
          fontSize="8.5"
          fill="var(--ink-muted)"
          textAnchor="middle"
        >
          same browser · days later
        </text>
      </g>

      <FlowDot path="M90 44H490V166H90" duration={6} />

      <Node
        x={10}
        y={14}
        step="01"
        title="YouTube video"
        detail="link in the description"
        icon={DiagramIcons.video}
      />
      <Node
        x={210}
        y={14}
        step="02"
        title="Tracked link"
        detail="…/curso?src=gn8l"
        mono
        icon={DiagramIcons.link}
      />
      <Node
        x={410}
        y={14}
        step="03"
        title="Landing page"
        detail="cookie saved, 30 days"
        icon={DiagramIcons.page}
      />
      <Node
        x={410}
        y={136}
        step="04"
        title="Purchase"
        detail="on the thank-you page"
        icon={DiagramIcons.cart}
      />
      <Node
        x={210}
        y={136}
        step="05"
        title="Sale event"
        detail="beacon → Edge API"
        tone="strong"
        icon={DiagramIcons.bolt}
      />
      <Node
        x={10}
        y={136}
        step="06"
        title="Revenue by video"
        detail="credited to its source"
        tone="ok"
        icon={DiagramIcons.chart}
      />
    </svg>
  );
}
