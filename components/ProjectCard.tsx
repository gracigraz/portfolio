import Link from "next/link";
import { projectDiagrams } from "@/components/diagrams";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  index,
  featured = false,
  className = "",
}: {
  project: Project;
  index: number;
  featured?: boolean;
  className?: string;
}) {
  const Diagram = projectDiagrams[project.slug];

  return (
    <article
      className={`group relative rounded-card border border-line bg-surface p-6 transition-colors hover:border-ink/35 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-ink sm:p-8 ${featured ? "md:grid md:grid-cols-2 md:items-center md:gap-10" : "flex flex-col"} ${className}`}
    >
      {Diagram && (
        <div
          className={`rounded-xl border border-line bg-bg bg-[radial-gradient(var(--line)_1px,transparent_1px)] [background-size:16px_16px] p-5 ${featured ? "mb-6 md:order-2 md:mb-0" : "mb-6"}`}
        >
          <Diagram />
        </div>
      )}
      <div className="flex flex-1 flex-col">
        <p className="flex items-center gap-2 text-xs tracking-[0.12em] text-ink-muted uppercase">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-highlight"
          />
          {String(index).padStart(2, "0")} · {project.category}
        </p>
        <h3
          className={`mt-3 font-serif leading-tight ${featured ? "text-3xl sm:text-4xl" : "text-3xl"}`}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="outline-none after:absolute after:inset-0 after:rounded-card"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-ink-muted">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Skills">
          {project.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-line bg-bg px-3 py-1 text-xs text-ink-muted"
            >
              {skill}
            </li>
          ))}
        </ul>
        <p
          aria-hidden="true"
          className="mt-auto flex items-center gap-3 pt-6 text-sm font-medium text-ink"
        >
          Read case study
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-bg">
            →
          </span>
        </p>
      </div>
    </article>
  );
}
