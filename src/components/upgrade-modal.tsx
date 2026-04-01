"use client";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogContent,
    AlertDialogAction,
}
    from "@/components/ui/alert-dialog";
import { FREE_TIER_LIMITS } from "@/config/constants";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

interface UpgradeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const UpgradeModal = ({ open, onOpenChange }: UpgradeModalProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpgrade = async () => {
        setIsLoading(true);
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
                setIsLoading(false);
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
                            headers: { "Content-Type": "application/json" }
                        });
                        const result = await res.json();
                        if (result.success) {
                            onOpenChange(false);
                            window.location.reload();
                        } else {
                            console.error("Payment verification failed", result.error);
                            setIsLoading(false);
                        }
                    } catch (err) {
                        console.error("Verification request failed", err);
                        setIsLoading(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        setIsLoading(false);
                    }
                },
                theme: {
                    color: "#ea580c",
                },
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const rzp = new (window as any).Razorpay(options);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            rzp.on('payment.failed', function (response: any) {
                console.error("Payment failed", response.error);
                setIsLoading(false);
            });
            rzp.open();
        } catch (error) {
            console.error("Payment initialization failed", error);
            setIsLoading(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle>Upgrade to Pro</AlertDialogTitle>
                    <AlertDialogDescription className="sr-only">
                        Upgrade to Pro to unlock unlimited workflows and credentials.
                    </AlertDialogDescription>

                    <div className="space-y-4 text-muted-foreground text-sm">
                        <p>You&apos;ve reached the free tier limit. Upgrade to Pro to unlock unlimited access!</p>

                        <div className="space-y-3 pt-2">
                            <div className="text-sm">
                                <span className="font-semibold text-foreground">Free Plan:</span>
                                <ul className="mt-2 space-y-1.5">
                                    <li className="flex items-start gap-2">
                                        <span className="text-xs mt-0.5">•</span>
                                        <span>Up to {FREE_TIER_LIMITS.MAX_WORKFLOWS} workflows</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-xs mt-0.5">•</span>
                                        <span>Up to {FREE_TIER_LIMITS.MAX_CREDENTIALS} credentials</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="text-sm">
                                <span className="font-semibold text-foreground">Pro Plan:</span>
                                <ul className="mt-2 space-y-1.5">
                                    <li className="flex items-center gap-2">
                                        <CheckIcon className="h-4 w-4 text-green-600" />
                                        <span>Unlimited workflows</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckIcon className="h-4 w-4 text-green-600" />
                                        <span>Unlimited credentials</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckIcon className="h-4 w-4 text-green-600" />
                                        <span>Priority support</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleUpgrade}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 hover:from-orange-600 hover:via-orange-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/50 hover:shadow-xl hover:shadow-orange-600/60 transition-all duration-200 hover:scale-105 font-semibold"
                    >
                        {isLoading ? "Loading..." : "Upgrade to Pro"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
};




