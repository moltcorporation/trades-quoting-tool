import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "../components/public-nav";
import { CrossProductFooter } from "../components/cross-product-footer";

const baseUrl = "https://trades-quoting-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "About TradeQuote — Professional Quoting for Tradespeople",
  description:
    "TradeQuote helps plumbers, electricians, HVAC techs, and contractors send professional quotes and get client approvals in one tap. Free to start, Pro at $19/mo.",
  alternates: { canonical: `${baseUrl}/about` },
  openGraph: {
    title: "About TradeQuote — Professional Quoting for Tradespeople",
    description:
      "TradeQuote helps plumbers, electricians, HVAC techs, and contractors send professional quotes and get client approvals in one tap.",
    url: `${baseUrl}/about`,
    type: "website",
    siteName: "TradeQuote",
  },
  twitter: {
    card: "summary_large_image",
    title: "About TradeQuote — Professional Quoting for Tradespeople",
    description:
      "Send professional quotes and get client approvals in one tap. Built for the trades.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <PublicNav />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-amber-400 hover:text-amber-300"
        >
          &larr; Back to TradeQuote
        </Link>

        <h1 className="text-3xl font-bold tracking-tight">
          About TradeQuote
        </h1>

        <div className="mt-10 space-y-10 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white">
              Why TradeQuote exists
            </h2>
            <p className="mt-3">
              You finish a job walkthrough and the client asks &quot;so how
              much?&quot; You pull out your phone, open the notes app, type some
              numbers, and text it over. Maybe you email a PDF from your truck.
              Maybe you scribble it on a napkin. The client says &quot;let me
              think about it&quot; — and you never hear back.
            </p>
            <p className="mt-3">
              TradeQuote fixes that. Create a clean, professional quote in
              minutes. Send your client a link. They review it on their phone
              and approve with one tap. You get notified instantly and get to
              work.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Who it&apos;s for
            </h2>
            <p className="mt-3">
              TradeQuote is built for independent tradespeople and small
              contracting businesses:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <span className="text-white font-medium">Plumbers</span> —
                itemize parts, labor, and fixtures for kitchen and bath jobs
              </li>
              <li>
                <span className="text-white font-medium">Electricians</span> —
                quote panel upgrades, rewiring, and fixture installs
              </li>
              <li>
                <span className="text-white font-medium">HVAC techs</span> —
                break down equipment, labor, and maintenance plans
              </li>
              <li>
                <span className="text-white font-medium">General contractors</span> —
                send multi-trade quotes for remodels and renovations
              </li>
              <li>
                <span className="text-white font-medium">Any tradesperson</span> —
                painters, roofers, landscapers, handypeople
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              What you get
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Professional quote pages with your business name, line items,
                and totals
              </li>
              <li>
                One-tap client approval — no printing, no scanning, no chasing
              </li>
              <li>
                Instant notifications when a client approves or comments
              </li>
              <li>
                Quote history so you can track what you sent and when
              </li>
              <li>
                A free tier to get started — upgrade to Pro at $19/mo when
                you need more
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              How it compares
            </h2>
            <p className="mt-3">
              ServiceTitan costs $300+/mo. Housecall Pro starts at $79/mo.
              Tradify charges $47/mo. These are great platforms — but if all
              you need is a fast way to send quotes and get approvals, they are
              overkill. TradeQuote does the quoting part at $19/mo with zero
              setup, no contracts, and cancel anytime.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Your data, your business
            </h2>
            <p className="mt-3">
              Your client information and quote data are stored securely. We
              never sell personal data. Connections are encrypted, passwords are
              hashed, and you can request deletion at any time. Read our{" "}
              <Link
                href="/privacy"
                className="text-amber-400 hover:text-amber-300 underline"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/terms"
                className="text-amber-400 hover:text-amber-300 underline"
              >
                Terms of Service
              </Link>{" "}
              for full details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Built by Moltcorp
            </h2>
            <p className="mt-3">
              TradeQuote is a product of{" "}
              <a
                href="https://moltcorporation.com"
                className="text-amber-400 hover:text-amber-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Moltcorp
              </a>
              , a product studio building practical tools for underserved
              markets. Tradespeople deserve better than texting estimates — and
              their clients deserve a better experience too.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Questions?
            </h2>
            <p className="mt-3">
              We&apos;d love to hear from you. Use the{" "}
              <Link
                href="/feedback"
                className="text-amber-400 hover:text-amber-300 underline"
              >
                feedback form
              </Link>{" "}
              to share ideas, report issues, or just say hello.
            </p>
          </section>
        </div>

        <div className="mt-14 rounded-xl bg-slate-900 border border-slate-700 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Ready to send your first quote?
          </h2>
          <p className="mt-2 text-slate-400">
            Free to start. No credit card required. No contracts.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-6 py-3 text-sm transition-colors"
            >
              Get started free
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-slate-600 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 text-sm transition-colors"
            >
              View pricing
            </Link>
          </div>
        </div>
      </div>

      <CrossProductFooter />
    </div>
  );
}
