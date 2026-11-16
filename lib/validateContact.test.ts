import { describe, expect, it } from "vitest";
import { CONTACT_LIMITS, validateContact } from "./validateContact";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "I'd love to talk about your work.",
};

describe("validateContact", () => {
  it("accepts a valid submission and trims whitespace", () => {
    const result = validateContact({
      name: "  Ada  ",
      email: " ada@example.com ",
      message: `  ${valid.message}  `,
    });
    expect(result).toEqual({
      ok: true,
      data: { name: "Ada", email: "ada@example.com", message: valid.message },
    });
  });

  it("reports every missing field at once", () => {
    const result = validateContact({});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.errors).sort()).toEqual([
        "email",
        "message",
        "name",
      ]);
    }
  });

  it("treats whitespace-only input as missing", () => {
    const result = validateContact({ ...valid, name: "   " });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.name).toBeDefined();
  });

  it("rejects a malformed email", () => {
    for (const email of ["ada", "ada@", "ada@example", "ada @example.com"]) {
      const result = validateContact({ ...valid, email });
      expect(result.ok).toBe(false);
    }
  });

  it("enforces message length limits", () => {
    const short = validateContact({ ...valid, message: "Too short" });
    const long = validateContact({
      ...valid,
      message: "x".repeat(CONTACT_LIMITS.messageMax + 1),
    });
    expect(short.ok).toBe(false);
    expect(long.ok).toBe(false);
  });

  it("rejects non-string values instead of crashing", () => {
    const result = validateContact({ name: 42, email: null, message: {} });
    expect(result.ok).toBe(false);
  });
});
