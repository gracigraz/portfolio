import type { Metadata } from "next";
import { Suspense, type ComponentType, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectDemos } from "@/components/demos";
import {
  deepDiveDiagrams,
  projectDiagrams,
  wideDiagrams,
} from "@/components/diagrams";
import { getProject, projects, selectedProjects } from "@/lib/projects";

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

// The page reads the URL inside <Suspense>, so navigation can show the shell
// (and this placeholder) instantly while the case study streams in. Every
// slug is prebuilt, and links to case studies prefetch the full page.
export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={<CaseStudySkeleton />}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

function CaseStudySkeleton() {
  return (
    <div
      role="status"
      className="mx-auto w-full max-w-6xl animate-pulse px-4 pt-2 pb-16 sm:px-8"
    >
      <span className="sr-only">Loading case study…</span>
      <div className="h-4 w-24 rounded bg-surface" />
      <div className="mt-8 h-12 w-3/4 rounded-lg bg-surface" />
      <div className="mt-5 h-5 w-full rounded bg-surface" />
      <div className="mt-2 h-5 w-2/3 rounded bg-surface" />
      <div className="mt-10 h-72 rounded-card bg-surface" />
    </div>
  );
}

async function CaseStudy({
  params,
}: {
  params: PageProps<"/projects/[slug]">["params"];
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const Diagram = projectDiagrams[project.slug];
  const DeepDiveDiagram = deepDiveDiagrams[project.slug];
  const Demo = projectDemos[project.slug];

  return (
    <article className="mx-auto w-full max-w-6xl px-4 pt-2 pb-16 sm:px-8">
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
            {selectedProjects.includes(project) &&
              `${String(selectedProjects.indexOf(project) + 1).padStart(2, "0")} · `}
            {project.category}
          </p>
        </div>
        <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-[1.08] sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">
          {project.summary}
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
        {Diagram && (
          <figure className="relative flex min-w-0 flex-col">
            <div className="flex flex-1 items-center rounded-card border border-line bg-bg bg-[radial-gradient(var(--line)_1px,transparent_1px)] [background-size:16px_16px] p-6 sm:p-10">
              <div
                className={`mx-auto w-full min-w-0 ${wideDiagrams.has(Diagram) ? "max-w-3xl" : "max-w-lg"}`}
              >
                <DiagramBody Component={Diagram} />
              </div>
            </div>
            <figcaption className="mt-3 text-xs text-ink-muted lg:absolute lg:top-full lg:left-0">
              {project.diagramCaption ??
                "Simplified diagram of the real flow. Internal names and data omitted."}
            </figcaption>
          </figure>
        )}
        <dl className="grid content-start gap-4 rounded-card border border-line bg-surface/60 p-5 text-[0.95rem] sm:grid-cols-3 lg:grid-cols-1">
          <Fact label="Role">{project.role}</Fact>
          <Fact label="When">{project.period}</Fact>
          <Fact label="Outcome">{project.outcome}</Fact>
          {project.website && (
            <div>
              <dt className="text-xs tracking-[0.12em] text-ink-muted uppercase">
                Live site
              </dt>
              <dd className="mt-1 leading-snug">
                <a
                  href={project.website.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline decoration-highlight decoration-2 underline-offset-4 hover:decoration-ink"
                >
                  {project.website.label}
                  <span aria-hidden="true"> ↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
          )}
          <div className="sm:col-span-3 lg:col-span-1">
            <dt className="text-xs tracking-[0.12em] text-ink-muted uppercase">
              Stack
            </dt>
            <dd className="mt-1.5">
              <ul className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-line bg-bg px-3 py-1 text-xs text-ink-muted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>

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

      {project.screens && (
        <Section title="The product" wide>
          {project.screens.map((screen) => (
            <figure key={screen.src} className="pb-4">
              <Image
                src={screen.src}
                alt={screen.alt}
                width={screen.width}
                height={screen.height}
                sizes="(min-width: 1152px) 1088px, 100vw"
                className="h-auto w-full rounded-xl border border-line"
              />
              <figcaption className="mt-2 text-sm text-ink-muted">
                {screen.caption}
              </figcaption>
            </figure>
          ))}
        </Section>
      )}

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

      {project.deepDive && (
        <Section title={project.deepDive.title}>
          {project.deepDive.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {DeepDiveDiagram && (
            <figure className="py-2">
              <div className="rounded-xl border border-line bg-bg bg-[radial-gradient(var(--line)_1px,transparent_1px)] [background-size:16px_16px] p-5">
                <DiagramBody Component={DeepDiveDiagram} />
              </div>
              <figcaption className="mt-2 text-xs text-ink-muted">
                Simplified version of the real flow.
              </figcaption>
            </figure>
          )}
          {project.deepDive.points.map((point) => (
            <div key={point.title} className="pt-4">
              <h3 className="font-serif text-2xl leading-tight">
                {point.title}
              </h3>
              <p className="mt-2 text-ink-muted">{point.detail}</p>
            </div>
          ))}
        </Section>
      )}

      {Demo && (
        <Section title="Try it">
          <Demo />
        </Section>
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

      {project.improve && (
        <Section title="What I’d improve">
          {project.improve.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Section>
      )}

      {project.takeaway && (
        <div className="mt-14 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
          <p className="max-w-3xl border-l-2 border-highlight pl-5 font-serif text-2xl leading-snug italic lg:col-start-2">
            {project.takeaway}
          </p>
        </div>
      )}

      <nav
        aria-label="More case studies"
        className="mt-16 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between"
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

// Wide diagrams keep a readable size on narrow screens and scroll sideways.
function DiagramBody({ Component }: { Component: ComponentType }) {
  if (!wideDiagrams.has(Component)) return <Component />;
  return (
    <>
      <div
        tabIndex={0}
        role="region"
        aria-label="Diagram (scrolls sideways on small screens)"
        className="overflow-x-auto rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <div className="min-w-[34rem]">
          <Component />
        </div>
      </div>
      <p aria-hidden="true" className="mt-2 text-xs text-ink-muted sm:hidden">
        Scroll sideways to see the whole diagram →
      </p>
    </>
  );
}

function Fact({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <dt className="text-xs tracking-[0.12em] text-ink-muted uppercase">
        {label}
      </dt>
      <dd className="mt-1 leading-snug">{children}</dd>
    </div>
  );
}

function Section({
  title,
  wide = false,
  children,
}: {
  title: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`mt-14 grid gap-6 border-t border-line pt-10 ${wide ? "" : "lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14"}`}
    >
      <h2 className="font-serif text-3xl leading-tight lg:text-4xl">{title}</h2>
      <div
        className={`space-y-4 text-lg leading-relaxed ${wide ? "" : "max-w-3xl"}`}
      >
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
      prefetch
      className={`group py-2 sm:max-w-sm ${alignEnd ? "sm:text-right" : ""}`}
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
