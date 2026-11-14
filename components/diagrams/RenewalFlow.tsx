import { ArrowMarker, Box } from "@/components/diagrams/parts";

export function RenewalFlow() {
  return (
    <svg
      viewBox="0 28 480 178"
      role="img"
      aria-label="Renewal flow: a renewal task loads the renewal prompt, the agent drafts an email, and a code-level allowlist check either sends it to an allowed domain or stops at draft ready for a person to review."
      className="h-auto w-full font-sans"
    >
      <ArrowMarker id="renewal-arrow" />
      <g
        stroke="var(--ink)"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#renewal-arrow)"
      >
        <path d="M114 60h12" />
        <path d="M234 60h12" />
        <path d="M354 60h8" />
        <path d="M418 80v70" />
        <path d="M418 112H298v38" />
      </g>
      <Box x={10} y={40} label="Renewal task" />
      <Box x={130} y={40} label="Renewal prompt" />
      <Box x={250} y={40} label="Agent drafts email" />
      <Box x={366} y={40} label="Allowlist check" tone="strong" />
      <Box x={246} y={154} label="Send" tone="ok" />
      <Box x={366} y={154} label="Stop: draft ready" tone="warn" />
      <g fill="var(--ink-muted)" fontSize="10">
        <text x={330} y={106}>
          allowed
        </text>
        <text x={424} y={134}>
          blocked
        </text>
      </g>
    </svg>
  );
}
