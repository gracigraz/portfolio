import { useId } from "react";
import { FlowDot } from "@/components/diagrams/FlowDot";
import { ArrowMarker, DiagramIcons, Node } from "@/components/diagrams/parts";

export function ThreadsFlow() {
  const arrowId = useId();
  return (
    <svg
      viewBox="0 6 580 180"
      role="img"
      aria-label="Chat threads: each new message is written to the existing message history, unchanged, and to a new thread index with one row per conversation. The history opens a thread; the index powers the sidebar list with titles, previews, and products."
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
        <path d="M170 94C190 94 190 44 208 44" />
        <path d="M170 94C190 94 190 144 208 144" />
        <path d="M370 44H408" />
        <path d="M370 144H408" />
      </g>

      <FlowDot path="M90 94H170C190 94 190 44 208 44H490" duration={4} />
      <FlowDot
        path="M90 94H170C190 94 190 144 208 144H490"
        duration={4}
        delay={2}
      />

      <Node
        x={10}
        y={64}
        step="01"
        title="New message"
        detail="web or Slack"
        icon={DiagramIcons.chat}
      />
      <Node
        x={210}
        y={14}
        step="02"
        title="Message history"
        detail="unchanged"
        icon={DiagramIcons.database}
      />
      <Node
        x={210}
        y={114}
        step="03"
        title="Thread index"
        detail="new: one row per thread"
        tone="strong"
        icon={DiagramIcons.table}
      />
      <Node
        x={410}
        y={14}
        step="04"
        title="Open a thread"
        detail="the full conversation"
        tone="ok"
        icon={DiagramIcons.list}
      />
      <Node
        x={410}
        y={114}
        step="05"
        title="Sidebar list"
        detail="titles, previews, products"
        tone="ok"
        icon={DiagramIcons.sidebar}
      />
    </svg>
  );
}
