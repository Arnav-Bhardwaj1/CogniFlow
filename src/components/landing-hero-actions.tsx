"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function LandingHeroActions() {
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

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
      {isSessionPending ? (
        <Button
          disabled
          size="lg"
          className="w-full sm:w-auto rounded-full h-14 px-8 text-base shadow-lg shadow-primary/25 min-w-[220px]"
        >
          <Loader2Icon className="size-5 animate-spin mr-2" />
          Loading...
        </Button>
      ) : session ? (
        <Button
          onClick={() => handleNavigation("/workflows", "hero-dashboard")}
          onMouseEnter={() => router.prefetch("/workflows")}
          disabled={isNavigating}
          size="lg"
          className="w-full sm:w-auto rounded-full h-14 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 min-w-[200px]"
        >
          {loadingButton === "hero-dashboard" && (
            <Loader2Icon className="size-5 animate-spin mr-2" />
          )}
          Go to Dashboard
          {loadingButton !== "hero-dashboard" && (
            <ArrowRightIcon className="ml-2 size-4" />
          )}
        </Button>
      ) : (
        <Button
          onClick={() => handleNavigation("/signup", "hero-signup")}
          onMouseEnter={() => router.prefetch("/signup")}
          disabled={isNavigating}
          size="lg"
          className="w-full sm:w-auto rounded-full h-14 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 min-w-[220px]"
        >
          {loadingButton === "hero-signup" && (
            <Loader2Icon className="size-5 animate-spin mr-2" />
          )}
          Start Building Free
          {loadingButton !== "hero-signup" && (
            <ArrowRightIcon className="ml-2 size-4" />
          )}
        </Button>
      )}
    </div>
  );
}
