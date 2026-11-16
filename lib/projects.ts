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
  diagramCaption?: string;
  website?: { label: string; href: string };
  screens?: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  }[];
  problem: string[];
  myRole: string[];
  decisions: Decision[];
  deepDive?: { title: string; intro: string[]; points: Decision[] };
  results: string[];
  improve?: string[];
  takeaway?: string;
};

export const projects: Project[] = [
  {
    slug: "content-attribution",
    title: "Which video made the sale?",
    shortTitle: "Content attribution",
    category: "Attribution",
    summary:
      "Designed and built an attribution product end to end that traces each sale back to the YouTube video, email, or post that drove it: tracked links, a tracking script, an edge ingest API, and a revenue dashboard.",
    skills: ["Next.js", "TypeScript", "Supabase", "Edge functions"],
    role: "Sole engineer, end to end",
    period: "Mar to Aug 2026",
    outcome: "The creator can see which videos bring people in",
    diagramCaption:
      "Simplified diagram of how a visit becomes an attributed sale.",
    website: { label: "alquimista.io", href: "https://alquimista.io/" },
    screens: [
      {
        src: "/images/alquimista/alquimista-dashboard.png",
        alt: "Alquimista dashboard row for one YouTube video, expanded to show a day-by-day chart of the clicks and email sign-ups it drove.",
        caption:
          "One video in the dashboard, expanded: the visits and email sign-ups it drove, day by day.",
        width: 1663,
        height: 425,
      },
      {
        src: "/images/alquimista/alquimista-debug.png",
        alt: "Alquimista tracking debug page listing test scenarios: source from URL, cookie attribution, cookie persistence across pages, direct visit, revenue capture, offer attribution, and source-type resolution, each with a Run button.",
        caption:
          "The debug page: named scenarios that fire real events and check each step of attribution before a creator goes live.",
        width: 1617,
        height: 668,
      },
      {
        src: "/images/alquimista/alquimista-login.png",
        alt: "Alquimista sign-in page in Spanish with a magic-link email field.",
        caption:
          "Passwordless sign-in. The product is in Spanish for its first user.",
        width: 1885,
        height: 950,
      },
    ],
    problem: [
      "A course creator publishes YouTube videos, emails, and community posts that all point to the same offers. There was no way to tell which piece of content brought people in, led to a sign-up, or ended in a sale, so there was no way to know where to put the effort.",
      "The hard part is the gap between the click and the purchase. People often buy days after they first click, on a different page (the thank-you page after checkout), and the checkout itself runs on a third-party platform I couldn’t change.",
    ],
    myRole: [
      "The creator had the idea and the need; I designed and built the product end to end around it: the data model, the tracking script that runs on his pages, the ingest API, tracked-link generation, offers and funnel steps, and the dashboard, in Spanish for a Spanish-speaking audience.",
      "I wrote the design doc first, recording the stack decisions as ADRs, and an onboarding guide for proving tracking works before trusting the numbers. It runs on Next.js and Supabase on Vercel, with Upstash Redis for rate limiting and the YouTube Data API for video details.",
    ],
    decisions: [
      {
        title: "A cookie carries the source from first click to purchase",
        detail:
          "Every tracked link carries a short source key. The tracking script saves it in a first-party cookie for 30 days, so when the sale fires on the thank-you page days later, it reads the same source. That works on any checkout platform without integrating with it.",
      },
      {
        title: "Split the source into an ID and a type",
        detail:
          "YouTube videos have a URL, so their key is the video ID. Emails and posts don’t, so the creator names them and the app mints a key from the name plus a short random suffix, so two campaigns with the same subject never collide. The key is stored, not re-derived from a URL on every read, which had broken for sources without a URL.",
      },
      {
        title: "A fast, defensive ingest endpoint",
        detail:
          "The tracking endpoint is public, so it’s hardened. Events arrive on an Edge route for low latency; it rejects unknown tracking IDs, rate-limits with Redis over HTTP (Edge can’t open raw connections), and drops bot traffic. I tuned the bot filter against real data: a headless renderer on the creator’s page platform was inflating page views. It leans toward keeping a real visitor over dropping one.",
      },
      {
        title: "Prove the pipeline before trusting the numbers",
        detail:
          "An attribution dashboard is only useful if people believe it. I built an admin event stream that flags any event matching no tracked link, and a debug page that fires real events so setup can be verified before a creator goes live. On the dashboard, a publish date only appears when it’s real, from YouTube or set by the creator, and the first click is shown separately, so no date is guessed.",
      },
    ],
    deepDive: {
      title: "Deep dive: getting the revenue number right",
      intro: [
        "The dashboard’s headline, this video earned €X, is only true if each sale carries a real amount, and the checkout runs on a platform I don’t control.",
      ],
      points: [
        {
          title: "The offer price as the default",
          detail:
            "By default the server records the offer’s price from the database. It works for any creator on any platform with zero integration, it’s accurate for fixed-price products, the common case, and it costs one extra read, only on sales, never on page views.",
        },
        {
          title: "The checkout decides, not the landing page",
          detail:
            "Exact totals with discounts, bumps, or refunds live in the payment system. Reading them off the thank-you page is per-platform and fragile; payment webhooks are authoritative but need the creator to connect their account and the source to travel through checkout. So onboarding starts with one question, how do you take payment, and until a creator’s pricing actually varies, the offer price is the right answer.",
        },
      ],
    },
    results: [
      "For the first time, the creator can see which videos bring visitors and email sign-ups, and he uses it as its first user. Sale tracking is built and verified on the debug page, ready for paid offers.",
      "Real traffic shaped the product: the bot filter, the event stream, and the debug page all came from verifying live data instead of trusting it.",
      "I also designed the next step: safely inserting tracked links into existing video descriptions, with snapshots and a revert path before any live edit.",
    ],
    improve: [
      "Before opening signups beyond one trusted creator, I’d add stronger verification for sale events and stricter checks on where events come from.",
      "I’d also build the cookie-consent handling I designed: hold events until a visitor accepts, then send them, and show creators how much traffic goes untracked when visitors decline, so the numbers stay honest.",
    ],
    takeaway:
      "Attribution is a trust problem as much as a tracking problem: the numbers only matter if the person reading them can believe them.",
  },
  {
    slug: "ai-agent-renewals",
    title: "Contract renewals for an AI agent",
    shortTitle: "AI agent renewals",
    category: "AI agent",
    summary:
      "Designed and built a contract renewal workflow for our AI agent: the task schema, a gated status machine, an outbound email allowlist enforced in code, the product UI, and a demo DocuSign signing flow.",
    skills: ["LLM agents", "Python", "TypeScript", "Next.js", "AWS"],
    role: "Design doc owner; agent changes and product UI",
    period: "Mar to May 2026",
    outcome: "A hard customer rule, enforced in code",
    problem: [
      "Our autonomous agent was built for new sourcing: a person asks for vendors, and the agent goes out and finds them. Renewals are the opposite shape. The agent should start on its own about 90 days before a contract renews, it already knows the vendor, the dates, and the pricing, and the first human touchpoint is an email to the business owner asking whether to renew.",
      "An enterprise customer was launching renewals with a hard rule: the agent must never email a vendor. It could brief people inside the company and draft the vendor email, but a person had to send it. The launch had a fixed date.",
    ],
    myRole: [
      "I wrote the design doc that defined the renewal statuses, the schema and endpoint changes, the guardrails, the UI approach, and a phased delivery plan.",
      "Then I shipped both sides: the agent changes (new task fields, prompt branching so renewal tasks load their own instructions, the status machine, the email allowlist, and task-closure rules) and the product UI for creating renewal tasks and showing their contract details and status. I also added DocuSign signing to the contract workflow for a customer demo.",
    ],
    decisions: [
      {
        title: "The hard rule lives in code, not in the prompt",
        detail:
          "Per-customer instructions in the prompt are a request, not a guarantee: a model can misread them, and an email can try to talk it into something else. The model only ever requests a send; the code that executes it checks every recipient’s domain against a per-customer allowlist first. Unlisted domains are blocked and the task stops at draft ready. When no allowlist is set, nothing changes, so other customers weren’t affected.",
      },
      {
        title: "A status machine with gates, and a way back from escalation",
        detail:
          "A renewal moves through eight statuses, from reading the contract to ready for signature, across four phases: brief and owner alignment, strategy and vendor draft, negotiation, and close. Every transition has a condition, and the agent may never advance a status speculatively. A vendor response outside the customer’s policy moves the task to Escalated, where it pauses until a person gives direction, then returns to Negotiating. Vendor outreach also needs a recorded approval for that specific draft.",
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
    deepDive: {
      title: "Deep dive: contract signing with DocuSign",
      intro: [
        "The last step of a renewal is a signed agreement. For a customer demo, I extended the agent’s contract workflow to route documents for signature through DocuSign.",
      ],
      points: [
        {
          title: "The legal content comes from a reviewed template",
          detail:
            "Rather than letting the model write a contract, the agent copies the company’s legally reviewed SOW template in Google Docs, fills in the agreed terms, and exports it to PDF. DocuSign only handles the signatures, placed with text anchors in the document instead of hard-coded positions.",
        },
        {
          title: "A small set of tools",
          detail:
            "I gave the agent tools to list templates, send a document for signature, send from a saved template, check signing status, and download the signed PDF.",
        },
        {
          title: "Careful with an action that can’t be undone",
          detail:
            "Sending a contract to real people is different from drafting one. The tools refuse to run outside the demo environment, the agent stages envelopes as drafts and confirms recipients before sending, and if the template flow fails it has to say so and flag the contract for legal review.",
        },
      ],
    },
    results: [
      "The customer’s rule became enforceable in code instead of a hope in a prompt, and it was backward compatible for everyone else.",
      "The agent changes and the UI shipped the same day, on the plan the design doc laid out.",
      "In the first days after release I found and fixed two silent failures: renewal tasks were loading the generic instructions (the task type was read from the wrong place), and renewal emails went out as plain text (shared formatting rules were missing from the renewal branch).",
      "The runtime held up: a third workflow type was later added on the same foundation without redesigning it.",
    ],
    improve: [
      "The email allowlist showed how much stronger a rule is when code enforces it. Some other rules, like valid status transitions, the recorded approval before a vendor send, and confirming DocuSign recipients, live in the agent’s instructions.",
      "Next I’d move those critical checks into code as well, and add automated evaluations for missing information, conflicting instructions, and interrupted workflows. The goal isn’t to remove the agent’s flexibility, but to make sure it works inside boundaries the system can enforce.",
    ],
    takeaway:
      "A useful AI agent is as much about designing the workflow and its boundaries as it is about the model.",
  },
  {
    slug: "internal-admin-portal",
    title: "An admin platform built for people outside engineering",
    shortTitle: "Admin portal",
    category: "Internal tooling",
    summary:
      "An internal platform our support and operations team used to investigate and correct customer data without going through engineering, including a service that merges duplicate records without losing what’s attached to them.",
    skills: ["Next.js", "TypeScript", "Python", "Neo4j", "AWS"],
    role: "Built it end to end",
    period: "Jul 2025 to May 2026",
    outcome: "Data fixes without waiting on engineering",
    problem: [
      "Our product relied on data from many sources: contracts, suppliers, documents, emails, and customer integrations. When something looked wrong, investigating it usually meant an engineer querying the databases directly. That worked with a small team, but it didn’t scale, and our support and operations team needed to understand and fix problems themselves.",
      "The challenge wasn’t just putting the data on a screen. Some actions change or delete relationships between records, so the tool had to make sense to someone who doesn’t know the database, and make dangerous operations hard to do by accident.",
    ],
    myRole: [
      "I built the platform end to end: a separate Next.js application, a Python API with its own API Gateway and Cognito user pool, and the infrastructure in AWS CDK. It works with the same customer data as the product, but behind its own application and login.",
      "It started as a way to look up and edit records and grew into a platform for managing data, investigating problems, and merging duplicates. I wrote the conventions file for contributors, and other engineers later built on it, adding agent trace views, test cases, and a prompt-management interface.",
    ],
    decisions: [
      {
        title: "One form that adapts to every record type",
        detail:
          "Most of our data lived in Neo4j: products, suppliers, documents, and more, connected by relationships. Instead of a hand-built form for each record type, the API samples existing records to detect each type’s fields and infer their types, and the frontend generates the form from that. New fields showed up without a frontend change. The tradeoff is that an inferred schema can be wrong, for example treating a field that’s almost always present as required.",
      },
      {
        title: "The environment is chosen per request",
        detail:
          "The team needed to investigate data in different environments without switching tools. The interface has an environment switcher, and each API request carries the selected environment, which the backend uses to connect to the right database. Because the environment belongs to the request rather than shared state, two requests can target different environments at the same time.",
      },
      {
        title: "Show the consequences before the click",
        detail:
          "I didn’t want anyone to discover what an action did after confirming it. Destructive operations show a preview of what will be affected first, and admin actions are logged with who ran them, so changes can be traced afterward. The people using the tool every day weren’t engineers, and that changed what done meant.",
      },
    ],
    deepDive: {
      title: "Deep dive: merging duplicate records",
      intro: [
        "Duplicates appeared when the same product or supplier arrived from different integrations or uploads, each with its own documents, email threads, and custom-field values. Deleting one wasn’t an option: other records would point at something that no longer existed. The goal was to consolidate them without losing anything attached to either.",
      ],
      points: [
        {
          title: "A registry of relationships, each with a rule",
          detail:
            "Not every relationship can be handled the same way. Documents, emails, and notes move to the record being kept. Categories move too, without creating a duplicate link when both records already share one. Some relationships keep the target’s version, and an active workflow blocks the merge. Every relationship type has an explicit policy, which makes the behavior easy to read, test, and extend.",
        },
        {
          title: "Validate, then write in one transaction",
          detail:
            "Before changing anything, the service checks that the products belong to the same supplier and that the target has no active workflow. The Neo4j changes run in a single transaction, so a failure rolls them back, and only after it commits are the references stored in DynamoDB updated.",
        },
        {
          title: "Conflicts aren’t silently resolved",
          detail:
            "Custom fields are values derived from contracts and documents, like renewal costs or end dates. When both records have a value, the service doesn’t just pick one: it keeps the target’s, marks the field for recomputation, and records the discarded value in a comment. The custom-fields job then re-derives it from the combined documents, and every merge returns a report of the conflicts and dropped values. Merging shouldn’t assume one record was always right.",
        },
        {
          title: "Built to extend",
          detail:
            "The first version merged one product into another. I then extracted the shared logic into a common merge service, with product and supplier versions that keep their own validation and rules, and added merging several duplicates in one operation. Existing single-record calls kept working, with tests covering both.",
        },
      ],
    },
    results: [
      "Our support and operations team could investigate and correct data directly, instead of waiting on an engineer for each issue.",
      "It became a shared foundation: other engineers added their own operational tools on top of it.",
      "The merge service grew from one product at a time to bulk merges of products and suppliers, without breaking existing calls.",
    ],
    improve: [
      "The merge service relies on explicitly maintained lists of relationships and their policies. I still think that was right: discovering a relationship automatically doesn’t tell you whether it’s safe to move, deduplicate, or discard. But someone could add a new relationship and forget to register it.",
      "If I revisited it, I’d add a test that compares the relationship types in the database against the registry and fails when one is missing. It’s a small addition, but it would stop new data from being silently left behind in a merge.",
    ],
    takeaway:
      "Manufacturing taught me that a tool isn’t finished when it works for the person who built it. The people using it need to understand what they’re changing, and how to recover if something goes wrong.",
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
