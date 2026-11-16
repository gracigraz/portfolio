import { FlowDot } from "@/components/diagrams/FlowDot";
import { ArrowMarker, Box } from "@/components/diagrams/parts";

export function ThreadsFlow() {
  return (
    <svg
      viewBox="0 30 400 150"
      role="img"
      aria-label="Chat threads: each new message is written to the existing message history, unchanged, and to a new thread index with one row per conversation. The history opens a thread; the index powers the sidebar list."
      className="h-auto w-full font-sans"
    >
      <ArrowMarker id="threads-arrow" />
      <g
        stroke="var(--ink)"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#threads-arrow)"
      >
        <path d="M114 100c18 0 16-40 32-40" />
        <path d="M114 100c18 0 16 40 32 40" />
        <path d="M252 60H284" />
        <path d="M252 140H284" />
      </g>

      <g fill="var(--ink-muted)" fontSize="9" textAnchor="middle">
        <text x="200" y="94">
          unchanged
        </text>
        <text x="200" y="174">
          new: one row per thread
        </text>
      </g>

      <FlowDot path="M62 100H114C132 100 130 60 146 60H338" />
      <FlowDot path="M62 100H114C132 100 130 140 146 140H338" delay={1.8} />

      <Box x={10} y={80} label="New message" />
      <Box x={148} y={40} label="Message history" />
      <Box x={148} y={120} label="Thread index" tone="strong" />
      <Box x={286} y={40} label="Open a thread" tone="ok" />
      <Box x={286} y={120} label="Sidebar list" tone="ok" />
    </svg>
  );
}
