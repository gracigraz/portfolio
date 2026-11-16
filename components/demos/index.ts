import type { ComponentType } from "react";
import { AllowlistDemo } from "@/components/demos/AllowlistDemo";
import { MergeDemo } from "@/components/demos/MergeDemo";

export const projectDemos: Record<string, ComponentType> = {
  "ai-agent-renewals": AllowlistDemo,
  "internal-admin-portal": MergeDemo,
};
