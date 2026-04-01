"use client";

import { GloriousLoader } from "@/components/glorious-loader";
import { BlocksIcon, CpuIcon } from "lucide-react";

export default function WorkflowsLoading() {
  return (
    <GloriousLoader
      title="Loading Workflows"
      subtitle={[
        "Fetching your visual workspace...",
        "Connecting to AI agents..."
      ]}
      icon={[BlocksIcon, CpuIcon]}
      colorClass="text-primary"
      gradientClass="from-primary/30 to-blue-500/30"
    />
  );
}
