import type { Metadata } from "next";
import Link from "next/link";
import InvoiceBuilder from "./invoice-builder";
import { TemplateDownloadForm } from "@/components/template-download-form";
import { templateConfigs } from "@/components/template-pdf-configs";

export const metadata: Metadata = {
  title: "Free Tree Service Invoice Template | Professional Quotes",
  description:
    "Create professional tree service invoices instantly with our free template. Generate invoices for tree removal, trimming, stump grinding, and more.",
  keywords: [
    "tree service invoice template",
    "tree removal invoice template",
    "free tree service invoice",
    "arborist invoice template",
    "tree trimming invoice",
  ],
};

const faqItems = [
  {
    question: "What should I include in a tree service invoice?",
    answer:
      "Include: service type (tree removal, trimming, stump grinding, etc.), tree size/quantity, labor hours and hourly rate, materials and equipment costs, timeline, payment terms, and your business license number (if applicable). Tree service invoices should clearly itemize what work was completed to justify the cost.",
  },
  {
    question: "How much do tree service companies charge per hour?",
    answer:
      "Tree service labor rates range from $50–$150 per hour depending on experience, location, and complexity. Basic trimming: $60–$85/hour. Tree removal: $75–$125/hour. Emergency storm work: $100–$150+/hour. Large crews (3+ people) cost more but work faster on major removals.",
  },
  {
    question: "Can I charge a consultation or estimate fee?",
    answer:
      "Yes. Most tree companies offer free estimates for straightforward jobs. For complex site assessments, hazard removal planning, or large multi-day projects, charging $100–$300 for a detailed estimate is standard. This fee can often be credited toward the final invoice if the customer hires you.",
  },
  {
    question: "How long is a tree service estimate valid?",
    answer:
      "Tree service estimates are typically valid for 30 days. If material costs (fuel, equipment) fluctuate or you're quoting storm cleanup (time-sensitive), specify the expiration date clearly. For major removals, state that the estimate is valid upon site conditions remaining the same.",
  },
  {
    question: "What payment terms should I include?",
    answer:
      "For residential tree work, common terms are: 50% deposit upon agreement, balance due upon completion. For commercial or large projects: 50% deposit, 50% balance net 15 days. Emergency storm work is often paid in full upon completion. Always specify when you expect payment and accept ACH, credit card, or check.",
  },
  {
    question: "Should I include debris removal in the quote?",
    answer:
      "Yes. Always clarify whether debris removal is included or extra. For tree removal: specify if stumps are ground, if logs are cut/stacked for customer, or if debris is hauled away. Hauling adds 20–40% to the job cost. Separating these services shows professionalism and prevents scope creep disputes.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Tree Service Invoice Template",
    description:
      "Create professional tree service invoices in minutes with our free online template tool.",
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

export default function TreeServiceInvoiceTemplate() {
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
        <div className="mb-4 text-sm font-medium text-blue-600">Template</div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Free Tree Service Invoice Template
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Professional invoices for tree removal, trimming, and stump grinding.
          Create detailed quotes in minutes and get paid faster.
        </p>

        {/* Benefits Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Why use this invoice template?
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Professional presentation matters
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                A detailed, branded invoice signals expertise. Homeowners and
                contractors take you seriously.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Get paid faster</h3>
              <p className="mt-2 text-sm text-slate-600">
                Clear scope of work and payment terms reduce disputes and speed
                approval.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Free to use</h3>
              <p className="mt-2 text-sm text-slate-600">
                No credit card required. Create and download invoices without
                signing up.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Reduce scope creep
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Itemizing services (removal, stump grinding, debris hauling)
                prevents misunderstandings.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Builder */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Create your tree service invoice
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
          <TemplateDownloadForm config={templateConfigs["tree-service-invoice"]} />
        </section>

        {/* CTA Section */}
        <section className="mt-16 rounded-2xl bg-slate-900 px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-white">
            Ready to scale your tree service business?
          </h2>
          <p className="mt-2 text-lg text-slate-300">
            QuoteTrade automates invoicing, tracks job approvals, and collects
            payments. Focus on your crews, not paperwork.
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
                Free template for lawn care and landscaping quotes
              </p>
            </Link>
            <Link
              href="/templates/lawn-care-invoice"
              className="rounded-lg border border-slate-200 p-4 hover:border-slate-300 hover:bg-slate-50"
            >
              <h3 className="font-semibold text-slate-900">
                Lawn Care Invoice Template
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Professional invoices for lawn mowing and maintenance
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
            &copy; {new Date().getFullYear()} QuoteTrade. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
