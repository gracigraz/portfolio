export type RecipientCheck =
  | { status: "invalid" }
  | { status: "sent"; domain: string }
  | { status: "blocked"; domain: string };

const DOMAIN_PATTERN = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/;

export function recipientDomain(email: string): string | null {
  const parts = email.trim().toLowerCase().split("@");
  if (parts.length !== 2) return null;

  const [local, domain] = parts;
  if (!local || !DOMAIN_PATTERN.test(domain)) return null;
  return domain;
}

export function checkRecipient(
  email: string,
  allowedDomains: readonly string[],
): RecipientCheck {
  const domain = recipientDomain(email);
  if (!domain) return { status: "invalid" };

  const allowed = allowedDomains.some(
    (allowedDomain) => allowedDomain.toLowerCase() === domain,
  );
  return allowed ? { status: "sent", domain } : { status: "blocked", domain };
}
