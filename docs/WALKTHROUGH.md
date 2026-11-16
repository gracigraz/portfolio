# Walkthrough

This is my submission write-up for the Porter & Co take-home, Option 1: a personal portfolio. It covers my priorities, the design decisions, the technical choices, and what I would build next.

- **Live site:** https://gracielamsousa.vercel.app
- **Deeper reference:** [DECISIONS.md](DECISIONS.md) logs every decision with the alternatives considered, and [TECHNICAL_DESIGN.md](TECHNICAL_DESIGN.md) is the design I wrote before building.

## Priorities

The brief values thoughtful execution and clear priorities over the number of features, so I set three goals:

1. **Let the work speak.** Three case studies that show how I think: the problem, my role, the decisions, and the results.
2. **Show reasoning, not just features.** Every case study explains its key decisions and what I'd improve, and two let you try a decision in an interactive demo.
3. **Polish what matters.** A focused, calm site that works well on any screen and for any visitor.

## How the brief is met

| Requirement | Where |
| --- | --- |
| Introduce yourself | The hero and the experience timeline |
| 2–3 projects with role, design decisions, and results | Three case studies, each with problem, role, key decisions, results, and what I'd improve |
| Working contact form | Saved to Supabase, then emailed through Resend |
| Deployed | Vercel, with a preview deployment for every pull request |
| Mobile and desktop | Mobile-first layouts, tested at phone, tablet, and desktop widths |
| Accessibility | Semantic structure, keyboard support, labeled forms, contrast, reduced motion |
| Loading, success, and error states | The contact form, the video player, and both demos |
| Third-party services or labeled mock data | Supabase and Resend for the form; both demos are labeled "mock data" |

## Design decisions

**A calm, editorial look.** Warm cream, forest green, and a serif display face, with gold reserved for highlights. The goal was a site that feels considered rather than templated, and lets the content lead.

**Choosing the projects.** I show three, as the brief asks:
- **Content attribution (featured):** tracing each sale back to the video or email that drove it. Knowing which content drives action is a question Porter raised, so it leads.
- **Contract renewals for an AI agent:** AI work, with a clear stance that a hard rule belongs in code, not in a prompt.
- **An internal admin platform:** tooling for people outside engineering, built for safety with production data.

A fourth case study, on chat threads, is linked from the timeline rather than given a card, keeping the main selection focused.

**Case studies built for skimming.** Each opens with the title and summary, then a diagram beside a facts panel (role, dates, outcome, stack). Below, section headings sit in a left column and the text in a right column, so the page uses the full width while every line stays readable.

**Diagrams instead of screenshots.** Most of this work is proprietary, so each project gets an SVG diagram in the site's palette: cards with an icon, a title, a one-line detail, and a step number, with a dot that travels through the flow. They explain the system at a glance without showing private data. Real screenshots appear only for my own product.

**Interactive demos.** The renewals case study lets you test the outbound email allowlist, including a look-alike domain. The admin case study recreates the supplier merge with its guardrails: the merge stays disabled until two different suppliers are chosen, and it ends with a report of exactly what moved. Both run only in the browser with clearly labeled mock data.

**Clear links.** One icon per destination: ▶ plays a video on the page, → opens a case study, and the GitHub logo opens code in a new tab. Demo videos play in an on-page player, so visitors never lose their place.

## Technical choices

**Next.js with static pages.** The home page and case studies are generated at build time, so they load fast. Server-only code handles the contact form and keeps secrets out of the browser.

**Content as typed data.** Projects and the timeline live in typed TypeScript files. A missing or misspelled field fails the build instead of breaking a page, and there is no CMS to maintain for a single author.

**The contact form, end to end.**
1. The form checks input as you type, using the same validation function the server uses, and moves focus to the first error.
2. The API rejects oversized requests, quietly discards bot submissions caught by a hidden honeypot field, and validates again on the server.
3. The message is **saved to Supabase first**, then emailed with Resend, so a message is never lost if email delivery has a problem.
4. Logs record IDs only, never names, emails, or message text.
5. Database keys are server-only, and the table uses row-level security with no public access.

**Diagrams as components.** Each diagram is a React component built from shared parts (cards, pills, icons). They stay sharp at any size, match the palette exactly, and carry a full text description for screen readers. On case-study pages, wide diagrams keep a readable size on phones and scroll sideways.

**Demos built on tested logic.** The demo rules (the email allowlist and the supplier merge) are small pure functions with unit tests, so each demo shows exactly what the real system does.

**Accessible video player.** Demo links open the native `<dialog>` element: focus stays inside, Esc closes it, and focus returns to the link afterward. The video loads only when opened, so pages stay fast and free of third-party requests until someone asks. The link still works as a normal link without JavaScript.

**Search and sharing.** Each page has its own title and description, a generated link-preview image, a sitemap, and a robots file.

## Accessibility

- Semantic landmarks, one `h1` per page, and a logical heading order
- A skip link, visible focus styles, and full keyboard support
- Labeled form fields, with errors announced and linked to their fields
- Text alternatives for every diagram and image
- Contrast checked against WCAG AA
- Reduced-motion support: scroll reveals, flowing diagram lines, and demo animations turn off

## Loading, success, and error states

- **Contact form:** sending (button disabled with a "Sending…" label), success (a personal thank-you), and error (an alert with another way to reach me). Field errors appear inline.
- **Video player:** loads on demand, with an "Open in Loom" link alongside.
- **Demos:** each step lights up as it runs, and results are announced to screen readers.
- **Case studies:** a skeleton placeholder while a page streams in, rarely seen because case-study links prefetch the full page.
- **Missing pages:** a custom 404 that matches the site.

## Quality

- 24 unit tests covering contact validation, the email allowlist, the supplier merge rules, date formatting, and video link parsing
- Lint and type checks pass with no warnings
- Every case-study detail was checked against the original source before it was written

## What I would build next

- **Rate limiting on the contact form,** using a shared store such as Redis, for when traffic grows.
- **A custom sending domain** for the contact emails.
- **Automated end-to-end and accessibility checks** in CI: browser tests for the form and the video player, and an accessibility scan of every page on each pull request.
- **Mobile-specific diagram layouts** that stack vertically on small screens.
- **Case studies in MDX** as the writing grows, so long-form content is easier to edit.

## Tools

The template, libraries, and AI tools I used are listed in the [README](../README.md#templates-libraries-and-ai-tools).
