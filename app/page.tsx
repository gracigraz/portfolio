import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { timeline } from "@/lib/timeline";

export default function Home() {
  return (
    <>
      <Hero />

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
