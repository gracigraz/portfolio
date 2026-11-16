# Graciela Manzanares · Portfolio

My personal portfolio: an introduction, three case studies on my role, decisions, and results, and a working contact form.

- **Live site:** https://gracielamsousa.vercel.app
- **Walkthrough:** **[docs/WALKTHROUGH.md](docs/WALKTHROUGH.md)**, my design decisions, technical choices, and next steps

## Quick tour

- **[Which video made the sale?](https://gracielamsousa.vercel.app/projects/content-attribution)** is an attribution product I built end to end.
- **[Contract renewals for an AI agent](https://gracielamsousa.vercel.app/projects/ai-agent-renewals)** includes an interactive demo of a guardrail enforced in code.
- **[An admin platform](https://gracielamsousa.vercel.app/projects/internal-admin-portal)** includes an interactive demo of merging duplicate records.
- **[Contact](https://gracielamsousa.vercel.app/#contact):** messages are saved to a database and emailed to me.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Supabase · Resend · Vitest · Vercel

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SECRET_KEY` | Server-only secret key (`sb_secret_…`) |
| `RESEND_API_KEY` | Resend API key with sending access |
| `CONTACT_TO_EMAIL` | Where contact messages are delivered |

Run `supabase/schema.sql` once in the Supabase SQL editor to create the contact table.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm test` | Unit tests (Vitest) |
| `npm run lint` | ESLint |

## Project structure

```
app/          pages, the contact API route, generated OG image, favicon, sitemap
components/   page sections, diagrams, and interactive demos
lib/          typed content and tested logic; lib/server holds server-only code
docs/         walkthrough, decision log, and technical design
supabase/     database schema
```

## Templates, libraries, and AI tools

- **Template:** the `create-next-app` starter only. The design is my own.
- **Libraries:** Next.js, React, Tailwind CSS, `@supabase/supabase-js`, `resend`, `server-only`, `country-flag-icons`, and Vitest. Fonts: Inter and Instrument Serif via `next/font`. Instrument Serif is also bundled in `assets/` for the generated images, under the SIL Open Font License.
- **AI tools:** Claude Code as a pair programmer, for implementation, code review against accessibility and security practices, checking case-study details against the original repositories, and editing the writing. The product and design decisions are mine, and I reviewed and tested every change.
