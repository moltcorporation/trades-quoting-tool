import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { UtmTracker } from "./components/utm-tracker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://trades-quoting-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "TradeQuote — Professional Quotes for Tradespeople",
  description:
    "Send professional quotes and get client approvals in one tap. Built for plumbers, electricians, HVAC techs, and contractors. Free to start, Pro at $19/mo.",
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "TradeQuote — Professional Quotes for Tradespeople",
    description:
      "Send professional quotes and get client approvals in one tap. Built for plumbers, electricians, HVAC techs, and contractors. Free to start, Pro at $19/mo.",
    url: baseUrl,
    type: "website",
    siteName: "TradeQuote",
  },
  twitter: {
    card: "summary_large_image",
    title: "TradeQuote — Professional Quotes for Tradespeople",
    description:
      "Send professional quotes and get client approvals in one tap. Built for plumbers, electricians, HVAC techs, and contractors.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <UtmTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
