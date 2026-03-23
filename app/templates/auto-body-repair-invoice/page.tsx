import type { Metadata } from "next";
import Link from "next/link";
import InvoiceBuilder from "./invoice-builder";
import { TemplateDownloadForm } from "@/components/template-download-form";
import { templateConfigs } from "@/components/template-pdf-configs";

export const metadata: Metadata = {
  title:
    "Free Auto Body Repair Invoice Template | Professional Invoices in Seconds",
  description:
    "Generate professional auto body repair invoices instantly. Free template for collision repair, dent removal, paint jobs, and panel replacement shops.",
  keywords: [
    "auto body repair invoice template",
    "free auto body repair invoice template",
    "auto body shop invoice template",
    "collision repair invoice template",
    "car body repair invoice",
    "body shop invoice template free",
  ],
};

const faqItems = [
  {
    question: "What should an auto body repair invoice include?",
    answer:
      "A professional auto body invoice should include: shop name and contact info, customer name and vehicle details (year, make, model, VIN), itemized labor hours and rate, parts list with costs, paint and materials charges, sublet work (glass, alignment), tax, total due, and insurance claim number if applicable.",
  },
  {
    question: "How much does auto body repair typically cost?",
    answer:
      "Costs vary by repair type: minor dent removal runs $75\u2013$500, bumper repair $300\u2013$1,500, fender repair $500\u2013$2,000, full collision repair $2,000\u2013$10,000+. Paint jobs range from $500 for a single panel to $3,000\u2013$5,000 for a full respray. Always itemize so customers understand each charge.",
  },
  {
    question: "Should I separate labor and parts on my invoice?",
    answer:
      "Always. Insurance companies require itemized breakdowns of labor hours, parts (OEM vs aftermarket), paint materials, and sublet charges. Even for cash customers, detailed invoices build trust and reduce disputes about pricing.",
  },
  {
    question: "How do I invoice insurance companies vs cash customers?",
    answer:
      "Insurance invoices need a claim number, adjuster info, itemized line codes, and photos. Cash customers get a simpler invoice but still need itemized labor, parts, and materials. For insurance work, follow the insurer's supplement process for additional charges discovered during repair.",
  },
  {
    question: "What labor rate should I use for auto body work?",
    answer:
      "Body labor rates range from $50\u2013$75/hr depending on your market. Paint labor runs $50\u2013$65/hr. Mechanical labor is $80\u2013$120/hr. Frame work is $80\u2013$100/hr. Check your local market rates and what insurance companies are paying in your area.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Auto Body Repair Invoice Template",
    description:
      "Create professional auto body repair invoices instantly with our free online template tool.",
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

export default function AutoBodyRepairInvoiceTemplate() {
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
          Free Auto Body Repair Invoice Template
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Professional invoices in seconds. Itemize labor, parts, paint, and
          materials for collision repair, dent removal, and body work.
        </p>

        {/* Service Variants Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Works for all auto body services
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Collision Repair
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Accident damage repair, structural work, and insurance claim
                documentation
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Dent Removal</h3>
              <p className="mt-2 text-sm text-slate-600">
                Paintless dent repair, hail damage, and minor body work
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Paint & Refinish
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Full and partial paint jobs, color matching, clear coat, and
                blending
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Panel Replacement
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Fender, door, hood, and quarter panel replacement with fitting
                and paint
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
                Insurance-ready invoices
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Itemized labor, parts, and paint that insurers expect. Submit
                clean documentation every time.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Get paid faster</h3>
              <p className="mt-2 text-sm text-slate-600">
                Clear breakdowns reduce payment disputes and speed up
                collections from customers and insurers.
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
                Branded invoices show customers your shop is organized and
                trustworthy.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Builder */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Create your auto body repair invoice
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
          <TemplateDownloadForm config={templateConfigs["auto-body-repair-invoice"]} />
        </section>
        {/* CTA Section */}
        <section className="mt-16 rounded-2xl bg-slate-900 px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-white">
            Ready to streamline your body shop?
          </h2>
          <p className="mt-2 text-lg text-slate-300">
            QuoteTrade automates invoicing, payment collection, and job tracking
            for auto body professionals.
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
                Professional invoices for cleaning businesses
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
