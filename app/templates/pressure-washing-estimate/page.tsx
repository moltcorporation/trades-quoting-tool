import type { Metadata } from "next";
import Link from "next/link";
import { EstimateCalculator } from "./estimate-calculator";

export const metadata: Metadata = {
  title: "Free Pressure Washing Estimate Template | TradeQuote",
  description:
    "Free pressure washing estimate template with an inline calculator. Select surface type and job size to get an instant pressure washing estimate. Download or create professional estimates with TradeQuote.",
  keywords: [
    "pressure washing estimate template",
    "pressure washing estimate template pdf",
    "free pressure washing estimate",
    "pressure washing quote template",
    "power washing estimate template",
    "pressure washing bid template",
    "pressure washing pricing template",
    "pressure washing proposal",
  ],
};

const sampleLineItems = [
  { description: "Pressure wash concrete driveway (800 sq ft)", amount: "$160" },
  { description: "Pressure wash front walkway & steps (200 sq ft)", amount: "$50" },
  { description: "Soft wash vinyl siding — front & sides (1,400 sq ft)", amount: "$420" },
  { description: "Soft wash chemicals (sodium hypochlorite + surfactant)", amount: "$75" },
  { description: "Pressure wash back patio (400 sq ft)", amount: "$80" },
  { description: "Concrete sealer application — driveway (800 sq ft)", amount: "$160" },
  { description: "Equipment setup, travel & cleanup", amount: "$50" },
];

