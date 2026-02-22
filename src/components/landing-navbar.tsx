"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export function LandingNavbar() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const [isNavigating, startTransition] = React.useTransition();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-[#07070f] dark:bg-[#07070f]">
      {/* ... (lamp effect omitted for brevity in search) ... */}
      <div className="absolute top-full left-0 right-0 h-[15rem] overflow-hidden pointer-events-none -z-10 flex justify-center">
        {/* Core glow line */}
        <div className="absolute top-0 w-[40rem] h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute top-0 w-[24rem] h-[2px] bg-primary/80 blur-[2px]" />

        {/* True Semi-Ellipse Soft Light */}
        <div
          className="absolute top-0 w-[60rem] h-[12rem] opacity-30 blur-[20px]"
          style={{ backgroundImage: 'radial-gradient(ellipse 50% 100% at 50% 0%, var(--color-primary) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-0 w-[30rem] h-[6rem] opacity-40 blur-[10px]"
          style={{ backgroundImage: 'radial-gradient(ellipse 50% 100% at 50% 0%, var(--color-primary) 0%, transparent 80%)' }}
        />
      </div>
      <Link href="/" className="flex items-center gap-2 group">
        <Image
          src="/logos/logo.svg"
          alt="CogniFlow"
          width={36}
          height={36}
          className="group-hover:scale-110 transition-transform duration-300"
        />
        <span className="font-semibold text-xl tracking-tight text-foreground dark:text-white">
          CogniFlow
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Features
        </Link>
        <Link href="#integrations" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Integrations
        </Link>
        <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Pricing
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {isSessionPending ? (
          <Loader2Icon className="animate-spin text-muted-foreground size-5" />
        ) : session ? (
          <Button
            onClick={() => handleNavigation("/workflows")}
            disabled={isNavigating}
            className="rounded-full shadow-md hover:shadow-lg transition-shadow bg-primary text-primary-foreground min-w-[100px]"
          >
            {isNavigating ? <Loader2Icon className="size-4 animate-spin" /> : "Dashboard"}
          </Button>
        ) : (
          <>
            <Button
              variant="ghost"
              onClick={() => handleNavigation("/login")}
              disabled={isNavigating}
              className="hidden sm:flex text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-transparent p-0 h-auto"
            >
              {isNavigating ? <Loader2Icon className="size-4 animate-spin mr-2" /> : null}
              Log in
            </Button>
            <Button
              onClick={() => handleNavigation("/signup")}
              disabled={isNavigating}
              className="rounded-full shadow-md hover:shadow-lg transition-shadow bg-primary text-primary-foreground min-w-[140px]"
            >
              {isNavigating ? <Loader2Icon className="size-4 animate-spin" /> : "Get Started Free"}
            </Button>
          </>
        )}
      </div>
    </nav>
  )
}
