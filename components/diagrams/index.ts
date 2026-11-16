import type { ComponentType } from "react";
import { AttributionFlow } from "@/components/diagrams/AttributionFlow";
import { MergeFlow } from "@/components/diagrams/MergeFlow";
import { RenewalFlow } from "@/components/diagrams/RenewalFlow";
import { ThreadsFlow } from "@/components/diagrams/ThreadsFlow";

export const projectDiagrams: Record<string, ComponentType> = {
  "content-attribution": AttributionFlow,
  "ai-agent-renewals": RenewalFlow,
  "internal-admin-portal": MergeFlow,
  "chat-threads": ThreadsFlow,
};
