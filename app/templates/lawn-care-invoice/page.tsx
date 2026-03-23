import type { Metadata } from "next";
import Link from "next/link";
import InvoiceBuilder from "./invoice-builder";
import { TemplateDownloadForm } from "@/components/template-download-form";
import { templateConfigs } from "@/components/template-pdf-configs";

export const metadata: Metadata = {
  title:
    "Free Lawn Care Invoice Template | Professional Invoices in Seconds",
  description:
    "Generate professional lawn care invoices instantly. Free template for mowing, edging, trimming, leaf removal, and seasonal cleanup businesses.",
  keywords: [
    "lawn care invoice template",
    "lawn care invoice template free",
    "invoice template for lawn care",
    "free printable lawn care invoice template",
    "editable lawn care invoice template",
    "lawn mowing invoice template",
    "lawn service invoice template",
  ],
};

const faqItems = [
  {
    question: "What should a lawn care invoice include?",
    answer:
      "A professional lawn care invoice should include: your business name and contact info, client name and property address, date of service, itemized services (mowing, edging, trimming, leaf removal), square footage or lot size, labor hours and rates, materials used (fertilizer, seed, mulch), tax if applicable, total due, and payment terms.",
  },
  {
    question: "How much should I charge for lawn care?",
    answer:
      "Lawn mowing typically runs $30\u2013$80 per visit depending on lot size. Edging adds $10\u2013$30. Leaf removal is $100\u2013$400 per job. Seasonal cleanup ranges $150\u2013$500. Fertilizing runs $50\u2013$150 per application. Price by lot size and complexity, not just time.",
  },
  {
    question: "Should I invoice per visit or monthly?",
    answer:
      "Both work. Per-visit invoicing suits one-time or irregular clients. Monthly invoicing is better for recurring clients on a weekly or bi-weekly mowing schedule. Monthly billing reduces your admin work and gives clients predictable costs.",
  },
  {
    question: "How do I handle recurring lawn care clients?",
    answer:
      "Set up a service agreement with frequency (weekly, bi-weekly, monthly), included services, and monthly rate. Invoice at the start or end of each month. Include a clause for extra services (aeration, overseeding) billed separately.",
  },
  {
    question: "Should I list materials on a lawn care invoice?",
    answer:
      "Yes, if you provide materials like fertilizer, grass seed, mulch, or weed treatment. List them as separate line items with quantity and cost. Most mowing-only services include fuel in the hourly rate, but specialized materials should be itemized.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Free Lawn Care Invoice Template",
    description:
      "Create professional lawn care invoices instantly with our free online template tool.",
    provider: {
      "@type": "LocalBusiness",
      name: "TradeQuote",
      url: "https://tradequote.com",
    },
    serviceType: "Invoice Template",
    areaServed: "US",
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

export default function LawnCareInvoiceTemplate() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-slate-900">
            TradeQuote
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-4 text-sm font-medium text-blue-600">Template</div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Free Lawn Care Invoice Template
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Professional invoices in seconds. Get paid faster with clear, itemized
          invoices for mowing, edging, leaf removal, and seasonal cleanup.
          Peak season runs March through September — having invoices ready means
          you spend more time on lawns and less on paperwork.
        </p>

        {/* Service Variants Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Works for all lawn care services
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Lawn Mowing</h3>
              <p className="mt-2 text-sm text-slate-600">
                Weekly and bi-weekly mowing, striping, and bagging for
                residential and commercial properties
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Edging & Trimming
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Walkway edging, bed edging, hedge trimming, and weed whacking
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Leaf Removal</h3>
              <p className="mt-2 text-sm text-slate-600">
                Fall leaf cleanup, blowing, raking, hauling, and gutter clearing
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Seasonal Cleanup
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Spring and fall cleanups, dethatching, aeration, and overseeding
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Why use this invoice template?
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Professional invoices instantly
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Create detailed invoices on-site after every job. No manual data
                entry or paperwork.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Get paid faster</h3>
              <p className="mt-2 text-sm text-slate-600">
                Clear, itemized invoices with payment terms get paid the same
                day. No more chasing clients.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Free to start</h3>
              <p className="mt-2 text-sm text-slate-600">
                No credit card required. Create invoices right now without
                signing up.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Track every job
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Keep a record of every service, client, and payment. Know
                exactly what you earned.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Builder */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Create your lawn care invoice
          </h2>
          <p className="mt-2 text-slate-600">
            Fill in the details below to generate a professional invoice
            instantly.
          </p>
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
            <InvoiceBuilder />
          </div>
        </section>

        {/* FAQ Section */}
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


        {/* Download template */}
        <section className="mt-12">
          <TemplateDownloadForm config={templateConfigs["lawn-care-invoice"]} />
        </section>
        {/* CTA Section */}
        <section className="mt-16 rounded-2xl bg-slate-900 px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-white">
            Ready to grow your lawn care business?
          </h2>
          <p className="mt-2 text-lg text-slate-300">
            TradeQuote automates invoicing, payment collection, and scheduling
            for lawn care professionals.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-lg bg-amber-500 px-8 py-3 text-sm font-bold text-slate-900 hover:bg-amber-400"
          >
            Create Your First Invoice — Free
          </Link>
        </section>

        {/* Internal Links */}
        <section className="mt-16 border-t border-slate-200 pt-12">
          <h2 className="text-xl font-semibold text-slate-900">
            Explore other templates
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href="/templates/landscaping-estimate"
              className="rounded-lg border border-slate-200 p-4 hover:border-slate-300 hover:bg-slate-50"
            >
              <h3 className="font-semibold text-slate-900">
                Landscaping Estimate Template
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Professional landscaping and yard work estimates
              </p>
            </Link>
            <Link
              href="/templates/handyman-invoice"
              className="rounded-lg border border-slate-200 p-4 hover:border-slate-300 hover:bg-slate-50"
            >
              <h3 className="font-semibold text-slate-900">
                Handyman Invoice Template
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Invoices for handyman and general repair services
              </p>
            </Link>
            <Link
              href="/templates/cleaning-invoice"
              className="rounded-lg border border-slate-200 p-4 hover:border-slate-300 hover:bg-slate-50"
            >
              <h3 className="font-semibold text-slate-900">
                Cleaning Invoice Template
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Professional invoices for house and commercial cleaning
              </p>
            </Link>
            <Link
              href="/templates/pressure-washing-estimate"
              className="rounded-lg border border-slate-200 p-4 hover:border-slate-300 hover:bg-slate-50"
            >
              <h3 className="font-semibold text-slate-900">
                Pressure Washing Estimate Template
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Estimates for driveways, decks, siding, and patios
              </p>
            </Link>
            <Link
              href="/templates/general-contractor-estimate"
              className="rounded-lg border border-slate-200 p-4 hover:border-slate-300 hover:bg-slate-50"
            >
              <h3 className="font-semibold text-slate-900">
                General Contractor Estimate Template
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Hub for all trade-specific estimate templates
              </p>
            </Link>
            <Link
              href="/templates/painting-estimate"
              className="rounded-lg border border-slate-200 p-4 hover:border-slate-300 hover:bg-slate-50"
            >
              <h3 className="font-semibold text-slate-900">
                Painting Estimate Template
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Estimates for interior and exterior painting projects
              </p>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <Link href="/" className="text-sm font-semibold text-slate-900">
              TradeQuote
            </Link>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="/register" className="hover:text-slate-700">
                Sign Up
              </Link>
              <Link href="/login" className="hover:text-slate-700">
                Log In
              </Link>
              <Link href="/pricing" className="hover:text-slate-700">
                Pricing
              </Link>
              <Link href="/privacy" className="hover:text-slate-700">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-slate-700">
                Terms
              </Link>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} TradeQuote. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
