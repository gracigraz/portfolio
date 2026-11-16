import { useId } from "react";
import { FlowDot } from "@/components/diagrams/FlowDot";
import {
  ArrowMarker,
  DiagramIcons,
  Node,
  Pill,
} from "@/components/diagrams/parts";

export function RenewalStatuses() {
  const arrowId = useId();
  return (
    <svg
      viewBox="0 4 714 296"
      role="img"
      aria-label="Renewal status machine: Reviewing, Benchmarking, Owner Outreach, Draft Ready, then Awaiting vendor once the vendor email passes the allowlist check in code, then Negotiating, and Ready to sign. From Negotiating, a response outside the customer's policy moves the task to Escalated, and it returns to Negotiating when a person gives direction."
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
        <path d="M170 42H186" />
        <path d="M348 42H364" />
        <path d="M526 42H542" />
        <path d="M624 70V122" />
        <path d="M544 152H528" />
        <path d="M366 152H350" />
        <path d="M436 180V232" />
        <path d="M456 234V182" />
      </g>

      <g fill="var(--ink-muted)" fontSize="9">
        <text x="428" y="210" textAnchor="end">
          outside policy
        </text>
        <text x="464" y="210">
          a person gives direction
        </text>
      </g>

      <FlowDot path="M90 42H624V152H268" duration={7} />

      <Node
        x={10}
        y={14}
        height={56}
        step="01"
        title="Reviewing"
        detail="reading the contract"
        icon={DiagramIcons.doc}
      />
      <Node
        x={188}
        y={14}
        height={56}
        step="02"
        title="Benchmarking"
        detail="market context"
        icon={DiagramIcons.chart}
      />
      <Node
        x={366}
        y={14}
        height={56}
        step="03"
        title="Owner Outreach"
        detail="brief to the owner"
        icon={DiagramIcons.mail}
      />
      <Node
        x={544}
        y={14}
        height={56}
        step="04"
        title="Draft Ready"
        detail="strategy and draft"
        icon={DiagramIcons.pen}
      />
      <Node
        x={544}
        y={124}
        height={56}
        step="05"
        title="Awaiting vendor"
        detail="outreach sent"
        icon={DiagramIcons.clock}
      />
      <Node
        x={366}
        y={124}
        height={56}
        step="06"
        title="Negotiating"
        detail="within policy"
        tone="strong"
        icon={DiagramIcons.chat}
      />
      <Node
        x={188}
        y={124}
        height={56}
        step="07"
        title="Ready to sign"
        detail="terms agreed"
        tone="ok"
        icon={DiagramIcons.check}
      />
      <Node
        x={366}
        y={234}
        height={56}
        step=""
        title="Escalated"
        detail="paused for a person"
        tone="warn"
        icon={DiagramIcons.alert}
      />

      <Pill
        x={458}
        y={87}
        width={150}
        label="vendor email · allowlist in code"
      />
    </svg>
  );
}
