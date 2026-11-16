import type { ComponentType } from "react";
import { MergeFlow } from "@/components/diagrams/MergeFlow";
import { RenewalFlow } from "@/components/diagrams/RenewalFlow";
import { ZipFunnel } from "@/components/diagrams/ZipFunnel";

export const projectDiagrams: Record<string, ComponentType> = {
  "ai-agent-renewals": RenewalFlow,
  "internal-admin-portal": MergeFlow,
  "zip-sync-investigation": ZipFunnel,
};
