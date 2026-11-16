export type Skill =
  | "TypeScript"
  | "React"
  | "Next.js"
  | "Python"
  | "AWS"
  | "LLM agents"
  | "Neo4j"
  | "Supabase"
  | "Edge functions";

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
    slug: "content-attribution",
    title: "Which video made the sale?",
    shortTitle: "Content attribution",
    category: "Attribution",
    summary:
      "Built an attribution product end to end that traces each sale back to the YouTube video, email, or post that drove it: tracked links, a tracking script, an edge ingest API, and a revenue dashboard.",
    skills: ["Next.js", "TypeScript", "Supabase", "Edge functions"],
    role: "Sole engineer: product, data model, tracking, API, and dashboard",
    period: "Jun to Jul 2026",
    outcome: "The creator can see which videos drive sales",
    problem: [
      "A course creator publishes YouTube videos, emails, and community posts that all point to the same sales page. Sales were coming in, but there was no way to tell which piece of content had earned them, so there was no way to know where to put the effort.",
      "The hard part is the gap between the click and the purchase. People often buy days after they first click, on a different page (the thank-you page after checkout), and the checkout itself runs on a third-party platform.",
    ],
    myRole: [
      "The creator had the idea and the need; I designed and built the product end to end around it: the data model, the tracking script that runs on his pages, the ingest API, tracked-link generation, offers and funnel steps, and the dashboard, in Spanish for a Spanish-speaking audience.",
      "I wrote the design doc first, recording the stack decisions as ADRs, and an onboarding guide for proving tracking works before trusting the numbers.",
    ],
    decisions: [
      {
        title: "A cookie carries the source from first click to purchase",
        detail:
          "Every tracked link carries a short source key (`?src=`). The tracking script saves it in a first-party cookie for 30 days, so when the sale fires on the thank-you page days later, it reads the same source. That works on any checkout platform without integrating with it.",
      },
      {
        title: "Split the source into an ID and a type",
        detail:
          "YouTube videos have a URL, so their key is the video ID. Emails and posts don’t, so the creator names them and the app mints a key from the name plus a short random suffix, so two campaigns with the same subject never collide. The key is stored, not re-derived from a URL on every read, which had broken for sources without a URL.",
      },
      {
        title: "Revenue comes from the server, not the browser",
        detail:
          "Sale events don’t carry a price the browser could fake. The server looks up the offer’s price, one extra read only on sales, never on page views. It’s accurate for fixed-price products, the common case. Exact totals with discounts would need payment webhooks, deferred until pricing actually varies.",
      },
      {
        title: "A fast, defensive ingest endpoint",
        detail:
          "Events arrive on an Edge route for low latency. It rejects unknown tracking IDs, rate-limits with Redis over HTTP (Edge can’t open raw connections), and drops bot traffic. The bot filter was tuned against real data: a headless renderer on the creator’s page platform was inflating page views, and it leans toward keeping a real visitor over dropping one.",
      },
    ],
    results: [
      "For the first time, the creator can see which videos drive sales, and he uses it as its first user.",
      "I also designed the next step: safely inserting tracked links into existing video descriptions, with snapshots and a revert path before any live edit.",
    ],
  },
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
          "Per-customer instructions in the prompt are a request, not a guarantee: a model can misread them, and an email can try to talk it into something else. The model only ever requests a send; the code that executes it checks the recipient’s domain against a per-customer allowlist first. Unlisted domains are blocked and the task stops at draft ready. When no allowlist is set, nothing changes, so other customers weren’t affected.",
      },
      {
        title: "One agent with branched instructions, not a new agent",
        detail:
          "Renewals reuse the same tasks, statuses, email, and approval flow as sourcing. A task type selects which runtime instructions load. Less duplication and faster to ship, with the tradeoff that the branch has to be exactly right.",
      },
      {
        title: "A UI driven by data, not by task type",
        detail:
          "The UI never branches on the task type. A contract card appears when contract fields exist; a due date appears when there’s a renewal date. That let the UI ship before the backend fields did, and a future task type works with no frontend changes.",
      },
    ],
    results: [
      "The customer’s rule became enforceable in code instead of a hope in a prompt, and it was backward compatible for everyone else.",
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
      "The people closest to the customers needed to look up and fix data themselves, across environments, without the risk of breaking something they couldn’t see.",
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
    slug: "chat-threads",
    title: "From one chat to many threads",
    shortTitle: "Chat threads",
    category: "Data modeling",
    summary:
      "Designed and shipped multiple conversations for our AI assistant: a new thread index alongside the untouched message history, backward compatibility for every existing chat, a backfill, and the sidebar UI.",
    skills: ["Python", "AWS", "TypeScript", "Next.js"],
    role: "Design doc author; backend and frontend",
    period: "Dec 2025 to Feb 2026",
    outcome: "Users can keep and return to many conversations",
    problem: [
      "Our AI assistant stored every message in one table keyed by chat ID, and a user’s general chat ID was simply their user ID. So each person had a single general conversation: starting a new chat overwrote the old one.",
      "There was also nowhere to keep a title or per-chat instructions, no way to scope a chat to several products, and listing a user’s chats would have meant scanning millions of messages.",
    ],
    myRole: [
      "I wrote the design doc and built both sides: on the backend, the thread service, the new endpoints, API tests, and a backfill script; in the product, the thread sidebar with search, grouping by product, editable titles, and resuming a conversation.",
    ],
    decisions: [
      {
        title: "A new thread index instead of changing the message table",
        detail:
          "The message table stays exactly as it was. A new table, keyed by user, holds one row per thread: title, preview, last activity, scope, and linked products. It costs one extra write per message, and in exchange there is no schema change and no risk to the messages already in production.",
      },
      {
        title: "Rejecting the index that looked simpler",
        detail:
          "A secondary index on the message table would have allowed querying by user, but titles and instructions would still need a home, every existing message would need a user ID backfilled, and the index returns messages rather than threads, so the client would have to deduplicate them. We would have ended up with two tables anyway, plus the complexity.",
      },
      {
        title: "Every existing chat keeps working",
        detail:
          "The owner and scope of a thread are inferred from the existing chat ID formats: web users, product chats, and Slack channels, threads, and DMs. New threads get IDs generated by the backend, and a backfill script with a dry run brings existing conversations into the new list.",
      },
    ],
    results: [
      "Users can run many conversations with the assistant, scoped to one or several products, and come back to them from the sidebar.",
      "Shipped without changing the existing message table, with API tests covering the new endpoints.",
    ],
  },
];

// The projects shown in "Selected work", in order. Others keep their pages
// and stay linked from the timeline.
export const selectedProjects = projects.filter(
  (project) => project.slug !== "chat-threads",
);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
