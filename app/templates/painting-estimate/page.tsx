import type { Metadata } from "next";
import Link from "next/link";
import { EstimateGenerator } from "./estimate-generator";

export const metadata: Metadata = {
  title: "Free Painting Estimate Template | TradeQuote",
  description:
    "Free painting estimate template for interior and exterior jobs. Calculate labor, materials, and square footage costs. Create, preview, and download professional painting estimates instantly.",
  keywords: [
    "painting estimate template",
    "free painting estimate template",
    "exterior painting estimate template",
    "painting estimate template free download",
    "painting quote template",
    "house painting estimate",
    "interior painting estimate",
    "painting contractor estimate",
  ],
};

const sampleLineItems = [
  { description: "Living room walls — 2 coats latex", sqft: "480", rate: "$3.50/sq ft", materials: "$145" },
  { description: "Master bedroom — walls + ceiling", sqft: "620", rate: "$4.00/sq ft", materials: "$190" },
  { description: "Kitchen cabinets — sand, prime, 2 coats", sqft: "120", rate: "$8.00/sq ft", materials: "$210" },
  { description: "Exterior trim — scrape, prime, finish", sqft: "350", rate: "$5.50/sq ft", materials: "$175" },
];

const faqItems = [
  {
    question: "What should a painting estimate include?",
    answer:
      "A professional painting estimate should include: your business name and contact info, client name and property address, detailed scope of work for each room or area, square footage measurements, paint type and number of coats, surface preparation needed (scraping, priming, patching), labor cost per square foot, itemized material costs (paint, primer, tape, drop cloths), subtotal, tax, and total. Include a timeline and warranty terms.",
  },
  {
    question: "How much do painters charge per square foot?",
    answer:
      "Interior painting typically costs $1.50 to $4.00 per square foot for walls, and $3.00 to $6.00 per square foot for ceilings or trim work. Exterior painting runs $1.50 to $5.50 per square foot depending on surface condition and height. Cabinet painting is the most labor-intensive at $6.00 to $12.00 per square foot due to sanding, priming, and multiple coats. These rates include labor only — materials are billed separately.",
  },
  {
    question: "How do I estimate painting materials?",
    answer:
      "One gallon of paint covers approximately 350–400 square feet with one coat. For a standard room (12x12 with 8-foot ceilings), you need about 1.5 gallons for two coats. Material costs typically include: paint ($30–$70/gallon), primer ($25–$40/gallon), painter tape ($5–$8/roll), drop cloths ($10–$20), brushes and rollers ($15–$30). Most painters add a 15–20% markup on materials.",
  },
  {
    question: "Should I give a flat rate or per-square-foot estimate?",
    answer:
      "Per-square-foot pricing is more transparent and easier for clients to compare. It also protects you — if the client adds rooms or changes scope, you can simply measure and price the addition. Flat rates work for small, well-defined jobs (one accent wall, one bathroom). For whole-house or exterior jobs, always price per square foot with materials itemized separately.",
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

export default function PaintingEstimateTemplate() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Free Painting Estimate Template
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Create professional painting estimates in minutes. Enter your rooms, square footage, and materials below — then preview and download as PDF. Or skip the hassle and use TradeQuote to send estimates your clients can approve with one tap.
        </p>

        {/* Inline estimate generator */}
        <section className="mt-10">
          <h2 className="text-xl font-bold">Build your estimate</h2>
          <p className="mt-2 text-sm text-slate-500">
            Add each room or area with square footage, rate per square foot, and material costs. Preview your estimate and save it as a PDF.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
            <EstimateGenerator />
          </div>
        </section>

        {/* Sample estimate */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Sample painting estimate</h2>
          <p className="mt-2 text-sm text-slate-500">
            Here is what a professional painting estimate looks like for a typical interior + exterior job.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white">
              <p className="font-bold">ProCoat Painting LLC</p>
              <p className="text-sm text-slate-400">Estimate #2041 &middot; March 23, 2026</p>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-slate-500">
                Prepared for: <span className="text-slate-900 font-medium">Sarah & Tom Rivera</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">Property: 4BR Colonial — interior repaint + exterior trim</p>
              <table className="w-full mt-4 text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="text-left pb-2">Area</th>
                    <th className="text-right pb-2">Labor</th>
                    <th className="text-right pb-2">Materials</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleLineItems.map((item) => (
                    <tr key={item.description} className="border-b border-slate-100">
                      <td className="py-2.5">{item.description}</td>
                      <td className="py-2.5 text-right">{item.sqft} sq ft × {item.rate}</td>
                      <td className="py-2.5 text-right font-medium">{item.materials}</td>
                    </tr>
                  ))}
                  <tr className="text-slate-500">
                    <td colSpan={3} className="py-2 text-right">Subtotal: $6,875.00</td>
                  </tr>
                  <tr className="text-slate-500">
                    <td colSpan={3} className="py-1 text-right">Tax (8%): $550.00</td>
                  </tr>
                  <tr className="font-bold text-lg">
                    <td colSpan={3} className="py-2 text-right">Total: $7,425.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* What to include */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">What every painting estimate needs</h2>
          <p className="mt-2 text-sm text-slate-600">
            A complete painting estimate wins jobs and prevents disputes. Include these six elements:
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Scope of work", desc: "Each room or area listed separately with number of coats and paint type" },
              { title: "Square footage", desc: "Measured walls, ceilings, and trim — clients can verify your numbers" },
              { title: "Surface prep", desc: "Scraping, sanding, patching, and priming listed as separate line items" },
              { title: "Materials breakdown", desc: "Paint brand and type, primer, tape, drop cloths — all itemized" },
              { title: "Labor rate", desc: "Per-square-foot pricing for each surface type (walls, trim, cabinets)" },
              { title: "Timeline and terms", desc: "Start date, completion date, payment schedule, and warranty" },
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
          <h2 className="text-xl font-bold">Painting estimate best practices</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Accurate estimates are what separate profitable painting businesses from ones that constantly underbid and lose money. The most common mistake new painters make is guessing square footage instead of measuring — a 10% measurement error on a $5,000 job costs you $500 in profit.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Interior vs exterior: different pricing models</h3>
            <p>
              Interior painting is priced per square foot of wall surface, typically $1.50 to $4.00 depending on ceiling height, trim complexity, and surface condition. A standard 12x12 room with 8-foot ceilings has roughly 384 square feet of wall surface. At $3.00 per square foot for labor, that room costs $1,152 in labor alone — plus $80–$120 in materials (1.5 gallons of paint, primer, tape, drop cloths).
            </p>
            <p>
              Exterior painting runs $1.50 to $5.50 per square foot and varies more because of surface type. Smooth siding is fast to paint, while cedar shakes or textured stucco require significantly more prep and paint. Height matters too — second-story work requires scaffolding or extension ladders, which adds $300–$800 to the job and increases labor time by 20–30%.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Always charge separately for prep work</h3>
            <p>
              Surface preparation is where most painting estimates go wrong. Scraping loose paint, filling cracks, sanding rough spots, and priming bare wood can take as long as the actual painting. On older homes, prep often accounts for 40–60% of total labor hours. List prep as a separate line item so the client understands why a well-prepped job costs more — and why it lasts three times longer than a quick one-coat-over-peeling-paint shortcut.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Paint quality affects your estimate</h3>
            <p>
              Premium paint ($50–$70/gallon) covers better, lasts longer, and requires fewer coats than budget paint ($25–$35/gallon). On a 2,000 sq ft interior job, the difference between premium and budget paint is about $200–$300 in materials — but premium paint with two coats outlasts budget paint with three coats. Always offer the client a choice and explain the tradeoff. Most homeowners choose premium once they understand they will repaint sooner with the cheap option.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Send the estimate within 24 hours</h3>
            <p>
              Homeowners typically get three painting estimates. The first painter to send a professional, itemized estimate has a significant advantage — it sets the standard the other estimates are compared against. Walk the job, take measurements, and send the estimate the same evening or next morning. Digital estimates sent through tools like TradeQuote let clients approve and schedule with one tap, eliminating the back-and-forth.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-xl bg-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Win more painting jobs</h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto">
            TradeQuote creates professional painting estimates your clients can approve and pay with one tap. No PDFs, no printing, no chasing callbacks.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-amber-400"
          >
            Create your first painting estimate — free
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
              <p className="mt-1 text-sm text-slate-500">For multi-task home repair visits</p>
            </Link>
            <Link href="/templates/roofing-estimate" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Roofing Estimate Template</h3>
              <p className="mt-1 text-sm text-slate-500">For roof repairs, replacements, and inspections</p>
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
