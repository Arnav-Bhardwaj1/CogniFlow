"use client";

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = useCallback(async () => {
    try {
      await authClient.signOut();
    } catch (err) {
      // keep console error for debugging
      // eslint-disable-next-line no-console
      console.error("signOut error:", err);
    }
    queryClient.clear();
    router.push("/login");
    router.refresh();
  }, [router, queryClient]);

  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  );
}
