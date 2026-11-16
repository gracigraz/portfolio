// A small, pure model of the real supplier merge rules, used by the demo:
// products move to the target; purchase requests move unless the target is
// already linked to them; the target's empty fields are filled from the
// source while its existing values are kept; document references move.

export type MockSupplier = {
  id: string;
  name: string;
  products: string[];
  purchaseRequests: string[];
  documents: number;
  fields: Record<string, string>;
};

export type MergeReport = {
  productsMoved: string[];
  purchaseRequestsMoved: string[];
  purchaseRequestsSkipped: string[];
  fieldsFilled: string[];
  fieldsKept: string[];
  documentsUpdated: number;
};

const filled = (value: string | undefined) => Boolean(value && value.trim());

export function mergeSuppliers(
  source: MockSupplier,
  target: MockSupplier,
): MergeReport {
  if (source.id === target.id) {
    throw new Error("Source and target must be different suppliers.");
  }

  const targetRequests = new Set(target.purchaseRequests);
  const fieldNames = Object.keys(source.fields);

  return {
    productsMoved: [...source.products],
    purchaseRequestsMoved: source.purchaseRequests.filter(
      (id) => !targetRequests.has(id),
    ),
    purchaseRequestsSkipped: source.purchaseRequests.filter((id) =>
      targetRequests.has(id),
    ),
    fieldsFilled: fieldNames.filter(
      (name) => filled(source.fields[name]) && !filled(target.fields[name]),
    ),
    fieldsKept: fieldNames.filter(
      (name) => filled(source.fields[name]) && filled(target.fields[name]),
    ),
    documentsUpdated: source.documents,
  };
}
