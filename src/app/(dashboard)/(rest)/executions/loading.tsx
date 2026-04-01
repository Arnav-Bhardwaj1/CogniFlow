"use client";

import { GloriousLoader } from "@/components/glorious-loader";
import { ActivityIcon } from "lucide-react";

export default function ExecutionsLoading() {
  return (
    <GloriousLoader
      title="Loading Executions"
      subtitle="Fetching run history and logs..."
      icon={ActivityIcon}
      colorClass="text-emerald-500"
      gradientClass="from-emerald-500/30 to-teal-500/30"
    />
  );
}
