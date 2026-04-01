"use client";

import { GloriousLoader } from "@/components/glorious-loader";
import { ShieldCheckIcon } from "lucide-react";

export default function CredentialsLoading() {
  return (
    <GloriousLoader
      title="Loading Credentials"
      subtitle="Fetching secure keys and tokens..."
      icon={ShieldCheckIcon}
      colorClass="text-blue-500"
      gradientClass="from-blue-500/30 to-purple-500/30"
    />
  );
}
