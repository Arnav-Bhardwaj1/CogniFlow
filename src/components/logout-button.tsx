"use client";

import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await authClient.signOut();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("signOut error:", err);
    }
    queryClient.clear();
    router.push("/login");
    router.refresh();
  }, [router, queryClient]);

  return (
    <Button onClick={handleLogout} disabled={isLoggingOut}>
      {isLoggingOut ? (
        <><Loader2Icon className="size-4 animate-spin" /> Signing out...</>
      ) : "Logout"}
    </Button>
  );
}
