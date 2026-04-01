"use client";

import { GloriousLoader } from "@/components/glorious-loader";
import { CreditCardIcon } from "lucide-react";

export default function BillingLoading() {
  return (
    <GloriousLoader
      title="Loading Billing Data"
      subtitle="Fetching subscription data..."
      icon={CreditCardIcon}
      colorClass="text-amber-500"
      gradientClass="from-amber-500/30 to-orange-500/30"
    />
  );
}
