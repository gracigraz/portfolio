import { useId } from "react";
import { GitHubIcon } from "@/components/icons";
import { site } from "@/lib/site";

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
