# Portfolio Site: Technical Design

Companion to [DECISIONS.md](DECISIONS.md) (the why). This doc is the what: how the site is built.
Last updated: 2026-11-13

---

## 1. Overview

A small Next.js site with three kinds of pages and one backend endpoint.

```
Browser
  │  pages are static HTML (built ahead of time, served from Vercel's CDN)
  │
  │  contact form: fetch POST /api/contact (JSON)
  ▼
Next.js Route Handler  app/api/contact/route.ts   (runs on Vercel's server, holds the secrets)
  │  1. parse JSON   2. honeypot check   3. validate
  │  4. INSERT into Supabase (Postgres) ──► contact_submissions table
  │  5. build + send email
  ▼
Resend API  (RESEND_API_KEY from env)
  ▼
My inbox  (from onboarding@resend.dev, replyTo = visitor's email)
  │
  6. UPDATE row: email_status = 'sent' or 'failed'
```

Only `/api/contact` runs server code. The browser never talks to Supabase or Resend directly. Everything else is static, so pages load fast and there's almost nothing that can break in production.

---

## 2. Stack

| Piece | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| UI primitives | Native `<label>`, `<input>`, `<textarea>`, `<button>` styled with Tailwind tokens. No component library: only 4 form elements, and native elements are accessible by default |
| Email | Resend Node SDK |
| Database | Supabase (hosted Postgres), `@supabase/supabase-js`, server-side only |
| Hosting | Vercel, free `.vercel.app` domain |
| Tests | Vitest for the validation function (optional, if time allows) |
| Validation | Hand-written function, no Zod (see section 6) |

---

## 2b. Page structure (revised 2026-11-14)

Two page types:

1. **Home (`/`)**, one scrolling page:
   - Hero and intro in one section: "Hi, I'm Grace." with two short paragraphs (recent work first, then the aerospace-to-software path) beside an editorial mosaic (rectangular B&W photo tiles + sage/cream color blocks), CSS Grid
   - `#work` "Selected work": an editorial bento: project 01 as a full-width feature card (text + diagram side by side), 02 and 03 half width below; stacked on mobile
   - `#experience` timeline, **newest → oldest**: jobs and education, with Rivio first. The skill filter (planned) sits above the Selected work cards
   - `#contact` "Let's talk" + the contact form
2. **Project pages (`/projects/[slug]`)**, one per case study

No separate `/about` or `/contact` pages. Header nav: Work `/#work`, Experience `/#experience`, Contact `/#contact`; the name links to the top.

