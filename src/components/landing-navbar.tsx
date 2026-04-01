"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { Loader2Icon, Menu, Shapes, Blocks, CreditCard, BookOpen, ChevronRight, Cpu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet';

export function LandingNavbar() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const [isNavigating, startTransition] = React.useTransition();
  const [loadingButton, setLoadingButton] = React.useState<string | null>(null);
  const router = useRouter();

  const handleNavigation = (href: string, buttonId: string) => {
    setLoadingButton(buttonId);
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
        <Link href="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Features
        </Link>
        <Link href="/#integrations" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Integrations
        </Link>
        <Link href="/#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Pricing
        </Link>
        <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Docs
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#07070f]/95 backdrop-blur-xl border-white/10 text-foreground w-full max-w-[320px] p-6 flex flex-col h-full overflow-y-auto">
            <SheetTitle className="sr-only">Mobile Menu</SheetTitle>

            <div className="flex items-center gap-3 mb-8 pl-1">
              <Image src="/logos/logo.svg" alt="CogniFlow" width={32} height={32} />
              <span className="font-semibold text-lg tracking-tight text-white">CogniFlow</span>
            </div>

            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/#features" className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-primary/10 hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-colors text-white/70">
                      <Cpu className="size-5" />
                    </div>
                    <span className="text-base font-semibold text-white/90 group-hover:text-white">Features</span>
                  </div>
                  <ChevronRight className="size-4 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/#integrations" className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-primary/10 hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-colors text-white/70">
                      <Blocks className="size-5" />
                    </div>
                    <span className="text-base font-semibold text-white/90 group-hover:text-white">Integrations</span>
                  </div>
                  <ChevronRight className="size-4 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/#pricing" className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-primary/10 hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-colors text-white/70">
                      <CreditCard className="size-5" />
                    </div>
                    <span className="text-base font-semibold text-white/90 group-hover:text-white">Pricing</span>
                  </div>
                  <ChevronRight className="size-4 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/docs" className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-primary/10 hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-colors text-white/70">
                      <BookOpen className="size-5" />
                    </div>
                    <span className="text-base font-semibold text-white/90 group-hover:text-white">Docs</span>
                  </div>
                  <ChevronRight className="size-4 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </SheetClose>
            </div>

            <div className="mt-auto pt-8">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-2xl rounded-full" />
                <h4 className="text-lg font-bold text-white mb-2 relative z-10">{session ? "Explore Plans" : "Start Building"}</h4>
                <p className="text-sm text-white/70 mb-5 relative z-10">{session ? "Check out our pricing plans." : "Create unlimited workflows with CogniFlow today."}</p>
                <SheetClose asChild>
                  <Button asChild className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 relative z-10 h-12 text-base font-semibold">
                    <a href={session ? "/#pricing" : "/signup"}>
                      {session ? "View Plans" : "Get Started Free"}
                    </a>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        {isSessionPending ? (
          <Button
            disabled
            className="rounded-full shadow-md bg-primary text-primary-foreground min-w-[140px]"
          >
            <Loader2Icon className="size-4 animate-spin mr-2" />
            Loading...
          </Button>
        ) : session ? (
          <Button
            onClick={() => handleNavigation("/workflows", "nav-dashboard")}
            disabled={isNavigating}
            className="rounded-full shadow-md hover:shadow-lg transition-shadow bg-primary text-primary-foreground min-w-[100px]"
          >
            {loadingButton === "nav-dashboard" && <Loader2Icon className="size-4 animate-spin mr-2" />}
            Dashboard
          </Button>
        ) : (
          <>
            <Button
              variant="ghost"
              onClick={() => handleNavigation("/login", "nav-login")}
              disabled={isNavigating}
              className="hidden sm:flex text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-transparent p-0 h-auto"
            >
              {loadingButton === "nav-login" && <Loader2Icon className="size-4 animate-spin mr-2" />}
              Log in
            </Button>
            <Button
              onClick={() => handleNavigation("/signup", "nav-signup")}
              disabled={isNavigating}
              className="rounded-full shadow-md hover:shadow-lg transition-shadow bg-primary text-primary-foreground min-w-[120px] sm:min-w-[140px]"
            >
              {loadingButton === "nav-signup" && <Loader2Icon className="size-4 animate-spin mr-2" />}
              Get Started Free
            </Button>
          </>
        )}
      </div>
    </nav>
  )
}
