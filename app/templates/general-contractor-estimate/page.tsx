import type { Metadata } from "next";
import Link from "next/link";
import { EstimateGenerator } from "./estimate-generator";

export const metadata: Metadata = {
  title: "Free General Contractor Estimate Template | TradeQuote",
  description:
    "Free general contractor estimate template with an inline calculator. Build project estimates for kitchen remodels, additions, renovations, and more. Download or create professional GC estimates with TradeQuote.",
  keywords: [
    "general contractor estimate template",
    "contractor estimate template",
    "free contractor estimate template",
    "general contractor bid template",
    "construction estimate template",
    "remodeling estimate template",
    "home renovation estimate template",
    "contractor proposal template",
  ],
};

const sampleLineItems = [
  { description: "Demo existing kitchen (cabinets, flooring, backsplash)", amount: "$3,200" },
  { description: "Plumbing rough-in — relocate sink + dishwasher lines", amount: "$2,800" },
  { description: "Electrical — 4 new circuits, undercabinet LED wiring", amount: "$2,400" },
  { description: "Custom cabinetry (soft-close, 12 linear ft uppers + lowers)", amount: "$9,600" },
  { description: "Quartz countertops — 45 sq ft, installed", amount: "$4,500" },
  { description: "Tile backsplash — 30 sq ft subway tile", amount: "$1,200" },
  { description: "LVP flooring — 200 sq ft, installed", amount: "$2,000" },
  { description: "Painting — walls, ceiling, trim (200 sq ft kitchen)", amount: "$1,100" },
  { description: "Permits + inspections (building, plumbing, electrical)", amount: "$850" },
  { description: "Dumpster + debris hauling", amount: "$650" },
  { description: "GC management fee (20%)", amount: "$5,660" },
];

const tradeTemplates = [
  { title: "Roofing Estimate", href: "/templates/roofing-estimate", desc: "New roofs, repairs, and full replacements" },
  { title: "Plumbing Estimate", href: "/templates/plumbing-estimate", desc: "Faucet repairs, drain clearing, and pipe work" },
  { title: "Plumbing Invoice", href: "/templates/plumbing-invoice", desc: "Service invoices for plumbing work" },
  { title: "Plumber Estimate", href: "/templates/plumber-estimate", desc: "Labor, parts, and disposal line items" },
  { title: "Electrical Estimate", href: "/templates/electrical-estimate", desc: "Panel upgrades, wiring, and outlet installs" },
  { title: "Electrician Invoice", href: "/templates/electrician-invoice", desc: "Service invoices for electrical work" },
  { title: "Electrician Quote", href: "/templates/electrician-quote", desc: "Quotes for electrical jobs" },
  { title: "HVAC Estimate", href: "/templates/hvac-estimate", desc: "Installations, repairs, and maintenance" },
  { title: "Handyman Invoice", href: "/templates/handyman-invoice", desc: "Multi-trade service invoices" },
  { title: "Landscaping Estimate", href: "/templates/landscaping-estimate", desc: "Lawn care, hardscaping, and landscape design" },
  { title: "Lawn Care Invoice", href: "/templates/lawn-care-invoice", desc: "Mowing, edging, and seasonal cleanup" },
  { title: "Cleaning Invoice", href: "/templates/cleaning-invoice", desc: "House cleaning and commercial cleaning" },
  { title: "Auto Body Repair Invoice", href: "/templates/auto-body-repair-invoice", desc: "Collision repair, paint, and panel work" },
  { title: "Pressure Washing Estimate", href: "/templates/pressure-washing-estimate", desc: "Driveways, decks, siding, and patios" },
];

