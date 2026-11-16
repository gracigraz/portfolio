"use client";

import { useEffect, useId, useRef, useState } from "react";
import { BlockedIcon, CheckIcon } from "@/components/icons";
import { checkRecipient, type RecipientCheck } from "@/lib/allowlist";

const ALLOWED_DOMAINS = ["northwind.example", "ops.example"] as const;

const PRESETS = [
  { email: "jordan@northwind.example", note: "Customer's own team" },
  { email: "sales@cloudvendor.example", note: "The vendor" },
  { email: "jordan@northwind.example.spoof.test", note: "Look-alike domain" },
];

const STEPS = ["Agent drafts email", "Allowlist check", "Result"] as const;
const STEP_MS = 450;

type Phase = { step: number; result: RecipientCheck | null };

export function AllowlistDemo() {
  const inputId = useId();
  const [email, setEmail] = useState(PRESETS[0].email);
  const [phase, setPhase] = useState<Phase>({ step: -1, result: null });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function reset(nextEmail: string) {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setEmail(nextEmail);
    setPhase({ step: -1, result: null });
  }

  function send() {
    const result = checkRecipient(email, ALLOWED_DOMAINS);
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const instant = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (instant || result.status === "invalid") {
      setPhase({ step: STEPS.length - 1, result });
      return;
    }

    setPhase({ step: 0, result: null });
    timers.current.push(
      setTimeout(() => setPhase({ step: 1, result: null }), STEP_MS),
      setTimeout(() => setPhase({ step: 2, result }), STEP_MS * 2),
    );
  }

  const running = phase.step >= 0 && phase.result === null;

  return (
    <div className="rounded-card border border-line bg-surface/60 p-6 sm:p-8">
      <p className="text-xs tracking-[0.12em] text-ink-muted uppercase">
        Interactive demo · mock data
      </p>
      <p className="mt-2 text-sm text-ink-muted">
        A simplified version of the outbound email guardrail. Not the production
        system.
      </p>

      <p className="mt-6 overflow-x-auto rounded-xl bg-ink px-4 py-3 font-mono text-xs whitespace-nowrap text-bg">
        ALLOWED_OUTBOUND_EMAIL_DOMAINS = {ALLOWED_DOMAINS.join(", ")}
      </p>

      <div className="mt-6 rounded-xl border border-line bg-bg p-5">
        <p className="text-xs tracking-[0.12em] text-ink-muted uppercase">
          Draft from the agent
        </p>
        <label htmlFor={inputId} className="mt-4 block text-sm font-medium">
          To
        </label>
        <input
          id={inputId}
          type="email"
          value={email}
          onChange={(event) => reset(event.target.value)}
          className="mt-1.5 w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 font-mono text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        />
        <p className="mt-4 text-sm text-ink-muted">
          <span className="font-medium text-ink">Subject:</span> Your software
          contract renews on March 3
        </p>

        <fieldset className="mt-5">
          <legend className="text-sm text-ink-muted">Try a recipient:</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.email}
                type="button"
                onClick={() => reset(preset.email)}
                aria-pressed={email === preset.email}
                className="rounded-full border border-line bg-bg px-3 py-1.5 text-left text-xs text-ink transition-colors hover:border-ink/35 aria-pressed:border-ink aria-pressed:bg-surface"
              >
                {preset.note}
              </button>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={send}
          disabled={running}
          className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-wait disabled:opacity-70"
        >
          {running ? "Checking…" : "Send"}
        </button>
      </div>

      <ol className="mt-6 grid grid-cols-3 gap-2" aria-hidden="true">
        {STEPS.map((step, i) => (
          <li
            key={step}
            className={`rounded-lg border px-2 py-2 text-center text-xs transition-colors ${phase.step >= i ? "border-ink bg-ink text-bg" : "border-line text-ink-muted"}`}
          >
            {step}
          </li>
        ))}
      </ol>

      <div aria-live="polite" className="mt-4 min-h-24">
        {phase.result && <Result result={phase.result} />}
      </div>
    </div>
  );
}

function Result({ result }: { result: RecipientCheck }) {
  if (result.status === "invalid") {
    return (
      <p className="rounded-xl border border-line bg-bg px-4 py-3 text-sm">
        That isn&apos;t a valid email address, so nothing was sent.
      </p>
    );
  }

  if (result.status === "sent") {
    return (
      <div className="rounded-xl bg-accent/60 px-4 py-3 text-sm text-ink">
        <p className="flex items-center gap-2 font-medium">
          <CheckIcon />
          Sent to {result.domain}
        </p>
        <p className="mt-1">The domain is on this customer&apos;s allowlist.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-highlight/60 px-4 py-3 text-sm text-ink">
      <p className="flex items-center gap-2 font-medium">
        <BlockedIcon className="h-4 w-4 shrink-0" />
        Blocked: {result.domain} is not on the allowlist
      </p>
      <p className="mt-1">
        The task holds at draft ready and escalates to a person inside the
        company, with the reason recorded: recipient domain not on the
        allowlist. The model can request a send, but this check runs in code
        before anything leaves, so no prompt can talk its way past it.
      </p>
    </div>
  );
}