### Timeline layout
- A single reading axis ("ledger"): on desktop, three columns: year + period (right-aligned) | a 1px line with the marker | company, role, summary. On mobile, the line runs down the left with everything to its right
- The line is drawn per entry (from its marker to the next), so it stops at the last entry's marker
- Company first (`font-medium`), role below in muted text: the company is what people scan for
- The final education entry is a "foundation": the line ends at its diamond and the three degrees sit below as a row of three cards spanning the full section width (wider than the timeline column, so long degree names don't cramp). Text flows top-down: flag + years, degree, school and city, note; stacked on mobile
- Groups use one soft surface (`bg-surface/60` + border) instead of separate hollow boxes (the earlier-projects list, the degree cards). BrainStation credentials are a single text line; its bootcamp projects are collapsed by default
- **Work vs. education:** work entries get a solid forest dot; education entries a gold diamond and an italic year; a legend above the timeline explains both
- **Degrees:** education entries list each credential as a small bordered card with an SVG country flag (`country-flag-icons/react/3x2`, `aria-hidden`; the place is in the text)
- Data in `lib/timeline.ts`, typed; project cards reference `lib/projects.ts` by slug

### Back to top
- `components/BackToTop.tsx` (client component): a fixed pill, bottom right
- An invisible sentinel covering the first ~1.5 screens; `IntersectionObserver` shows the button once it scrolls out of view
- Hidden state uses `inert` + `opacity-0`, so it can't be focused or clicked while invisible
- Links to `#top` (on `<body>`); smooth scrolling comes from CSS and is turned off under `prefers-reduced-motion`

---

## 3. File structure

```
app/
  layout.tsx              root layout: <html lang="en">, fonts, header/nav, footer, skip link
  page.tsx                home / intro
  projects/
    [slug]/page.tsx       one project page, generated from data (generateStaticParams)
  api/
    contact/route.ts      POST handler: validate, save to Supabase, send via Resend
  not-found.tsx           friendly 404
components/
  ContactForm.tsx         "use client"; form UI + state machine
  Hero.tsx                "Hi, I'm Grace." intro + photo mosaic
  PhotoTile.tsx           next/image tile: grayscale by default, with optional color and focal point
  Timeline.tsx            the work/education timeline (server component)
  ProjectCard.tsx         case-study card shown on the timeline
  SideProjects.tsx        "use client"; collapsible list of earlier projects
  ExternalLinks.tsx       quiet inline code / demo links with icons, separated by dots
  BackToTop.tsx           "use client"; floating back-to-top button
  diagrams/               one SVG diagram per project, in the site palette (see 4.3)
  Header.tsx, Footer.tsx  Footer is a cached component (see section 6)
supabase/
  schema.sql              contact_submissions table + RLS
lib/
  projects.ts             typed project data (the content)
  timeline.ts             typed timeline entries (jobs, education), newest first
  server/env.ts           requireEnv(): fails loudly when a variable is missing; server-only
  server/supabaseAdmin.ts server-only Supabase client using the secret key
  validateContact.ts      shared validation, used by client AND server
  validateContact.test.ts (optional)
```

---

## 4. Content model

Projects are typed data in `lib/projects.ts`. No CMS; project content doesn't touch the database (only contact submissions do).

```ts
export type Project = {
  slug: string;            // URL: /projects/{slug}
  title: string;
  summary: string;         // one line for the card
  role: string;            // what I owned
  problem: string;
  decisions: { title: string; detail: string }[];
  results: string[];
  skills: Skill[];         // tags shown on the card and page; drive the skill filter
  links?: { label: string; href: string }[]; // only public links
  image?: { src: string; alt: string };      // card / hero tile
};

export type Skill = "TypeScript" | "React" | "Next.js" | "Python" | "AWS" | "LLM agents" | ...;
// A union type, so a typo in a tag is a compile error and filter chips can't drift from the data.
```

### 4.1 Skill filter

- Chips generated from the distinct skills across projects (sorted by how many projects use each)
- Click a chip → state `activeSkill`; matching cards stay full, others dim (opacity, not hidden, so layout doesn't jump)
- Chips are `<button aria-pressed>`; a polite live region announces "2 projects use AWS"
- Clicking the active chip again clears it; works with keyboard
- Filtering lives on the home page only. Project pages do **not** read `?skill=`: reading `searchParams` would opt them out of static generation, and `useSearchParams()` needs a `<Suspense>` boundary. Dimming cards on the home page delivers the feature without that cost
- Respect `prefers-reduced-motion` for the dim transition

### 4.3 Project visuals

The past projects are proprietary, so there are no screenshots to show. Instead, each project gets a simple SVG diagram in the site palette (ivory, forest, sage), drawn as a React component:
- Renewal workflow: the three guardrail layers, or the task lifecycle
- Admin tool: the three-phase merge flow
- Zip investigation: the filter funnel (vendors in → buckets out)

These look intentional and editorial, explain the work at a glance, and don't depend on finding images. Hero photos use placeholders until real ones are added.

### 4.2 Next / previous

Computed from the order of `projects` in `lib/projects.ts`; wraps around or hides at the ends. Links use the project titles, not just "Next."

Content rules for project write-ups:
- Only claims backed by the actual commit history
- No customer names or internal details (past work is confidential)
- No links to private code

---

## 5. Contact form

### 5.1 Fields

| Field | Input | Rules |
|---|---|---|
| name | `text`, `autocomplete="name"` | required, 1 to 100 chars after trim |
| email | `email`, `autocomplete="email"` | required, basic email shape, max 254 chars |
| message | `textarea` | required, 10 to 5,000 chars after trim |
| company (honeypot) | hidden `text`, `tabIndex={-1}`, `autocomplete="off"`, `aria-hidden="true"`, visually hidden with CSS | must be empty |

The honeypot is named something a bot would want to fill in ("company"). Humans never see it.

Privacy note shown under the form (small text): **"Your details are only used to reply to you."**

### 5.1b Where a submission's content lives

| Place | Contains the message text? | Purpose |
|---|---|---|
| My inbox | Yes | Read and reply |
| Resend dashboard | Yes (the sent email, including the body) | Check delivery, see what was sent |
| Supabase `contact_submissions` | Yes | Durable record |
| Vercel server logs | **No**, only outcome and IDs (e.g. `contact(): sent (id = ...)`) | Debugging without copying personal data into logs |

No email address is published on the site, so it can't be scraped; the form is the only way in.

### 5.2 UI states

```
idle ──submit──► (client validation fails) ──► invalid (field errors shown, focus first bad field)
  │
  └─submit──► submitting ──200──► success
                    └────non-200 / network error──► error ──retry──► submitting
```

| State | What the user sees | Accessibility |
|---|---|---|
| idle | form ready | labels on every field |
| invalid | message under each bad field, focus moves to the first one | `aria-invalid="true"`, `aria-describedby` → error text |
| submitting | button disabled, label "Sending..." | `aria-busy="true"` on form; button stays focusable text |
| success | form replaced by a thank-you card: "Thanks, {name}. I'll reply within 2 days." plus a "Send another message" button that resets the form | card is `<div ref={successRef} tabIndex={-1} role="status">` and focus is moved to it explicitly (`successRef.current?.focus()`). Relying only on a newly mounted `aria-live` region often isn't announced, and unmounting the form would otherwise drop focus to `<body>` |
| error | form keeps typed text; "Something went wrong. Please try again, or message me on LinkedIn." (link) | `role="alert"`. LinkedIn instead of an email address, so no address is published on the site |

Never clear what the user typed on error.

Styling on the cream "Let's talk" section:
- Ivory inputs with a stone border on cream; the "Send message" button is the only dark element (forest pill), so it's the clear primary action
- Errors are ink text with a gold icon, plus a gold border on the field; color is never the only signal
- Focus rings are forest (`outline-ink`, about 7:1 on cream); gold would be too faint
- A field's error clears as soon as the user edits that field, instead of staying until the next submit
- Validation runs in the browser first (`noValidate` turns off the browser's own popups so messages are consistent), and the server re-validates with the same `validateContact()`

### 5.3 API contract: `POST /api/contact`

Request (JSON):
```json
{ "name": "Ada", "email": "ada@example.com", "message": "Hi...", "company": "" }
```

Responses:

| Case | Status | Body |
|---|---|---|
| Sent | 200 | `{ "ok": true }` |
| Honeypot filled | 200 | `{ "ok": true }` (fake success, nothing sent, so bots don't learn) |
| Invalid input | 400 | `{ "ok": false, "errors": { "email": "Enter a valid email" } }` |
| Body isn't valid JSON | 400 | `{ "ok": false, "error": "Invalid request" }` |
| Saved, but Resend failed | 200 | `{ "ok": true }` (the message is safely stored; the failure is recorded as `email_status = 'failed'` so I can see it) |
| Database insert failed | 500 | `{ "ok": false, "error": "Could not send message" }` (nothing saved, so tell the user to retry) |
| Wrong method | 405 | (Next.js handles it: only `POST` is exported) |

Never return Resend's raw error or stack trace to the browser.

### 5.4 Handler steps (`app/api/contact/route.ts`)

1. Parse JSON. On failure → 400.
2. If `company` is non-empty → 200 fake success, stop.
3. Run `validateContact(body)`. If errors → 400 with field errors.
4. Insert the row into `contact_submissions` (`email_status = 'pending'`). On failure → log, return 500.
5. Call `resend.emails.send` with:
   - `from: "Portfolio <onboarding@resend.dev>"`
   - `to: <my Resend account email>` (from env `CONTACT_TO_EMAIL`)
   - `replyTo: <visitor email>` (check the SDK version for the exact field name)
   - `subject: "Portfolio message from {name}"`
   - `text:` name, email, message
6. Update the row: `email_status = 'sent'`, or `'failed'` if Resend returned an error. **The Resend SDK does not throw on API errors**: `const { data, error } = await resend.emails.send(...)` resolves even on a 401/403. Check `if (error)` explicitly before marking `'sent'` (log it server side, no message content in logs).
7. Return 200.

Send plain text, not HTML built from user input. That avoids any HTML injection into the email.

Why save first: if Resend is down, the message is still stored and visible in Supabase. Email first would lose it.

### 5.4b Database: `contact_submissions`

```sql
create table public.contact_submissions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null check (char_length(name) between 1 and 100),
  email         text not null check (char_length(email) <= 254),
  message       text not null check (char_length(message) between 10 and 5000),
  email_status  text not null default 'pending'
                check (email_status in ('pending', 'sent', 'failed'))
);

alter table public.contact_submissions enable row level security;
-- No policies on purpose: anon/public clients can't read or write.
-- The server uses the secret key (sb_secret_...), which bypasses RLS.
```

- The `check` constraints repeat the validation rules, so bad data can't get in even if app code has a bug.
- Save the SQL as `supabase/schema.sql` in the repo so reviewers can see it.
- View submissions in the Supabase dashboard's Table Editor.

### 5.5 Environment variables

| Name | Where | Notes |
|---|---|---|
| `RESEND_API_KEY` | Vercel project env + local `.env.local` | Never committed. `.env.local` is in `.gitignore` |
| `CONTACT_TO_EMAIL` | same | Must be the Resend account email (free sender restriction) |
| `SUPABASE_URL` | same | Project URL. No `NEXT_PUBLIC_` prefix, so it never ships to the browser |
| `SUPABASE_SECRET_KEY` | same | Supabase secret key (`sb_secret_...`, the newer name for the service role key). Server only: bypasses RLS, so it must never reach client code |

Commit a `.env.example` with the names and empty values (`.gitignore` has `.env*` plus `!.env.example`). Server modules import `server-only`, so importing them from client code fails the build.

---

## 6. Validation: why no Zod (yet)

**Decision:** a small hand-written `validateContact()` in `lib/validateContact.ts`, imported by both the form (instant feedback) and the Route Handler (the real check).

Why:
- 3 fields with simple rules: about 20 lines of plain TypeScript.
- One less dependency, and the reviewer can read the whole rule set at a glance.
- Sharing one function between client and server already gives the main benefit people use Zod for: one source of truth.
- **The server always re-validates.** Client checks are for user experience; anyone can skip the browser and POST directly.

**When Zod is the right call (say this in the walkthrough):**
- Bigger forms (many fields, nested objects, conditional rules)
- When you want TypeScript types inferred from the schema instead of written twice
- Forms built with React Hook Form, where `zodResolver` connects the schema to the form
- Validating external API responses, not just user input

> "For three fields, a shared validation function is clearer than a schema library. On a bigger form I'd use Zod so the schema is the single source of truth for both the types and the runtime checks."

---

## 6. Next.js 16 notes (installed: 16.4.6, Tailwind 4)

Checked against the docs bundled in `node_modules/next/dist/docs/`.

- **Tailwind v4 is CSS-first:** no `tailwind.config`; tokens live in `app/globals.css` under `@theme inline`
- **Async `params`:** in `app/projects/[slug]/page.tsx`, `const { slug } = await params`
- **Cache Components is on** (`cacheComponents: true` in `next.config.ts`). Pages are static by default. Reading the current time (`new Date()`) or request data during prerender breaks the build, so the footer's copyright year lives in a component marked `"use cache"` with `cacheLife("days")`: the year is computed at build time and refreshed in the background daily, and the page stays static. Keep `/api/contact` on the default Node.js runtime (no `runtime = "edge"`), which Supabase and Resend need anyway
- **Typed layout props:** `LayoutProps<"/">` is a global helper type
- **`AGENTS.md`** is generated by `next dev` (instructions for AI tools to read the bundled docs); committed, not deleted
- **`.env*` in `.gitignore` also blocks `.env.example`:** add `!.env.example` when that file is created
- **No auto dark mode:** the starter's `prefers-color-scheme: dark` block is removed so visitors in OS dark mode still see the ivory/forest palette

## 6a. Design tokens and fonts

- Colors as CSS variables in `app/globals.css` mapped into Tailwind's theme so classes read `bg-bg text-ink`:

| Token | Hex | Use | Text-safe on `--bg`? |
|---|---|---|---|
| `--bg` | `#FAF9F4` ivory | page background | n/a |
| `--ink` | `#0F5132` forest | headings, body text, primary buttons | yes, ~8.9:1 |
| `--ink-muted` | `#4F5D4A` deep olive | secondary text, captions | yes, ~6.7:1 |
| `--surface` | `#E8E1D5` warm cream | section bands, cards | n/a |
| `--accent` | `#9FBA96` sage green | hero corner block, diagram fills (at 60% opacity so labels stay above 4.5:1), dividers | **no** (~2:1), never for text |
| `--highlight` | `#C8A96B` muted gold | tiny details (active-filter dot, underline) | **no**, decoration only |
| `--line` | `#D6D3C8` stone | borders, input outlines | n/a |
- Dark theme (stretch) = the same variables redefined under `[data-theme="dark"]`, so no component changes
- Fonts via `next/font/google`: `Instrument_Serif` (headings, weight 400 + italic) and `Inter` (body), exposed as CSS variables `--font-serif` / `--font-sans`
- Radius tokens: pill (`9999px`) for buttons, inputs, chips; `16px` for cards and images
- Form elements read these tokens directly, so restyling is one place

---

## 6b. Metadata and link previews

This is what backs the "pre-rendered pages give proper link previews" argument, so it must actually be built.

- Root `metadata` in `app/layout.tsx`: site title template (`%s | Graciela Manzanares`), description, `metadataBase` set to the production URL
- Per-page `metadata` / `generateMetadata` for each project page (title + one-line summary)
- Open Graph + Twitter card tags (Next.js generates these from `metadata.openGraph`)
- One preview image: `app/opengraph-image.png` (1200x630) or generated with `ImageResponse`
- Favicon (`app/icon.png`)
- Test: paste the production URL into LinkedIn's Post Inspector and a Slack message; confirm title, description, image show

---

## 7. Accessibility checklist

- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`; one `<h1>` per page
- "Skip to content" link as the first focusable element
- Every input has a visible `<label>`; required fields are marked in text, not only by color
- Visible focus ring on every interactive element (don't remove outlines)
- Color contrast at least 4.5:1 for body text (check with the browser DevTools contrast checker)
- Keyboard: whole site usable with Tab / Shift+Tab / Enter, no traps
- Images have meaningful `alt` (decorative ones `alt=""`)
- Respect `prefers-reduced-motion` for any animation
- Lighthouse accessibility score 95+ and an axe DevTools pass, screenshot both for the walkthrough

---

## 8. Responsive design

- Mobile first. Base styles target a ~375px phone; Tailwind `md:` and `lg:` add layout for larger screens
- Side padding 16px on mobile; content max width ~720px for reading pages
- Nav collapses to a simple stacked or menu layout on small screens
- Tap targets at least 44px tall
- Test: a real phone + DevTools at 375, 768, 1280 widths

---

## 9. Testing plan

Automated (if time):
- Vitest unit tests for `validateContact`: valid input, each missing field, bad email, too-long message, whitespace-only input

Manual (required), on the **production URL**:

| Test | Expected |
|---|---|
| Valid submission | "Sending..." then success; email arrives; Reply goes to visitor address; row in Supabase with `email_status = 'sent'` |
| Break `RESEND_API_KEY` in a preview deploy, submit | User still sees success; row saved with `email_status = 'failed'` |
| After every production test | Don't trust the green UI alone (it shows success once the row is saved): confirm the email landed **and** the row says `email_status = 'sent'` |
| Empty submit | field errors, focus on first error, nothing sent |
| Bad email | email field error |
| Turn off wifi, submit | error message, typed text kept |
| Keyboard only, full flow | works with no mouse |
| Phone | layout fine, keyboard doesn't hide the button |
| `curl` POST with honeypot filled | 200, no email arrives |
| `curl` POST with missing fields | 400 with field errors (proves the server validates) |

---

## 10. Deployment

1. Push to GitHub (public repo)
2. In Supabase: create the project, run `supabase/schema.sql` in the SQL editor
3. Import to Vercel, add all four env vars (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `SUPABASE_URL`, `SUPABASE_SECRET_KEY`) for Production (and Preview if testing previews)
3. Deploy early (first hour) so deployment isn't a last-minute risk
4. Submit the **production** URL, not a preview URL

---

## 11. Out of scope (goes in "with more time")

- A retry job that resends emails for rows stuck at `email_status = 'failed'`
- A small admin page to read submissions (behind auth) instead of the Supabase dashboard
- Rate limiting per IP, Cloudflare Turnstile
- Custom domain + verified sender, optional confirmation email with abuse protection
- Zod + React Hook Form if the form grows
- End-to-end test of the form (Playwright) and axe checks in CI
- Analytics
