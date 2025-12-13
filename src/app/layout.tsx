import type { Metadata } from "next";
import "./globals.css";
import { TRPCReactProvider } from "../trpc/client";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
      <TRPCReactProvider>
        {children}
        <Toaster />
      </TRPCReactProvider>
      </body>
    </html>
  );
}
