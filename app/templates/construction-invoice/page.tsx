import type { Metadata } from "next";
import Link from "next/link";
import { InvoiceGenerator } from "./invoice-generator";

export const metadata: Metadata = {
  title: "Free Construction Invoice Template | TradeQuote",
  description:
    "Free construction invoice template with progress billing, phase-based line items, and materials tracking. Create, preview, and download professional construction invoices instantly.",
  keywords: [
    "construction work invoice template",
    "invoice template for construction",
    "construction billing invoice template",
    "construction company invoice template",
    "construction invoice template free",
    "progress billing template construction",
  ],
};

const samplePhases = [
  { phase: "Demolition & site prep", labor: "$2,400", materials: "$600" },
  { phase: "Framing & structural", labor: "$4,800", materials: "$3,200" },
  { phase: "Electrical rough-in", labor: "$1,800", materials: "$950" },
  { phase: "Plumbing rough-in", labor: "$2,100", materials: "$1,400" },
  { phase: "Finish carpentry & tile", labor: "$3,600", materials: "$2,800" },
];

const faqItems = [
  {
    question: "How do construction invoices handle change orders?",
    answer:
      "Change orders should be documented as separate line items on your invoice, referencing the original scope and the approved change order number. Include the date the change was approved, additional labor and materials costs, and any schedule impact. Never bury change order costs inside existing line items — clients dispute hidden charges. Best practice: issue a mini-invoice or addendum for each change order as it is approved, then include all approved changes on the final invoice.",
  },
  {
    question: "What is a lien waiver and should it go on my construction invoice?",
    answer:
      "A lien waiver is a legal document where you give up your right to file a mechanic's lien against the property once you are paid. Many states require conditional lien waivers with progress payments and unconditional waivers with final payment. Include a note on your invoice stating that a lien waiver will be provided upon receipt of payment. General contractors should also collect lien waivers from subcontractors before releasing their payments to protect the property owner.",
  },
  {
    question: "How should I mark up materials on a construction invoice?",
    answer:
      "Industry standard markup on materials is 15–25% to cover procurement time, delivery coordination, storage, and waste. Clearly show the markup as a separate line item or percentage — never inflate individual material prices. A transparent 20% materials handling fee is more professional than padding costs. Some contractors bill materials at cost and charge a higher labor rate instead. Either approach works as long as it is consistent and disclosed upfront in your contract.",
  },
  {
    question: "What is progress billing in construction?",
    answer:
      "Progress billing means invoicing at milestones instead of waiting until the job is complete. A typical schedule: 10% deposit at contract signing, then billing at completion of each major phase (foundation, framing, rough-in, finish, final walkthrough). Progress billing protects contractors from financing an entire project out of pocket and gives clients visibility into where their money goes. Always tie progress payments to inspectable milestones, not calendar dates.",
  },
  {
    question: "How do I handle construction cash flow with invoicing?",
    answer:
      "Cash flow is the top reason construction businesses fail. Three rules: (1) require a deposit before ordering materials — 10–25% of total contract value, (2) bill within 24 hours of completing each phase, and (3) maintain 30 days of operating expenses in reserve. Use progress billing to match income to expenses. Invoice materials separately from labor so you can collect for materials before installation begins. If a client consistently pays late, require payment before starting the next phase.",
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

export default function ConstructionInvoiceTemplate() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Free Construction Invoice Template
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Create professional construction invoices with progress billing in minutes. Add your project phases, labor, and materials below — then preview and download as PDF. Or skip the hassle and use TradeQuote to send invoices your clients can approve and pay with one tap.
        </p>

        {/* Inline invoice generator */}
        <section className="mt-10">
          <h2 className="text-xl font-bold">Build your construction invoice</h2>
          <p className="mt-2 text-sm text-slate-500">
            Add each project phase with labor and materials costs. Include permit fees and your GC markup for a complete invoice.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
            <InvoiceGenerator />
          </div>
        </section>

        {/* Sample invoice — kitchen remodel with progress billing */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Sample construction invoice: kitchen remodel</h2>
          <p className="mt-2 text-sm text-slate-500">
            Here is what a professional construction invoice looks like for a $25,000 kitchen remodel with progress billing by phase.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white">
              <p className="font-bold">Martinez Construction LLC</p>
              <p className="text-sm text-slate-400">Invoice #MC-2026-017 · Kitchen Remodel — 456 Elm Dr</p>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-slate-500">
                Bill to: <span className="text-slate-900 font-medium">Johnson Family</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">Progress billing: Phase 3 of 5 complete</p>
              <table className="w-full mt-4 text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="text-left pb-2">Phase</th>
                    <th className="text-right pb-2">Labor</th>
                    <th className="text-right pb-2">Materials</th>
                  </tr>
                </thead>
                <tbody>
                  {samplePhases.map((item) => (
                    <tr key={item.phase} className="border-b border-slate-100">
                      <td className="py-2.5">{item.phase}</td>
                      <td className="py-2.5 text-right">{item.labor}</td>
                      <td className="py-2.5 text-right font-medium">{item.materials}</td>
                    </tr>
                  ))}
                  <tr className="text-slate-500">
                    <td colSpan={3} className="py-2 text-right">Permits &amp; inspections: $1,200</td>
                  </tr>
                  <tr className="text-slate-500">
                    <td colSpan={3} className="py-1 text-right">Subtotal: $24,850</td>
                  </tr>
                  <tr className="text-slate-500">
                    <td colSpan={3} className="py-1 text-right">GC markup (10%): $2,485</td>
                  </tr>
                  <tr className="font-bold text-lg">
                    <td colSpan={3} className="py-2 text-right">Total: $27,335</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 text-xs text-slate-400">Payment terms: Due upon phase completion · Lien waiver provided with each payment</p>
            </div>
          </div>
        </section>

        {/* What to include */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">What every construction invoice needs</h2>
          <p className="mt-2 text-sm text-slate-600">
            A complete construction invoice protects you legally, speeds up payment, and keeps your project accounting clean.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Project details", desc: "Property address, project name, contract number, and scope reference" },
              { title: "Phase breakdown", desc: "Each construction phase itemized with labor and materials separately" },
              { title: "Permits & fees", desc: "Building permits, inspection fees, and any government-required costs" },
              { title: "Change orders", desc: "Approved changes listed separately with reference numbers and dates" },
              { title: "Progress status", desc: "Which phases are complete, in progress, or upcoming with % complete" },
              { title: "Lien waiver note", desc: "Statement that lien waiver will be provided upon receipt of payment" },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO content: construction invoicing best practices */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Construction invoicing best practices</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Cash flow problems kill more construction businesses than bad workmanship. A 2023 industry survey found that 67% of contractors have carried unpaid invoices for more than 60 days, and the average small contractor finances $15,000–$40,000 in work-in-progress at any given time. The difference between contractors who maintain healthy cash flow and those who struggle is almost always their invoicing discipline.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Use progress billing, not lump-sum invoicing</h3>
            <p>
              Never wait until a job is complete to send a single invoice. Break every project into phases — demolition, framing, rough-in, finish, final walkthrough — and invoice at each milestone. Progress billing matches your cash inflows to your material and labor expenses. For a $30,000 kitchen remodel, invoicing at five milestones means you collect roughly $6,000 every one to two weeks instead of waiting 6–8 weeks for a single payment.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Separate labor from materials</h3>
            <p>
              Clients who see a single lump number for each phase wonder whether they are overpaying. When you break it down — $4,800 labor plus $3,200 materials for framing — the total feels justified. This also protects you in disputes: you can show that materials were purchased at cost and your labor rate is consistent across phases. Keep receipts for every materials purchase and be prepared to share them if asked.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Document change orders immediately</h3>
            <p>
              Scope changes are where most construction payment disputes begin. When a client asks for something outside the original contract, document the change order in writing before starting the work. Include a description of the change, the additional cost, and the schedule impact. Reference the change order number on your invoice. Verbal approvals are worthless in a dispute — get it in writing every time.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Require deposits before ordering materials</h3>
            <p>
              For any construction project, require a 10–25% deposit before you order materials or schedule subcontractors. This commitment from the client reduces your financial exposure and signals serious intent. Structure the remaining payments as progress billing tied to phase completion. If a client refuses any deposit, consider that a red flag — established property owners and developers expect this practice from professional contractors.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Include lien rights information</h3>
            <p>
              In most states, contractors and subcontractors who are not paid can file a mechanic&apos;s lien against the property. Include your lien rights notice on every invoice — this is both a legal requirement in some jurisdictions and a powerful incentive for timely payment. Offer to provide a conditional lien waiver with each progress payment and an unconditional waiver with the final payment. This protects both you and the property owner.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-xl bg-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Stop chasing construction payments</h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto">
            TradeQuote creates professional construction invoices and estimates your clients can approve and pay with one tap. Progress billing, change orders, and payment tracking — all built in.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-amber-400"
          >
            Create and send construction invoices — free
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
          <h2 className="text-xl font-bold">More invoice templates</h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link href="/templates/general-contractor-estimate" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">General Contractor Estimate</h3>
              <p className="mt-1 text-sm text-slate-500">Cost calculator for remodels, additions, and new construction</p>
            </Link>
            <Link href="/templates/independent-contractor-invoice" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Independent Contractor Invoice</h3>
              <p className="mt-1 text-sm text-slate-500">Hourly billing, project fees, and 1099 contractor invoices</p>
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
