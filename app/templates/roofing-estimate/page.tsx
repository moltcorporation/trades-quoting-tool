import type { Metadata } from "next";
import Link from "next/link";
import { EstimateGenerator } from "./estimate-generator";
import { TemplateDownloadForm } from "@/components/template-download-form";
import { templateConfigs } from "@/components/template-pdf-configs";

export const metadata: Metadata = {
  title: "Free Roofing Estimate Template | TradeQuote",
  description:
    "Free roofing estimate template with an inline calculator. Enter job type, square footage, and materials to get an instant roofing estimate. Download or create professional estimates with TradeQuote.",
  keywords: [
    "roofing estimate template",
    "free roofing estimate template",
    "roofing estimate template pdf",
    "roofing repair estimate template",
    "metal roofing estimate template",
    "roof replacement estimate",
    "roofing bid template",
    "roofing contractor estimate",
  ],
};

const sampleLineItems = [
  { description: "Tear off existing asphalt shingles (2,200 sq ft)", amount: "$2,750" },
  { description: "Install GAF Timberline HDZ architectural shingles", amount: "$9,900" },
  { description: "Synthetic underlayment + ice & water shield", amount: "$1,650" },
  { description: "Replace damaged decking (est. 200 sq ft plywood)", amount: "$800" },
  { description: "New drip edge, flashing, and ridge vent", amount: "$950" },
  { description: "Dumpster and debris removal", amount: "$450" },
  { description: "Building permit", amount: "$350" },
];

