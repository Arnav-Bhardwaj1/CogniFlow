"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function LandingCTAActions() {
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const [isNavigating, startTransition] = useTransition();
  const [loadingButton, setLoadingButton] = React.useState<string | null>(null);
  const router = useRouter();

  const handleNavigation = React.useCallback(
    (href: string, buttonId: string) => {
      setLoadingButton(buttonId);
      startTransition(() => {
        router.push(href);
      });
    },
    [router]
  );

  if (isSessionPending) {
    return (
      <Button
        disabled
        size="lg"
        className="rounded-full h-12 px-8 text-base shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)] min-w-[240px]"
      >
        <Loader2Icon className="size-4 animate-spin mr-2" />
        Loading...
      </Button>
    );
  }

  if (session) {
    return (
      <Button
        onClick={() => handleNavigation("/workflows", "cta-dashboard")}
        onMouseEnter={() => router.prefetch("/workflows")}
        disabled={isNavigating}
        size="lg"
        className="rounded-full h-12 px-8 text-base shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)] hover:shadow-[0_0_60px_-10px_rgba(249,115,22,0.6)] hover:scale-105 transition-all duration-300 min-w-[200px]"
      >
        {loadingButton === "cta-dashboard" && (
          <Loader2Icon className="size-4 animate-spin mr-2" />
        )}
        Go to Dashboard
      </Button>
    );
  }

  return (
    <Button
      onClick={() => handleNavigation("/signup", "cta-signup")}
      onMouseEnter={() => router.prefetch("/signup")}
      disabled={isNavigating}
      size="lg"
      className="rounded-full h-12 px-8 text-base shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)] hover:shadow-[0_0_60px_-10px_rgba(249,115,22,0.6)] hover:scale-105 transition-all duration-300 min-w-[240px]"
    >
      {loadingButton === "cta-signup" && (
        <Loader2Icon className="size-4 animate-spin mr-2" />
      )}
      Create your free workspace
    </Button>
  );
}
