import { useId } from "react";
import { FlowDot } from "@/components/diagrams/FlowDot";
import {
  ArrowMarker,
  DiagramIcons,
  Node,
  Pill,
} from "@/components/diagrams/parts";

export function SigningFlow() {
  const arrowId = useId();
  return (
    <svg
      viewBox="0 6 580 198"
      role="img"
      aria-label="Signing flow: the agent copies the legally reviewed SOW template, fills the agreed terms into a PDF, routes it through a DocuSign envelope with anchored signature fields in the demo environment only, recipients sign, and the agent checks the status and downloads the signed PDF."
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
      </g>

      <FlowDot path="M90 44H490V166H290" duration={5} />

      <Node
        x={10}
        y={14}
        step="01"
        title="SOW template"
        detail="legally reviewed"
        icon={DiagramIcons.doc}
      />
      <Node
        x={210}
        y={14}
        step="02"
        title="Filled PDF"
        detail="agent fills the terms"
        icon={DiagramIcons.pen}
      />
      <Node
        x={410}
        y={14}
        step="03"
        title="DocuSign envelope"
        detail="anchored signature fields"
        tone="strong"
        icon={DiagramIcons.mail}
      />
      <Node
        x={410}
        y={136}
        step="04"
        title="Signing"
        detail="recipients sign"
        icon={DiagramIcons.signature}
      />
      <Node
        x={210}
        y={136}
        step="05"
        title="Signed PDF"
        detail="status and download"
        tone="ok"
        icon={DiagramIcons.download}
      />

      <Pill x={372} y={95} width={110} label="demo environment only" />
    </svg>
  );
}
