"use client";

import { useId, useState } from "react";
import { ExternalLinks } from "@/components/ExternalLinks";
import type { SideProject } from "@/lib/timeline";

export function SideProjects({ projects }: { projects: SideProject[] }) {
  const [open, setOpen] = useState(false);
  const listId = useId();

  return (
    <div className="mt-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 py-2 text-sm text-ink underline decoration-highlight decoration-2 underline-offset-4 hover:decoration-ink"
      >
        Earlier bootcamp projects ({projects.length})
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

      <div
        id={listId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <ul className="mt-2 divide-y divide-line rounded-card border border-line bg-surface/60 px-4">
            {projects.map((project) => (
              <li
                key={project.name}
                className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3"
              >
                <p className="text-sm">
                  <span className="font-medium">{project.name}</span>
                  {project.label && (
                    <span className="text-ink-muted"> · {project.label}</span>
                  )}
                </p>
                <ExternalLinks links={project.links} context={project.name} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
