import type { Metadata } from "next";
import Link from "next/link";
import { InvoiceGenerator } from "./invoice-generator";

export const metadata: Metadata = {
  title: "Free Construction Invoice Template | TradeQuote",
  description:
    "Free construction invoice template with labor, materials, and project tracking. Create, preview, and download professional construction company invoices instantly.",
  keywords: [
    "construction invoice template",
    "construction work invoice template",
    "invoice template for construction",
    "construction company invoice template",
    "construction billing invoice template",
    "free construction invoice template",
  ],
};

const sampleLineItems = [
  { description: "Demo — remove existing kitchen cabinets and flooring", hours: "16", rate: "$55", materials: "$0" },
  { description: "Framing — new island and modified wall opening", hours: "24", rate: "$55", materials: "$1,420" },
  { description: "Electrical rough-in — 6 new circuits, panel upgrade", hours: "12", rate: "$85", materials: "$890" },
  { description: "Plumbing rough-in — relocate sink and dishwasher lines", hours: "8", rate: "$80", materials: "$340" },
  { description: "Drywall, tape, and finish", hours: "20", rate: "$50", materials: "$480" },
];

const faqItems = [
  {
    question: "What should a construction invoice include?",
    answer:
      "A professional construction invoice should include: your company name, license number, and contact info; client name and project address; invoice number and date; detailed work descriptions for each phase or trade; labor hours and rates per task; materials itemized with costs; equipment rental charges if applicable; permit fees; subtotal, tax, and total due; payment terms and lien waiver status.",
  },
  {
    question: "How do construction companies bill for materials?",
    answer:
      "Most construction companies bill materials at cost plus a 10–20% markup to cover procurement, delivery coordination, and waste. Always itemize materials separately from labor — clients expect transparency on material costs, especially for large projects. Keep receipts for every purchase. For projects over $10,000, provide material allowances in the contract and reconcile actuals against allowances on each invoice.",
  },
  {
    question: "Should construction invoices use progress billing?",
    answer:
      "Yes. For projects over $5,000, progress billing (also called draw requests) is standard. Bill at milestones: 10–25% at contract signing, then at completion of each major phase (foundation, framing, rough-ins, finishes). This protects both parties — the client pays only for completed work, and you maintain cash flow throughout the project instead of waiting until the end.",
  },
  {
    question: "What payment terms are standard for construction?",
    answer:
      "Residential construction typically uses Net 30 terms. Commercial construction uses Net 30 to Net 60 depending on project size. For residential remodels under $25,000, many contractors use a deposit (25–33%), progress payments at milestones, and final payment on completion. Always include a late fee clause (1.5%/month is common) and reference your state's mechanics lien rights on the invoice.",
  },
  {
    question: "How do construction invoices handle change orders?",
    answer:
      "Change orders should be invoiced separately or clearly marked as add-ons on your regular invoice. Include: the original scope reference, description of the change, reason for the change, additional labor and materials, and client approval date. Never bury change order costs in regular line items — this is the number one cause of construction payment disputes. Get written approval before starting change order work.",
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
          Create professional construction invoices in minutes. Add your labor, materials, and project details below — then preview and download as PDF. Or use TradeQuote to send invoices your clients can approve and pay with one tap.
        </p>

        {/* Inline invoice generator */}
        <section className="mt-10">
          <h2 className="text-xl font-bold">Build your invoice</h2>
          <p className="mt-2 text-sm text-slate-500">
            Add work descriptions, labor hours, rates, and material costs for each phase. Preview your invoice and save it as a PDF.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
            <InvoiceGenerator />
          </div>
        </section>

        {/* Sample invoice */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Sample construction invoice</h2>
          <p className="mt-2 text-sm text-slate-500">
            Here is what a professional construction invoice looks like for a kitchen remodel project.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white">
              <p className="font-bold">Summit Builders LLC</p>
              <p className="text-sm text-slate-400">Invoice #SB-2026-047 · March 22, 2026</p>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-slate-500">
                Bill to: <span className="text-slate-900 font-medium">Mark and Lisa Chen</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">Project: Kitchen remodel — 456 Elm Street (Draw #2 of 4)</p>
              <table className="w-full mt-4 text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="text-left pb-2">Work Description</th>
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
                    <td colSpan={3} className="py-2 text-right">Subtotal: $8,050.00</td>
                  </tr>
                  <tr className="text-slate-500">
                    <td colSpan={3} className="py-1 text-right">Tax (8%): $644.00</td>
                  </tr>
                  <tr className="font-bold text-lg">
                    <td colSpan={3} className="py-2 text-right">Total: $8,694.00</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 text-xs text-slate-400">Payment terms: Net 30 · License #RBC-44821</p>
            </div>
          </div>
        </section>

        {/* What to include */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">What every construction invoice needs</h2>
          <p className="mt-2 text-sm text-slate-600">
            A complete construction invoice protects your lien rights, speeds up payment, and keeps projects on budget.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Company info", desc: "Legal name, license number, insurance info, address, and contact" },
              { title: "Project details", desc: "Client name, job site address, contract reference, and draw number" },
              { title: "Work descriptions", desc: "Each phase or trade described clearly with scope of work completed" },
              { title: "Labor and materials", desc: "Hours per trade, rates, and materials itemized with markup noted" },
              { title: "Permits and fees", desc: "Building permits, inspection fees, and equipment rental charges" },
              { title: "Payment terms", desc: "Due date, retainage percentage, lien waiver status, and late fee policy" },
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
              Cash flow is the leading cause of construction business failure. A 2023 industry survey found that 82% of construction company failures are caused by cash flow problems, not lack of work. The difference between thriving and closing often comes down to how you invoice — specifically, how fast you bill, how clearly you document, and how firmly you enforce payment terms.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Use progress billing for every project over $5,000</h3>
            <p>
              Never wait until project completion to invoice. Structure your contract with milestone-based draws: deposit at signing (10–25%), then payments at foundation, framing, rough-ins, and final completion. This keeps cash flowing throughout the project and limits your exposure if a client stops paying. Most states require contractors to provide lien waivers at each draw — include conditional waivers with progress invoices and unconditional waivers with the final invoice.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Itemize everything — labor, materials, and subs</h3>
            <p>
              Construction clients expect detailed breakdowns. List each trade separately (framing, electrical, plumbing, drywall), with labor hours, rates, and materials for each. For subcontractor work, show the sub invoice total plus your coordination markup (typically 10–15%). This transparency builds trust and dramatically reduces disputes — the client can see exactly where their money went.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Handle change orders as separate line items</h3>
            <p>
              Change orders are the number one source of construction payment disputes. When scope changes, document it immediately: original scope reference, description of change, client approval date, and additional cost. Invoice change orders as clearly labeled add-ons, never buried in regular line items. Get written approval before starting any change order work — verbal agreements become he-said-she-said disputes at payment time.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Include your license number on every invoice</h3>
            <p>
              Your contractor license number on every invoice signals professionalism and protects your legal standing. In most states, unlicensed contractors cannot file mechanics liens or enforce payment in court. Including your license number also makes it easy for clients to verify your credentials — which builds confidence, especially on large residential projects where homeowners are spending their savings.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Send invoices the day work completes</h3>
            <p>
              Construction invoices sent within 24 hours of milestone completion are paid 40% faster than those sent a week later. The client just saw the work get done — the framing is up, the roof is on, the rough-ins passed inspection. Their appreciation for your work is at its peak. Every day you delay invoicing, you push payment further out. Build invoicing into your project closeout routine: inspection passes, photos taken, invoice sent — same day.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-xl bg-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Stop chasing construction payments</h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto">
            TradeQuote creates professional invoices and estimates your clients can approve and pay with one tap. No PDFs, no printing, no follow-up calls.
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
          <h2 className="text-xl font-bold">More templates for construction</h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link href="/templates/general-contractor-estimate" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">General Contractor Estimate Template</h3>
              <p className="mt-1 text-sm text-slate-500">For project bids with GC markup, permits, and design fees</p>
            </Link>
            <Link href="/templates/roofing-estimate" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Roofing Estimate Template</h3>
              <p className="mt-1 text-sm text-slate-500">For new roofs, repairs, and replacements</p>
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
