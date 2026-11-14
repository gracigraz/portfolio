import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { timeline } from "@/lib/timeline";

export default function Home() {
  return (
    <>
      <Hero />

      <section
        id="about"
        aria-labelledby="about-heading"
        className="scroll-mt-8 border-t border-line"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-20 sm:px-8 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2
            id="about-heading"
            className="text-xs tracking-[0.2em] text-ink-muted uppercase"
          >
            About
          </h2>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              At Rivio AI I worked across the product: the Next.js frontend
              customers used, the Python services on AWS behind it, the
              integrations connecting it to the systems they already ran, and
              the internal tools our non-engineering colleagues used every day
              instead of filing tickets.
            </p>
            <p className="text-ink-muted">
              Before software I spent seven years in aerospace manufacturing,
              building tooling and processes for autonomous aircraft, vehicle
              sensors, and satellites. That&apos;s where I learned to trace a
              problem to its root cause and write the fix down so anyone can
              repeat it.
            </p>
          </div>
        </div>
      </section>

      <section
        id="work"
        aria-labelledby="work-heading"
        className="scroll-mt-8 border-t border-line"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-8">
          <h2
            id="work-heading"
            className="font-serif text-5xl sm:text-6xl md:text-center"
          >
            Work
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted md:mx-auto md:text-center">
            Three case studies from my most recent role, then the path that
            led there.
          </p>
          <div className="mt-16">
            <Timeline entries={timeline} />
          </div>
        </div>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="scroll-mt-8 border-t border-line bg-surface"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-8">
          <h2 id="contact-heading" className="font-serif text-5xl sm:text-6xl">
            Let&apos;s talk
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            The contact form is coming next.
          </p>
        </div>
      </section>
    </>
  );
}
