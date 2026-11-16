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
| Three projects, each showing a different skill | A product built end to end (content attribution), AI agent design, and internal tooling | More projects with less depth |
| Selected work as a bento (one full-width feature card, two half-width cards) with a numbered category label and a round arrow button | Three identical narrow cards read as a template; the feature card gives the flagship project and its diagram room, and the half-width cards stop titles and tags from cramping | Three equal columns |
| Interactive demos with labeled mock data on the case-study pages | The real tools are internal; a small demo of the actual logic (e.g. the outbound email allowlist) is honest, confidentiality-safe, and lets reviewers try the decision themselves. Mock data uses reserved domains (`.example`, `.test`) and fictional names | Screen recordings of the internal tools (confidential); AI-generated product videos (would show screens that never existed, and garble UI text) |
| Slow looping "flow" dots on the diagrams (SVG `animateMotion`), traveling behind the boxes | Shows work moving through the system without distracting; hidden under `prefers-reduced-motion` | Static diagrams only; flashy step animations |
| The renewal demo ends in escalation, not just "blocked"; the status diagram shows the Escalated loop | A blocked email isn't a dead end: the task holds at draft ready and goes to a person with the reason recorded, which is the real behavior | Ending the flow at "stop" |
| SVG diagrams instead of screenshots | Past work is proprietary. Diagrams in the site palette explain each system at a glance | Screenshots, stock images |
| Interactive demos instead of a skill filter | Two demos (the email allowlist and the supplier merge) let reviewers try a decision, which shows judgment better than filtering three projects | A skill filter (with three projects, there is little to filter) |
| Native form elements styled with Tailwind | Four elements; native ones are accessible by default and need no library | shadcn/ui |
| Hero lead sentence in Instrument Serif italic, larger, regular weight | An editorial "standfirst" that matches the headline font and stands out from the body without heavy bold | Bold sans (felt heavy); gold text (about 2.3:1 on ivory, fails contrast) |
| Code links open GitHub in a new tab, marked with the GitHub logo; screen readers hear "on GitHub (opens in a new tab)"; `rel="noopener noreferrer"` | The logo says where the link goes without an extra arrow per link (seven ↗ marks made the rows busy); reviewers keep the portfolio open. Demos stay in the on-page player. Only the label is underlined, not the icons | Same-tab links; a ↗ after every link |
| Intro merged into the hero ("Hi, I'm Grace." + two paragraphs beside the photos) | The top of the page does the whole introduction, so the timeline and case studies start one scroll sooner; no repeated tagline | A separate About section below the hero |
| Two page types: one scrolling home page (hero, intro, timeline, contact) + a page per project | Fewer, fuller pages; no thin standalone About or Contact page | Separate `/about` and `/contact` pages |
| Timeline newest → oldest | The most relevant roles come first; earlier roles and education stay available below | Oldest first (projects buried at the bottom) |
| Single-axis "ledger" timeline: year column, line, then company and role | Once the case studies moved out, the alternating layout left half the screen empty on every row; one axis scans in seconds and matches the mobile layout | Center line with entries alternating left and right; a curved SVG path |
| Degrees as a full-width row of three cards where the line ends | A visual "foundation" under the career, and US, Spain, UK side by side tells the international story at a glance; at the end it doesn't cut the line | Three stacked boxes inside the last entry; three cards squeezed into the text column |
| Work and education look different on the timeline: solid forest dot vs. sage diamond with a gold border, plus a small legend | Easy to scan a mixed career at a glance; shape carries the meaning, and gold stays reserved for highlights | A gold diamond (gold means "highlight" elsewhere); sage (too faint for a small marker); an "Education" tag on each entry |
| Case studies get their own "Selected work" section right after the intro; the timeline follows as "Experience" | Reviewers see the three projects first, which is what they're grading; the timeline becomes career context and stays quiet. Cards fade up on scroll with pure CSS (progressive enhancement) | Cards inside the timeline (beside or below the Rivio entry); a carousel (hides two of three cards, hard to make accessible) |
| Earlier bootcamp projects collapsed by default behind one quiet "Earlier bootcamp projects (5)" toggle; BrainStation credentials as a single line | Keeps the bootcamp from visually outweighing two years of production work, while repos and demo videos stay one click away. The toggle is a real `<button>` with `aria-expanded`; hidden rows are `inert` | Always-visible project table (made a 4-month bootcamp look bigger than the current role); a page per bootcamp project; hover previews |
| Link hierarchy in the timeline: case studies get forest text + gold underline; demo and code links are muted with a thin neutral underline (gold on hover) | Gold everywhere gave every link equal weight; reserving it for case studies makes the strongest work stand out | All links styled the same |
| Three projects in "Selected work": Alquimista (featured), AI agent renewals, admin portal. Chat threads is a fourth case study, linked from the Rivio timeline instead of a card | The brief asks for 2–3 projects. Alquimista answers the exact question of which content drives sales; renewals shows AI judgment; the admin portal is internal tooling. Chat threads (a data-modeling and migration story) replaced the Zip sync audit as the extra case study because it is the stronger engineering story | Four cards (over the brief); keeping the Zip audit |
| Hero call to action: a forest "See my work" button and a "Get in touch" link, above LinkedIn/GitHub | Gives reviewers an obvious next step that keeps them on the site; the social links alone sent them away | Social links only |
| Each project card shows its outcome as one line with a gold rule | Results at a glance, before opening the case study | Outcome only on the case-study page |
| Demo results use small SVG icons instead of ✓ and ⚠ characters | Those characters render as colored emoji on some devices and clash with the palette | Text symbols |
| Admin case study gets an interactive supplier-merge demo recreated from the real admin modal, with mock data, instead of the real screenshots | The screenshots showed the internal admin URL, real-looking supplier names and IDs, and Loom controls. The recreation runs only in the browser, follows the real rules (products move; purchase requests dedupe; empty target fields filled, existing values kept; document references move; source deleted) via a tested pure function, and shows the guardrails: the merge stays disabled until two different suppliers are chosen, plus an irreversibility warning | Real screenshots; a static image |
| Warm palette: cream background `#FBF7F0`, warm-gray secondary text `#5C564E`, warm sand `#ECE3D3` | The original near-neutral background and green-gray body text made the whole page read slightly green next to the forest accents. Warming the neutrals keeps forest green as the accent; contrast improved on every pair | The original ivory and olive-gray; pure white (stark) |
| Case studies load inside `<Suspense>` with a skeleton, and case-study links prefetch the full page | Next 16 with Cache Components shows the page shell instantly on navigation and streams the URL-dependent content; prefetching means the skeleton rarely shows | Allowing a blocking route (`instant = false`) |
| One icon per link destination: ▶ plays a video on the page, → goes to a case-study page on the site, the GitHub logo opens code in a new tab | Links that look the same but do different things surprise people; the icon tells them what will happen before they click. The → matches "Read case study" on the project cards | Same underline for every link with no icon |
| Demo videos open in an on-page player (native `<dialog>`) instead of leaving the site | Reviewers keep their place. The trigger stays a real link, so Cmd/Ctrl/middle-click still opens Loom in a new tab and it works without JavaScript. The native dialog handles focus, Esc, and hiding the page from screen readers; the iframe loads only when opened (no third-party requests or cookies until asked); focus returns to the trigger on close; page scroll is locked while open; "Open in Loom" fallback inside. The dialog is rendered at the end of `<body>` because the links sit inside paragraphs, where a dialog isn't valid HTML | Same-tab link (leaves the site); new tab only; a custom modal without `<dialog>` (focus trapping and Esc by hand) |
| Code and demo links as quiet inline text links ("Code · API · Demo"), not pills | Eleven pills stacked in a list read as a control panel and looked like the non-clickable skill tags; inline links match the "Case studies:" links and keep rows compact on mobile | Bordered pills with icons |
| Link type (code or video) stored in the data, not guessed from the URL | Explicit beats a string heuristic; adding a new host can't silently show the wrong icon | `href.includes("loom.com")` |
| Copyright year computed in a cached component (`"use cache"` + `cacheLife("days")`) | Correct every year without making the page dynamic | A hard-coded year; reading the date at request time |
| Degree flags as SVGs (`country-flag-icons`), not emoji | Windows doesn't render flag emoji (shows letters like "ES"); SVGs look the same everywhere | Emoji flags |
| Floating "Back to top" button that appears after about 1.5 screens of scrolling | The timeline makes the page long; the button stays out of the way until it's useful. Hidden state is `inert` so keyboard users never tab into an invisible control; uses `IntersectionObserver`, not a scroll listener | A footer-only link (only helps once you reach the bottom); an always-visible button |
| Hero mosaic: a color headshot (largest tile, cropped from a full-resolution original so it stays sharp) with five black-and-white story photos (Golden Gate, drone, wind tunnel, truck, welding) | One color photo among grayscale draws the eye to the face and keeps the set cohesive; each other photo tells part of the hardware-to-software story. Phones show four photos so the mosaic doesn't push the work down | Cropping other people out of shared photos (loses the context, like the wind tunnel); blurring faces (draws attention); screenshots with UI artifacts |
| One warm sand block (`--surface`) behind the bottom-left of the mosaic, hidden below `lg` | Neutral and warm, so it flatters skin tones and doesn't compete with the real bamboo greens in the color headshot; reuses the card color instead of adding a token | Pale sage (two different greens fought with the bamboo); blacking out the photo background (looks heavily edited); mid-tone sage; gold; a gradient; no block |
| "Let's talk" section in warm cream with a forest "Send message" button | Tried deep forest first: the ivory inputs on dark green outweighed the button, inverting the hierarchy. Cream matches the project cards and makes the primary action the strongest element on the section | Deep forest section (memorable, but inputs read as heavy "stickers" and the CTA got lost) |
| Hero as a rectangular editorial mosaic | Same collage feel as a cut-out silhouette, but calm, and it reflows cleanly with CSS Grid | Silhouette photo collage |
| Scope in tiers: core first (pages, form, mobile, accessibility, deploy, previews), then case-study depth and demos, then polish | Protects the polish of what matters most | Building everything at once |

---

## Visual design: "calm editorial"

- **Type:** Instrument Serif for headings, Inter for body. A serif + sans pairing gives the editorial feel; Inter stays readable at small sizes.
- **Palette:** ivory background, forest and deep-olive text (about 8.9:1 and 6.7:1 contrast), warm cream surfaces, sage and muted gold as accents.
- **Accessibility rule:** sage and gold are about 2:1 on ivory, so they're never used for text, only for backgrounds and decoration.
- **One signature detail:** a warm sand block overlapping the photo mosaic, used sparingly.

---

## With more time

- A retry job for submissions whose email failed
- Rate limiting and Cloudflare Turnstile
- A custom domain with a verified sender, and an optional confirmation email with abuse protection
- A small authenticated admin page for submissions
- End-to-end test of the form (Playwright) and automated accessibility checks in CI
- A dark theme
