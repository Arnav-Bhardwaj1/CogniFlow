"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LandingNavbar } from '@/components/landing-navbar'
import { ArrowLeftIcon, ShieldCheckIcon } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background relative flex flex-col font-sans selection:bg-primary/30">
      <LandingNavbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">

          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-white transition-colors mb-12 group">
            <ArrowLeftIcon className="mr-2 size-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                <ShieldCheckIcon className="size-6 text-primary" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white italic">Privacy Policy</h1>
            </div> 

            <div className="prose prose-invert max-w-none text-muted-foreground space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                <p>
                  At CogniFlow, we take your privacy seriously. This policy describes how we collect, use, and handle your information when you use our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Account Information:</strong> We collect your name and email via GitHub or Google when you sign up.</li>
                  <li><strong>Workflow Data:</strong> We store the configurations, nodes, and logic you create on our platform.</li>
                  <li><strong>Usage Data:</strong> We collect metadata about workflow executions and API interactions for diagnostic purposes.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Data</h2>
                <p>
                  Your data is used solely to provide and improve the CogniFlow service. This includes processing payments via Polar, orchestrating workflows via Inngest, and providing AI-assisted generation features.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                <p>
                  We implement industry-standard security measures to protect your information. Your credentials and API keys are encrypted at rest.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
                <p>
                  You have the right to access, correct, or delete your data at any time via your user dashboard. For any specific requests, please contact our support.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 glass bg-black/40 pt-10 pb-6 mt-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.location.href = "/"}>
              <Image src="/logos/logo.svg" alt="CogniFlow" width={24} height={24} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold text-lg tracking-tight text-white">CogniFlow</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <Link href="/docs" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-muted-foreground hover:text-white">Documentation</Link>
              <Link href="/privacy" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-white">Privacy Policy</Link>
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
