import { describe, expect, it } from "vitest";
import { mergeSuppliers, type MockSupplier } from "./supplierMerge";

const source: MockSupplier = {
  id: "a",
  name: "Northwind Supplies",
  products: ["Laptops", "Monitors"],
  purchaseRequests: ["PR-104", "PR-131"],
  documents: 3,
  fields: {
    email: "billing@northwind.example",
    contact: "",
    phone: "555-0100",
  },
};

const target: MockSupplier = {
  id: "b",
  name: "Northwind Supplies Inc.",
  products: ["Docking stations"],
  purchaseRequests: ["PR-131", "PR-212"],
  documents: 2,
  fields: { email: "", contact: "Jordan Lee", phone: "555-0199" },
};

describe("mergeSuppliers", () => {
  const report = mergeSuppliers(source, target);

  it("moves every product and document reference", () => {
    expect(report.productsMoved).toEqual(["Laptops", "Monitors"]);
    expect(report.documentsUpdated).toBe(3);
  });

  it("skips purchase requests the target is already linked to", () => {
    expect(report.purchaseRequestsMoved).toEqual(["PR-104"]);
    expect(report.purchaseRequestsSkipped).toEqual(["PR-131"]);
  });

  it("fills only the target's empty fields and keeps its existing values", () => {
    expect(report.fieldsFilled).toEqual(["email"]);
    expect(report.fieldsKept).toEqual(["phone"]);
  });

  it("refuses to merge a supplier into itself", () => {
    expect(() => mergeSuppliers(source, source)).toThrow();
  });
});
