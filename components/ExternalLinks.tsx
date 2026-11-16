import { GitHubIcon, PlayIcon } from "@/components/icons";
import { VideoLink } from "@/components/VideoLink";
import type { ExternalLink } from "@/lib/timeline";

export function ProjectLink({
  link,
  context,
  className,
  labelClassName,
}: {
  link: ExternalLink;
  context: string;
  className: string;
  labelClassName: string;
}) {
  if (link.kind === "video") {
    return (
      <VideoLink
        href={link.href}
        title={context}
        className={`group ${className}`}
      >
        <span
          aria-hidden="true"
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-bg"
        >
          <PlayIcon className="ml-px h-2 w-2" />
        </span>
        <span className={labelClassName}>{link.label}</span>
        <span className="sr-only"> for {context}</span>
      </VideoLink>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group ${className}`}
    >
      <GitHubIcon className="h-3.5 w-3.5" />
      <span className={labelClassName}>{link.label}</span>
      <span className="sr-only">
        {" "}
        for {context} on GitHub (opens in a new tab)
      </span>
    </a>
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
          <ProjectLink
            link={link}
            context={context}
            className="inline-flex items-center gap-1.5 py-1 text-xs text-ink-muted transition-colors hover:text-ink"
            labelClassName="underline decoration-line underline-offset-4 group-hover:decoration-highlight"
          />
        </li>
      ))}
    </ul>
  );
}