const faqItems = [
  {
    question: "What should a pressure washing estimate include?",
    answer:
      "A professional pressure washing estimate should include: your business name, insurance details, and contact info; client property address; surfaces to be cleaned with square footage for each; cleaning method (pressure wash vs. soft wash) for each surface; chemicals and sealants being used; total price with line items; any prep work or post-wash treatments; and a validity period (typically 30 days).",
  },
  {
    question: "How much does pressure washing cost?",
    answer:
      "Pressure washing costs $0.10 to $0.50 per square foot depending on the surface. Driveways and concrete run $0.15–$0.25/sq ft. House siding soft wash costs $0.25–$0.40/sq ft. Decks cost $0.25–$0.40/sq ft. Most jobs have a minimum charge of $100–$200. A typical residential whole-house package (driveway + siding + patio) runs $300–$700. Commercial jobs are priced per square foot with volume discounts.",
  },
  {
    question: "What is the difference between pressure washing and soft washing?",
    answer:
      "Pressure washing uses high-pressure water (2,000–4,000 PSI) to blast dirt, grime, and stains off hard surfaces like concrete, brick, and stone. Soft washing uses low pressure (under 1,000 PSI) combined with cleaning chemicals to safely clean delicate surfaces like vinyl siding, stucco, roofing shingles, and painted wood. Using high pressure on siding or roofs can cause damage — always soft wash those surfaces.",
  },
  {
    question: "How do I price pressure washing jobs by square footage?",
    answer:
      "Measure each surface area in square feet (length × width for flat surfaces, height × width for siding). Apply your per-square-foot rate based on surface type. Add a setup/travel fee ($50–$100) and chemical costs for soft wash jobs. Most contractors use a minimum charge of $100–$200 regardless of area. For repeat customers or multi-surface packages, offer a 10–15% bundle discount. Always quote total price, not hourly — customers want certainty.",
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

export default function PressureWashingEstimateTemplate() {
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
          Free Pressure Washing Estimate Template
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Use the calculator below to generate a pressure washing estimate for any surface — driveways, decks, siding, patios, and more. Or skip the spreadsheet and use TradeQuote to create, send, and track professional estimates your clients approve with one tap.
        </p>

        {/* Inline estimate calculator */}
        <section className="mt-10">
          <h2 className="text-xl font-bold">Pressure washing estimate calculator</h2>
          <p className="mt-2 text-sm text-slate-500">
            Select your surface type and job size to get an instant estimate with a full cost breakdown.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
            <EstimateCalculator />
          </div>
        </section>

        {/* Sample estimate */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Sample pressure washing estimate</h2>
          <p className="mt-2 text-sm text-slate-500">
            Here is what a professional pressure washing estimate looks like for a typical residential whole-house package.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white">
              <p className="font-bold">CleanBlast Pressure Washing LLC</p>
              <p className="text-sm text-slate-400">Estimate #PW-2041 · Valid for 30 days</p>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-slate-500">
                Prepared for: <span className="text-slate-900 font-medium">Sarah & Tom Rivera</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">Job: Whole-house exterior cleaning — driveway, walkway, siding, patio + driveway sealer</p>
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
                    <td className="py-2 text-right" colSpan={2}>Subtotal: $995</td>
                  </tr>
                  <tr className="text-slate-500">
                    <td className="py-1 text-right" colSpan={2}>Tax (8%): $79.60</td>
                  </tr>
                  <tr className="font-bold text-lg">
                    <td className="py-2 text-right" colSpan={2}>Total: $1,074.60</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* What to include */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">What every pressure washing estimate needs</h2>
          <p className="mt-2 text-sm text-slate-600">
            A complete pressure washing estimate sets expectations, prevents disputes, and helps you win the job over competitors who quote a single number over the phone.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Business info", desc: "Company name, phone, email, insurance certificate number, and license" },
              { title: "Property details", desc: "Client name, property address, and access notes (gate codes, hose bibs)" },
              { title: "Surface inventory", desc: "Each surface to be cleaned, its material, and measured square footage" },
              { title: "Cleaning method", desc: "Pressure wash vs. soft wash for each surface, with PSI and chemical specs" },
              { title: "Line items", desc: "Labor, chemicals, sealants, and setup/travel fees listed separately" },
              { title: "Post-wash treatments", desc: "Sealant application, rust removal, or stain treatment with pricing" },
              { title: "Timeline", desc: "Scheduled date, estimated duration, and weather contingency policy" },
              { title: "Payment terms", desc: "Due on completion, accepted methods, and any deposit requirements" },
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
          <h2 className="text-xl font-bold">Pressure washing estimate best practices</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Pressure washing is one of the fastest-growing segments in the trades, with low startup costs and high demand from homeowners and property managers. But many pressure washing businesses lose money or leave it on the table because they quote jobs without a proper estimate. A professional estimate is not just a price — it is your sales pitch, your scope of work agreement, and your legal protection rolled into one document.
            </p>

            <h3 className="font-semibold text-slate-900 text-base">Always measure surfaces before quoting</h3>
            <p>
              The most common pricing mistake in pressure washing is eyeballing square footage. A driveway that &quot;looks like 500 square feet&quot; might actually be 800 — and at $0.20/sq ft, that is $60 you are giving away. Bring a measuring wheel on every site visit. It takes 10 minutes and pays for itself on every job. Measure each surface separately: driveway, walkways, patio, deck, siding (height × perimeter). Listing exact square footage on the estimate builds credibility and justifies your pricing.
            </p>

            <h3 className="font-semibold text-slate-900 text-base">Know when to pressure wash vs. soft wash</h3>
            <p>
              Using 3,000+ PSI on vinyl siding will blow holes in it. Pressure washing asphalt shingles will strip granules and void the manufacturer warranty. Soft washing — low pressure (under 1,000 PSI) combined with a sodium hypochlorite or sodium percarbonate solution — is the correct method for siding, stucco, painted surfaces, roofs, and wood decks. Hard surfaces like concrete, brick, and stone can handle full pressure. Your estimate should specify the method for each surface. This shows expertise and protects you from liability if a surface is damaged because the homeowner insisted on the wrong method.
            </p>

            <h3 className="font-semibold text-slate-900 text-base">Price by surface type, not by the hour</h3>
            <p>
              Hourly pricing punishes efficiency. As you get faster with better equipment and technique, your earnings drop. Per-square-foot pricing rewards investment in your business. Industry standard rates: concrete and brick $0.10–$0.25/sq ft, wood decks $0.25–$0.40/sq ft, siding soft wash $0.25–$0.40/sq ft, roof soft wash $0.30–$0.50/sq ft. Set a minimum charge ($100–$200) to cover travel and setup costs on small jobs. Present the total price on the estimate, not your per-square-foot rate — customers want a number, not a formula.
            </p>

            <h3 className="font-semibold text-slate-900 text-base">Account for chemical costs on soft wash jobs</h3>
            <p>
              Sodium hypochlorite (pool-grade bleach), surfactant, and downstream injection equipment are real costs. A typical residential soft wash uses 5–15 gallons of SH mix plus surfactant. At current bulk prices, chemical cost per job is $30–$100 depending on surface area and organic growth severity. List chemicals as a separate line item. This prevents margin erosion on heavily soiled surfaces that require multiple applications and justifies higher pricing on mold/mildew-heavy jobs.
            </p>

            <h3 className="font-semibold text-slate-900 text-base">Offer sealant as an upsell</h3>
            <p>
              Concrete sealer ($0.05–$0.15/sq ft applied) and deck stain/sealer ($0.20–$0.40/sq ft) are natural upsells that add $50–$300 to every job. Customers who just had their driveway or deck cleaned are in the perfect mindset to protect their investment. Include sealant as an optional line item on the estimate with a brief note explaining the benefit: &quot;Extends clean appearance 2–3 years, prevents future staining.&quot; This lifts average ticket size by 20–30% without additional marketing cost.
            </p>

            <h3 className="font-semibold text-slate-900 text-base">Bundle surfaces for higher tickets</h3>
            <p>
              A driveway-only job might be $150–$250. A whole-house package (driveway + walkway + siding + patio) is $500–$800. Offer a 10–15% package discount on multi-surface jobs. You are already on-site with equipment running — the marginal cost of adding surfaces is low, but the revenue increase is significant. List individual surface prices on the estimate, then show the bundled total with the discount. Seeing the per-surface breakdown makes the bundle feel like a deal rather than an upsell.
            </p>

            <h3 className="font-semibold text-slate-900 text-base">Include a weather policy</h3>
            <p>
              Pressure washing is weather-dependent. Rain before a soft wash job dilutes chemicals and ruins results. Rain during pressure washing is a safety hazard on elevated surfaces. State your weather policy on every estimate: &quot;Job will be rescheduled at no charge if weather conditions are unsafe or would compromise results. We will notify you by 7 AM on the scheduled date.&quot; This sets expectations and prevents the awkward call where the customer insists you work in the rain.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-xl bg-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Skip the spreadsheet</h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto">
            TradeQuote creates professional pressure washing estimates your clients can approve with one tap. No PDFs, no printing, no chasing.
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

        {/* Related templates */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">More estimate templates</h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link href="/templates/landscaping-estimate" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Landscaping Estimate Template</h3>
              <p className="mt-1 text-sm text-slate-500">For lawn care, hardscaping, and landscape design</p>
            </Link>
            <Link href="/templates/cleaning-invoice" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Cleaning Invoice Template</h3>
              <p className="mt-1 text-sm text-slate-500">For residential and commercial cleaning services</p>
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
