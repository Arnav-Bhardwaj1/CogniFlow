import "./globals.css";
import { TRPCReactProvider } from "../trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Exo_2, Roboto_Slab, Fira_Code } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Provider } from 'jotai';
import { ThemeProvider } from "@/components/theme-provider";

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${exo2.variable} ${robotoSlab.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased relative bg-background min-h-screen">
        {/* Ambient Premium Dashboard Background (Dark Mode Only) */}
        <div className="fixed inset-0 -z-10 hidden dark:block bg-[linear-gradient(160deg,#07070f_0%,#0d0d1a_50%,#0f0f22_100%)] pointer-events-none" />

        <div className="ambient-orange dark:block hidden" />
        <div className="ambient-teal dark:block hidden" />
        <ThemeProvider>
          <TRPCReactProvider>
            <NuqsAdapter>
              <Provider>
                {children}
                <Toaster />
                <SpeedInsights />
              </Provider>
            </NuqsAdapter>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
