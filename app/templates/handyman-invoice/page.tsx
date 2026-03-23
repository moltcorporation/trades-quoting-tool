import type { Metadata } from "next";
import Link from "next/link";
import { InvoiceGenerator } from "./invoice-generator";
import { TemplateDownloadForm } from "@/components/template-download-form";
import { templateConfigs } from "@/components/template-pdf-configs";

export const metadata: Metadata = {
  title: "Free Handyman Invoice Template | TradeQuote",
  description:
    "Free handyman invoice template with service descriptions, labor hours, materials, and tax. Create, preview, and download professional handyman invoices instantly.",
  keywords: [
    "handyman invoice template",
    "invoice template for handyman",
    "handyman invoice template free",
    "handyman invoice",
    "handyman billing template",
    "free handyman invoice",
  ],
};

const sampleLineItems = [
  { description: "Drywall patch and repair (2 holes)", hours: "1.5", rate: "$65", materials: "$18" },
  { description: "Replace bathroom faucet", hours: "1", rate: "$65", materials: "$89" },
  { description: "Install 3 shelf brackets", hours: "0.75", rate: "$65", materials: "$32" },
  { description: "Fix sticking door — plane and rehang", hours: "0.5", rate: "$65", materials: "$0" },
];

const faqItems = [
  {
    question: "What should a handyman invoice include?",
    answer:
      "A professional handyman invoice should include: your business name and contact info, client name and address, invoice date and number, detailed description of each service performed, hours worked and hourly rate, materials used with costs, subtotal, tax, total due, and payment terms (due date, accepted payment methods).",
  },
  {
    question: "How much should a handyman charge per hour?",
    answer:
      "Handyman rates typically range from $50 to $100 per hour depending on location, experience, and job complexity. Major metro areas average $75–$100/hour, while smaller markets run $50–$70. Specialists (tile work, electrical) often charge more. Always list labor and materials separately on your invoice.",
  },
  {
    question: "Should handymen charge for materials separately?",
    answer:
      "Yes. Always itemize materials separately from labor on your invoice. This builds trust with clients, makes your pricing transparent, and protects you from disputes. Most handymen add a 15–20% markup on materials to cover procurement time and trips to the hardware store.",
  },
  {
    question: "How do I get clients to pay handyman invoices faster?",
    answer:
      "Three proven tactics: (1) Send the invoice immediately after finishing the job — same-day invoices get paid 30% faster. (2) Offer multiple payment methods (card, Venmo, bank transfer). (3) Set clear payment terms upfront, like 'due within 7 days.' Digital invoicing tools like TradeQuote let clients pay with one tap.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function HandymanInvoiceTemplate() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Free Handyman Invoice Template
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Create professional handyman invoices in minutes. Fill in your services, hours, and materials below — then preview and download as PDF. Or skip the hassle and use TradeQuote to send invoices your clients can pay with one tap.
        </p>

        {/* Inline invoice generator */}
        <section className="mt-10">
          <h2 className="text-xl font-bold">Build your invoice</h2>
          <p className="mt-2 text-sm text-slate-500">
            Add your services, hours, rates, and materials. Preview your invoice and save it as a PDF.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
            <InvoiceGenerator />
          </div>
        </section>

        {/* Sample invoice */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Sample handyman invoice</h2>
          <p className="mt-2 text-sm text-slate-500">
            Here is what a professional handyman invoice looks like for a typical multi-task home visit.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white">
              <p className="font-bold">Dave&apos;s Handyman Service</p>
              <p className="text-sm text-slate-400">Invoice #1087 · March 22, 2026</p>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-slate-500">
                Bill to: <span className="text-slate-900 font-medium">Rachel Kim</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">Job: Home repair visit — 4 tasks</p>
              <table className="w-full mt-4 text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="text-left pb-2">Service</th>
                    <th className="text-right pb-2">Labor</th>
                    <th className="text-right pb-2">Materials</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleLineItems.map((item) => (
                    <tr key={item.description} className="border-b border-slate-100">
                      <td className="py-2.5">{item.description}</td>
                      <td className="py-2.5 text-right">{item.hours}h × {item.rate}</td>
                      <td className="py-2.5 text-right font-medium">{item.materials}</td>
                    </tr>
                  ))}
                  <tr className="text-slate-500">
                    <td colSpan={3} className="py-2 text-right">Subtotal: $383.25</td>
                  </tr>
                  <tr className="text-slate-500">
                    <td colSpan={3} className="py-1 text-right">Tax (8%): $30.66</td>
                  </tr>
                  <tr className="font-bold text-lg">
                    <td colSpan={3} className="py-2 text-right">Total: $413.91</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>


        {/* Download template */}
        <section className="mt-12">
          <TemplateDownloadForm config={templateConfigs["handyman-invoice"]} />
        </section>
        {/* What to include */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">What every handyman invoice needs</h2>
          <p className="mt-2 text-sm text-slate-600">
            A complete handyman invoice protects you from disputes and helps you get paid faster. Include these six elements:
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Business info", desc: "Your name, phone, email, and license number if applicable" },
              { title: "Client details", desc: "Full name, property address, phone or email" },
              { title: "Service descriptions", desc: "Each task described clearly — what you did and where" },
              { title: "Labor and materials", desc: "Hours, hourly rate, and itemized materials with costs" },
              { title: "Tax and total", desc: "State/local sales tax applied, with a clear total due" },
              { title: "Payment terms", desc: "Due date, accepted methods (card, check, Venmo), late fee policy" },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO content: invoicing best practices */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Handyman invoicing best practices</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Getting paid on time is the difference between a handyman business that thrives and one that stalls. Most handymen lose 10–15% of their revenue to late or unpaid invoices simply because they invoice informally — scribbled receipts, verbal agreements, or delayed billing days after the job.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Invoice the same day you finish</h3>
            <p>
              The single most impactful change you can make is sending your invoice before you leave the job site. Research shows invoices sent within 24 hours of work completion are paid 1.5x faster than those sent a week later. The client just watched you fix their problem — their willingness to pay is at its peak.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Separate labor from materials — always</h3>
            <p>
              Clients who see a single lump sum wonder if they are overpaying. When you break it down — 2 hours at $65/hour plus $43 in materials — the total feels justified. This transparency builds trust and dramatically reduces payment disputes. Most successful handymen also add a 15–20% markup on materials to cover procurement time and travel to the hardware store, which is standard industry practice.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Offer card and digital payments</h3>
            <p>
              Checks bounce and cash requires exact change. Accepting credit cards, Venmo, or Apple Pay means clients can pay you on the spot. Yes, processing fees take 2.9%, but you eliminate the follow-up calls and get paid immediately. For a $400 job, the $11.60 fee is a small price for same-day payment.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Use invoice numbers and keep records</h3>
            <p>
              Sequential invoice numbers (INV-001, INV-002) make tax season painless. Track every invoice in a spreadsheet at minimum, or better yet, use invoicing software that records sent, viewed, and paid status automatically. When tax time comes, you have a clean record of all income — no shoebox of receipts.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Set clear payment terms upfront</h3>
            <p>
              Before you start the job, tell the client: &quot;I invoice when the work is done, payment is due within 7 days, and I accept card or bank transfer.&quot; This sets expectations and eliminates the awkward follow-up. For larger jobs ($500+), consider requiring a 50% deposit before starting.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-xl bg-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Stop chasing invoices</h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto">
            TradeQuote creates professional invoices and estimates your clients can approve and pay with one tap. No PDFs, no printing, no follow-up calls.
          </p>
          <Link
            href="/register?trade=handyman"
            className="mt-6 inline-block rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-amber-400"
          >
            Create and send professional invoices — free
          </Link>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Frequently asked questions</h2>
          <div className="mt-6 space-y-6">
            {faqItems.map((faq) => (
              <div key={faq.question} className="border-b border-slate-200 pb-6">
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related templates */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">More templates for tradespeople</h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link href="/templates/plumbing-estimate" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Plumbing Estimate Template</h3>
              <p className="mt-1 text-sm text-slate-500">For faucet repairs, drain clearing, and pipe work</p>
            </Link>
            <Link href="/templates/electrical-estimate" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Electrical Estimate Template</h3>
              <p className="mt-1 text-sm text-slate-500">For panel upgrades, wiring, and installations</p>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-8 flex flex-col items-center gap-2 text-sm text-slate-500">
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-700">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-700">Terms</Link>
          </div>
          <p>&copy; 2026 TradeQuote</p>
        </div>
      </footer>
    </div>
  );
}
