import { PhotoTile } from "@/components/PhotoTile";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto grid w-full max-w-6xl gap-12 px-4 pt-10 pb-20 sm:px-8 md:grid-cols-2 md:items-center md:gap-16 md:pt-16"
    >
      <div>
        <p className="text-xs tracking-[0.2em] text-ink-muted uppercase">
          Software engineer · Miami <span aria-hidden="true">→</span>
          <span className="sr-only">relocating to</span> New York
        </p>
        <h1
          id="hero-heading"
          className="mt-6 font-serif text-6xl leading-none sm:text-7xl"
        >
          Hi, I&apos;m Grace.
        </h1>
        <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed">
          <p>
            At Rivio AI I worked across the product: the Next.js frontend
            customers used, the Python services on AWS behind it, the
            integrations with the systems they already ran, and the internal
            tools my non-engineering colleagues used instead of filing tickets.
          </p>
          <p className="text-ink-muted">
            Before software I spent seven years building tooling and production
            processes for autonomous aircraft, vehicle sensors, and satellites.
            I still work the way the factory floor taught me: trace a problem to
            its root cause, fix it, and write it down so anyone can repeat it.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 grid-rows-3 gap-3">
        <PhotoTile
          sizes="(min-width: 768px) 25vw, 66vw"
          eager
          className="col-span-2 row-span-3 min-h-80"
        />
        <div aria-hidden="true" className="rounded-card bg-accent" />
        <PhotoTile
          src="/images/grace-salvage-yard.jpg"
          alt="Grace working under the hood of a truck at a salvage yard"
          sizes="(min-width: 768px) 12vw, 33vw"
          className="min-h-24"
        />
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
