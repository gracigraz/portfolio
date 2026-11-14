export type Skill =
  | "TypeScript"
  | "React"
  | "Next.js"
  | "Python"
  | "AWS"
  | "LLM agents"
  | "Neo4j"
  | "Root-cause analysis";

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  skills: Skill[];
};

export const projects: Project[] = [
  {
    slug: "ai-agent-renewals",
    title: "Contract renewals for an AI agent",
    shortTitle: "AI agent renewals",
    category: "AI agent",
    summary:
      "Designed and shipped renewal support for our AI agent: the design doc, task schema, prompt branching, an outbound email allowlist enforced in code, and the review UI.",
    skills: ["LLM agents", "Python", "TypeScript", "Next.js", "AWS"],
  },
  {
    slug: "internal-admin-portal",
    title: "An internal admin portal people trusted",
    shortTitle: "Admin portal",
    category: "Internal tooling",
    summary:
      "The tool our non-engineering team used daily to look up and correct customer data safely: an audit trail, previews before destructive actions, and duplicate merging with explicit conflict rules.",
    skills: ["Next.js", "TypeScript", "Python", "Neo4j", "AWS"],
  },
  {
    slug: "zip-sync-investigation",
    title: "Finding the contracts that never arrived",
    shortTitle: "Zip sync audit",
    category: "Production investigation",
    summary:
      "A 215-vendor audit traced missing contracts to configuration and filter behavior, not bugs. The fix: per-customer sync settings, support beyond PDFs, and a runbook anyone could follow.",
    skills: ["Root-cause analysis", "Python", "AWS"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
