import { ES, GB, US } from "country-flag-icons/react/3x2";
import Link from "next/link";
import { ProjectLink } from "@/components/ExternalLinks";
import { SideProjects } from "@/components/SideProjects";
import { periodLines } from "@/lib/period";
import { getProject, selectedProjects, type Project } from "@/lib/projects";
import type { Country, Degree, TimelineEntry } from "@/lib/timeline";

const flags: Record<Country, typeof US> = { US, ES, GB };

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const foundation = entries.find((entry) => entry.foundation);

  return (
    <>
      <div className="max-w-4xl">
        <p className="mb-10 flex gap-6 text-sm text-ink-muted md:pl-48">
          <span className="flex items-center gap-2">
            <WorkDot /> Work
          </span>
          <span className="flex items-center gap-2">
            <EducationDot /> Education
          </span>
        </p>

        <ol>
          {entries.map((entry) => {
            const projects = (entry.projectSlugs ?? [])
              .map(getProject)
              .filter((project) => project !== undefined);

            return (
              <li
                key={`${entry.title}-${entry.period}`}
                className="relative pb-12 pl-10 before:absolute before:top-3 before:-bottom-3 before:left-1.75 before:w-px before:bg-line last:pb-0 last:before:hidden md:grid md:grid-cols-[11rem_2rem_1fr] md:pl-0 md:before:left-48"
              >
                <span className="absolute top-1.5 left-0 md:left-[calc(12rem-7.5px)]">
                  {entry.kind === "education" ? <EducationDot /> : <WorkDot />}
                </span>
                <Period
                  entry={entry}
                  className="mb-2 md:col-start-1 md:row-start-1 md:mb-0 md:pr-6 md:text-right"
                />
                <div className="md:col-start-3 md:row-start-1">
                  <EntryContent entry={entry} projects={projects} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {foundation?.degrees && (
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {foundation.degrees.map((degree) => (
            <DegreeCard key={degree.credentials[0].name} degree={degree} />
          ))}
        </ul>
      )}
    </>
  );
}

function WorkDot() {
  return (
    <span
      aria-hidden="true"
      className="block h-3.75 w-3.75 rounded-full border-[3px] border-bg bg-ink"
    />
  );
}

function EducationDot() {
  return (
    <span aria-hidden="true" className="block h-3.75 w-3.75">
      <span className="block h-full w-full scale-[0.7] rotate-45 border-2 border-highlight bg-accent" />
    </span>
  );
}

function OrgName({ name }: { name: string }) {
  const match = /^(.*?) \((formerly .+)\)$/.exec(name);
  if (!match) return name;
  return (
    <>
      {match[1]}{" "}
      <span className="font-serif text-xl font-normal text-ink-muted italic">
        ({match[2]})
      </span>
    </>
  );
}

function Period({
  entry,
  className,
}: {
  entry: TimelineEntry;
  className: string;
}) {
  return (
    <div className={className}>
      <p
        aria-hidden="true"
        className={`font-serif text-3xl leading-none text-ink/80 ${entry.kind === "education" ? "italic" : ""}`}
      >
        {entry.year}
      </p>
      <p className="mt-2 text-xs tracking-wide whitespace-nowrap text-ink-muted uppercase">
        <span className="sr-only">{entry.period}</span>
        <span aria-hidden="true">
          {periodLines(entry.period).map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
      </p>
    </div>
  );
}

function EntryContent({
  entry,
  projects,
}: {
  entry: TimelineEntry;
  projects: Project[];
}) {
  const heading = entry.grouped ? entry.title : (entry.org ?? entry.title);
  const subheading = entry.grouped ? entry.org : entry.org && entry.title;

  return (
    <div className="max-w-2xl">
      <h3 className="text-lg leading-snug font-medium">
        <OrgName name={heading} />
        {subheading && (
          <span className="block text-base font-normal text-ink-muted">
            {subheading}
          </span>
        )}
      </h3>
      {entry.summary && (
        <p className="mt-2 leading-relaxed text-ink-muted">
          {entry.summary}
          {entry.links?.map((link) => (
            <ProjectLink
              key={link.href}
              link={link}
              context={entry.org ?? entry.title}
              className="relative ml-2 inline-flex items-center gap-1.5 text-sm whitespace-nowrap text-ink-muted transition-colors before:absolute before:inset-x-0 before:-inset-y-3 before:content-[''] hover:text-ink"
              labelClassName="underline decoration-line underline-offset-4 group-hover:decoration-highlight"
            />
          ))}
        </p>
      )}
      {projects.length > 0 && (
        <div className="mt-4">
          <h4 className="text-xs tracking-wide text-ink-muted uppercase">
            Case studies
          </h4>
          <ul className="mt-2 flex flex-wrap gap-2">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  prefetch
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 py-1.5 pr-3 pl-3.5 text-sm text-ink transition-colors hover:border-ink/40 hover:bg-surface"
                >
                  {selectedProjects.includes(project) && (
                    <span className="font-serif text-base leading-none text-ink-muted italic">
                      {String(selectedProjects.indexOf(project) + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>
                  )}
                  {project.shortTitle}
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!entry.foundation && entry.degrees && (
        <ul className="mt-4 space-y-3">
          {entry.degrees.map((degree) => (
            <DegreeRow key={degree.credentials[0].name} degree={degree} />
          ))}
        </ul>
      )}
      {entry.sideProjects && <SideProjects projects={entry.sideProjects} />}
    </div>
  );
}

function DegreeRow({ degree }: { degree: Degree }) {
  const Flag = flags[degree.country];

  return (
    <li className="flex gap-3 rounded-card border border-line bg-surface/60 p-4">
      <Flag
        aria-hidden="true"
        className="mt-1 h-4 w-6 shrink-0 rounded-xs ring-1 ring-line"
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
      </div>
    </li>
  );
}

function DegreeCard({ degree }: { degree: Degree }) {
  const Flag = flags[degree.country];
  const years = degree.credentials.map((credential) => credential.years);

  return (
    <li className="rounded-card border border-line bg-surface/60 p-6">
      <p className="flex items-center gap-2 text-xs tracking-wide text-ink-muted uppercase">
        <Flag
          aria-hidden="true"
          className="h-4 w-6 rounded-xs ring-1 ring-line"
        />
        {years.join(", ")}
      </p>
      <div className="mt-4 space-y-1">
        {degree.credentials.map((credential) => (
          <p key={credential.name} className="leading-snug font-medium">
            {credential.name}
          </p>
        ))}
      </div>
      <p className="mt-2 text-sm text-ink-muted">
        {[degree.school, degree.place].filter(Boolean).join(" · ")}
      </p>
      {degree.note && (
        <p className="mt-1 text-sm text-ink-muted italic">{degree.note}</p>
      )}
    </li>
  );
}
