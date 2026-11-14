# Decisions

Why this site is built the way it is. The how is in [TECHNICAL_DESIGN.md](TECHNICAL_DESIGN.md).

The guiding constraint: a 4 to 6 hour build where polish and clear priorities matter more than feature count. Every choice below trades plumbing for time spent on design, content, and the states people actually see.

---

## Stack

**Next.js (App Router) + TypeScript + Tailwind, deployed on Vercel.**

- Pages are pre-rendered to real HTML. For a portfolio that gets shared on LinkedIn and Slack, that means link previews (title, description, image) work, search engines see the content immediately, and the first load is fast on slow phones.
- The contact endpoint lives in the same project as the pages: one repo, one deploy, no separate backend service.
- It's the framework I'm fastest and most careful in, so more of the time goes into polish.

**Considered: React + Vite (on Netlify or Vercel).** Honestly, the gap for a site this size is small. Vite's main advantage, a faster dev server, only helps while coding; visitors never see it, and this site is built once by one person. Without pre-rendering, a default Vite app sends a mostly empty HTML page, which hurts link previews. Routing isn't a real difference either way.

**Considered: a Python (FastAPI) backend for the form.** It would add a second language and runtime to serve one endpoint. Not worth it here.

---

## Contact form

**What "working" means:** a message actually reaches me, and the visitor always knows whether it worked (sending, sent, or failed).

| Decision | Why | Considered instead |
|---|---|---|
| My own Route Handler (`/api/contact`) calling Resend | Keeps the only backend logic in the project as my own readable code: validation, bot check, secrets in env vars, error handling | **Formspree**: zero server code, but it hides the backend behind a third-party service. **Netlify Forms**: requires Netlify hosting |
| Save to Supabase (Postgres) **first**, then send the email | A message is never lost: if the email provider is down, the row is still saved with `email_status = 'failed'`. My inbox isn't the only record | Email only (a provider outage loses the message) |
| Supabase accessed only from the server, RLS on with no public policies | The browser never talks to the database, so the table can't be read or written from outside | Supabase client in the browser with the anon key |
| Route Handler + `fetch`, not a Server Action | Explicit HTTP contract with status codes, easy to test with `curl`, full control over each UI state | Server Action |
| One hand-written `validateContact()` shared by client and server, no Zod | Three simple fields: about 20 readable lines, one less dependency, and sharing the function already gives one source of truth. The server always re-validates | **Zod**: the right call for bigger forms, nested or conditional rules, React Hook Form, or inferring types from a schema |
| Plain-text email | Never build HTML from user input | HTML email template |
| Hidden honeypot field; filled → fake success, nothing sent | Stops simple bots without a CAPTCHA, and bots don't learn they were caught | reCAPTCHA / Turnstile (listed under "with more time") |
| No automatic email to the visitor | A form that emails whatever address is typed in can be abused to send mail to strangers. It would also need a verified domain | Auto-reply confirmation |
| The visitor's details go only to me; server logs record outcome and IDs, never message text | Their data is used for one thing: replying | Logging full submissions |
| No email address published on the site; error fallback points to LinkedIn | Nothing to scrape, and a real fallback if the form fails | `mailto:` link |

---

## Content and features

| Decision | Why | Considered instead |
|---|---|---|
| Project content as typed data in `lib/projects.ts` | The `Project` type requires role, problem, decisions, and results for every project, so no page can skip them; one template keeps pages consistent | **MDX** (better for long free-form posts); a **CMS** (for non-developer editors this site doesn't have) |
| Three projects, each showing a different skill | An AI product built end to end, internal tooling, and production debugging | More projects with less depth |
| SVG diagrams instead of screenshots | Past work is proprietary. Diagrams in the site palette explain each system at a glance | Screenshots, stock images |
| One interactive feature: a skill filter | People reviewing a portfolio scan by skill; tags already live in the project data | Full-text site search (three projects means nothing to search) |
| Filtering on the home page only | Reading query params on project pages would make them dynamic instead of static | `?skill=` highlighting on project pages |
| Native form elements styled with Tailwind | Four elements; native ones are accessible by default and need no library | shadcn/ui |
| Intro merged into the hero ("Hi, I'm Grace." + two paragraphs beside the photos) | The top of the page does the whole introduction, so the timeline and case studies start one scroll sooner; no repeated tagline | A separate About section below the hero |
| Two page types: one scrolling home page (hero, intro, timeline, contact) + a page per project | Fewer, fuller pages; no thin standalone About or Contact page | Separate `/about` and `/contact` pages |
| Timeline newest → oldest, with the 3 projects as distinct cards under the current role | The case studies are what reviewers look for, so they come first; earlier roles and education stay available below | Oldest first (projects buried at the bottom) |
| Straight vertical timeline line, alternating sides on desktop, left-aligned on mobile | Survives uneven entry heights, text wrapping, and browser zoom with no layout math | A curved SVG path (drifts as content reflows) |
| Work and education look different on the timeline: forest dot vs. gold diamond, plus a small legend | Easy to scan a mixed career at a glance without labeling every entry | An "Education" tag on each entry (redundant with the marker) |
| Earlier (bootcamp) projects as one compact, collapsible list beside their timeline entry, with code and demo-video links | Public code reviewers can open, without competing with the three case studies or making the timeline long. Collapse uses a real `<button>` with `aria-expanded`; hidden rows are `inert` | A page per bootcamp project; one card per project; hover previews (no hover on touch or keyboard) |
| Link type (code or video) stored in the data, not guessed from the URL | Explicit beats a string heuristic; adding a new host can't silently show the wrong icon | `href.includes("loom.com")` |
| Copyright year computed in a cached component (`"use cache"` + `cacheLife("days")`) | Correct every year without making the page dynamic | A hard-coded year; reading the date at request time |
| Degree flags as SVGs (`country-flag-icons`), not emoji | Windows doesn't render flag emoji (shows letters like "ES"); SVGs look the same everywhere | Emoji flags |
| Floating "Back to top" button that appears after about 1.5 screens of scrolling | The timeline makes the page long; the button stays out of the way until it's useful. Hidden state is `inert` so keyboard users never tab into an invisible control; uses `IntersectionObserver`, not a scroll listener | A footer-only link (only helps once you reach the bottom); an always-visible button |
| Hero as a rectangular editorial mosaic | Same collage feel as a cut-out silhouette, but calm, and it reflows cleanly with CSS Grid | Silhouette photo collage |
| Scope in tiers: core first (pages, form, mobile, accessibility, deploy, previews), then next/previous links and the skill filter, then stretch (dark theme, timeline) | Protects the polish of what matters most | Building everything at once |

---

## Visual design: "calm editorial"

- **Type:** Instrument Serif for headings, Inter for body. A serif + sans pairing gives the editorial feel; Inter stays readable at small sizes.
- **Palette:** ivory background, forest and deep-olive text (about 8.9:1 and 6.7:1 contrast), warm cream surfaces, sage and muted gold as accents.
- **Accessibility rule:** sage and gold are about 2:1 on ivory, so they're never used for text, only for backgrounds and decoration.
- **One signature detail:** a translucent sage block overlapping black-and-white photos, used sparingly.

---

## With more time

- A retry job for submissions whose email failed
- Rate limiting and Cloudflare Turnstile
- A custom domain with a verified sender, and an optional confirmation email with abuse protection
- A small authenticated admin page for submissions
- End-to-end test of the form (Playwright) and automated accessibility checks in CI
- Dark theme and an about-page timeline, if not already shipped
