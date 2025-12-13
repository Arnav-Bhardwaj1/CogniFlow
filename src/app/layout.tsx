import type { Metadata } from "next";
import "./globals.css";
import { TRPCReactProvider } from "../trpc/client";

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
      </TRPCReactProvider>
      </body>
    </html>
  );
}
