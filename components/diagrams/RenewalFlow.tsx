import { FlowDot } from "@/components/diagrams/FlowDot";
import { ArrowMarker, Box } from "@/components/diagrams/parts";

const SENT_PATH = "M62 60H422V100H302V150";
const ESCALATED_PATH = "M62 60H422V230";

export function RenewalFlow() {
  return (
    <svg
      viewBox="0 28 480 232"
      role="img"
      aria-label="Renewal flow: a renewal task loads the renewal prompt and the agent drafts an email. A code-level allowlist check either sends it to an allowed domain, or holds it at draft ready and escalates it to a person inside the company, with the reason recorded."
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
        <path d="M354 60h12" />
        <path d="M422 80V100H302V126" />
        <path d="M422 80v46" />
        <path d="M422 170v36" />
      </g>

      <FlowDot path={SENT_PATH} />
      <FlowDot path={ESCALATED_PATH} delay={1.8} />

      <Box x={10} y={40} label="Renewal task" />
      <Box x={130} y={40} label="Renewal prompt" />
      <Box x={250} y={40} label="Agent drafts email" />
      <Box x={370} y={40} label="Allowlist check" tone="strong" />
      <Box x={250} y={130} label="Send" tone="ok" />
      <Box x={370} y={130} label="Hold: draft ready" tone="warn" />
      <Box x={370} y={210} label="Escalate to a person" tone="strong" />

      <g fill="var(--ink-muted)" fontSize="10">
        <text x={330} y={95}>
          allowed
        </text>
        <text x={428} y={110}>
          blocked
        </text>
        <text x={362} y={228} textAnchor="end">
          with the reason:
        </text>
        <text x={362} y={242} textAnchor="end">
          domain not on allowlist
        </text>
      </g>
    </svg>
  );
}
