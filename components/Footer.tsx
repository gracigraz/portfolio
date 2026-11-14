import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-8 sm:py-16">
        <p className="font-serif text-5xl leading-none sm:text-7xl lg:text-8xl">
          {site.name}
        </p>
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
