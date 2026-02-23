"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LandingNavbar } from '@/components/landing-navbar'
import { ArrowLeftIcon, FileTextIcon } from 'lucide-react'

export default function TermsPage() {
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
                <FileTextIcon className="size-6 text-primary" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white italic">Terms of Service</h1>
            </div>

            <p className="text-muted-foreground mb-12">
              Last updated: February 23, 2026
            </p>

            <div className="prose prose-invert max-w-none text-muted-foreground space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using CogniFlow, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                <p>
                  CogniFlow provides a visual workflow automation platform. We reserve the right to modify or discontinue features at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. User Conduct</h2>
                <p>
                  You are responsible for all activity under your account. You agree not to use the platform for any illegal activities or to building malicious automations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
                <p>
                  CogniFlow and its original content are protected by copyright and trademark laws. You retain ownership of the workflows you build.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
                <p>
                  CogniFlow is provided &quot;as is&quot;. We are not liable for any damages resulting from the use or inability to use our platform or the workflows you create.
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
