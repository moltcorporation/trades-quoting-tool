import type { Metadata } from "next";
import Link from "next/link";
import { InvoiceGenerator } from "./invoice-generator";

export const metadata: Metadata = {
  title: "Free Independent Contractor Invoice Template | TradeQuote",
  description:
    "Free independent contractor invoice template with hourly billing, project fees, and expenses. Create, preview, and download professional 1099 contractor invoices instantly.",
  keywords: [
    "independent contractor invoice template",
    "invoice template for independent contractor",
    "1099 contractor invoice template",
    "freelance contractor invoice",
    "independent contractor billing template",
    "free contractor invoice template",
  ],
};

const sampleLineItems = [
  { description: "UX audit and wireframes (Phase 1)", hours: "12", rate: "$95", expenses: "$0" },
  { description: "Frontend development — landing pages", hours: "28", rate: "$95", expenses: "$49" },
  { description: "API integration and testing", hours: "16", rate: "$95", expenses: "$0" },
  { description: "Deployment and documentation", hours: "6", rate: "$95", expenses: "$0" },
];

const faqItems = [
  {
    question: "What should an independent contractor invoice include?",
    answer:
      "An independent contractor invoice should include: your legal business name and EIN or SSN (for 1099 reporting), client company name and contact, invoice number and date, detailed description of services or deliverables, hours worked and hourly rate (or flat project fee), reimbursable expenses itemized separately, payment terms (typically Net 15 or Net 30), and accepted payment methods.",
  },
  {
    question: "How is a contractor invoice different from an employee paycheck?",
    answer:
      "Contractors invoice for gross pay — no taxes are withheld. You are responsible for paying self-employment tax (15.3%) and quarterly estimated income tax. Clients report payments over $600/year on a 1099-NEC form. Your invoice is your official record, so keep copies of every invoice sent for at least 3 years for IRS purposes.",
  },
  {
    question: "Should independent contractors charge hourly or per project?",
    answer:
      "Both work. Hourly billing (common at $50–$200/hr depending on field) is transparent and protects you from scope creep — the client pays for actual time spent. Project-based pricing gives the client budget certainty and rewards your efficiency. Many contractors start hourly with new clients, then switch to project pricing once they can estimate scope accurately.",
  },
  {
    question: "What payment terms should contractors use?",
    answer:
      "Net 30 is standard but Net 15 is increasingly common and gets you paid faster. For new clients or projects over $5,000, require a 25–50% deposit before starting work. Always include your payment terms on the invoice — 'Due within 30 days of invoice date' is clearer than just 'Net 30.' Late fees (1.5%/month is typical) should be stated upfront in your contract.",
  },
  {
    question: "How do independent contractors handle expenses on invoices?",
    answer:
      "List reimbursable expenses as separate line items below your service charges — never bury them in your hourly rate. Common reimbursable expenses include software subscriptions, travel, hosting costs, and subcontractor fees. Attach receipts when the contract requires it. Non-reimbursable business expenses (home office, equipment) go on your Schedule C at tax time, not on client invoices.",
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

export default function IndependentContractorInvoiceTemplate() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Free Independent Contractor Invoice Template
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Create professional contractor invoices in minutes. Add your services, hours, and expenses below — then preview and download as PDF. Or skip the hassle and use TradeQuote to send invoices your clients can pay with one tap.
        </p>

        {/* Inline invoice generator */}
        <section className="mt-10">
          <h2 className="text-xl font-bold">Build your invoice</h2>
          <p className="mt-2 text-sm text-slate-500">
            Add your services or deliverables, hours, rates, and reimbursable expenses. Preview your invoice and save it as a PDF.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
            <InvoiceGenerator />
          </div>
        </section>

        {/* Sample invoice */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Sample independent contractor invoice</h2>
          <p className="mt-2 text-sm text-slate-500">
            Here is what a professional contractor invoice looks like for a typical web development project.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white">
              <p className="font-bold">Rivera Digital LLC</p>
              <p className="text-sm text-slate-400">Invoice #2024-031 · March 22, 2026</p>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-slate-500">
                Bill to: <span className="text-slate-900 font-medium">Apex Marketing Group</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">Project: Website redesign — Phase 1</p>
              <table className="w-full mt-4 text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="text-left pb-2">Service</th>
                    <th className="text-right pb-2">Labor</th>
                    <th className="text-right pb-2">Expenses</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleLineItems.map((item) => (
                    <tr key={item.description} className="border-b border-slate-100">
                      <td className="py-2.5">{item.description}</td>
                      <td className="py-2.5 text-right">{item.hours}h × {item.rate}</td>
                      <td className="py-2.5 text-right font-medium">{item.expenses}</td>
                    </tr>
                  ))}
                  <tr className="text-slate-500">
                    <td colSpan={3} className="py-2 text-right">Subtotal: $5,939.00</td>
                  </tr>
                  <tr className="font-bold text-lg">
                    <td colSpan={3} className="py-2 text-right">Total: $5,939.00</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 text-xs text-slate-400">Payment terms: Net 30 · EIN: XX-XXXXXXX</p>
            </div>
          </div>
        </section>

        {/* What to include */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">What every contractor invoice needs</h2>
          <p className="mt-2 text-sm text-slate-600">
            A complete independent contractor invoice protects you legally, speeds up payment, and keeps your 1099 records clean.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Business identity", desc: "Legal business name, EIN or SSN, address, phone, and email" },
              { title: "Client details", desc: "Company name, billing contact, address, and PO number if required" },
              { title: "Service descriptions", desc: "Each deliverable or task described clearly with dates of service" },
              { title: "Hours and rates", desc: "Hours worked, hourly rate, or flat project fee per deliverable" },
              { title: "Expenses", desc: "Reimbursable expenses itemized separately with receipts if required" },
              { title: "Payment terms", desc: "Net 15/30, accepted methods, late fee policy, and bank details for ACH" },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO content: contractor invoicing best practices */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Independent contractor invoicing best practices</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Getting paid on time is the number one challenge for independent contractors. A 2023 survey found that 58% of freelancers and contractors have been paid late, and the average overdue invoice sits unpaid for 21 days past terms. The difference between contractors who get paid on time and those who chase payments is almost always the invoice itself.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Use sequential invoice numbers</h3>
            <p>
              Number every invoice sequentially (INV-2024-001, INV-2024-002) or by client and date (ACME-2024-03). This makes it easy for clients to reference specific invoices in their AP system, and it gives you a clean audit trail for tax season. The IRS expects contractors to maintain organized records of all income — sequential invoicing makes Schedule C preparation straightforward.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Invoice immediately upon delivery</h3>
            <p>
              Send your invoice the same day you deliver work or complete a milestone. Invoices sent within 24 hours of delivery are paid 1.5x faster than those sent a week later. The client just received your work product — their perceived value and willingness to pay is at its peak. Waiting even 3–5 days lets the urgency fade.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Separate services from expenses</h3>
            <p>
              Never lump expenses into your hourly rate. Clients who see a single number wonder if they are overpaying. When you break it down — 28 hours at $95/hour plus $49 for a software license — the total feels justified. Itemized invoices also protect you in disputes: the client approved the hours and the expenses are receipted.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Require deposits on large projects</h3>
            <p>
              For any project over $3,000, require a 25–50% deposit before starting. This protects you from non-payment and signals client commitment. Structure milestones: 50% upfront, 25% at midpoint, 25% on delivery. If a client refuses deposits entirely, that is a red flag — established businesses expect this practice from professional contractors.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Include your EIN and keep 1099 records</h3>
            <p>
              If you earn over $600 from a single client, they must file a 1099-NEC. Including your EIN (or SSN for sole proprietors) on every invoice saves your client from chasing it at year-end and demonstrates professionalism. Keep copies of every invoice for at least 3 years — the IRS statute of limitations for income audits. Digital invoicing tools that archive automatically eliminate this overhead.
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
            href="/register"
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
          <h2 className="text-xl font-bold">More invoice templates</h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link href="/templates/handyman-invoice" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Handyman Invoice Template</h3>
              <p className="mt-1 text-sm text-slate-500">For multi-task home repair and maintenance visits</p>
            </Link>
            <Link href="/templates/cleaning-invoice" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Cleaning Invoice Template</h3>
              <p className="mt-1 text-sm text-slate-500">For house cleaning, carpet cleaning, and commercial cleaning</p>
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
