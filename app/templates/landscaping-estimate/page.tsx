import type { Metadata } from "next";
import Link from "next/link";
import EstimateBuilder from "./estimate-builder";
import { TemplateDownloadForm } from "@/components/template-download-form";
import { templateConfigs } from "@/components/template-pdf-configs";

export const metadata: Metadata = {
  title:
    "Free Landscaping Estimate Template | Professional Quotes in Minutes",
  description:
    "Create professional landscaping estimates instantly with our free template. Build custom estimates for lawn care, hardscaping, and landscaping projects.",
  keywords: [
    "landscaping estimate template",
    "estimate template for landscaping",
    "free landscaping estimate template",
    "landscaping estimate template pdf",
    "landscaping quote template",
  ],
};

const faqItems = [
  {
    question: "How do I create a professional landscaping estimate?",
    answer:
      "Use our free template to list the services (lawn care, hardscaping, mulching), measurements (square footage, linear feet), and pricing. Include materials, labor, and any permits. Most landscaping jobs are estimated at $50–$150 per hour for labor, plus materials at cost + 20–30% markup.",
  },
  {
    question: "What should I include in a landscaping estimate?",
    answer:
      "Include: job description (what's being done), site measurements (footage, dimensions), itemized services with costs, materials breakdown, labor hours and rates, timeline, and payment terms. A clear estimate prevents scope creep and wins more jobs.",
  },
  {
    question: "Can I charge for a landscaping estimate?",
    answer:
      "Most landscapers provide free estimates for standard projects (lawn care, mulch, plantings). For large design projects or site surveys (hardscaping, drainage, full landscape redesign), charging $75–$200 for a detailed estimate is reasonable and can be credited toward the job if hired.",
  },
  {
    question: "How long is a landscaping estimate valid?",
    answer:
      "Landscaping estimates are typically valid for 30 days. For seasonal services or major projects with material price fluctuations, shorten this to 14 days. Always state the expiration date clearly to protect yourself from price increases.",
  },
  {
    question: "Should I include a site visit in my estimate?",
    answer:
      "Yes. Always measure the site and assess soil conditions, drainage, existing plants, and access before quoting. This prevents underestimating and shows professionalism. Charge for on-site design consultations if the project is complex.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Landscaping Estimate Template",
    description:
      "Create professional landscaping estimates in minutes with our free online template tool.",
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


export default function LandscapingEstimateTemplate() {
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
            href="/register?trade=landscaper"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-4 text-sm font-medium text-blue-600">Template</div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Free Landscaping Estimate Template
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Professional estimates in minutes. Win more jobs with clear, detailed
          landscaping quotes.
        </p>

        {/* Benefits Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Why use this estimate template?
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Professional estimates in minutes
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                No spreadsheets or manual calculations. Build detailed estimates
                instantly with our template.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Win more jobs</h3>
              <p className="mt-2 text-sm text-slate-600">
                Professional estimates signal expertise. Clients compare quotes —
                yours will stand out.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Free to start</h3>
              <p className="mt-2 text-sm text-slate-600">
                No credit card required. Create estimates right now without
                signing up.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Get paid faster</h3>
              <p className="mt-2 text-sm text-slate-600">
                Clear estimates with terms get approved faster and paid sooner.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Builder */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Create your landscaping estimate
          </h2>
          <p className="mt-2 text-slate-600">
            Fill in the details below to generate a professional estimate
            instantly.
          </p>
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
            <EstimateBuilder />
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
          <TemplateDownloadForm config={templateConfigs["landscaping-estimate"]} />
        </section>
        {/* CTA Section */}
        <section className="mt-16 rounded-2xl bg-slate-900 px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-white">
            Ready to automate your landscaping business?
          </h2>
          <p className="mt-2 text-lg text-slate-300">
            QuoteTrade sends professional estimates, tracks approvals, and
            collects payments automatically.
          </p>
          <Link
            href="/register?trade=landscaper"
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
              QuoteTrade
            </Link>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="/register?trade=landscaper" className="hover:text-slate-700">
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
            &copy; {new Date().getFullYear()} QuoteTrade. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
