export const CONTACT_LIMITS = {
  nameMax: 100,
  emailMax: 254,
  messageMin: 10,
  messageMax: 5000,
} as const;

export type ContactField = "name" | "email" | "message";

export type ContactData = Record<ContactField, string>;

export type ContactErrors = Partial<Record<ContactField, string>>;

export type ValidationResult =
  { ok: true; data: ContactData } | { ok: false; errors: ContactErrors };

// No whitespace, no extra @, and none of the characters that are special in
// an email header (<>()[],;:\"), so a valid address is always safe to use as
// the reply-to.
const EMAIL_PATTERN =
  /^[^\s@<>()[\],;:\\"]+@[^\s@<>()[\],;:\\"]+\.[^\s@<>()[\],;:\\"]+$/;

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContact(input: {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}): ValidationResult {
  const data: ContactData = {
    name: text(input.name),
    email: text(input.email),
    message: text(input.message),
  };
  const errors: ContactErrors = {};

  if (!data.name) {
    errors.name = "Please enter your name.";
  } else if (data.name.length > CONTACT_LIMITS.nameMax) {
    errors.name = `Please keep your name under ${CONTACT_LIMITS.nameMax} characters.`;
  }

  if (!data.email) {
    errors.email = "Please enter your email.";
  } else if (
    data.email.length > CONTACT_LIMITS.emailMax ||
    !EMAIL_PATTERN.test(data.email)
  ) {
    errors.email = "Please enter a valid email.";
  }

  if (!data.message) {
    errors.message = "Please write a message.";
  } else if (data.message.length < CONTACT_LIMITS.messageMin) {
    errors.message = `Please write at least ${CONTACT_LIMITS.messageMin} characters.`;
  } else if (data.message.length > CONTACT_LIMITS.messageMax) {
    errors.message = `Please keep your message under ${CONTACT_LIMITS.messageMax} characters.`;
  }

  return Object.keys(errors).length > 0
    ? { ok: false, errors }
    : { ok: true, data };
}
