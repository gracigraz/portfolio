import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl px-4 py-8 sm:px-8">
        <ul className="flex gap-6 text-sm text-ink-muted">
          <li>
            <a
              href={site.links.linkedin}
              className="inline-block py-3 transition-colors hover:text-ink"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={site.links.github}
              className="inline-block py-3 transition-colors hover:text-ink"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
