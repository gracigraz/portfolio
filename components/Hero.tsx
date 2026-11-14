import { PhotoTile } from "@/components/PhotoTile";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto grid w-full max-w-6xl gap-10 px-4 pt-10 pb-20 sm:px-8 md:grid-cols-2 md:items-center md:gap-16 md:pt-16"
    >
      <div>
        <p className="text-xs tracking-[0.2em] text-ink-muted uppercase">
          Software engineer · Miami <span aria-hidden="true">→</span>
          <span className="sr-only">relocating to</span> New York
        </p>
        <h1
          id="hero-heading"
          className="mt-6 font-serif text-6xl leading-[0.95] sm:text-7xl lg:text-8xl"
        >
          {site.name}
        </h1>
        <p className="mt-6 max-w-md text-lg text-ink-muted">
          Product engineering across the frontend, the services behind it, and
          the internal tools a team relies on.
        </p>
      </div>

      <div className="grid grid-cols-3 grid-rows-3 gap-3">
        <PhotoTile
          sizes="(min-width: 768px) 25vw, 66vw"
          eager
          className="col-span-2 row-span-3 min-h-80"
        />
        <div aria-hidden="true" className="rounded-card bg-accent" />
        <PhotoTile sizes="(min-width: 768px) 12vw, 33vw" className="min-h-24" />
        <div
          aria-hidden="true"
          className="flex items-end rounded-card bg-surface p-3"
        >
          <span className="font-serif text-lg leading-tight italic">
            root cause, then fix
          </span>
        </div>
      </div>
    </section>
  );
}