const faqItems = [
  {
    question: "What should a general contractor estimate include?",
    answer:
      "A GC estimate should include: contractor license and insurance info, detailed scope of work for every trade involved (plumbing, electrical, HVAC, carpentry, painting), material specifications and allowances, a line-item breakdown of labor and materials per trade, permit costs, a GC management fee (typically 15-25%), project timeline with milestones, payment schedule tied to milestones, warranty terms, and a change order process.",
  },
  {
    question: "How much does a general contractor charge?",
    answer:
      "General contractors typically charge 15-25% of total project cost as their management fee, covering scheduling, subcontractor coordination, permits, inspections, and project oversight. On a $50,000 kitchen remodel, expect $7,500-$12,500 in GC fees. Some GCs use cost-plus pricing (actual costs + fixed percentage), while others bid fixed-price. Always get the fee structure in writing before work begins.",
  },
  {
    question: "How do I compare general contractor estimates?",
    answer:
      "Compare estimates line by line, not just totals. Check: Are the same materials specified? Does each estimate include the same scope (one might exclude painting or flooring)? Are permits included or extra? What is the GC markup percentage? What is the payment schedule? A lower total often means a smaller scope — not a better deal. Ask each GC to use the same specifications so you are comparing apples to apples.",
  },
  {
    question: "What is the difference between an estimate and a bid?",
    answer:
      "An estimate is an approximation that can change as the project develops — common for renovations where hidden conditions (mold, outdated wiring) are discovered during demo. A bid or fixed-price proposal locks in a total cost; the GC absorbs overruns. Estimates are typical for remodels; bids are typical for new construction where the scope is fully defined. Most GCs start with an estimate and convert to a fixed price after detailed planning.",
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

export default function GeneralContractorEstimateTemplate() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">TradeQuote</Link>
          <Link href="/register" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">Create free estimate</Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Free General Contractor Estimate Template
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Use the calculator below to build a general contractor estimate for any residential project — kitchen remodels, bathroom renovations, additions, or full gut renovations. Or skip the spreadsheet and use TradeQuote to create, send, and track professional estimates your clients approve with one tap.
        </p>

        {/* Inline estimate generator */}
        <section className="mt-10">
          <h2 className="text-xl font-bold">General contractor estimate calculator</h2>
          <p className="mt-2 text-sm text-slate-500">
            Select your project type, finish level, and square footage to get an instant estimate with a full cost breakdown including GC markup.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
            <EstimateGenerator />
          </div>
        </section>

        {/* Sample estimate */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Sample general contractor estimate</h2>
          <p className="mt-2 text-sm text-slate-500">
            Here is what a professional GC estimate looks like for a mid-range kitchen remodel.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white">
              <p className="font-bold">Cornerstone Construction LLC</p>
              <p className="text-sm text-slate-400">Estimate #GC-3087 · Valid for 30 days</p>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-slate-500">
                Prepared for: <span className="text-slate-900 font-medium">Sarah & David Chen</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">Project: Kitchen remodel — 200 sq ft, mid-range finishes</p>
              <table className="w-full mt-4 text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="text-left pb-2">Description</th>
                    <th className="text-right pb-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleLineItems.map((item) => (
                    <tr key={item.description} className="border-b border-slate-100">
                      <td className="py-2.5">{item.description}</td>
                      <td className="py-2.5 text-right font-medium">{item.amount}</td>
                    </tr>
                  ))}
                  <tr className="text-slate-500">
                    <td className="py-2 text-right" colSpan={2}>Subtotal: $33,960</td>
                  </tr>
                  <tr className="text-slate-500">
                    <td className="py-1 text-right" colSpan={2}>Tax (8%): $2,264</td>
                  </tr>
                  <tr className="font-bold text-lg">
                    <td className="py-2 text-right" colSpan={2}>Total: $36,224</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* What to include */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">What every GC estimate needs</h2>
          <p className="mt-2 text-sm text-slate-600">
            A complete general contractor estimate protects you from scope creep and gives clients confidence to sign. Include these elements:
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Contractor info", desc: "Business name, GC license number, insurance certificate, and contact details" },
              { title: "Project scope", desc: "Detailed description of all work — demo, structural, mechanical, finishes" },
              { title: "Trade breakdown", desc: "Separate line items for each sub: plumbing, electrical, HVAC, carpentry, painting" },
              { title: "Material specs", desc: "Brand, model, color, and grade for all specified materials and allowances" },
              { title: "Timeline", desc: "Start date, milestone dates (demo complete, rough-in, finishes), and completion date" },
              { title: "Payment schedule", desc: "Deposit, progress payments tied to milestones, and final payment on completion" },
              { title: "Change orders", desc: "Process for handling scope changes — written approval required before work proceeds" },
              { title: "Exclusions", desc: "What is NOT included — furniture, appliances, landscaping, or items outside scope" },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO content */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">General contractor estimate best practices</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              A general contractor manages the most complex projects a homeowner will ever undertake — kitchen remodels, additions, full renovations. Your estimate coordinates multiple trades, hundreds of material selections, and a timeline measured in weeks or months. Getting it right determines whether the project is profitable for you and stress-free for the client.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Break out every trade as its own section</h3>
            <p>
              A single lump-sum number tells the client nothing. Break your estimate into sections by trade: demolition, framing, plumbing rough-in, electrical rough-in, HVAC, insulation, drywall, painting, flooring, cabinetry, countertops, tile, and final trim. Each section should show labor and materials separately. This transparency builds trust and makes change orders straightforward — the client can see exactly what they are adding or removing.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Use allowances for client-selected items</h3>
            <p>
              Clients rarely finalize every material choice before signing. For items like lighting fixtures, cabinet hardware, tile, and countertops, include a per-unit or per-square-foot allowance. State clearly: &quot;Countertop allowance: $60/sq ft installed. Selections above this allowance will be billed at actual cost.&quot; This locks in a budget while giving the client flexibility — and protects your margin from surprise upgrades.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Tie payments to milestones, not dates</h3>
            <p>
              Never bill on a calendar schedule — bill on completion milestones. A typical structure: 10% deposit to secure scheduling, 25% at demo complete, 25% at rough-in inspection passed, 25% at finish work start, 15% at final walkthrough and punch list complete. This protects the client (they only pay for completed work) and protects you (you are never financing the project out of pocket for long).
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Define your change order process upfront</h3>
            <p>
              Every renovation has surprises — hidden water damage, outdated wiring that does not meet code, a client who changes their mind on tile. Your estimate should include a change order clause: all scope changes require written approval before work proceeds, with a line-item cost adjustment and timeline impact. This one paragraph prevents 90% of the disputes that destroy contractor-client relationships.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Include a contingency line</h3>
            <p>
              For renovation and remodel projects, include a 10-15% contingency allowance for unforeseen conditions. New construction might only need 5%. Be explicit: &quot;Contingency (10%): $5,000 — covers unforeseen conditions discovered during demolition or construction. Unused contingency is not billed.&quot; Clients appreciate the honesty, and it prevents the awkward mid-project call asking for more money.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-xl bg-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Skip the spreadsheet</h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto">
            TradeQuote creates professional estimates your clients can approve with one tap. Coordinate subs, track approvals, and get paid — all in one place.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-amber-400"
          >
            Create professional estimates — free
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

        {/* Trade-specific templates — hub cross-links */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Trade-specific estimate templates</h2>
          <p className="mt-2 text-sm text-slate-600">
            Need an estimate for a specific trade? Use one of our specialized templates with built-in calculators for each trade.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {tradeTemplates.map((t) => (
              <Link key={t.href} href={t.href} className="rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
                <h3 className="font-semibold">{t.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{t.desc}</p>
              </Link>
            ))}
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
