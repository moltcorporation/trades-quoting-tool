import type { Metadata } from "next";
import Link from "next/link";
import InvoiceBuilder from "./invoice-builder";
import { TemplateDownloadForm } from "@/components/template-download-form";
import { templateConfigs } from "@/components/template-pdf-configs";

export const metadata: Metadata = {
  title:
    "Free Cleaning Invoice Template | Professional Invoices in Seconds",
  description:
    "Generate professional cleaning invoices instantly. Free template for house cleaning, carpet cleaning, and commercial cleaning businesses.",
  keywords: [
    "cleaning invoice template",
    "free cleaning invoice template",
    "carpet cleaning invoice template",
    "house cleaning invoice template",
    "cleaning business invoice template",
    "invoice cleaning services template",
  ],
};

const faqItems = [
  {
    question: "What should a cleaning invoice include?",
    answer:
      "A professional cleaning invoice should include: your business name and contact info, client name and address, detailed service breakdown (what cleaning was done), labor hours and rates, materials used, tax (if applicable), total due, payment terms, and due date. Clear invoices get paid faster.",
  },
  {
    question: "Can I charge for different cleaning services separately?",
    answer:
      "Yes. Break down services by type: basic cleaning ($100–$150), deep cleaning ($150–$250), carpet cleaning ($75–$150), move-in/move-out ($200–$400). Clients appreciate detailed invoices that show exactly what they're paying for.",
  },
  {
    question: "How long should a cleaning invoice be valid?",
    answer:
      "Cleaning invoices should be paid upon completion or within 7–14 days. For recurring clients (weekly or bi-weekly), set a monthly invoice with a due date. Always specify payment terms on your invoice.",
  },
  {
    question: "What payment methods should I list?",
    answer:
      "List accepted payment methods on your invoice: cash, check, Venmo, PayPal, card (Square, Stripe), or bank transfer. Make it easy for clients to pay you immediately after the job is complete.",
  },
  {
    question: "Should I add materials to a cleaning invoice?",
    answer:
      "If you provide materials (cleaning supplies, special equipment), list them as a separate line item. Most cleaning businesses include materials in their hourly rate; only itemize if you're using expensive or specialized supplies.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Cleaning Invoice Template",
    description:
      "Create professional cleaning invoices instantly with our free online template tool.",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
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


export default function CleaningInvoiceTemplate() {
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
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-4 text-sm font-medium text-blue-600">Template</div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Free Cleaning Invoice Template
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Professional invoices in seconds. Get paid faster with clear, detailed
          invoices for house, carpet, and commercial cleaning.
        </p>

        {/* Service Variants Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Works for all cleaning services
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">House Cleaning</h3>
              <p className="mt-2 text-sm text-slate-600">
                Weekly or monthly house cleaning, move-in/move-out deep cleans
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Carpet Cleaning
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Room-by-room carpet cleaning and stain removal services
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Commercial Cleaning
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Office buildings, retail spaces, and commercial properties
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Deep Cleaning</h3>
              <p className="mt-2 text-sm text-slate-600">
                Specialized deep cleans for renovation projects and transitions
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
                Create detailed invoices on the spot at job completion. No
                manual data entry.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Get paid faster</h3>
              <p className="mt-2 text-sm text-slate-600">
                Clear invoices with payment terms get paid immediately. Show
                exactly what they owe.
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
                Professional image
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Branded invoices show your cleaning business is professional
                and trustworthy.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Builder */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Create your cleaning invoice
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
          <TemplateDownloadForm config={templateConfigs["cleaning-invoice"]} />
        </section>
        {/* CTA Section */}
        <section className="mt-16 rounded-2xl bg-slate-900 px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-white">
            Ready to scale your cleaning business?
          </h2>
          <p className="mt-2 text-lg text-slate-300">
            TradeQuote automates invoicing, payment collection, and scheduling
            for cleaning professionals.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700"
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
              href="/guides/how-to-write-a-plumbing-estimate"
              className="rounded-lg border border-slate-200 p-4 hover:border-slate-300 hover:bg-slate-50"
            >
              <h3 className="font-semibold text-slate-900">
                Plumbing Estimate Guide
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Learn the best practices for professional plumbing quotes
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
