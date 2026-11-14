import { useId } from "react";
import { site } from "@/lib/site";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  const maskId = useId();
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4">
      <mask id={maskId}>
        <rect width="16" height="16" rx="3" fill="white" />
        <g fill="black">
          <circle cx="4.5" cy="4.4" r="1.3" />
          <rect x="3.3" y="6.3" width="2.4" height="6.4" />
          <path d="M7.3 6.3h2.3v.9c.4-.6 1.1-1.1 2.2-1.1 1.9 0 2.4 1.2 2.4 2.9v3.7h-2.4V9.5c0-.8-.2-1.4-1-1.4s-1.1.6-1.1 1.4v3.2H7.3z" />
        </g>
      </mask>
      <rect
        width="16"
        height="16"
        rx="3"
        fill="currentColor"
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}

const links = [
  { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: site.links.github, Icon: GitHubIcon },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            className="group inline-flex items-center gap-2 py-2 text-sm font-medium text-ink"
          >
            <Icon />
            <span className="underline decoration-highlight decoration-2 underline-offset-4 transition-colors group-hover:decoration-ink">
              {label}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
