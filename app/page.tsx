import { ContactForm } from "@/components/ContactForm";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { Timeline } from "@/components/Timeline";
import { selectedProjects } from "@/lib/projects";
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
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-8">
          <h2 id="work-heading" className="font-serif text-5xl sm:text-6xl">
            Selected work
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            A closer look at three projects from Alquimista and Rivio AI, from
            the problems behind them to the decisions that shaped the solutions.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {selectedProjects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i + 1}
                featured={i === 0}
                className={`reveal-up ${i === 0 ? "md:col-span-2" : ""}`}
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
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-8">
          <h2
            id="experience-heading"
            className="font-serif text-5xl sm:text-6xl"
          >
            Experience
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            The path that brought me here, newest first.
          </p>
          <div className="mt-8">
            <Timeline entries={timeline} />
          </div>
        </div>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="scroll-mt-8 border-t border-line bg-surface"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-8 md:grid-cols-[2fr_3fr] md:gap-16">
          <div>
            <h2
              id="contact-heading"
              className="font-serif text-5xl sm:text-6xl"
            >
              Let&apos;s talk
            </h2>
            <p className="mt-4 max-w-md text-lg text-ink-muted">
              Have a role, project, or question in mind? I’d love to hear from
              you.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
