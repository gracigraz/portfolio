import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  return (
    <article
      className={`group relative flex flex-col rounded-card bg-surface p-5 transition-shadow hover:shadow-md has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-ink ${className}`}
    >
      <div
        aria-hidden="true"
        className="mb-4 h-14 rounded-xl bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent)_45%,transparent_45%)] bg-bg"
      />
      <h3 className="font-serif text-2xl leading-tight">
        <Link
          href={`/projects/${project.slug}`}
          className="outline-none after:absolute after:inset-0 after:rounded-card"
        >
          {project.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        {project.summary}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Skills">
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
        className="mt-auto pt-5 text-sm font-medium text-ink group-hover:underline"
      >
        Read case study →
      </p>
    </article>
  );
}
