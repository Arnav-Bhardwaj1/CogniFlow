import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckIcon, CreditCardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function BillingPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { subscriptionStatus: true, razorpaySubscriptionId: true }
  });

  const isPro = user?.subscriptionStatus === "active";

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 lg:p-8 pt-4 sm:pt-6 h-full font-sans">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Billing & Plan</h2>
      </div>

      <div className="grid gap-4 mt-6 sm:mt-8">
        <Card className="glass-strong dark:bg-black/40 border-white/10">
          <CardHeader className="flex flex-row items-center gap-4 border-b border-white/5 pb-6">
            <div className="p-3 bg-primary/10 rounded-xl">
              <CreditCardIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Current Subscription</CardTitle>
              <CardDescription>Manage your CogniFlow platform plan and access.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="rounded-2xl border p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-muted/10 border-white/5">
              <div>
                <h3 className="text-xl font-bold text-foreground">{isPro ? "CogniFlow Pro" : "Free Tier"}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {isPro ? "You have unlimited lifetime access to all premium features." : "You are currently on the free hobby tier with limited workflows."}
                </p>
              </div>
              <div className="px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm border border-primary/20">
                {isPro ? "Active Plan" : "Free Plan"}
              </div>
            </div>

            {isPro && (
              <div className="space-y-4 pt-2">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">What&apos;s included</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-foreground/80">
                    <div className="rounded-full p-1 bg-green-500/10">
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    </div>
                    <span>Unlimited Workflows & Executions</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-foreground/80">
                    <div className="rounded-full p-1 bg-green-500/10">
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    </div>
                    <span>Unlimited Credentials & Secrets</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-foreground/80">
                    <div className="rounded-full p-1 bg-green-500/10">
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    </div>
                    <span>Access to premium AI generator models</span>
                  </li>
                </ul>

                {user?.razorpaySubscriptionId && (
                  <div className="pt-6 border-t border-white/5 mt-6">
                    <p className="text-xs text-muted-foreground">
                      Order Reference ID: <span className="font-mono bg-white/5 px-2 py-1 rounded-md">{user.razorpaySubscriptionId}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Your secure payment was successfully processed by Razorpay. Since this is a one-time lifetime payment, there are no recurring charges to manage.
                    </p>
                  </div>
                )}
              </div>
            )}

            {!isPro && (
              <div className="pt-4">
                <Button asChild className="w-full sm:w-auto shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                  <Link href="/workflows">Go back to dashboard to upgrade</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
