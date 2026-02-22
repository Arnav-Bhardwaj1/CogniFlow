"use client";

import React, { useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LandingNavbar } from '@/components/landing-navbar'
import { FloatingNodes } from '@/components/floating-nodes'
import { ArrowRightIcon, ZapIcon, LayersIcon, Zap, BotIcon, ShieldCheckIcon, Code2Icon, WorkflowIcon, Loader2Icon } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const [isNavigating, startTransition] = useTransition();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col font-sans selection:bg-primary/30">
      <LandingNavbar />

      <main className="flex-1">

        {/* ─── Hero Section ─── */}
        <section className="relative pt-16 pb-20 md:pt-20 md:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
          {/* Background Ambient Orbs */}
          <div className="absolute top-0 -translate-y-1/4 translate-x-1/4 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(99,40,180,0.15)_0%,transparent_60%)] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 translate-y-1/4 -translate-x-1/4 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(249,115,22,0.1)_0%,transparent_60%)] rounded-full blur-3xl pointer-events-none" />

          <FloatingNodes />

          <div className="container relative z-10 mx-auto px-6 text-center max-w-5xl flex flex-col items-center">



            <h1 className="pt-3 text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40 mb-8 leading-[1.1]">
              Automate Workflows.<br />
              <span className="bg-gradient-to-r from-primary via-orange-400 to-amber-500 text-transparent bg-clip-text">Without Limits.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 font-medium leading-relaxed">
              The premium, type-safe visual editor built for modern developers. Connect native APIs, LLMs, and triggers in minutes—not days.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              {isSessionPending ? (
                <Loader2Icon className="animate-spin text-primary size-8" />
              ) : session ? (
                <Button
                  onClick={() => handleNavigation("/workflows")}
                  disabled={isNavigating}
                  size="lg"
                  className="w-full sm:w-auto rounded-full h-14 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 min-w-[200px]"
                >
                  {isNavigating ? <Loader2Icon className="size-5 animate-spin" /> : (
                    <>
                      Go to Dashboard
                      <ArrowRightIcon className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={() => handleNavigation("/signup")}
                  disabled={isNavigating}
                  size="lg"
                  className="w-full sm:w-auto rounded-full h-14 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 min-w-[220px]"
                >
                  {isNavigating ? <Loader2Icon className="size-5 animate-spin" /> : (
                    <>
                      Start Building Free
                      <ArrowRightIcon className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              )}
              <Link href="#features" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full h-14 px-8 text-base border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all">
                  Explore Features
                </Button>
              </Link>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 w-full max-w-3xl flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="size-4 text-emerald-400" /> No credit card required
              </div>
              <div className="flex items-center gap-2">
                <Code2Icon className="size-4 text-blue-400" /> Fully Type-Safe Backend
              </div>
              <div className="flex items-center gap-2">
                <ZapIcon className="size-4 text-primary" /> Multi-Trigger Execution
              </div>
            </div>
          </div>
        </section>

        {/* ... (Features grid omitted) ... */}
        <section id="features" className="relative pt-24 pb-12 md:pt-32 md:pb-16 border-t border-white/5 bg-black/20 scroll-mt-[-1.5cm]">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col items-center text-center mb-16 md:mb-24">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Everything you need to <span className="text-primary">move fast</span>.
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                CogniFlow handles the complex orchestration, webhook management, and type-safety so you can focus on building core business logic.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Feature 1 */}
              <div className="group relative p-8 rounded-2xl glass-strong dark:bg-white/5 border border-white/10 hover:border-primary/50 transition-colors duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <WorkflowIcon className="size-8 text-primary mb-6" />
                <h3 className="text-xl font-semibold text-white mb-3">Intuitive Visual Editor</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Drag and drop nodes to build complex logic. Our React Flow canvas makes debugging visual and intuitive.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group relative p-8 rounded-2xl glass-strong dark:bg-white/5 border border-white/10 hover:border-teal-500/50 transition-colors duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Zap className="size-8 text-teal-400 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-3">Multi-Trigger Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Start workflows via HTTP Webhooks, Google Forms, Stripe Events, Razorpay, or simply on a schedule.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group relative p-8 rounded-2xl glass-strong dark:bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <BotIcon className="size-8 text-purple-400 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-3">Native AI Integrations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Seamlessly chain OpenAI, Google Gemini, and Anthropic Claude nodes. Prompt engineering made visual.
                </p>
              </div>

              {/* Feature 4: AI Workflow Generator */}
              <div className="group relative p-8 rounded-2xl glass-strong dark:bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors duration-500 overflow-hidden md:col-span-2 lg:col-span-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <LayersIcon className="size-8 text-blue-400 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-3">AI Workflow Generator</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Describe what you want to build in plain English, and our AI will automatically generate the entire workflow architecture for you.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ─── Integrations Section ─── */}
        <section id="integrations" className="relative py-16 md:py-20 scroll-mt-[5cm]">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Connect your favorite <span className="text-amber-400">tools</span>.
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Natively query databases, trigger from payment gateways, or run complex AI models in one visual flow.
              </p>
            </div>
            {/* Simple Logo Grid for Integrations */}
            <div className="flex flex-wrap justify-center items-center gap-12 mt-12 opacity-80">
              <div className="flex flex-col items-center gap-3">
                <div className="group size-16 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center p-3 shadow-[0_0_30px_-5px_rgba(255,255,255,0.15)] hover:bg-white/10 hover:border-[rgba(215,162,135,0.5)] hover:shadow-[0_0_20px_-5px_rgba(215,162,135,0.3)] transition-all duration-300 cursor-pointer">
                  <Image src="/logos/anthropic.svg" alt="Anthropic" width={32} height={32} className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Anthropic</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="group size-16 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center p-3 shadow-[0_0_30px_-5px_rgba(255,255,255,0.15)] hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] transition-all duration-300 cursor-pointer">
                  <Image src="/logos/openai.svg" alt="OpenAI" width={32} height={32} className="object-contain drop-shadow-md invert dark:invert-0 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">OpenAI</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="group size-16 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center p-3 shadow-[0_0_30px_-5px_rgba(255,255,255,0.15)] hover:bg-white/10 hover:border-blue-500/50 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)] transition-all duration-300 cursor-pointer">
                  <Image src="/logos/gemini.svg" alt="Google Gemini" width={32} height={32} className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Google Gemini</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="group size-16 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center p-3 shadow-[0_0_30px_-5px_rgba(255,255,255,0.15)] hover:bg-white/10 hover:border-indigo-500/50 hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)] transition-all duration-300 cursor-pointer">
                  <Image src="/logos/discord.svg" alt="Discord" width={32} height={32} className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Discord</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="group size-16 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center p-3 shadow-[0_0_30px_-5px_rgba(255,255,255,0.15)] hover:bg-white/10 hover:border-pink-500/50 hover:shadow-[0_0_20px_-5px_rgba(236,72,153,0.3)] transition-all duration-300 cursor-pointer">
                  <Image src="/logos/slack.svg" alt="Slack" width={32} height={32} className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Slack</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="group size-16 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center p-3 shadow-[0_0_30px_-5px_rgba(255,255,255,0.15)] hover:bg-white/10 hover:border-purple-400/50 hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)] transition-all duration-300 cursor-pointer">
                  <Image src="/logos/googleform.svg" alt="Google Forms" width={32} height={32} className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Google Forms</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="group size-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 hover:bg-white/10 hover:border-blue-400/50 hover:shadow-[0_0_20px_-5px_rgba(96,165,250,0.3)] transition-all duration-300 cursor-pointer">
                  <Image src="/logos/razorpay.svg" alt="Razorpay" width={32} height={32} className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Razorpay</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Pricing Section ─── */}
        <section id="pricing" className="relative py-12 md:py-20 border-t border-white/5 bg-black/20 md:min-h-screen flex items-center">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col items-center text-center mb-10 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Simple, transparent <span className="text-teal-400">pricing</span>.
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Start for free, upgrade when you need more power and volume.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">

              {/* Free Tier */}
              <div className="p-6 md:p-8 rounded-3xl glass-strong dark:bg-white/5 border border-white/10 flex flex-col items-start">
                <h3 className="text-2xl font-bold text-white mb-2">Hobby</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black text-white">₹0</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">Perfect for exploring and small projects.</p>
                <ul className="space-y-3 mb-6 flex-1 w-full">
                  <li className="flex items-center gap-3 text-sm text-white/80"><ShieldCheckIcon className="size-4 text-emerald-400" /> Up to 3 active workflows</li>
                  <li className="flex items-center gap-3 text-sm text-white/80"><ShieldCheckIcon className="size-4 text-emerald-400" /> 100 executions / month</li>
                  <li className="flex items-center gap-3 text-sm text-white/80"><ShieldCheckIcon className="size-4 text-emerald-400" /> Standard community support</li>
                </ul>
                <Button
                  onClick={() => handleNavigation("/signup")}
                  disabled={isNavigating}
                  variant="outline"
                  className="w-full rounded-full border-white/10 hover:bg-white/10 mt-auto"
                >
                  {isNavigating ? <Loader2Icon className="size-4 animate-spin" /> : "Get Started Forever Free"}
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
                <p className="text-sm text-muted-foreground mb-6">For serious developers and teams scaling up.</p>
                <ul className="space-y-3 mb-6 flex-1 w-full">
                  <li className="flex items-center gap-3 text-sm text-white/80"><ShieldCheckIcon className="size-4 text-emerald-400" /> Unlimited workflows</li>
                  <li className="flex items-center gap-3 text-sm text-white/80"><ShieldCheckIcon className="size-4 text-emerald-400" /> 10,000 executions / month</li>
                  <li className="flex items-center gap-3 text-sm text-white/80"><ShieldCheckIcon className="size-4 text-emerald-400" /> Access to premium AI nodes</li>
                  <li className="flex items-center gap-3 text-sm text-white/80"><ShieldCheckIcon className="size-4 text-emerald-400" /> AI Workflow Generator</li>
                </ul>
                <Button
                  onClick={() => handleNavigation("/signup")}
                  disabled={isNavigating}
                  className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 mt-auto"
                >
                  {isNavigating ? <Loader2Icon className="size-4 animate-spin" /> : "Upgrade to Pro"}
                </Button>
              </div>

            </div>
          </div>
        </section>

        {/* ─── Bottom CTA ─── */}
        <section className="relative py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-[radial-gradient(ellipse,rgba(249,115,22,0.15)_0%,transparent_70%)] blur-2xl pointer-events-none" />

          <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Ready to ship faster?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join developers building scalable automations with CogniFlow.
            </p>
            {isSessionPending ? (
              <Loader2Icon className="animate-spin text-primary size-8 mx-auto" />
            ) : session ? (
              <Button
                onClick={() => handleNavigation("/workflows")}
                disabled={isNavigating}
                size="lg"
                className="rounded-full h-12 px-8 text-base shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)] hover:shadow-[0_0_60px_-10px_rgba(249,115,22,0.6)] hover:scale-105 transition-all duration-300 min-w-[200px]"
              >
                {isNavigating ? <Loader2Icon className="size-4 animate-spin" /> : "Go to Dashboard"}
              </Button>
            ) : (
              <Button
                onClick={() => handleNavigation("/signup")}
                disabled={isNavigating}
                size="lg"
                className="rounded-full h-12 px-8 text-base shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)] hover:shadow-[0_0_60px_-10px_rgba(249,115,22,0.6)] hover:scale-105 transition-all duration-300 min-w-[240px]"
              >
                {isNavigating ? <Loader2Icon className="size-4 animate-spin" /> : "Create your free workspace"}
              </Button>
            )}
          </div>
        </section>
      </main>

      {/* ─── Sleek Footer ─── */}
      <footer className="border-t border-white/10 glass bg-black/40 pt-10 pb-6">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 group">
              <Image src="/logos/logo.svg" alt="CogniFlow" width={24} height={24} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold text-lg tracking-tight text-white">CogniFlow</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground/50">
            &copy; {new Date().getFullYear()} CogniFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
