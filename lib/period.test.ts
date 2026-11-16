import { describe, expect, it } from "vitest";
import { periodLines } from "./period";

describe("periodLines", () => {
  it("shows only months when the range is within one year", () => {
    expect(periodLines("Jun 2023 to Oct 2023")).toEqual(["Jun to Oct"]);
  });

  it("keeps a range across years on one line", () => {
    expect(periodLines("Sep 2024 to Jun 2026")).toEqual([
      "Sep 2024 to Jun 2026",
    ]);
  });

  it("shows only the end for year-only ranges (the start year is shown large)", () => {
    expect(periodLines("2014 to 2019")).toEqual(["to 2019"]);
  });

  it("returns anything unexpected unchanged", () => {
    expect(periodLines("Summer 2020")).toEqual(["Summer 2020"]);
  });
});
