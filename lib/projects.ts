export type Skill =
  | "TypeScript"
  | "React"
  | "Next.js"
  | "Python"
  | "AWS"
  | "LLM agents"
  | "Neo4j"
  | "Root-cause analysis";

export type Decision = { title: string; detail: string };

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  skills: Skill[];
  role: string;
  period: string;
  outcome: string;
  problem: string[];
  myRole: string[];
  decisions: Decision[];
  results: string[];
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
    role: "Design doc owner; agent changes and product UI",
    period: "Mar to Apr 2026",
    outcome: "A hard customer rule, enforced in code",
    problem: [
      "Our autonomous agent was built for new sourcing: a person asks for vendors, and the agent goes out and finds them. Renewals are the opposite shape. The agent should start on its own about 90 days before a contract renews, it already knows the vendor, the dates, and the pricing, and the first human touchpoint is an email to the business owner asking whether to renew.",
      "An enterprise customer was launching renewals with a hard rule: the agent must never email a vendor. It could brief people inside the company and draft the vendor email, but a person had to send it. The launch had a fixed date.",
    ],
    myRole: [
      "I wrote the design doc that defined the renewal statuses, the schema and endpoint changes, the guardrails, the UI approach, and a phased delivery plan.",
      "Then I shipped both sides: the agent changes (new task fields, prompt branching so renewal tasks load their own instructions, the email allowlist, and task-closure rules) and the product UI for creating renewal tasks and showing their contract details and status. The teammates who built the agent platform owned the runtime itself.",
    ],
    decisions: [
      {
        title: "The hard rule lives in code, not in the prompt",
        detail:
          "Per-customer instructions in the prompt are a request, not a guarantee: a model can misread them, and an email can try to talk it into something else. The model only ever requests a send; the code that executes it checks the recipient's domain against a per-customer allowlist first. Unlisted domains are blocked and the task stops at draft ready. When no allowlist is set, nothing changes, so other customers weren't affected.",
      },
      {
        title: "One agent with branched instructions, not a new agent",
        detail:
          "Renewals reuse the same tasks, statuses, email, and approval flow as sourcing. A task type selects which runtime instructions load. Less duplication and faster to ship, with the tradeoff that the branch has to be exactly right.",
      },
      {
        title: "A UI driven by data, not by task type",
        detail:
          "The UI never branches on the task type. A contract card appears when contract fields exist; a due date appears when there's a renewal date. That let the UI ship before the backend fields did, and a future task type works with no frontend changes.",
      },
    ],
    results: [
      "The customer's rule became enforceable in code instead of a hope in a prompt, and it was backward compatible for everyone else.",
      "The agent changes and the UI shipped the same day, on the plan the design doc laid out.",
      "In the first days after release I found and fixed two silent failures: renewal tasks were loading the generic instructions (the task type was read from the wrong place), and renewal emails went out as plain text (shared formatting rules were missing from the renewal branch).",
    ],
  },
  {
    slug: "internal-admin-portal",
    title: "An internal admin portal people trusted",
    shortTitle: "Admin portal",
    category: "Internal tooling",
    summary:
      "The tool our non-engineering team used daily to look up and correct customer data safely: an audit trail, previews before destructive actions, and duplicate merging with explicit conflict rules.",
    skills: ["Next.js", "TypeScript", "Python", "Neo4j", "AWS"],
    role: "Built it end to end",
    period: "Jul 2025 to May 2026",
    outcome: "Data fixes without filing tickets",
    problem: [
      "Customer data in our graph came from several sources: contract-system syncs, manual additions, and document uploads. Duplicates and mistakes were inevitable, and every correction meant asking an engineer.",
      "The people closest to the customers needed to look up and fix data themselves, across environments, without the risk of breaking something they couldn't see.",
    ],
    myRole: [
      "I built the internal admin portal end to end: the Next.js frontend and the Python API behind it on AWS, including lookups and edits across environments, previews before destructive actions, and the duplicate-merge tooling.",
    ],
    decisions: [
      {
        title: "Explicit rules for which value wins",
        detail:
          "Merging two records means deciding, field by field and relationship by relationship, what to keep. Instead of one generic merge, each kind of relationship has an explicit transfer rule, and custom fields follow a small decision tree: a real conflict is cleared and recalculated, while a value only one side has is simply kept.",
      },
      {
        title: "A report of everything that changed",
        detail:
          "Every merge returns a report of each conflicting field and each dropped value, so the person running it can verify the result instead of trusting it.",
      },
      {
        title: "Safe execution order",
        detail:
          "Graph changes run in one transaction that validates before it writes, then the supporting data updates, then derived values are recalculated in the background. A failure early on leaves nothing half-merged.",
      },
    ],
    results: [
      "Non-engineers used the portal daily to look up and correct customer data instead of filing tickets.",
      "The merge tooling grew from single product merges to bulk merges of several duplicates into one record, for products and suppliers.",
    ],
  },
  {
    slug: "zip-sync-investigation",
    title: "Finding the contracts that never arrived",
    shortTitle: "Zip sync audit",
    category: "Production investigation",
    summary:
      "A 215-vendor audit traced missing contracts to configuration and filter behavior, not bugs. The fix: per-customer sync settings, support beyond PDFs, and a runbook anyone could follow.",
    skills: ["Root-cause analysis", "Python", "AWS"],
    role: "Led the investigation and the fix",
    period: "May 2026",
    outcome: "About 2,000 more documents synced",
    problem: [
      "A customer reported that vendors they could see in their contract system weren't showing up in our product. The sync job wasn't erroring, so the question was whether it was broken or doing exactly what it was told.",
    ],
    myRole: [
      "I audited all 215 vendors the customer listed, traced each one through the sync's filter chain, found the real causes, shipped the fix, and turned the investigation into a runbook the team could reuse.",
    ],
    decisions: [
      {
        title: "Classify every vendor before changing anything",
        detail:
          "Each vendor landed in exactly one bucket: already synced, outside the date window, excluded attachment type, no file attached, or no agreement. 146 of the 147 that should have synced were verified in the graph. The missing ones were the filters working as configured, not a bug.",
      },
      {
        title: "The real recency gate was the date window",
        detail:
          "A contract's status stays active even after it expires, so the end-date window, not the status, was deciding what synced. That's what made recent-looking contracts disappear.",
      },
      {
        title: "Fix it in configuration, not code",
        detail:
          "I added per-customer settings for the date window, extra attachment types, and syncing uncategorized contracts, with defensive normalization so a typo can't accidentally disable a filter. I also widened file support beyond PDFs to Office documents and images.",
      },
    ],
    results: [
      "About 2,000 additional documents synced after the change.",
      "56 new unit tests and three production dry runs before enabling it.",
      "A step-by-step runbook so the next missing-data report doesn't need me.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
