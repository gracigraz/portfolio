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

// Wide diagrams and the minimum width each keeps on narrow screens (their
// frame scrolls sideways instead of shrinking labels below a readable size).
// The widest diagram gets the most room so its text stays about the same size.
export const wideDiagrams = new Map<ComponentType, string>([
  [AttributionFlow, "max-sm:min-w-[36rem]"],
  [PlatformFlow, "max-sm:min-w-[36rem]"],
  [ThreadsFlow, "max-sm:min-w-[36rem]"],
  [MergeSteps, "max-sm:min-w-[36rem]"],
  [SigningFlow, "max-sm:min-w-[36rem]"],
  [RenewalStatuses, "max-sm:min-w-[44rem]"],
]);
