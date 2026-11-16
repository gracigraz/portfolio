import { useId } from "react";
import { FlowDot } from "@/components/diagrams/FlowDot";
import { ArrowMarker, DiagramIcons, Node } from "@/components/diagrams/parts";

export function MergeSteps() {
  const arrowId = useId();
  return (
    <svg
      viewBox="0 4 580 220"
      role="img"
      aria-label="Merge steps: the target and the duplicate are validated (same supplier, no active workflow), the Neo4j changes commit in one transaction that rolls back on failure, DynamoDB references update after the commit, conflicting custom fields are recomputed, and the merge returns a report of conflicts and dropped values."
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
        <path d="M170 38C190 38 190 78 208 78" />
        <path d="M170 118C190 118 190 78 208 78" />
        <path d="M370 78H408" />
        <path d="M490 106V158" />
        <path d="M410 188H372" />
        <path d="M210 188H172" />
      </g>

      <FlowDot path="M90 38H170C190 38 190 78 208 78H490V188H90" duration={6} />
      <FlowDot
        path="M90 118H170C190 118 190 78 208 78H490V188H90"
        duration={6}
        delay={3}
      />

      <Node
        x={10}
        y={10}
        height={56}
        step=""
        title="Target"
        detail="the record you keep"
        icon={DiagramIcons.doc}
      />
      <Node
        x={10}
        y={90}
        height={56}
        step=""
        title="Duplicate"
        detail="merged in, then deleted"
        icon={DiagramIcons.copy}
      />
      <Node
        x={210}
        y={50}
        height={56}
        step="01"
        title="Validate"
        detail="then apply the rules"
        tone="strong"
        icon={DiagramIcons.shield}
      />
      <Node
        x={410}
        y={50}
        height={56}
        step="02"
        title="Neo4j commit"
        detail="rolls back on failure"
        icon={DiagramIcons.database}
      />
      <Node
        x={410}
        y={160}
        height={56}
        step="03"
        title="DynamoDB refs"
        detail="after the commit"
        icon={DiagramIcons.table}
      />
      <Node
        x={210}
        y={160}
        height={56}
        step="04"
        title="Recompute"
        detail="conflicting fields"
        icon={DiagramIcons.refresh}
      />
      <Node
        x={10}
        y={160}
        height={56}
        step="05"
        title="Merge report"
        detail="conflicts, dropped values"
        tone="ok"
        icon={DiagramIcons.list}
      />
    </svg>
  );
}
