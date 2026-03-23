import type { Metadata } from "next";
import Link from "next/link";
import { TemplateDownloadForm } from "@/components/template-download-form";
import { templateConfigs } from "@/components/template-pdf-configs";

export const metadata: Metadata = {
  title: "Free Pressure Washing Estimate Template | TradeQuote",
  description:
    "Create professional pressure washing estimates in minutes. Free template for driveway, deck, and siding cleaning jobs.",
  keywords: [
    "pressure washing estimate template",
    "pressure washing quote template",
    "free pressure washing estimate",
    "power washing estimate template",
    "pressure washing invoice",
  ],
};

const faqItems = [
  {
    question: "What should I include in a pressure washing estimate?",
    answer:
      "Include: property address, specific services (driveway, deck, siding, fence, roof, etc.), square footage or linear footage, cleaning method (pressure vs. soft wash), chemical treatments if applicable, timeline for completion, equipment rental costs if any, travel/service fees, payment terms, and expiration date. Breaking out each service shows professionalism.",
  },
  {
    question: "How much should I charge for pressure washing?",
    answer:
      "Residential pressure washing typically ranges $200–$600 depending on property size and scope. Driveways: $200–$400. Decks: $300–$500. Entire house: $500–$1,500. Commercial rates are 20–50% higher. Charge per square foot ($0.10–$0.30) or by the job. Consider equipment wear, chemicals, water usage, and travel time when pricing.",
  },
  {
    question: "Should I charge for estimates?",
    answer:
      "Most pressure washing companies offer free on-site estimates for residential work. This builds customer confidence. For large commercial properties or complex jobs, charging $50–$150 for a detailed estimate is acceptable. Waive the fee if the customer hires you.",
  },
  {
    question: "How long is a pressure washing estimate valid?",
    answer:
      "Pressure washing estimates are typically valid for 14–30 days. Clearly state the expiration date on every quote. If seasonal demand (spring/summer) is high or material costs vary, note that estimates are valid for the date issued and subject to site verification.",
  },
  {
    question: "What payment terms should I use?",
    answer:
      "For residential work: 50% deposit to book the job, balance due upon completion. For commercial: 50% deposit, 50% net 15 days. Accept cash, check, credit card, ACH, or Venmo. For repeat customers or ongoing maintenance contracts, offer net 30 terms. Always specify payment methods accepted.",
  },
  {
    question: "Should I warn customers about potential damage?",
    answer:
      "Yes. Always include a disclaimer that high-pressure washing (3000+ PSI) can damage certain surfaces (old wood, painted surfaces, soft stone). Recommend soft washing for delicate areas. This protects you from liability and shows expertise. Some surfaces require hand-cleaning or lower pressure. Include this in your estimate.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Pressure Washing Estimate Template",
    description:
      "Create professional pressure washing estimates in minutes with our free online template tool.",
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

export default function PressureWashingEstimateTemplate() {
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
            href="/register?trade=other"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-4 text-sm font-medium text-blue-600">Template</div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Free Pressure Washing Estimate Template
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Professional estimates for driveway, deck, siding, and roof cleaning.
          Create detailed quotes in minutes and get paid faster.
        </p>

        {/* Benefits Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Why use this estimate template?
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Professional presentation builds trust
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                A detailed, branded estimate shows you're a professional. Homeowners
                and property managers are more likely to book higher-value jobs.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Get paid faster</h3>
              <p className="mt-2 text-sm text-slate-600">
                Clear scope of work, pricing breakdown, and payment terms reduce
                disputes and speed approval.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Free to use</h3>
              <p className="mt-2 text-sm text-slate-600">
                No credit card required. Create and download estimates without
                signing up.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Itemize services clearly
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Break out driveway, deck, siding, and soft wash services so
                customers understand what they're paying for.
              </p>
            </div>
          </div>
        </section>

        {/* Service Overview Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Common pressure washing services and pricing
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 font-semibold text-slate-900">Service</th>
                  <th className="px-4 py-3 font-semibold text-slate-900">Typical Price Range</th>
                  <th className="px-4 py-3 font-semibold text-slate-900">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-3 text-slate-900">Driveway (1,000 sq ft)</td>
                  <td className="px-4 py-3 text-slate-600">$150–$300</td>
                  <td className="px-4 py-3 text-slate-600">High pressure, 3000+ PSI</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">Deck (400 sq ft)</td>
                  <td className="px-4 py-3 text-slate-600">$200–$400</td>
                  <td className="px-4 py-3 text-slate-600">Soft wash recommended</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">House siding (2,000 sq ft)</td>
                  <td className="px-4 py-3 text-slate-600">$300–$600</td>
                  <td className="px-4 py-3 text-slate-600">Soft wash, 500–1500 PSI</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">Roof</td>
                  <td className="px-4 py-3 text-slate-600">$500–$1,200</td>
                  <td className="px-4 py-3 text-slate-600">Specialized, moss/algae removal</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">Fence (200 linear ft)</td>
                  <td className="px-4 py-3 text-slate-600">$150–$300</td>
                  <td className="px-4 py-3 text-slate-600">Soft wash for wood fences</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Download template */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Download your template
          </h2>
          <p className="mt-2 text-slate-600">
            Save this template as Word or PDF and customize for your business.
          </p>
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
            <TemplateDownloadForm
              config={templateConfigs["pressure-washing-estimate"]}
            />
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

        {/* CTA Section */}
        <section className="mt-16 rounded-2xl bg-slate-900 px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-white">
            Ready to scale your pressure washing business?
          </h2>
          <p className="mt-2 text-lg text-slate-300">
            TradeQuote automates estimates, tracks job approvals, and collects
            payments. Focus on your crews, not paperwork.
          </p>
          <Link
            href="/register?trade=other"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Create Your First Estimate — Free
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
                Free template for lawn care and landscaping quotes
              </p>
            </Link>
            <Link
              href="/templates/roof-replacement-estimate"
              className="rounded-lg border border-slate-200 p-4 hover:border-slate-300 hover:bg-slate-50"
            >
              <h3 className="font-semibold text-slate-900">
                Roof Replacement Estimate Template
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Professional estimates for roofing contractors
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
