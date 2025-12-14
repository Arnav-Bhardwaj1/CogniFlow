import type { Metadata } from "next";
import "./globals.css";
import { TRPCReactProvider } from "../trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { Exo_2, Roboto_Slab, Fira_Code } from "next/font/google";

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
    >
      <body className="antialiased">
        <TRPCReactProvider>
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