const faqItems = [
  {
    question: "What should a roofing estimate include?",
    answer:
      "A professional roofing estimate should include: contractor name and license number, client name and property address, detailed scope of work (tear-off, materials, installation method), line items for labor and materials separately, start/completion timeline, warranty details (manufacturer and workmanship), payment terms, and a validity period (typically 30 days).",
  },
  {
    question: "How much does a new roof cost?",
    answer:
      "A new asphalt shingle roof costs $4–$7 per square foot installed, or $8,000–$15,000 for a typical 2,000 sq ft home. Metal roofing runs $8–$14 per square foot. Tile roofs range $10–$18 per square foot. The main cost factors are roof size, material choice, pitch/complexity, number of stories, and your local labor market.",
  },
  {
    question: "How do roofers price a job?",
    answer:
      "Most roofers price by the 'square' — a 10×10 ft area (100 sq ft). A typical home is 20–25 squares. The price per square includes materials ($100–$500 depending on material), labor ($150–$300), underlayment, flashing, and disposal. Add permit fees, dumpster rental, and a markup for overhead and profit (typically 20–35%).",
  },
  {
    question: "Should I get multiple roofing estimates?",
    answer:
      "Yes — get at least 3 written estimates. Compare not just total price, but also material quality (shingle brand and line), warranty terms, timeline, and included work (does the estimate include decking repair? new flashing?). The cheapest bid often skips underlayment upgrades or uses lower-grade materials that fail sooner.",
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

export default function RoofingEstimateTemplate() {
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
          Free Roofing Estimate Template
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Use the calculator below to generate a roofing estimate for any job — new installs, repairs, or full replacements. Or skip the spreadsheet and use TradeQuote to create, send, and track professional estimates your clients approve with one tap.
        </p>

        {/* Inline estimate generator */}
        <section className="mt-10">
          <h2 className="text-xl font-bold">Roofing estimate calculator</h2>
          <p className="mt-2 text-sm text-slate-500">
            Select your job type, roofing material, and square footage to get an instant estimate with a full cost breakdown.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
            <EstimateGenerator />
          </div>
        </section>

        {/* Sample estimate */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Sample roofing estimate</h2>
          <p className="mt-2 text-sm text-slate-500">
            Here is what a professional roofing estimate looks like for a typical residential re-roof.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white">
              <p className="font-bold">Summit Roofing Co.</p>
              <p className="text-sm text-slate-400">Estimate #R-2041 · Valid for 30 days</p>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-slate-500">
                Prepared for: <span className="text-slate-900 font-medium">Mark & Lisa Thompson</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">Job: Full roof replacement — 2,200 sq ft, single story</p>
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
                    <td className="py-2 text-right" colSpan={2}>Subtotal: $16,850</td>
                  </tr>
                  <tr className="text-slate-500">
                    <td className="py-1 text-right" colSpan={2}>Tax (8%): $1,348</td>
                  </tr>
                  <tr className="font-bold text-lg">
                    <td className="py-2 text-right" colSpan={2}>Total: $18,198</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>


        {/* Download template */}
        <section className="mt-12">
          <TemplateDownloadForm config={templateConfigs["roofing-estimate"]} />
        </section>
        {/* What to include */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">What every roofing estimate needs</h2>
          <p className="mt-2 text-sm text-slate-600">
            A complete roofing estimate protects you from scope creep and helps clients compare bids fairly. Include these elements:
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Contractor info", desc: "Business name, license number, insurance, phone, and email" },
              { title: "Property details", desc: "Client name, property address, and roof access notes" },
              { title: "Scope of work", desc: "Tear-off, material, installation method, ventilation, flashing" },
              { title: "Materials spec", desc: "Brand, product line, color, and warranty tier for all materials" },
              { title: "Timeline", desc: "Estimated start date, duration, and weather contingency" },
              { title: "Warranty", desc: "Manufacturer warranty (25–50 years) plus workmanship warranty (5–15 years)" },
              { title: "Payment terms", desc: "Deposit amount, progress payments, and final payment on completion" },
              { title: "Exclusions", desc: "What is NOT included — interior damage, gutters, solar panel removal, etc." },
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
          <h2 className="text-xl font-bold">Roofing estimate best practices</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              A roofing job is one of the largest home improvement expenses a homeowner will face — $10,000 to $30,000+ for a full replacement. That means your estimate is doing more than quoting a price. It is building trust, demonstrating expertise, and differentiating you from the three other contractors who also walked the roof that week.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Always do an on-site inspection first</h3>
            <p>
              Never quote a roof from a satellite image alone. Walking the roof lets you assess decking condition, check for multiple layers (which affect tear-off cost), inspect flashing and penetrations, and measure pitch accurately. An on-site inspection takes 30–45 minutes and prevents the surprise change orders that destroy your margin and your reputation.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Itemize materials and labor separately</h3>
            <p>
              Homeowners comparison-shop roofing estimates aggressively. When you lump everything into one number, they cannot tell whether your higher price reflects better materials or just higher margins. Breaking out materials (by brand and product line), labor, tear-off, disposal, and permits gives the client a clear picture — and makes it obvious when a competitor is cutting corners on material quality.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Specify the material brand and warranty tier</h3>
            <p>
              &quot;Architectural shingles&quot; is not a spec — it is a category. Your estimate should name the manufacturer (GAF, CertainTeed, Owens Corning), the product line (Timberline HDZ, Landmark Pro), and the warranty level (limited lifetime, 50-year). This protects you from clients claiming you promised a higher-grade product, and it helps educated buyers see the value in your bid.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Include a contingency for decking repair</h3>
            <p>
              On any tear-off job, you will find damaged decking — it is not a question of if, but how much. Your estimate should include a per-square-foot rate for decking replacement (typically $2–$4/sq ft for plywood) with an estimated allowance. This sets expectations upfront and avoids the mid-job phone call that erodes client trust.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Set a clear validity period</h3>
            <p>
              Material prices fluctuate — asphalt shingles alone saw a 15% price increase in 2023. Set a 30-day validity on every estimate. After that, the client should request a re-quote. This protects your margins and creates urgency to make a decision.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-xl bg-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Skip the spreadsheet</h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto">
            TradeQuote creates professional roofing estimates your clients can approve with one tap. No PDFs, no printing, no chasing.
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
            <Link href="/templates/hvac-estimate" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">HVAC Estimate Template</h3>
              <p className="mt-1 text-sm text-slate-500">For installations, repairs, and maintenance</p>
            </Link>
            <Link href="/templates/plumbing-estimate" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Plumbing Estimate Template</h3>
              <p className="mt-1 text-sm text-slate-500">For faucet repairs, drain clearing, and pipe work</p>
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
