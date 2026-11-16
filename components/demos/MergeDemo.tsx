"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckIcon, WarningIcon } from "@/components/icons";
import {
  mergeSuppliers,
  type MergeReport,
  type MockSupplier,
} from "@/lib/supplierMerge";

const SUPPLIERS: MockSupplier[] = [
  {
    id: "northwind",
    name: "Northwind Supplies",
    products: ["Laptops", "Monitors"],
    purchaseRequests: ["PR-104", "PR-131"],
    documents: 3,
    fields: {
      email: "billing@northwind.example",
      contact: "",
      phone: "555-0100",
    },
  },
  {
    id: "northwind-inc",
    name: "Northwind Supplies Inc.",
    products: ["Docking stations"],
    purchaseRequests: ["PR-131", "PR-212"],
    documents: 2,
    fields: { email: "", contact: "Jordan Lee", phone: "555-0199" },
  },
  {
    id: "contoso",
    name: "Contoso Office",
    products: ["Desks", "Chairs", "Lamps"],
    purchaseRequests: ["PR-090"],
    documents: 4,
    fields: {
      email: "orders@contoso.example",
      contact: "Sam Rivera",
      phone: "",
    },
  },
];

const FIELD_LABELS: Record<string, string> = {
  email: "email",
  contact: "contact name",
  phone: "phone",
};

const STEPS = ["Validate", "Neo4j commit", "DynamoDB refs"] as const;
const STEP_MS = 450;

type Done = { source: MockSupplier; target: MockSupplier; report: MergeReport };

export function MergeDemo() {
  const sourceId = useId();
  const targetId = useId();
  const errorId = useId();
  const [suppliers, setSuppliers] = useState(SUPPLIERS);
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [step, setStep] = useState(-1);
  const [done, setDone] = useState<Done | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const sameSupplier = source !== "" && source === target;
  const canMerge = source !== "" && target !== "" && !sameSupplier;
  const running = step >= 0 && done === null;

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function reset() {
    clearTimers();
    setSuppliers(SUPPLIERS);
    setSource("");
    setTarget("");
    setStep(-1);
    setDone(null);
  }

  function merge() {
    const from = suppliers.find((s) => s.id === source);
    const into = suppliers.find((s) => s.id === target);
    if (!from || !into || from.id === into.id) return;

    const report = mergeSuppliers(from, into);
    const finish = () => {
      setDone({ source: from, target: into, report });
      setStep(STEPS.length - 1);
      setSuppliers((list) => list.filter((s) => s.id !== from.id));
      setSource("");
      setTarget("");
    };

    clearTimers();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    setDone(null);
    setStep(0);
    timers.current.push(
      setTimeout(() => setStep(1), STEP_MS),
      setTimeout(() => setStep(2), STEP_MS * 2),
      setTimeout(finish, STEP_MS * 3),
    );
  }

  const selectClass =
    "mt-1.5 w-full rounded-xl border border-line-strong bg-bg px-3.5 py-2.5 text-base sm:text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-60";

  return (
    <div className="rounded-card border border-line bg-surface/60 p-6 sm:p-8">
      <p className="text-xs tracking-[0.12em] text-ink-muted uppercase">
        Interactive demo · mock data
      </p>
      <p className="mt-2 text-sm text-ink-muted">
        Recreated from the real admin tool. It runs only in your browser, and
        nothing is sent anywhere.
      </p>

      <div className="mt-6 rounded-xl border border-line bg-bg p-5">
        <p className="font-serif text-2xl">Merge suppliers</p>
        <p className="mt-1 text-sm text-ink-muted">
          The source supplier is merged into the target and then deleted.
        </p>

        <label htmlFor={sourceId} className="mt-5 block text-sm font-medium">
          Source supplier
        </label>
        <select
          id={sourceId}
          value={source}
          disabled={running}
          onChange={(event) => setSource(event.target.value)}
          aria-describedby={sameSupplier ? errorId : undefined}
          className={selectClass}
        >
          <option value="">Choose a supplier</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <p className="mt-1.5 text-xs text-ink-muted">
          Its data moves to the target, then it is deleted.
        </p>

        <label htmlFor={targetId} className="mt-4 block text-sm font-medium">
          Target supplier
        </label>
        <select
          id={targetId}
          value={target}
          disabled={running}
          onChange={(event) => setTarget(event.target.value)}
          aria-invalid={sameSupplier}
          aria-describedby={sameSupplier ? errorId : undefined}
          className={`${selectClass} aria-invalid:border-2 aria-invalid:border-highlight`}
        >
          <option value="">Choose a supplier</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <p className="mt-1.5 text-xs text-ink-muted">
          Stays active and receives everything from the source.
        </p>
        {sameSupplier && (
          <p
            id={errorId}
            role="status"
            className="mt-2 text-sm font-medium text-ink"
          >
            Choose two different suppliers.
          </p>
        )}

        <p className="mt-5 flex gap-2 rounded-xl bg-highlight/25 px-4 py-3 text-sm text-ink">
          <WarningIcon className="mt-0.5 h-4 w-4 shrink-0" />
          Supplier merges are irreversible and cascade through products,
          purchase requests, and documents. Review your choices carefully.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={merge}
            disabled={!canMerge || running}
            className="rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            {running ? "Merging…" : "Merge suppliers"}
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={running}
            className="text-sm text-ink-muted underline decoration-line underline-offset-4 hover:text-ink hover:decoration-highlight disabled:opacity-40"
          >
            Reset demo
          </button>
        </div>
      </div>

      <ol className="mt-6 grid grid-cols-3 gap-2" aria-hidden="true">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={`rounded-lg border px-2 py-2 text-center text-xs transition-colors ${step >= i ? "border-ink bg-ink text-bg" : "border-line text-ink-muted"}`}
          >
            {label}
          </li>
        ))}
      </ol>

      <div aria-live="polite" className="mt-4 min-h-24">
        {running && <p className="sr-only">Merging…</p>}
        {done && <Report done={done} />}
      </div>
    </div>
  );
}

function Report({ done }: { done: Done }) {
  const { source, target, report } = done;
  const fields = (names: string[]) =>
    names.map((name) => FIELD_LABELS[name] ?? name).join(", ");

  const lines = [
    `${report.productsMoved.length} products moved: ${report.productsMoved.join(", ")}`,
    report.purchaseRequestsMoved.length > 0 &&
      `${report.purchaseRequestsMoved.length} purchase requests moved`,
    report.purchaseRequestsSkipped.length > 0 &&
      `${report.purchaseRequestsSkipped.join(", ")} skipped: already linked to the target`,
    report.fieldsFilled.length > 0 &&
      `Empty fields filled from the source: ${fields(report.fieldsFilled)}`,
    report.fieldsKept.length > 0 &&
      `Target values kept: ${fields(report.fieldsKept)}`,
    `${report.documentsUpdated} document references updated`,
    `${source.name} deleted`,
  ].filter((line): line is string => Boolean(line));

  return (
    <div className="rounded-xl bg-accent/60 px-4 py-3 text-sm text-ink">
      <p className="flex items-center gap-2 font-medium">
        <CheckIcon />
        Merged into {target.name}
      </p>
      <ul className="mt-2 space-y-1">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
