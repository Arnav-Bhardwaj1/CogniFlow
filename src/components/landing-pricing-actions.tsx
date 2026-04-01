"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function LandingPricingActions() {
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

  const handleUpgradeModal = React.useCallback(async () => {
    setLoadingButton("pricing-pro");
    try {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });

      const res = await fetch("/api/razorpay/checkout", { method: "POST" });
      const data = await res.json();

      if (data.error) {
        console.error(data.error);
        setLoadingButton(null);
        return;
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "CogniFlow Pro",
        description: "Unlimited access to CogniFlow",
        order_id: data.orderId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async function (response: any) {
          try {
            const res = await fetch("/api/razorpay/verify", {
              method: "POST",
              body: JSON.stringify(response),
              headers: { "Content-Type": "application/json" },
            });
            const result = await res.json();
            if (result.success) {
              window.location.reload();
            } else {
              console.error("Payment verification failed", result.error);
              setLoadingButton(null);
            }
          } catch (err) {
            console.error("Verification request failed", err);
            setLoadingButton(null);
          }
        },
        modal: {
          ondismiss: function () {
            setLoadingButton(null);
          },
        },
        theme: {
          color: "#ea580c",
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp = new (window as any).Razorpay(options);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rzp.on("payment.failed", function (response: any) {
        console.error("Payment failed", response.error);
        setLoadingButton(null);
      });
      rzp.open();
    } catch (error) {
      console.error("Payment initialization failed", error);
      setLoadingButton(null);
    }
  }, []);

  if (isSessionPending) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
      {/* Free Tier */}
      <div className="p-6 md:p-8 rounded-3xl glass-strong dark:bg-white/5 border border-white/10 flex flex-col items-start">
        <h3 className="text-2xl font-bold text-white mb-2">Hobby</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-4xl font-black text-white">₹0</span>
          <span className="text-muted-foreground">/mo</span>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Perfect for exploring and small projects.
        </p>
        <ul className="space-y-3 mb-6 flex-1 w-full">
          <li className="flex items-center gap-3 text-sm text-white/80">
            <ShieldCheckIcon /> Up to 3 active workflows
          </li>
          <li className="flex items-center gap-3 text-sm text-white/80">
            <ShieldCheckIcon /> 100 executions / month
          </li>
          <li className="flex items-center gap-3 text-sm text-white/80">
            <ShieldCheckIcon /> Standard community support
          </li>
        </ul>
        <Button
          onClick={() => handleNavigation("/signup", "pricing-free")}
          onMouseEnter={() => router.prefetch("/signup")}
          disabled={isNavigating}
          variant="outline"
          className="w-full rounded-full border-white/10 hover:bg-white/10 mt-auto"
        >
          {loadingButton === "pricing-free" && (
            <Loader2Icon className="size-4 animate-spin mr-2" />
          )}
          Get Started Forever Free
        </Button>
      </div>

      {/* Pro Tier */}
      <div className="p-6 md:p-8 rounded-3xl glass-strong dark:bg-white/5 border border-primary/40 relative flex flex-col items-start shadow-[0_0_40px_-15px_rgba(249,115,22,0.3)]">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wider">
          Most Popular
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-4xl font-black text-white">₹499</span>
          <span className="text-muted-foreground">/mo</span>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          For serious developers and teams scaling up.
        </p>
        <ul className="space-y-3 mb-6 flex-1 w-full">
          <li className="flex items-center gap-3 text-sm text-white/80">
            <ShieldCheckIcon /> Unlimited workflows
          </li>
          <li className="flex items-center gap-3 text-sm text-white/80">
            <ShieldCheckIcon /> 10,000 executions / month
          </li>
          <li className="flex items-center gap-3 text-sm text-white/80">
            <ShieldCheckIcon /> Access to premium AI nodes
          </li>
          <li className="flex items-center gap-3 text-sm text-white/80">
            <ShieldCheckIcon /> AI Workflow Generator
          </li>
        </ul>
        <Button
          onClick={() => {
            if (session) {
              handleUpgradeModal();
            } else {
              handleNavigation("/signup", "pricing-pro");
            }
          }}
          onMouseEnter={() => {
            if (!session) router.prefetch("/signup")
          }}
          disabled={isNavigating || loadingButton === "pricing-pro"}
          className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 mt-auto"
        >
          {loadingButton === "pricing-pro" && (
            <Loader2Icon className="size-4 animate-spin mr-2" />
          )}
          Upgrade to Pro
        </Button>
      </div>
    </div>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 text-emerald-400"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
