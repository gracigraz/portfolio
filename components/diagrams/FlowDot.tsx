export function FlowDot({
  path,
  duration = 3.6,
  delay = 0,
}: {
  path: string;
  duration?: number;
  delay?: number;
}) {
  const dur = `${duration}s`;
  const begin = `${delay}s`;

  return (
    <circle
      r="4.5"
      style={{ filter: "drop-shadow(0 0 4px var(--highlight))" }}
      fill="var(--highlight)"
      stroke="var(--ink)"
      strokeWidth="1"
      opacity="0"
      className="motion-reduce:hidden"
    >
      <animateMotion
        path={path}
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.08;0.9;1"
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
      />
    </circle>
  );
}
