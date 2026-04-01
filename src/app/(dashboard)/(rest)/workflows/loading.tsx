"use client";

import { GloriousLoader } from "@/components/glorious-loader";
import { BlocksIcon } from "lucide-react";

export default function WorkflowsLoading() {
  return (
    <GloriousLoader
      title="Loading Workflows"
      subtitle="Fetching your visual workspace..."
      icon={BlocksIcon}
      colorClass="text-primary"
      gradientClass="from-primary/30 to-blue-500/30"
    />
  );
}
