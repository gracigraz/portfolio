import type { ComponentType } from "react";
import { AttributionFlow } from "@/components/diagrams/AttributionFlow";
import { MergeSteps } from "@/components/diagrams/MergeSteps";
import { PlatformFlow } from "@/components/diagrams/PlatformFlow";
import { RenewalStatuses } from "@/components/diagrams/RenewalStatuses";
import { SigningFlow } from "@/components/diagrams/SigningFlow";
import { ThreadsFlow } from "@/components/diagrams/ThreadsFlow";

export const projectDiagrams: Record<string, ComponentType> = {
  "content-attribution": AttributionFlow,
  "ai-agent-renewals": RenewalStatuses,
  "internal-admin-portal": PlatformFlow,
  "chat-threads": ThreadsFlow,
};

// Smaller diagrams shown inside a case study's deep-dive section.
export const deepDiveDiagrams: Record<string, ComponentType> = {
  "internal-admin-portal": MergeSteps,
  "ai-agent-renewals": SigningFlow,
};

// Diagrams drawn wider than 400 units. On narrow screens their frame scrolls
// sideways instead of shrinking the labels below a readable size.
export const wideDiagrams = new Set<ComponentType>([
  AttributionFlow,
  PlatformFlow,
  RenewalStatuses,
  ThreadsFlow,
  MergeSteps,
  SigningFlow,
]);
