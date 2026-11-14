import { ES, GB, US } from "country-flag-icons/react/3x2";
import Link from "next/link";
import { LinkPills } from "@/components/LinkPill";
import { SideProjects } from "@/components/SideProjects";
import { getProject, type Project } from "@/lib/projects";
import type { Country, Degree, TimelineEntry } from "@/lib/timeline";

const flags: Record<Country, typeof US> = { US, ES, GB };

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <>
      <p className="mb-12 flex justify-center gap-6 text-sm text-ink-muted">
        <span className="flex items-center gap-2">
          <WorkDot className="static" /> Work
        </span>
        <span className="flex items-center gap-2">
          <EducationDot className="static" /> Education
        </span>
      </p>
      <ol className="relative before:absolute before:top-2 before:bottom-0 before:left-[7px] before:w-px before:bg-line md:before:left-1/2">
        {entries.map((entry, index) => {
          const onLeft = index % 2 === 0;
          const column = onLeft ? "md:col-start-1" : "md:col-start-2";
          const opposite = onLeft ? "md:col-start-2" : "md:col-start-1";
          const dotPosition =
            "absolute top-2 left-0 md:left-1/2 md:-translate-x-1/2";
          const projects = (entry.projectSlugs ?? [])
            .map(getProject)
            .filter((project) => project !== undefined);

          return (
            <li
              key={`${entry.title}-${entry.period}`}
              className="relative pb-14 pl-10 last:pb-0 md:grid md:grid-cols-2 md:gap-16 md:pl-0"
            >
              {entry.kind === "education" ? (
                <EducationDot className={dotPosition} />
              ) : (
                <WorkDot className={dotPosition} />
              )}
              <EntryContent
                entry={entry}
                projects={projects}
                className={`${column} md:row-start-1 ${onLeft ? "md:text-right" : ""}`}
                alignEnd={onLeft}
              />
              {entry.sideProjects && (
                <div className={`md:row-start-1 md:pt-14 ${opposite}`}>
                  <SideProjects projects={entry.sideProjects} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
}

function WorkDot({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-[15px] w-[15px] rounded-full border-[3px] border-bg bg-ink ${className}`}
    />
  );
}

function EducationDot({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-[15px] w-[15px] ${className}`}
    >
      <span className="block h-full w-full rotate-45 scale-75 border-2 border-bg bg-highlight" />
    </span>
  );
}

function EntryContent({
  entry,
  projects,
  className,
  alignEnd,
}: {
  entry: TimelineEntry;
  projects: Project[];
  className: string;
  alignEnd: boolean;
}) {
  const isEducation = entry.kind === "education";

  return (
    <div className={className}>
      <p
        aria-hidden="true"
        className={`font-serif text-4xl leading-none text-ink/80 sm:text-5xl ${isEducation ? "italic" : ""}`}
      >
        {entry.year}
      </p>
      <h3 className="mt-3 text-lg font-medium">
        {entry.title}
        {entry.org && (
          <span className="block font-normal text-ink-muted">{entry.org}</span>
        )}
      </h3>
      <p className="mt-1 text-xs tracking-wide text-ink-muted uppercase">
        {entry.period}
      </p>
      {entry.summary && (
        <p
          className={`mt-3 max-w-md leading-relaxed text-ink-muted ${alignEnd ? "md:ml-auto" : ""}`}
        >
          {entry.summary}
        </p>
      )}
      {projects.length > 0 && (
        <p className="mt-3 text-sm text-ink-muted">
          Case studies:{" "}
          {projects.map((project, i) => (
            <span key={project.slug}>
              {i > 0 && " · "}
              <Link
                href={`/projects/${project.slug}`}
                className="text-ink underline decoration-highlight decoration-2 underline-offset-4"
              >
                {project.shortTitle}
              </Link>
            </span>
          ))}
        </p>
      )}
      {entry.degrees && (
        <ul className="mt-4 space-y-4 text-left">
          {entry.degrees.map((degree) => (
            <DegreeItem key={degree.credentials[0].name} degree={degree} />
          ))}
        </ul>
      )}
      {entry.links && (
        <LinkPills
          links={entry.links}
          context={entry.org ?? entry.title}
          className={`mt-3 ${alignEnd ? "md:justify-end" : ""}`}
        />
      )}
    </div>
  );
}

function DegreeItem({ degree }: { degree: Degree }) {
  const Flag = flags[degree.country];

  return (
    <li className="flex gap-3 rounded-card border border-line p-4">
      <Flag
        aria-hidden="true"
        className="mt-1 h-4 w-6 shrink-0 rounded-[2px] ring-1 ring-line"
      />
      <div className="space-y-1">
        {degree.credentials.map((credential) => (
          <p key={credential.name}>
            <span className="font-medium">{credential.name}</span>
            <span className="text-sm text-ink-muted">
              {" "}
              · {credential.years}
            </span>
          </p>
        ))}
        {(degree.school || degree.place) && (
          <p className="text-sm text-ink-muted">
            {[degree.school, degree.place].filter(Boolean).join(" · ")}
          </p>
        )}
        {degree.note && (
          <p className="mt-1 text-sm text-ink-muted italic">{degree.note}</p>
        )}
      </div>
    </li>
  );
}
