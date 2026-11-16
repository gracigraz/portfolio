import { useId } from "react";
import { FlowDot } from "@/components/diagrams/FlowDot";
import {
  ArrowMarker,
  DiagramIcons,
  Node,
  Pill,
} from "@/components/diagrams/parts";

export function PlatformFlow() {
  const arrowId = useId();
  return (
    <svg
      viewBox="0 6 580 106"
      role="img"
      aria-label="Admin platform architecture: the Next.js admin UI, with an environment switcher, calls a Python admin API with its own login; each request carries the selected environment to the Neo4j and DynamoDB data."
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
      </g>

      <FlowDot path="M90 44H490" duration={3.5} />

      <Node
        x={10}
        y={14}
        step="01"
        title="Admin UI"
        detail="Next.js · env switcher"
        icon={DiagramIcons.monitor}
      />
      <Node
        x={210}
        y={14}
        step="02"
        title="Admin API"
        detail="Python · own login"
        tone="strong"
        icon={DiagramIcons.server}
      />
      <Node
        x={410}
        y={14}
        step="03"
        title="Data"
        detail="Neo4j · DynamoDB"
        tone="ok"
        icon={DiagramIcons.database}
      />

      <Pill
        x={200}
        y={88}
        width={180}
        label="each request carries its environment"
      />
    </svg>
  );
}
