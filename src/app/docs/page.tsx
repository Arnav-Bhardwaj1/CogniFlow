"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LandingNavbar } from '@/components/landing-navbar'
import { Button } from '@/components/ui/button'
import {
  ArrowLeftIcon,
  BookOpenIcon,
  RocketIcon,
  WorkflowIcon,
  CpuIcon,
  LinkIcon,
  ShieldCheckIcon,
  ChevronRightIcon
} from 'lucide-react'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background relative flex flex-col font-sans selection:bg-primary/30">
      <LandingNavbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">

          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-white transition-colors mb-12 group">
            <ArrowLeftIcon className="mr-2 size-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar Navigation */}
            <aside className="hidden md:block w-64 shrink-0 h-fit sticky top-28">
              <nav className="flex flex-col gap-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50 mb-4 px-4">Introduction</h4>
                <Link href="#overview" className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-colors">Overview</Link>
                <Link href="#getting-started" className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">Getting Started</Link>

                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50 mt-8 mb-4 px-4">Core Concepts</h4>
                <Link href="#workflow-editor" className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">Visual Workflow Editor</Link>
                <Link href="#ai-generator" className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">AI Workflow Generator</Link>
                <Link href="#triggers-actions" className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">Triggers & Actions</Link>
                <Link href="#core-concepts" className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">Core Concepts</Link>
                <Link href="#how-execution-works" className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">How Execution Works</Link>
                <Link href="#architecture" className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">Architecture</Link>
              </nav>
            </aside>

            {/* Content Area */}
            <div className="flex-1 max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                  <BookOpenIcon className="size-6 text-primary" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white italic">Documentation</h1>
              </div>

              <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                Welcome to the CogniFlow technical guide. Learn how to model workflows as typed graphs, ship reliable automations, and iterate quickly with the visual editor and AI-assisted generation.
              </p>

              {/* Overview Section */}
              <section id="overview" className="scroll-mt-28 mb-16">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <ShieldCheckIcon className="size-5 text-emerald-400" />
                  Overview
                </h2>
                <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                  <p>
                    <strong className="text-white">Mental model:</strong> CogniFlow is an AI-native, type-safe workflow automation platform where a workflow is a directed graph of nodes that process an event from trigger to final action.
                  </p>
                  <p>
                    Build workflows visually, generate them from natural language, and run them on a background orchestration layer (Inngest). The platform is designed to keep “what runs” and “what you see on the canvas” aligned, with predictable execution behavior.
                  </p>
                  <p>
                    <strong className="text-white">Use CogniFlow when</strong> you want event-driven automations with clear data flow, debuggable runs, and guardrails like type-safe connections and validation.
                  </p>
                  <p>
                    <strong className="text-white">You might not need CogniFlow when</strong> a single script, a one-off webhook handler, or a simple cron job is sufficient and you don’t need a reusable workflow model or execution visibility.
                  </p>
                </div>
              </section>

              {/* Getting Started Section */}
              <section id="getting-started" className="scroll-mt-28 mb-16">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Image src="/logos/automation.png" alt="Automation" width={20} height={20} className="invert" />
                  Getting Started
                </h2>
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl glass-strong border border-white/10">
                    <h3 className="text-white font-semibold mb-3">1. Create your account</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Sign up for a free Hobby account to start building. Authentication is OAuth-based (GitHub/Google) via Better Auth.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl glass-strong border border-white/10">
                    <h3 className="text-white font-semibold mb-3">2. Create your first workflow</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Head to the dashboard and click &quot;Create Workflow&quot;. Name it, add a short description, and you’ll land in the visual editor with a blank canvas.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl glass-strong border border-white/10">
                    <h3 className="text-white font-semibold mb-3">3. Deploy & Monitor</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Deploy the workflow so triggers can start executions. Monitor run status and logs as they stream back to the UI.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl glass-strong border border-white/10">
                    <h3 className="text-white font-semibold mb-3">First success: Form submission → AI processing → message delivery</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Build a simple pipeline end-to-end:
                      <br />
                      <strong className="text-white">Trigger</strong>: Google Forms submission (or a webhook)
                      <br />
                      <strong className="text-white">Action</strong>: AI node summarizes/labels the submission
                      <br />
                      <strong className="text-white">Action</strong>: Send the result to Discord/Slack or email
                      <br />
                      You&apos;ll know you&apos;re done when a new submission creates a visible execution run with a successful final message.
                    </p>
                  </div>
                </div>
              </section>

              {/* Core Concepts Section */}
              <section id="workflow-editor" className="scroll-mt-28 mb-16">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <WorkflowIcon className="size-5 text-primary" />
                  Visual Workflow Editor
                </h2>
                <div className="prose prose-invert max-w-none text-muted-foreground">
                  <p>
                    The canvas is built with React Flow for a smooth drag-and-drop experience. Workflows read left-to-right as: <strong className="text-white">trigger → execution → actions</strong>.
                  </p>
                  <p>
                    <strong className="text-white">Data flow:</strong> each node receives an input payload (usually derived from the trigger event and upstream outputs) and produces an output that can be mapped into downstream nodes.
                  </p>
                  <ul className="list-disc pl-6 space-y-3 mt-4">
                    <li><strong className="text-white">Nodes:</strong> Discrete units of work (Triggers or Actions).</li>
                    <li><strong className="text-white">Edges:</strong> Logical connections and data flow between nodes.</li>
                    <li><strong className="text-white">Guardrails:</strong> Workflows are executed in a deterministic order (topological sort) and invalid graphs (like cycles) are rejected at execution time.</li>
                    <li><strong className="text-white">Type Safety:</strong> The backend API is type-safe (tRPC + Prisma), and the AI planner output is schema-validated before it’s applied to the canvas.</li>
                  </ul>
                </div>
              </section>

              <section id="ai-generator" className="scroll-mt-28 mb-16">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <CpuIcon className="size-5 text-purple-400" />
                  AI Workflow Generator
                </h2>
                <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    The generator uses an LLM to convert natural language into a structured workflow graph: nodes (triggers/actions) plus edges (the connections between them). The result is a draft you can inspect and refine on the canvas.
                  </p>
                  <div className="text-sm text-muted-foreground leading-relaxed mb-6">
                    <strong className="text-white">Prompt best practices:</strong>
                    <br />
                    Include the trigger, the key fields you care about, the transformations you want, and the final destination.
                    <br />
                    Mention constraints like formatting, routing rules, and failure handling (e.g., fallback channel on error).
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed mb-6">
                    <strong className="text-white">Limitations:</strong> generated workflows are not guaranteed to be correct. Review node configuration, credentials, and data mappings before deploying or running.
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
                    <code className="px-2 py-1 rounded bg-purple-500/20">&quot;When a form is submitted, summarize text with Gemini and send to Discord&quot;</code>
                  </div>
                </div>
              </section>

              <section id="triggers-actions" className="scroll-mt-28 mb-16">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <LinkIcon className="size-5 text-blue-400" />
                  Triggers & Actions
                </h2>
                <div className="prose prose-invert max-w-none text-muted-foreground mb-6">
                  <p>
                    <strong className="text-white">Trigger lifecycle:</strong> a trigger listens for an event, emits a payload when it fires, and starts an execution run. Executions are orchestrated in the background and their status is reported back to the UI.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                    <h4 className="text-white font-medium mb-1">Native Triggers</h4>
                    <p className="text-xs text-muted-foreground">Manual, Google Forms, Razorpay, Stripe — each produces an event payload that starts a run.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                    <h4 className="text-white font-medium mb-1">AI Nodes</h4>
                    <p className="text-xs text-muted-foreground">OpenAI, Google Gemini, Anthropic Claude — transform text, classify, extract, summarize, or route.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                    <h4 className="text-white font-medium mb-1">Messaging</h4>
                    <p className="text-xs text-muted-foreground">Slack, Discord — deliver outputs to humans or downstream systems.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                    <h4 className="text-white font-medium mb-1">Utilities</h4>
                    <p className="text-xs text-muted-foreground">HTTP requests — connect to external APIs and shape payloads between steps.</p>
                  </div>
                </div>
              </section>

              <section id="core-concepts" className="scroll-mt-28 mb-16">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Image src="/logos/automation.png" alt="Automation" width={20} height={20} className="invert" />
                  Core Concepts
                </h2>
                <div className="prose prose-invert max-w-none text-muted-foreground">
                  <ul className="list-disc pl-6 space-y-3">
                    <li><strong className="text-white">Workflow:</strong> A versioned automation graph that starts with a trigger and ends with one or more actions.</li>
                    <li><strong className="text-white">Node:</strong> A unit of work on the canvas. Nodes have inputs, configuration, and outputs.</li>
                    <li><strong className="text-white">Trigger:</strong> A special node that listens for an event (manual, webhook, or provider event) and starts an execution run.</li>
                    <li><strong className="text-white">Action:</strong> A node that performs work (call an API, run AI processing, transform data, send a message).</li>
                    <li><strong className="text-white">Execution run:</strong> A single instance of a workflow processing one event. Runs have status, timestamps, and step-level logs.</li>
                    <li><strong className="text-white">Draft vs deployed:</strong> The deployed workflow definition is what executes when a trigger fires. Editing a draft changes what will run next time you deploy.</li>
                  </ul>
                </div>
              </section>

              <section id="how-execution-works" className="scroll-mt-28 mb-16">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <ChevronRightIcon className="size-5 text-white/70" />
                  How Execution Works
                </h2>
                <div className="prose prose-invert max-w-none text-muted-foreground">
                  <ol className="list-decimal pl-6 space-y-3">
                    <li><strong className="text-white">Trigger fires</strong> and produces an event payload.</li>
                    <li><strong className="text-white">Event is sent</strong> to the orchestration layer for a new execution run.</li>
                    <li><strong className="text-white">Nodes execute</strong> in graph order, passing typed outputs along connected edges.</li>
                    <li><strong className="text-white">Status streams back</strong> so the UI can show progress, logs, and final outcome.</li>
                  </ol>
                </div>
              </section>

              <section id="architecture" className="scroll-mt-28 mb-16">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <ShieldCheckIcon className="size-5 text-emerald-400" />
                  Architecture
                </h2>
                <div className="prose prose-invert max-w-none text-muted-foreground">
                  <p>
                    Executions run asynchronously to keep the UI responsive and reliable under load. A high-level view of the core layers powering CogniFlow.
                  </p>
                  <br />
                  <ul className="list-disc pl-6 space-y-3">
                    <li><strong className="text-white">Frontend:</strong> Next.js + React Flow</li>
                    <li><strong className="text-white">API:</strong> tRPC</li>
                    <li><strong className="text-white">Execution:</strong> Inngest</li>
                    <li><strong className="text-white">Database:</strong> Prisma + Postgres</li>
                    <li><strong className="text-white">AI:</strong> Vercel AI SDK</li>
                    <li><strong className="text-white">Billing:</strong> Polar</li>
                    <li><strong className="text-white">Monitoring:</strong> Sentry</li>
                  </ul>
                </div>
              </section>

              {/* Help & Support */}
              <div className="mt-20 pt-12 border-t border-white/10 text-center">
                <h3 className="text-xl font-bold text-white mb-4 italic">Need more help?</h3>
                <p className="text-muted-foreground mb-8">Join our community or upgrade to Pro for premium support.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="https://discord.gg/cogniflow" target="_blank">
                    <Button variant="outline" className="rounded-full px-8 w-full sm:w-auto">Community Discord</Button>
                  </Link>
                  <Link href="/#pricing">
                    <Button className="rounded-full px-8 bg-primary w-full sm:w-auto">Upgrade to Pro</Button>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* ─── Sleek Footer ─── */}
      <footer className="border-t border-white/10 glass bg-black/40 pt-10 pb-6 mt-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.location.href = "/"}>
              <Image src="/logos/logo.svg" alt="CogniFlow" width={24} height={24} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold text-lg tracking-tight text-white">CogniFlow</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <Link href="/docs" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-white">Documentation</Link>
              <Link href="/privacy" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-muted-foreground hover:text-white">Privacy Policy</Link>
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
