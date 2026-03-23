import type { Metadata } from "next";
import Link from "next/link";
import { EstimateBuilder } from "./estimate-builder";
import { TemplateDownloadForm } from "@/components/template-download-form";
import { templateConfigs } from "@/components/template-pdf-configs";

export const metadata: Metadata = {
  title: "Free Painting Estimate Template | TradeQuote",
  description:
    "Free painting estimate template for interior and exterior jobs. Calculate costs by square footage, paint quality, and prep work. Create, preview, and download professional painting estimates instantly.",
  keywords: [
    "painting estimate template",
    "exterior painting estimate template",
    "free painting estimate template",
    "painting estimate template free download",
    "interior painting estimate",
    "house painting quote template",
  ],
};

const sampleItems = [
  { area: "Living room (interior)", sqft: "480", paint: "$720", prep: "$240", labor: "$960" },
  { area: "Master bedroom (interior)", sqft: "360", paint: "$540", prep: "$180", labor: "$720" },
  { area: "Kitchen & hallway (interior)", sqft: "320", paint: "$480", prep: "$400", labor: "$640" },
  { area: "Front exterior trim & siding", sqft: "600", paint: "$1,500", prep: "$750", labor: "$1,650" },
];

const faqItems = [
  {
    question: "How much does it cost to paint a house interior?",
    answer:
      "Interior painting typically costs $2–$6 per square foot of wall space, depending on paint quality, prep work, and room complexity. A standard 1,500 sq ft home with 8-foot ceilings has roughly 4,800 sq ft of wall area. At $3.50/sq ft average, that is $16,800 for a full interior repaint. Costs increase for high ceilings, detailed trim work, wallpaper removal, or extensive patching. Budget painters charge $1.50–$2.50/sq ft but often skip proper prep, which shows within a year.",
  },
  {
    question: "How much does exterior painting cost per square foot?",
    answer:
      "Exterior painting runs $3–$7 per square foot of paintable surface, higher than interior because of weather prep, ladder work, and more durable paint requirements. A 2,000 sq ft home exterior (walls, trim, doors) typically costs $6,000–$14,000. Factors that increase cost: height over two stories, wood siding requiring scraping, lead paint abatement, and premium weather-resistant coatings. Always get at least three estimates — prices vary widely by region and season.",
  },
  {
    question: "What should a painting estimate include?",
    answer:
      "A professional painting estimate should itemize: surface preparation (scraping, sanding, patching, priming), paint costs by type and quality, labor hours or per-square-foot rate, number of coats, trim and accent work priced separately, and any additional charges for high ceilings, wallpaper removal, or lead paint. Include a materials warranty (most quality paints cover 15–25 years) and a workmanship guarantee (typically 2–5 years). Vague estimates that bundle everything into one number are a red flag.",
  },
  {
    question: "Interior vs exterior painting: what is the difference in pricing?",
    answer:
      "Exterior painting costs 30–50% more than interior per square foot because it requires weather-resistant primer and paint (2–3x the material cost), more extensive surface prep (power washing, scraping, caulking), ladder and scaffolding time, and weather-dependent scheduling that can extend the project timeline. Interior painting is more predictable — controlled environment, easier prep, and faster drying times between coats. Both should include two coats minimum for lasting coverage.",
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
          Build professional painting estimates in minutes. Add rooms and surfaces, select paint quality and prep level, and get an instant cost breakdown. Preview and download as PDF — or use TradeQuote to send estimates your clients can approve with one tap.
        </p>

        {/* Inline estimate builder */}
        <section className="mt-10">
          <h2 className="text-xl font-bold">Build your painting estimate</h2>
          <p className="mt-2 text-sm text-slate-500">
            Add each area to paint with square footage, interior/exterior type, paint quality, and prep work level.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
            <EstimateBuilder />
          </div>
        </section>

        {/* Sample estimate */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Sample painting estimate</h2>
          <p className="mt-2 text-sm text-slate-500">
            Here is what a professional painting estimate looks like for a mixed interior/exterior job on a 3-bedroom home.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white">
              <p className="font-bold">Rivera Painting Co.</p>
              <p className="text-sm text-slate-400">Estimate #RP-2026-043 · 789 Maple Ave</p>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-slate-500">
                Prepared for: <span className="text-slate-900 font-medium">Anderson Family</span>
              </p>
              <table className="w-full mt-4 text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="text-left pb-2">Area</th>
                    <th className="text-right pb-2">Sq ft</th>
                    <th className="text-right pb-2">Paint</th>
                    <th className="text-right pb-2">Prep</th>
                    <th className="text-right pb-2">Labor</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleItems.map((item) => (
                    <tr key={item.area} className="border-b border-slate-100">
                      <td className="py-2.5">{item.area}</td>
                      <td className="py-2.5 text-right">{item.sqft}</td>
                      <td className="py-2.5 text-right">{item.paint}</td>
                      <td className="py-2.5 text-right">{item.prep}</td>
                      <td className="py-2.5 text-right font-medium">{item.labor}</td>
                    </tr>
                  ))}
                  <tr className="text-slate-500">
                    <td colSpan={5} className="py-2 text-right">Subtotal: $9,780</td>
                  </tr>
                  <tr className="font-bold text-lg">
                    <td colSpan={5} className="py-2 text-right">Total estimate: $9,780</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 text-xs text-slate-400">Estimate valid for 30 days · 2 coats included · Premium paint on all surfaces</p>
            </div>
          </div>
        </section>


        {/* Download template */}
        <section className="mt-12">
          <TemplateDownloadForm config={templateConfigs["painting-estimate"]} />
        </section>
        {/* What to include */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">What every painting estimate needs</h2>
          <p className="mt-2 text-sm text-slate-600">
            A detailed painting estimate wins more jobs and prevents disputes. Here is what clients expect to see.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Surface measurements", desc: "Square footage of each wall, ceiling, or exterior surface to be painted" },
              { title: "Paint specification", desc: "Brand, finish (flat, eggshell, semi-gloss), and number of coats" },
              { title: "Prep work details", desc: "Scraping, sanding, patching, priming, and power washing itemized" },
              { title: "Labor breakdown", desc: "Hours or per-square-foot rate for each area, not a single lump sum" },
              { title: "Timeline", desc: "Start date, estimated completion, and any weather-dependent scheduling notes" },
              { title: "Warranty", desc: "Materials warranty from paint manufacturer and your workmanship guarantee" },
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
          <h2 className="text-xl font-bold">Painting estimate pricing guide</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Painting is one of the most requested home improvement services, and pricing is where most painters either win or lose jobs. A 2024 industry report found that homeowners get an average of 3.2 painting estimates before choosing a contractor. The painter who wins is rarely the cheapest — it is the one whose estimate is the most detailed and professional. Vague one-line quotes lose to itemized breakdowns every time.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Interior painting: what drives the price</h3>
            <p>
              Interior painting costs $2–$6 per square foot of wall area, with the wide range driven by three factors: paint quality, prep work, and room complexity. Standard builder-grade paint at $30–$40/gallon covers well but fades in 3–5 years. Premium paints at $50–$70/gallon offer better coverage, washability, and 10–15 year durability. Designer paints at $80+/gallon provide true one-coat coverage and specialty finishes. Always specify paint brand and product line in your estimate so the client knows exactly what they are paying for.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Exterior painting: higher cost, higher stakes</h3>
            <p>
              Exterior painting runs $3–$7 per square foot because outdoor surfaces demand more from both the painter and the paint. Prep work is the biggest variable: a well-maintained home might need only power washing and light scraping, while a neglected exterior could require extensive scraping, wood repair, caulking, and priming before a single coat of paint goes on. Always inspect the exterior in person before quoting — photos miss peeling, rot, and surface damage that can double your prep time.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Prep work: the hidden cost clients need to understand</h3>
            <p>
              Surface preparation accounts for 30–50% of a professional painting job and is where most pricing disputes happen. Clients see paint going on the wall and assume that is the whole job. In reality, proper prep — patching holes, sanding rough spots, taping edges, priming bare surfaces — is what separates a paint job that lasts 10 years from one that peels in 18 months. Itemize prep work in your estimate so clients see its value. A line item for &quot;surface preparation: patch 12 nail holes, sand 3 rough areas, prime 2 bare spots — 4 hours at $45/hr&quot; justifies the cost far better than &quot;prep: $180.&quot;
            </p>
            <h3 className="font-semibold text-slate-900 text-base">How many coats? The honest answer</h3>
            <p>
              Two coats is the industry standard for full coverage and color consistency. One coat is acceptable only for touch-ups or when painting the same color. Going from a dark to light color may require a tinted primer plus two topcoats. Exterior surfaces exposed to direct sun or heavy weather should get two coats minimum. Always state the number of coats in your estimate — it is one of the first things informed clients look for, and &quot;two coats included&quot; is a powerful trust signal.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Winning more painting jobs with better estimates</h3>
            <p>
              The most effective painting estimates share three traits: they are itemized (not lump-sum), they specify materials by name, and they include a clear timeline. Add a brief warranty statement — &quot;2-year workmanship guarantee on all surfaces&quot; — and you immediately separate yourself from painters who quote a number and disappear. Digital estimates that clients can approve online convert 40% better than paper or email quotes because they reduce friction between &quot;yes&quot; and signed contract.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-xl bg-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Send painting estimates clients approve instantly</h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto">
            TradeQuote creates professional painting estimates your clients can review and approve with one tap. No PDFs, no printing, no follow-up calls.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-amber-400"
          >
            Create and send painting estimates — free
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
          <p className="mt-2 text-sm text-slate-500">Painting is often part of larger home projects. Use these templates for related work:</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link href="/templates/flooring-estimate" className="rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Flooring Estimate Template</h3>
              <p className="mt-1 text-sm text-slate-500">For flooring installation and refinishing</p>
            </Link>
            <Link href="/templates/general-contractor-estimate" className="rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">General Contractor Estimate</h3>
              <p className="mt-1 text-sm text-slate-500">For multi-trade renovation coordination</p>
            </Link>
            <Link href="/templates/handyman-invoice" className="rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Handyman Invoice Template</h3>
              <p className="mt-1 text-sm text-slate-500">For multi-task home repair and maintenance</p>
            </Link>
            <Link href="/templates/pressure-washing-estimate" className="rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Pressure Washing Estimate</h3>
              <p className="mt-1 text-sm text-slate-500">For exterior cleaning before/after painting</p>
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
