"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { site } from "@/lib/site";
import {
  CONTACT_LIMITS,
  validateContact,
  type ContactErrors,
  type ContactField,
} from "@/lib/validateContact";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER: ContactField[] = ["name", "email", "message"];

const inputClass =
  "w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink aria-invalid:border-2 aria-invalid:border-highlight";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sentName, setSentName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function clearError(field: ContactField) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function focusFirstError(fieldErrors: ContactErrors) {
    const first = FIELD_ORDER.find((field) => fieldErrors[field]);
    const element = first && formRef.current?.elements.namedItem(first);
    if (element instanceof HTMLElement) element.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
      company: form.get("company"),
    };

    const result = validateContact(payload);
    if (!result.ok) {
      setErrors(result.errors);
      focusFirstError(result.errors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, company: payload.company }),
      });
      const body = await response.json().catch(() => null);

      if (response.ok) {
        setSentName(result.data.name.split(/\s+/)[0]);
        setStatus("success");
        return;
      }
      if (response.status === 400 && body?.errors) {
        setErrors(body.errors);
        setStatus("idle");
        focusFirstError(body.errors);
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="w-full max-w-xl rounded-card border border-line bg-bg p-8 text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        <p className="font-serif text-3xl">Thanks, {sentName}.</p>
        <p className="mt-3 text-ink-muted">
          Your message is on its way. I&apos;ll reply within two days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm underline decoration-highlight decoration-2 underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-busy={submitting}
      className="w-full max-w-xl space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name} onEdit={clearError}>
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="name"
              maxLength={CONTACT_LIMITS.nameMax}
              className={inputClass}
            />
          )}
        </Field>
        <Field
          label="Email"
          name="email"
          error={errors.email}
          onEdit={clearError}
        >
          {(props) => (
            <input
              {...props}
              type="email"
              autoComplete="email"
              maxLength={CONTACT_LIMITS.emailMax}
              className={inputClass}
            />
          )}
        </Field>
      </div>
      <Field
        label="Message"
        name="message"
        error={errors.message}
        onEdit={clearError}
      >
        {(props) => (
          <textarea
            {...props}
            rows={4}
            maxLength={CONTACT_LIMITS.messageMax}
            className={`${inputClass} resize-none`}
          />
        )}
      </Field>

      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-ink/20 bg-bg/60 px-4 py-3 text-sm text-ink"
        >
          <AlertIcon />
          <span>
            Message not sent. Please try again, or{" "}
            <a
              href={site.links.linkedin}
              className="underline decoration-highlight decoration-2 underline-offset-4"
            >
              message me on LinkedIn
            </a>
            .
          </span>
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? "Sending…" : "Send message"}
        </button>
        <p className="text-xs text-ink-muted">
          Your details are only used to reply to you.
        </p>
      </div>
    </form>
  );
}

type FieldProps = {
  id: string;
  name: string;
  onChange: () => void;
  required: true;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
};

function Field({
  label,
  name,
  error,
  onEdit,
  children,
}: {
  label: string;
  name: ContactField;
  error?: string;
  onEdit: (field: ContactField) => void;
  children: (props: FieldProps) => ReactNode;
}) {
  const errorId = `${name}-error`;

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs tracking-[0.12em] text-ink-muted uppercase"
      >
        {label}
      </label>
      {children({
        id: name,
        name,
        onChange: () => onEdit(name),
        required: true,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
      })}
      {error && (
        <p
          id={errorId}
          className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-ink"
        >
          <AlertIcon />
          {error}
        </p>
      )}
    </div>
  );
}

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="mt-0.5 h-4 w-4 shrink-0 text-ink"
    >
      <circle
        cx="10"
        cy="10"
        r="8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 5.5v5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="10" cy="14.2" r="1.1" fill="currentColor" />
    </svg>
  );
}
