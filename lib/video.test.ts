import { describe, expect, it } from "vitest";
import { loomEmbedUrl } from "./video";

const ID = "7a3cf3e80de4429a8e287f6e36026141";

describe("loomEmbedUrl", () => {
  it("turns a Loom share link into an embed link", () => {
    expect(loomEmbedUrl(`https://www.loom.com/share/${ID}`)).toBe(
      `https://www.loom.com/embed/${ID}`,
    );
  });

  it("accepts the share link without www", () => {
    expect(loomEmbedUrl(`https://loom.com/share/${ID}`)).toBe(
      `https://www.loom.com/embed/${ID}`,
    );
  });

  it("returns null for anything that isn't a Loom share link", () => {
    for (const url of [
      "https://github.com/gracigraz/calm-companion",
      `http://www.loom.com/share/${ID}`,
      `https://www.loom.com.evil.test/share/${ID}`,
      "https://www.loom.com/share/not-an-id",
    ]) {
      expect(loomEmbedUrl(url)).toBeNull();
    }
  });
});
