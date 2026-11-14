import type { ExternalLink } from "@/lib/timeline";

export function CodeIcon() {
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

export function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3">
      <path d="M4.5 2.5v11l9-5.5z" fill="currentColor" />
    </svg>
  );
}

export function ExternalLinks({
  links,
  context,
  className = "",
}: {
  links: ExternalLink[];
  context: string;
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
      {links.map((link, i) => (
        <li key={link.href} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden="true" className="text-ink-muted">
              ·
            </span>
          )}
          <a
            href={link.href}
            className="inline-flex items-center gap-1.5 py-1 text-xs text-ink-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-highlight"
          >
            {link.kind === "video" ? <PlayIcon /> : <CodeIcon />}
            {link.label}
            <span className="sr-only"> for {context}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
