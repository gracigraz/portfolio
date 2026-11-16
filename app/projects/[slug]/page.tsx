import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectDemos } from "@/components/demos";
import { projectDiagrams } from "@/components/diagrams";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const Diagram = projectDiagrams[project.slug];
  const Demo = projectDemos[project.slug];

  return (
    <article className="mx-auto w-full max-w-4xl px-4 pt-2 pb-16 sm:px-8">
      <header>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <Link
            href="/#work"
            className="inline-block py-2 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span> All work
          </Link>
          <p className="flex items-center gap-2 text-xs tracking-[0.12em] text-ink-muted uppercase">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-highlight"
            />
            {String(index + 1).padStart(2, "0")} · {project.category}
          </p>
        </div>
        <h1 className="mt-6 font-serif text-5xl leading-[1.05] sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {project.summary}
        </p>

        <dl className="mt-10 grid gap-6 border-y border-line py-6 sm:grid-cols-3">
          <Fact label="Role">{project.role}</Fact>
          <Fact label="When">{project.period}</Fact>
          <Fact label="Outcome">{project.outcome}</Fact>
          <div className="sm:col-span-3">
            <dt className="text-xs tracking-[0.12em] text-ink-muted uppercase">
              Stack
            </dt>
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink-muted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </header>

      {Diagram && (
        <figure className="mt-12">
          <div className="rounded-card border border-line bg-bg bg-[radial-gradient(var(--line)_1px,transparent_1px)] [background-size:16px_16px] p-6 sm:p-10">
            <div className="mx-auto max-w-2xl">
              <Diagram />
            </div>
          </div>
          <figcaption className="mt-3 text-xs text-ink-muted">
            Simplified diagram of the real flow. Internal names and data
            omitted.
          </figcaption>
        </figure>
      )}

      <Section title="The problem">
        {project.problem.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Section>

      <Section title="My role">
        {project.myRole.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Section>

      <Section title="Key decisions">
        <ol className="space-y-6">
          {project.decisions.map((decision, i) => (
            <li
              key={decision.title}
              className="rounded-card border border-line bg-surface/60 p-6"
            >
              <p className="text-xs tracking-[0.12em] text-ink-muted uppercase">
                Decision {i + 1}
              </p>
              <h3 className="mt-2 font-serif text-2xl leading-tight">
                {decision.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-muted">
                {decision.detail}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {Demo && (
        <section className="mt-16" aria-labelledby="demo-heading">
          <h2 id="demo-heading" className="font-serif text-4xl">
            Try it
          </h2>
          <div className="mt-6">
            <Demo />
          </div>
        </section>
      )}

      <Section title="Results">
        <ul className="space-y-3">
          {project.results.map((result) => (
            <li key={result} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-highlight"
              />
              <span>{result}</span>
            </li>
          ))}
        </ul>
      </Section>

      <nav
        aria-label="More case studies"
        className="mt-16 grid gap-3 border-t border-line pt-6 sm:grid-cols-2"
      >
        <CaseLink
          href={`/projects/${previous.slug}`}
          direction="Previous"
          title={previous.title}
        />
        <CaseLink
          href={`/projects/${next.slug}`}
          direction="Next"
          title={next.title}
          alignEnd
        />
      </nav>
    </article>
  );
}

function Fact({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <dt className="text-xs tracking-[0.12em] text-ink-muted uppercase">
        {label}
      </dt>
      <dd className="mt-2 leading-snug">{children}</dd>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-16">
      <h2 className="font-serif text-4xl">{title}</h2>
      <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function CaseLink({
  href,
  direction,
  title,
  alignEnd = false,
}: {
  href: string;
  direction: "Previous" | "Next";
  title: string;
  alignEnd?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group rounded-xl border border-line px-4 py-3 transition-colors hover:border-ink/35 ${alignEnd ? "sm:text-right" : ""}`}
    >
      <span className="text-xs tracking-[0.12em] text-ink-muted uppercase">
        {direction === "Previous" ? "← Previous" : "Next →"}
      </span>
      <span className="mt-1 block font-serif text-lg leading-snug group-hover:underline group-hover:decoration-highlight group-hover:decoration-2 group-hover:underline-offset-4">
        {title}
      </span>
    </Link>
  );
}
