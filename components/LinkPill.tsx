import type { ExternalLink } from "@/lib/timeline";

function CodeIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
      <path
        d="M5.5 4 2 8l3.5 4M10.5 4 14 8l-3.5 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3">
      <path d="M4.5 2.5v11l9-5.5z" fill="currentColor" />
    </svg>
  );
}

export function LinkPill({
  link,
  context,
}: {
  link: ExternalLink;
  context: string;
}) {
  return (
    <a
      href={link.href}
      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-3 py-1.5 text-xs text-ink transition-colors hover:border-ink hover:bg-surface"
    >
      {link.kind === "video" ? <PlayIcon /> : <CodeIcon />}
      {link.label}
      <span className="sr-only"> for {context}</span>
    </a>
  );
}

export function LinkPills({
  links,
  context,
  className = "",
}: {
  links: ExternalLink[];
  context: string;
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {links.map((link) => (
        <li key={link.href}>
          <LinkPill link={link} context={context} />
        </li>
      ))}
    </ul>
  );
}
