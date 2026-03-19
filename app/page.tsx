import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { STRIPE_PAYMENT_LINKS } from "@/lib/plans";
import { UtmTracker } from "./components/utm-tracker";
import { PublicNav } from "./components/public-nav";

async function getStats(): Promise<{
  users: number;
  quotesSent: number;
  quotesApproved: number;
} | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
      ? process.env.NEXT_PUBLIC_APP_URL
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/stats`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export const metadata: Metadata = {
  title: "TradeQuote — Professional Quotes & Approvals for Tradespeople",
  description:
    "Send professional quotes and get client approvals in one tap. Built for plumbers, electricians, HVAC techs, and contractors. Free to start, Pro at $19/mo.",
  openGraph: {
    title: "TradeQuote — Send Quotes, Get Approvals, Get to Work",
    description:
      "Professional quoting for plumbers, electricians, and contractors. Stop texting estimates — send real quotes your clients approve in one tap.",
    type: "website",
    siteName: "TradeQuote",
  },
  twitter: {
    card: "summary_large_image",
    title: "TradeQuote — Send Quotes, Get Approvals, Get to Work",
    description:
      "Professional quoting for tradespeople. Free to start, Pro at $19/mo.",
  },
};

const steps = [
  {
    number: 1,
    title: "Create your quote",
    description: "Add line items, labor, and parts in minutes.",
    icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  },
  {
    number: 2,
    title: "Send the link",
    description: "Text or email a professional quote page to your client.",
    icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
  },
  {
    number: 3,
    title: "Client approves",
    description: "One tap to approve. You get notified instantly.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const competitors = [
  { name: "ServiceTitan", price: "$300+/mo" },
  { name: "Housecall Pro", price: "$79/mo" },
  { name: "Tradify", price: "$47/mo" },
  { name: "Us", price: "$19/mo", highlight: true },
];

const quoteLineItems = [
  { description: "Replace kitchen faucet", amount: 350 },
  { description: "Install disposal", amount: 275 },
  { description: "Parts", amount: 85 },
];

const subtotal = quoteLineItems.reduce((sum, item) => sum + item.amount, 0);
const tax = Math.round(subtotal * 0.08 * 100) / 100;
const total = subtotal + tax;

export default async function LandingPage() {
  const stats = await getStats();
  const hasActivity =
    stats && (stats.users > 0 || stats.quotesSent > 0 || stats.quotesApproved > 0);

  return (
    <main className="min-h-screen font-sans">
      <PublicNav />
      <Suspense fallback={null}>
        <UtmTracker />
      </Suspense>
      {/* ──────────────── Hero ──────────────── */}
      <section className="relative bg-slate-900 text-slate-50 px-6 py-24 md:py-32 text-center overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-rule='evenodd'%3E%3Cpath d='M0 0h1v1H0zM20 0h1v1h-1zM0 20h1v1H0zM20 20h1v1h-1z'/%3E%3C/g%3E%3C/svg%3E\")",
        }} />
        <div className="relative max-w-3xl mx-auto">
          {/* Trade icon cluster */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
            </svg>
            <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Send quotes. Get approvals. Get to work.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Professional quoting for plumbers, electricians, and contractors.
            Stop texting estimates. Send a real quote your clients can approve in one tap.
          </p>
          <Link
            href="/register"
            className="mt-10 inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold text-lg px-8 py-4 rounded-lg transition-colors"
          >
            Create your first quote &mdash; free
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <span>Simple &amp; secure</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <span>Your data is encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>No long-term contracts</span>
          </div>
        </div>
      </section>

      {/* ──────────────── Stats Counter ──────────────── */}
      <section className="bg-slate-800 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {hasActivity ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="rounded-xl bg-slate-700/50 border border-slate-600 px-6 py-6">
                <p className="text-3xl font-bold text-white">{stats.users}</p>
                <p className="mt-1 text-sm text-slate-400">Tradespeople</p>
              </div>
              <div className="rounded-xl bg-slate-700/50 border border-slate-600 px-6 py-6">
                <p className="text-3xl font-bold text-white">{stats.quotesSent}</p>
                <p className="mt-1 text-sm text-slate-400">Quotes Sent</p>
              </div>
              <div className="rounded-xl bg-slate-700/50 border border-slate-600 px-6 py-6">
                <p className="text-3xl font-bold text-white">{stats.quotesApproved}</p>
                <p className="mt-1 text-sm text-slate-400">Approvals</p>
              </div>
            </div>
          ) : (
            <p className="text-center text-slate-400 text-sm">
              Join the first tradespeople using TradeQuote
            </p>
          )}
        </div>
      </section>

      {/* Section divider */}
      <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

      {/* ──────────────── How It Works ──────────────── */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:border-amber-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-amber-100 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                  </svg>
                </div>
                <span className="mt-3 text-xs font-bold text-amber-500 uppercase tracking-wider">Step {step.number}</span>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-500 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── Problem / Solution ──────────────── */}
      <section className="bg-slate-900 text-slate-50 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center">
            Your work is worth more than a text message estimate.
          </h2>

          <div className="mt-14 grid gap-12 md:grid-cols-2">
            {/* Pain */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-4">The problem</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">&#x2717;</span>
                  Texting rough estimates that look unprofessional
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">&#x2717;</span>
                  Losing track of who approved what
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">&#x2717;</span>
                  Chasing payments through Venmo and Zelle
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">&#x2717;</span>
                  No paper trail when disputes happen
                </li>
              </ul>
            </div>

            {/* Fix */}
            <div>
              <h3 className="text-xl font-semibold text-emerald-400 mb-4">The fix</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-0.5">&#x2713;</span>
                  Professional quote page with your business name
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-0.5">&#x2713;</span>
                  One-tap client approval with timestamp
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-0.5">&#x2713;</span>
                  Professional quotes clients can approve online
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-0.5">&#x2713;</span>
                  Everything recorded — no more he-said, she-said
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── Quote Preview Mockup ──────────────── */}
      <section className="bg-slate-100 px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            What your client sees
          </h2>
          <p className="text-slate-600 mb-10">
            A clean, professional quote — not a screenshot of your Notes app.
          </p>

          {/* Mockup card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 text-left overflow-hidden">
            {/* Header */}
            <div className="bg-slate-900 text-white px-6 py-5">
              <h3 className="text-xl font-bold">Mike&apos;s Plumbing</h3>
              <p className="text-sm text-slate-400 mt-1">Quote #1042</p>
            </div>

            <div className="px-6 py-6">
              <p className="text-sm text-slate-500 mb-1">Prepared for</p>
              <p className="font-semibold text-slate-900 mb-6">Sarah Johnson</p>

              {/* Line items */}
              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="text-left pb-2 font-medium">Description</th>
                    <th className="text-right pb-2 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {quoteLineItems.map((item) => (
                    <tr key={item.description} className="border-b border-slate-100">
                      <td className="py-3 text-slate-800">{item.description}</td>
                      <td className="py-3 text-right text-slate-800">
                        ${item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="space-y-1 text-sm text-right">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="text-slate-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tax (8%)</span>
                  <span className="text-slate-800">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-slate-200 mt-2">
                  <span className="text-slate-900">Total</span>
                  <span className="text-slate-900">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Approve button (decorative) */}
              <div className="mt-8 text-center">
                <span className="inline-block bg-emerald-500 text-white font-semibold px-8 py-3 rounded-lg text-base cursor-default">
                  Approve Quote
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── Competitor Pricing ──────────────── */}
      <section className="bg-slate-900 text-slate-50 px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">
            They build for big companies. We build for you.
          </h2>

          <div className="overflow-hidden rounded-xl border border-slate-700">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-800 text-slate-400">
                  <th className="px-6 py-3 font-medium">Platform</th>
                  <th className="px-6 py-3 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((c) => (
                  <tr
                    key={c.name}
                    className={
                      c.highlight
                        ? "bg-amber-500/10 border-t border-slate-700"
                        : "border-t border-slate-700"
                    }
                  >
                    <td
                      className={`px-6 py-4 ${
                        c.highlight ? "font-bold text-amber-400" : "text-slate-300"
                      }`}
                    >
                      {c.name}
                    </td>
                    <td
                      className={`px-6 py-4 text-right ${
                        c.highlight ? "font-bold text-amber-400" : "text-slate-300"
                      }`}
                    >
                      {c.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ──────────────── Pricing ──────────────── */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900">Simple pricing</h2>
          <p className="mt-3 text-slate-600">No setup fees. No contracts. Cancel anytime.</p>

          <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            {/* Free tier */}
            <div className="rounded-2xl border border-slate-200 p-8 text-left">
              <h3 className="text-xl font-bold text-slate-900">Free</h3>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                $0<span className="text-base font-normal text-slate-500">/mo</span>
              </p>
              <ul className="mt-6 space-y-3 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">&#x2713;</span>
                  3 active quotes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">&#x2713;</span>
                  Send via link
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">&#x2713;</span>
                  Client approval
                </li>
              </ul>
              <Link
                href="/register"
                className="mt-8 block text-center border-2 border-slate-900 text-slate-900 font-semibold py-3 rounded-lg hover:bg-slate-900 hover:text-white transition-colors"
              >
                Get started free
              </Link>
            </div>

            {/* Pro tier */}
            <div className="rounded-2xl border-2 border-amber-500 p-8 text-left relative">
              <span className="absolute -top-3 left-6 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Most popular
              </span>
              <h3 className="text-xl font-bold text-slate-900">Pro</h3>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                $19<span className="text-base font-normal text-slate-500">/mo</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">
                or $149/yr <span className="text-emerald-600 font-medium">(save 35%)</span>
              </p>
              <ul className="mt-6 space-y-3 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">&#x2713;</span>
                  Unlimited quotes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">&#x2713;</span>
                  Approval tracking + notifications
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">&#x2713;</span>
                  Priority support
                </li>
              </ul>
              <a
                href={STRIPE_PAYMENT_LINKS.pro_monthly}
                className="mt-8 block text-center bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-3 rounded-lg transition-colors"
              >
                Start Pro
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── Our Story ──────────────── */}
      <section className="bg-white px-6 py-20 border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Our Story</h2>
          </div>
          <p className="text-slate-600 leading-7">
            We noticed solo tradespeople were still texting estimates and losing track of approvals. Enterprise tools cost $80–$300/month for features a one-person shop will never use.
          </p>
          <p className="mt-4 text-slate-600 leading-7">
            So we built something simpler: professional quotes, one-tap approvals, and a dashboard to track it all — for $19/mo. No bloat, no long contracts, just the tools you actually need.
          </p>
          <p className="mt-4 text-sm text-slate-400">
            Designed for people who work with their hands.
          </p>
        </div>
      </section>

      {/* ──────────────── FAQ ──────────────── */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center">Frequently asked questions</h2>
          <div className="mt-12 space-y-6">
            {[
              { q: "Is the free tier really free?", a: "Yes. Create up to 3 active quotes, send them to clients, and get approvals — no credit card required. Upgrade to Pro when you need unlimited quotes." },
              { q: "How do clients approve?", a: "You send them a link. They see a professional quote page with your business name, line items, and total. One tap to approve. You get notified instantly." },
              { q: "Can I use this on my phone?", a: "Yes. The entire tool is designed mobile-first. Create quotes on your phone between jobs, and your clients view and approve quotes on their phones too." },
              { q: "What happens when a client approves a quote?", a: "The quote status updates to 'approved' in your dashboard and you get notified. You handle payment however you prefer — cash, check, Venmo, Zelle, or card on-site." },
              { q: "How do I collect payment?", a: "However you already do! This tool handles quoting and approvals. Payment happens between you and your client however works best — cash, check, Venmo, or card. We don't take a cut of anything." },
            ].map((faq, i) => (
              <details key={i} className="group rounded-lg border border-slate-200 bg-white">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-left font-medium text-slate-900">
                  {faq.q}
                  <svg className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="px-6 pb-4 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                { "@type": "Question", name: "Is the free tier really free?", acceptedAnswer: { "@type": "Answer", text: "Yes. Create up to 3 active quotes, send them to clients, and get approvals — no credit card required." } },
                { "@type": "Question", name: "How do clients approve?", acceptedAnswer: { "@type": "Answer", text: "You send them a link. They see a professional quote page and approve with one tap." } },
                { "@type": "Question", name: "Can I use this on my phone?", acceptedAnswer: { "@type": "Answer", text: "Yes. The entire tool is designed mobile-first for tradespeople on the go." } },
                { "@type": "Question", name: "What happens when a client approves a quote?", acceptedAnswer: { "@type": "Answer", text: "The quote status updates in your dashboard and you get notified. Payment happens however you prefer." } },
                { "@type": "Question", name: "How do I collect payment?", acceptedAnswer: { "@type": "Answer", text: "However you already do — cash, check, Venmo, Zelle, or card on-site. We handle quoting and approvals." } },
              ],
            }),
          }}
        />
      </section>

      {/* ──────────────── Footer ──────────────── */}
      <footer className="bg-slate-900 text-slate-400 px-6 py-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; 2026 TradeQuote</p>
          <nav className="flex gap-6">
            <Link href="/login" className="hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/register" className="hover:text-white transition-colors">
              Register
            </Link>
            <Link href="/feedback" className="hover:text-white transition-colors">
              Feedback
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
