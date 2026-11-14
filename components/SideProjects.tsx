"use client";

import { useId, useState } from "react";
import { LinkPills } from "@/components/LinkPill";
import type { SideProject } from "@/lib/timeline";

const VISIBLE_COUNT = 2;

export function SideProjects({ projects }: { projects: SideProject[] }) {
  const [open, setOpen] = useState(false);
  const hiddenId = useId();
  const visible = projects.slice(0, VISIBLE_COUNT);
  const hidden = projects.slice(VISIBLE_COUNT);

  return (
    <div className="mt-4 rounded-card border border-line text-left">
      <p className="px-4 pt-4 text-xs tracking-[0.2em] text-ink-muted uppercase">
        Projects
      </p>
      <ul className="divide-y divide-line px-4">
        {visible.map((project) => (
          <Row key={project.name} project={project} />
        ))}
      </ul>

      {hidden.length > 0 && (
        <>
          <div
            id={hiddenId}
            inert={!open}
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
          >
            <ul className="divide-y divide-line overflow-hidden border-line px-4 [&>li:first-child]:border-t">
              {hidden.map((project) => (
                <Row key={project.name} project={project} />
              ))}
            </ul>
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={hiddenId}
            onClick={() => setOpen((value) => !value)}
            className="flex w-full items-center justify-center gap-2 rounded-b-card border-t border-line py-3 text-sm text-ink-muted transition-colors hover:bg-surface hover:text-ink"
          >
            {open ? "Show fewer" : `Show ${hidden.length} more`}
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            >
              <path
                d="m4 6 4 4 4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

function Row({ project }: { project: SideProject }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3">
      <p className="text-sm">
        <span className="font-medium">{project.name}</span>
        {project.label && (
          <span className="text-ink-muted"> · {project.label}</span>
        )}
      </p>
      <LinkPills links={project.links} context={project.name} />
    </li>
  );
}
