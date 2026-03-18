import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Get Paid Faster as a Contractor or Handyman | QuoteTrade",
  description:
    "5 proven strategies to collect payment faster as a tradesperson. Stop chasing invoices with professional quoting, deposits, and approve-then-pay workflows.",
  keywords: [
    "how to collect payment as contractor",
    "invoice for handyman",
    "get paid faster contractor",
    "tradesperson payment tips",
    "contractor invoice template",
  ],
};

const faqItems = [
  {
    question: "How do I ask a client for payment without being awkward?",
    answer:
      "The best approach is to remove the personal element entirely. When you use a digital quoting tool, the payment request is built into the quote itself. The client clicks 'approve' and pays through the same link — no awkward conversations needed. If you must follow up manually, frame it as a process: 'Just following our standard billing process — here's the payment link.'",
  },
  {
    question: "Should contractors require a deposit before starting work?",
    answer:
      "Yes, especially for jobs over $500. A 25–50% deposit protects you from no-shows and covers your materials cost. It also creates commitment from the client. For smaller jobs, you can skip the deposit but should still collect payment on completion — not 'when they get around to it.'",
  },
  {
    question: "What payment methods should a handyman or contractor accept?",
    answer:
      "Accept as many as possible: credit/debit cards, bank transfers (ACH), and digital wallets. The easier you make it to pay, the faster you'll get paid. Avoid cash-only or check-only — these create friction and delays. A tool like QuoteTrade lets clients pay by card directly through the quote link.",
  },
  {
    question:
      "How long should I wait before following up on an unpaid invoice?",
    answer:
      "Don't wait. Follow up the same day the work is completed — or better yet, use a system where payment is collected at the time of approval. If you've sent a traditional invoice, follow up within 24 hours if payment hasn't been received. The longer you wait, the less likely you are to get paid promptly.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Get Paid Faster as a Contractor or Handyman",
    description:
      "5 strategies to help tradespeople collect payment faster and eliminate the chase.",
    step: [
      {
        "@type": "HowToStep",
        name: "Send professional quotes upfront",
        text: "Never start work without a written quote that the client has approved. This sets clear expectations and creates a commitment to pay the agreed amount.",
      },
      {
        "@type": "HowToStep",
        name: "Collect deposits on larger jobs",
        text: "Require a 25-50% deposit before starting any job over $500. This covers your materials and creates buy-in from the client.",
      },
      {
        "@type": "HowToStep",
        name: "Use an approve-then-pay workflow",
        text: "Send clients a quote link where they can approve and pay in the same flow. This eliminates the gap between 'yes' and actual payment.",
      },
      {
        "@type": "HowToStep",
        name: "Follow up the same day",
        text: "Don't let invoices age. Follow up on the day of job completion. The longer you wait, the lower your priority becomes.",
      },
      {
        "@type": "HowToStep",
        name: "Accept multiple payment methods",
        text: "Accept cards, bank transfers, and digital wallets. The more options you offer, the fewer excuses clients have to delay payment.",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
];

export default function GettingPaidFasterGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-slate-900">
            QuoteTrade
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-4 text-sm font-medium text-blue-600">Guide</div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          How to Get Paid Faster as a Contractor or Handyman
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          You finished the job. The client is happy. So why are you still
          waiting to get paid two weeks later? Here are 5 strategies to fix your
          payment process for good.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Why tradespeople struggle with payment
          </h2>
          <p className="mt-4 text-slate-600 leading-7">
            Most payment problems aren&apos;t about bad clients — they&apos;re
            about bad process. When you rely on verbal agreements, text-message
            invoicing, or chasing Venmo requests after the job is done,
            you&apos;re making it easy for payment to fall through the cracks.
          </p>
          <div className="mt-6 space-y-3">
            {[
              "Verbal agreements with no written record of scope or price",
              "No clear payment terms established before the work begins",
              "Sending invoices days or weeks after job completion",
              "Relying on Venmo/Zelle requests that get buried in notifications",
              "Making it hard to pay (check-only, cash-only, no card option)",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border border-slate-200 px-4 py-3"
              >
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="text-sm text-slate-600">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            5 strategies to get paid faster
          </h2>

          <div className="mt-8 space-y-10">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                  1
                </span>
                <h3 className="text-xl font-semibold text-slate-900">
                  Send professional quotes upfront
                </h3>
              </div>
              <p className="mt-3 pl-11 text-slate-600 leading-7">
                Never start work on a handshake. A written quote with clear line
                items, a total, and payment terms creates a commitment. When the
                client approves a written quote, they&apos;ve mentally agreed to
                pay that amount — making collection dramatically easier.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                  2
                </span>
                <h3 className="text-xl font-semibold text-slate-900">
                  Collect deposits on larger jobs
                </h3>
              </div>
              <p className="mt-3 pl-11 text-slate-600 leading-7">
                For any job over $500, require a 25–50% deposit before you start
                work. This covers your materials cost, prevents no-shows, and
                creates financial commitment from the client. Frame it as
                standard business practice: &quot;We collect a 50% deposit to
                reserve your spot and cover materials.&quot;
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                  3
                </span>
                <h3 className="text-xl font-semibold text-slate-900">
                  Use an approve-then-pay workflow
                </h3>
              </div>
              <p className="mt-3 pl-11 text-slate-600 leading-7">
                The biggest gap in most tradespeople&apos;s process is between
                &quot;the client said yes&quot; and &quot;the client actually
                paid.&quot; An approve-then-pay workflow closes that gap. The
                client receives a link, reviews the quote, clicks approve, and
                pays — all in one flow. No separate invoice. No chasing.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                  4
                </span>
                <h3 className="text-xl font-semibold text-slate-900">
                  Follow up the same day
                </h3>
              </div>
              <p className="mt-3 pl-11 text-slate-600 leading-7">
                If payment isn&apos;t collected at the time of approval, follow
                up on the same day you complete the work. Not tomorrow. Not next
                week. The same day. Every day you wait, your invoice drops lower
                on the client&apos;s priority list. A quick text with a payment
                link right after completing the job is the single most effective
                follow-up.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                  5
                </span>
                <h3 className="text-xl font-semibold text-slate-900">
                  Accept multiple payment methods
                </h3>
              </div>
              <p className="mt-3 pl-11 text-slate-600 leading-7">
                Every friction point is a reason to delay payment. If you only
                accept checks, you&apos;re waiting for the mail. If you only
                accept Venmo, you&apos;re excluding clients who don&apos;t use
                it. Accept credit cards, debit cards, bank transfers (ACH), and
                digital wallets. The easier it is to pay you, the faster
                you&apos;ll get paid.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            How digital quoting tools help
          </h2>
          <p className="mt-4 text-slate-600 leading-7">
            A digital quoting tool like QuoteTrade combines all five strategies
            into a single workflow. You create a professional quote, send the
            client a link, they approve and pay through the same page — and you
            can track everything from a simple dashboard.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">2 min</div>
              <p className="mt-1 text-sm text-slate-500">
                Average time to create and send a quote
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">1 click</div>
              <p className="mt-1 text-sm text-slate-500">
                For clients to approve and pay
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">$19/mo</div>
              <p className="mt-1 text-sm text-slate-500">
                Less than one hour of your time
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-6">
            {faqItems.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-slate-900">
                  {faq.question}
                </h3>
                <p className="mt-2 text-slate-600 leading-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl bg-slate-900 px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-white">
            Stop chasing payments. Start collecting them.
          </h2>
          <p className="mt-2 text-lg text-slate-300">
            Send professional quotes with built-in approval and payment — in
            under 2 minutes.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Start Sending Quotes — $19/mo
          </Link>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <Link href="/" className="text-sm font-semibold text-slate-900">
              QuoteTrade
            </Link>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="/register" className="hover:text-slate-700">
                Sign Up
              </Link>
              <Link href="/login" className="hover:text-slate-700">
                Log In
              </Link>
              <Link
                href="/guides/how-to-write-a-plumbing-estimate"
                className="hover:text-slate-700"
              >
                Plumbing Estimate Guide
              </Link>
              <Link href="/compare/spreadsheets" className="hover:text-slate-700">
                vs Spreadsheets
              </Link>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} QuoteTrade. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
