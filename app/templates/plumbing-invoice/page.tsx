import type { Metadata } from "next";
import Link from "next/link";
import { InvoiceGenerator } from "./invoice-generator";
import { TemplateDownloadForm } from "@/components/template-download-form";
import { templateConfigs } from "@/components/template-pdf-configs";

export const metadata: Metadata = {
  title: "Free Plumbing Invoice Template | TradeQuote",
  description:
    "Free plumbing invoice template with labor, parts, and service descriptions. Create, preview, and download professional plumber invoices instantly.",
  keywords: [
    "plumbing invoice template",
    "free plumbing invoice template",
    "plumber invoice template free",
    "plumber invoice",
    "plumbing billing template",
    "free plumber invoice",
    "plumbing service invoice",
  ],
};

const sampleLineItems = [
  { description: "Kitchen faucet replacement (Moen pull-down)", hours: "1.5", rate: "$95", materials: "$189" },
  { description: "Clear bathroom drain — snake 25 ft", hours: "0.75", rate: "$95", materials: "$0" },
  { description: "Replace toilet fill valve and flapper", hours: "0.5", rate: "$95", materials: "$28" },
  { description: "Fix leaking supply line under kitchen sink", hours: "0.5", rate: "$95", materials: "$14" },
];

const faqItems = [
  {
    question: "What should a plumbing invoice include?",
    answer:
      "A professional plumbing invoice should include: your business name, license number, and contact info; client name and service address; invoice date and number; description of each service performed; labor hours and hourly rate; parts and materials with individual costs; subtotal, tax, and total due; and payment terms including due date and accepted payment methods.",
  },
  {
    question: "How much do plumbers charge per hour?",
    answer:
      "Plumber hourly rates typically range from $75 to $150 depending on location, licensing, and job type. Master plumbers often charge $100–$150/hour. Emergency or after-hours calls usually carry a 1.5x to 2x premium. Always list service call or trip fees as a separate line item on your invoice so the client sees exactly what they are paying for.",
  },
  {
    question: "Should plumbers charge separately for parts?",
    answer:
      "Yes. Always itemize parts separately from labor. This builds trust, reduces disputes, and lets clients compare part costs if they want to. Most plumbers apply a 20–30% markup on parts to cover sourcing time and supply house trips. Be transparent about markup — a client who understands why you mark up parts is less likely to question the bill.",
  },
  {
    question: "How do I handle emergency plumbing invoices?",
    answer:
      "For emergency calls, clearly state the emergency rate on your invoice (typically 1.5x to 2x your standard hourly rate). Add a separate line item for the emergency service call fee. Document arrival and completion times. Send the invoice the same day — emergency clients expect fast resolution and fast billing. Digital invoicing tools like TradeQuote let clients pay immediately from their phone.",
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

export default function PlumbingInvoiceTemplate() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Free Plumbing Invoice Template
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Create professional plumbing invoices in minutes. Add your services, labor hours, and parts below — then preview and download as PDF. Or skip the hassle and use TradeQuote to send invoices your clients can pay with one tap.
        </p>

        {/* Inline invoice generator */}
        <section className="mt-10">
          <h2 className="text-xl font-bold">Build your plumbing invoice</h2>
          <p className="mt-2 text-sm text-slate-500">
            Add your services, hours, rates, and parts. Preview your invoice and save it as a PDF.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
            <InvoiceGenerator />
          </div>
        </section>

        {/* Sample invoice */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Sample plumbing invoice</h2>
          <p className="mt-2 text-sm text-slate-500">
            Here is what a professional plumbing invoice looks like for a typical residential service call with multiple repairs.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white">
              <p className="font-bold">Mike&apos;s Plumbing LLC</p>
              <p className="text-sm text-slate-400">Invoice #2041 · March 23, 2026</p>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-slate-500">
                Bill to: <span className="text-slate-900 font-medium">Sarah Johnson</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">Job: Residential service call — 4 repairs</p>
              <table className="w-full mt-4 text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="text-left pb-2">Service</th>
                    <th className="text-right pb-2">Labor</th>
                    <th className="text-right pb-2">Parts</th>
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
                    <td colSpan={3} className="py-2 text-right">Subtotal: $539.75</td>
                  </tr>
                  <tr className="text-slate-500">
                    <td colSpan={3} className="py-1 text-right">Tax (8%): $43.18</td>
                  </tr>
                  <tr className="font-bold text-lg">
                    <td colSpan={3} className="py-2 text-right">Total: $582.93</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>


        {/* Download template */}
        <section className="mt-12">
          <TemplateDownloadForm config={templateConfigs["plumbing-invoice"]} />
        </section>
        {/* What to include */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">What every plumbing invoice needs</h2>
          <p className="mt-2 text-sm text-slate-600">
            A complete plumbing invoice protects your business and gets you paid faster. Include these six elements on every job:
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Business and license info", desc: "Your company name, phone, email, and plumbing license number" },
              { title: "Client and property details", desc: "Client name, service address, and contact info" },
              { title: "Service descriptions", desc: "Each repair or installation described clearly — what was done and where" },
              { title: "Labor and parts", desc: "Hours worked, hourly rate, and itemized parts with individual costs" },
              { title: "Tax and total", desc: "Applicable sales tax on parts and labor, with a clear total due" },
              { title: "Payment terms", desc: "Due date, accepted methods (card, check, transfer), and late fee policy" },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO content: plumbing invoicing best practices */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Plumbing invoicing best practices</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Plumbing is one of the highest-skilled trades, but many plumbers lose thousands of dollars each year to disorganized invoicing. Handwritten receipts, verbal quotes, and delayed billing lead to payment disputes, forgotten charges, and hours spent chasing money instead of running the next call. A structured invoicing process fixes all of this.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Invoice at the job site, not at your desk</h3>
            <p>
              The number one mistake plumbers make is waiting until the end of the week to send invoices. By then, the client has moved on mentally. Invoices sent the same day the work is completed are paid on average 1.5 times faster than invoices sent a week later. The best approach is to generate the invoice while you are still at the property — the client just saw you solve their problem, and their willingness to pay is at its highest. With a mobile invoicing tool, you can build and send the invoice in under two minutes between jobs.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Always itemize parts separately from labor</h3>
            <p>
              A single lump-sum bill makes clients suspicious. When you break down a $600 repair into 2 hours of labor at $95/hour plus a $189 faucet and $28 in fittings, the total feels justified. This transparency builds trust and dramatically reduces callbacks asking &quot;what did I pay for?&quot; Most plumbers apply a 20–30% markup on parts to cover supply house runs and sourcing time — this is standard practice, but being upfront about it prevents disputes.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Common plumbing invoice line items</h3>
            <p>
              A typical residential plumbing invoice includes some combination of these services: faucet installation or replacement, drain clearing and snaking, toilet repair or replacement, garbage disposal installation, water heater service, pipe leak repair, supply line replacement, sump pump installation, water pressure adjustment, and fixture upgrades. Each service should be its own line item with a clear description. Instead of writing &quot;plumbing repair,&quot; write &quot;Replace kitchen faucet with Moen Arbor pull-down (model 7594)&quot; — specificity eliminates confusion and builds a professional record.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Handle service call fees and emergency rates clearly</h3>
            <p>
              Most plumbers charge a service call or trip fee ($50–$100) that covers driving to the property and diagnosing the issue. Always list this as a separate line item on the invoice — never bury it in the labor charge. For emergency calls (evenings, weekends, holidays), state the premium rate explicitly: &quot;Emergency rate: $142.50/hr (1.5x standard).&quot; Clients expect to pay more for urgent service, but they want transparency about how much more. Documenting arrival and departure times adds an extra layer of professionalism.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Accept digital payments to get paid immediately</h3>
            <p>
              Checks bounce and cash creates bookkeeping headaches. Accepting credit cards, Apple Pay, or bank transfers means clients can pay you before you leave the property. Yes, card processing fees take about 2.9%, but on a $500 job that is $14.50 — a fraction of the cost of chasing a late payment for two weeks. For larger jobs ($1,000+), consider requiring a 50% deposit before starting work to protect against cancellations.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Keep records for tax season and warranty claims</h3>
            <p>
              Sequential invoice numbers (PLB-001, PLB-002) make year-end accounting painless. Every invoice should be stored digitally with the date, client, address, and amount. This record serves double duty: when a client calls about a warranty issue six months later, you can pull up exactly what was installed and when. Digital invoicing tools handle all of this automatically — no filing cabinets, no shoeboxes of receipts. At tax time, you have a clean revenue record ready for your accountant.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-xl bg-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Stop chasing plumbing invoices</h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto">
            TradeQuote creates professional plumbing invoices and estimates your clients can approve and pay with one tap. No PDFs, no printing, no follow-up calls.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-amber-400"
          >
            Create professional plumbing invoices — free
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
              <p className="mt-1 text-sm text-slate-500">For quotes on faucet repairs, drain clearing, and pipe work</p>
            </Link>
            <Link href="/templates/handyman-invoice" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Handyman Invoice Template</h3>
              <p className="mt-1 text-sm text-slate-500">For multi-task home repair visits and general maintenance</p>
            </Link>
            <Link href="/templates/cleaning-invoice" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Cleaning Invoice Template</h3>
              <p className="mt-1 text-sm text-slate-500">For house cleaning, carpet cleaning, and janitorial services</p>
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
