import { ContactForm } from "@/components/ContactForm";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { Timeline } from "@/components/Timeline";
import { projects } from "@/lib/projects";
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
          <h2 id="work-heading" className="font-serif text-5xl sm:text-6xl">
            Selected work
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            Three case studies from my most recent role at Rivio AI.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                className="reveal-up"
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="scroll-mt-8 border-t border-line"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-8">
          <h2
            id="experience-heading"
            className="font-serif text-5xl sm:text-6xl md:text-center"
          >
            Experience
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted md:mx-auto md:text-center">
            The path that led there, newest first.
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
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-8 md:grid-cols-[2fr_3fr] md:gap-16">
          <div>
            <h2
              id="contact-heading"
              className="font-serif text-5xl sm:text-6xl"
            >
              Let&apos;s talk
            </h2>
            <p className="mt-4 max-w-md text-lg text-ink-muted">
              Building something, hiring, or just curious about a project? Send
              me a note and I&apos;ll get back to you.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
