import { describe, expect, it } from "vitest";
import { checkRecipient, recipientDomain } from "./allowlist";

const ALLOWED = ["northwind.example", "ops.example"];

describe("checkRecipient", () => {
  it("sends to an allowed domain", () => {
    expect(checkRecipient("jordan@northwind.example", ALLOWED)).toEqual({
      status: "sent",
      domain: "northwind.example",
    });
  });

  it("blocks a domain that isn't on the list", () => {
    expect(checkRecipient("sales@cloudvendor.example", ALLOWED)).toEqual({
      status: "blocked",
      domain: "cloudvendor.example",
    });
  });

  it("blocks a look-alike domain that only contains an allowed one", () => {
    expect(
      checkRecipient("jordan@northwind.example.spoof.test", ALLOWED).status,
    ).toBe("blocked");
  });

  it("blocks a subdomain, because matching is exact", () => {
    expect(checkRecipient("a@mail.northwind.example", ALLOWED).status).toBe(
      "blocked",
    );
  });

  it("ignores case and surrounding spaces", () => {
    expect(checkRecipient("  Jordan@NORTHWIND.Example ", ALLOWED).status).toBe(
      "sent",
    );
  });

  it("rejects addresses that aren't valid", () => {
    for (const email of [
      "",
      "jordan",
      "jordan@",
      "@northwind.example",
      "a@b",
    ]) {
      expect(checkRecipient(email, ALLOWED).status).toBe("invalid");
    }
  });
});

describe("recipientDomain", () => {
  it("rejects addresses with more than one @ instead of guessing", () => {
    expect(recipientDomain("a@evil.test@northwind.example")).toBeNull();
    expect(
      checkRecipient("a@evil.test@northwind.example", ALLOWED).status,
    ).toBe("invalid");
  });
});
