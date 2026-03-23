import type { Metadata } from "next";
import Link from "next/link";
import { InvoiceGenerator } from "./invoice-generator";

export const metadata: Metadata = {
  title: "Free Electrician Invoice Template | TradeQuote",
  description:
    "Free electrician invoice template with service types, materials, labor hours, and permit fees. Create, preview, and download professional electrical invoices instantly.",
  keywords: [
    "electrician invoice template",
    "electrician invoice template free",
    "self employed electrician invoice template",
    "electrician invoice",
    "electrical invoice template",
    "free electrician invoice",
  ],
};

const sampleLineItems = [
  { description: "200A panel upgrade (breaker box)", hours: "4", rate: "$95", materials: "$620" },
  { description: "Install 4 recessed LED lights", hours: "2", rate: "$95", materials: "$112" },
  { description: "Replace GFCI outlets (3 locations)", hours: "1", rate: "$95", materials: "$45" },
  { description: "Permit fee — residential electrical", hours: "—", rate: "—", materials: "$85" },
];

const faqItems = [
  {
    question: "What should an electrician invoice include?",
    answer:
      "A professional electrician invoice should include: your business name, license number, and contact info; client name and service address; invoice date and number; detailed description of each service (panel work, wiring, fixture installs); labor hours and hourly rate; materials itemized with costs; permit fees listed separately; subtotal, tax, total due; and payment terms with accepted methods.",
  },
  {
    question: "How much do electricians charge per hour?",
    answer:
      "Electrician hourly rates typically range from $75 to $150 depending on location, license level, and job complexity. Journeyman electricians average $75–$100/hour, while master electricians charge $100–$150/hour. Emergency or after-hours calls often carry a 1.5x–2x premium. Always list labor and materials separately on your invoice.",
  },
  {
    question: "Should electricians list permit fees on the invoice?",
    answer:
      "Yes. Always itemize permit fees as a separate line item on your invoice. Clients appreciate the transparency, and it protects you from disputes about your pricing. Permit costs vary by municipality — typically $75–$250 for residential work. Listing them separately shows the client exactly what goes to the city versus your business.",
  },
  {
    question: "How do self-employed electricians handle invoicing?",
    answer:
      "Self-employed electricians should invoice immediately after completing each job. Use sequential invoice numbers (INV-001, INV-002) for clean bookkeeping. Include your license number on every invoice — it builds trust and is legally required in most states. Digital invoicing tools like TradeQuote let clients pay with one tap and track every invoice automatically.",
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

export default function ElectricianInvoiceTemplate() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Free Electrician Invoice Template
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Create professional electrician invoices in minutes. Add your services, labor hours, materials, and permit fees below — then preview and download as PDF. Or skip the hassle and use TradeQuote to send invoices your clients can pay with one tap.
        </p>

        {/* Inline invoice generator */}
        <section className="mt-10">
          <h2 className="text-xl font-bold">Build your invoice</h2>
          <p className="mt-2 text-sm text-slate-500">
            Add your electrical services, hours, rates, and materials. Preview your invoice and save it as a PDF.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
            <InvoiceGenerator />
          </div>
        </section>

        {/* Sample invoice */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Sample electrician invoice</h2>
          <p className="mt-2 text-sm text-slate-500">
            Here is what a professional electrician invoice looks like for a typical residential service call with multiple tasks.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white">
              <p className="font-bold">Spark Electric LLC</p>
              <p className="text-sm text-slate-400">Invoice #2041 · March 23, 2026</p>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-slate-500">
                Bill to: <span className="text-slate-900 font-medium">Mark Rivera</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">Job: Residential electrical — panel upgrade + lighting</p>
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
                      <td className="py-2.5 text-right">{item.hours === "—" ? "—" : `${item.hours}h × ${item.rate}`}</td>
                      <td className="py-2.5 text-right font-medium">{item.materials}</td>
                    </tr>
                  ))}
                  <tr className="text-slate-500">
                    <td colSpan={3} className="py-2 text-right">Subtotal: $1,527.00</td>
                  </tr>
                  <tr className="text-slate-500">
                    <td colSpan={3} className="py-1 text-right">Tax (8%): $122.16</td>
                  </tr>
                  <tr className="font-bold text-lg">
                    <td colSpan={3} className="py-2 text-right">Total: $1,649.16</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* What to include */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">What every electrician invoice needs</h2>
          <p className="mt-2 text-sm text-slate-600">
            A complete electrician invoice protects you from disputes, satisfies licensing requirements, and helps you get paid faster. Include these six elements:
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Business and license info", desc: "Your name, phone, email, and state electrical license number" },
              { title: "Client and job site", desc: "Client name, service address, and job description" },
              { title: "Service descriptions", desc: "Each task described clearly — panel work, wiring, fixture installs" },
              { title: "Labor and materials", desc: "Hours, hourly rate, and itemized materials (wire, breakers, fixtures)" },
              { title: "Permit fees", desc: "Municipal permit costs listed as a separate line item" },
              { title: "Payment terms", desc: "Due date, accepted methods (card, check, transfer), late fee policy" },
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
          <h2 className="text-xl font-bold">Electrician invoicing best practices</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              For self-employed electricians and small electrical businesses, professional invoicing is the difference between steady cash flow and chasing payments for weeks. Most electricians lose revenue not because they lack work, but because they invoice informally — handwritten receipts, verbal quotes, or delayed billing days after the job is done.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Always include your license number</h3>
            <p>
              Your electrical license number belongs on every invoice you send. Most states legally require it on all business documents, and clients expect to see it. Beyond compliance, your license number signals professionalism and builds trust — especially for larger jobs like panel upgrades or rewiring projects where clients are spending $1,000 or more.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Itemize materials with specifics</h3>
            <p>
              Electrical materials can be a significant portion of the total bill. A 200-amp breaker panel alone costs $300–$800, plus breakers, wire, and connectors. List each material with its cost rather than bundling everything into one line. When a client sees &quot;200A Square D panel — $520&quot; and &quot;6 AWG copper wire (50ft) — $85,&quot; they understand exactly where their money goes. This transparency dramatically reduces payment disputes.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Separate permit fees from your charges</h3>
            <p>
              Electrical work almost always requires permits — residential permits typically run $75 to $250 depending on the municipality and scope. List permit fees as their own line item, separate from labor and materials. This shows the client that the fee goes to the city, not your pocket. It also makes your own pricing look more competitive when clients compare quotes.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Invoice before you leave the job site</h3>
            <p>
              The client just watched you solve their electrical problem. Their willingness to pay is at its peak. Send the invoice before you pack up your tools. Digital invoicing tools like TradeQuote let you create and send a professional invoice from your phone in under two minutes — and the client can pay with one tap right there.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Require deposits on large jobs</h3>
            <p>
              For jobs over $500 — panel upgrades, whole-house rewiring, new construction rough-ins — require a 50% deposit before starting. This covers your material costs upfront and confirms the client is committed. State your deposit policy on your estimate before the job begins, then reference the deposit as a credit on the final invoice.
            </p>
          </div>
        </section>

        {/* Common billing mistakes */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Common electrician billing mistakes</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Even experienced electricians make invoicing mistakes that cost them money. Avoid these common pitfalls:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Bundling labor and materials into one price.</strong> Clients suspect markup padding. Always separate them.</li>
              <li><strong>Forgetting to charge for diagnostic time.</strong> If you spent 45 minutes troubleshooting before finding the problem, that is billable work. List it as a separate line item.</li>
              <li><strong>Not tracking small materials.</strong> Wire nuts, electrical tape, connectors — they add up. A $5 box of wire nuts across 20 jobs is $100 you absorbed.</li>
              <li><strong>Delayed invoicing.</strong> Sending an invoice a week later signals that payment is not urgent. Same-day invoicing gets paid 30% faster.</li>
              <li><strong>No invoice numbers.</strong> Without sequential numbering, you cannot track what is paid and what is outstanding. Tax season becomes a nightmare.</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-xl bg-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Stop chasing payments</h2>
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
          <h2 className="text-xl font-bold">More templates for tradespeople</h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link href="/templates/handyman-invoice" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Handyman Invoice Template</h3>
              <p className="mt-1 text-sm text-slate-500">For general repairs, installations, and home maintenance</p>
            </Link>
            <Link href="/templates/plumbing-estimate" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Plumbing Estimate Template</h3>
              <p className="mt-1 text-sm text-slate-500">For faucet repairs, drain clearing, and pipe work</p>
            </Link>
            <Link href="/templates/hvac-estimate" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">HVAC Estimate Template</h3>
              <p className="mt-1 text-sm text-slate-500">For heating, cooling, and ventilation jobs</p>
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
