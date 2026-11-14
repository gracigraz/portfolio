import { ArrowMarker, Box } from "@/components/diagrams/parts";

export function MergeFlow() {
  return (
    <svg
      viewBox="0 30 400 140"
      role="img"
      aria-label="Merge flow: two duplicate records pass through explicit transfer rules and become one merged record plus a report of conflicting fields."
      className="h-auto w-full font-sans"
    >
      <ArrowMarker id="merge-arrow" />
      <g
        stroke="var(--ink)"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#merge-arrow)"
      >
        <path d="M114 60c22 0 22 40 40 40" />
        <path d="M114 140c22 0 22-40 40-40" />
        <path d="M262 92l18-14" />
        <path d="M262 108l18 14" />
      </g>
      <Box x={10} y={40} label="Record" />
      <Box x={10} y={120} label="Duplicate" />
      <Box x={156} y={80} label="Transfer rules" tone="strong" />
      <Box x={284} y={46} width={106} label="Merged record" tone="ok" />
      <Box x={284} y={114} width={106} label="Conflict report" tone="warn" />
    </svg>
  );
}
