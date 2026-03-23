import type { Metadata } from "next";
import Link from "next/link";
import { EstimateBuilder } from "./estimate-builder";
import { TemplateDownloadForm } from "@/components/template-download-form";
import { templateConfigs } from "@/components/template-pdf-configs";

export const metadata: Metadata = {
  title: "Free Flooring Estimate Template | TradeQuote",
  description:
    "Free flooring estimate template for hardwood, tile, LVP, carpet, and laminate jobs. Calculate costs per square foot, preview, and download professional flooring estimates instantly.",
  keywords: [
    "flooring estimate template",
    "flooring estimate",
    "flooring installation estimate",
    "free flooring estimate template",
    "flooring cost estimate",
    "hardwood flooring estimate",
    "tile flooring estimate",
  ],
};

const sampleItems = [
  { room: "Kitchen & dining (tile)", sqft: "320", material: "$2,240", prep: "$320", labor: "$1,920" },
  { room: "Living room (hardwood)", sqft: "450", material: "$3,600", prep: "$450", labor: "$2,250" },
  { room: "Master bedroom (LVP)", sqft: "280", material: "$1,260", prep: "$0", labor: "$840" },
  { room: "Hallway (LVP)", sqft: "120", material: "$540", prep: "$0", labor: "$360" },
];

const faqItems = [
  {
    question: "How much does flooring installation cost per square foot?",
    answer:
      "Flooring installation costs vary widely by material: carpet runs $3.50–$5.50/sq ft installed, laminate $3–$5.50/sq ft, luxury vinyl plank (LVP) $4.50–$7.50/sq ft, hardwood $8–$13/sq ft, and tile $7–$13/sq ft. These ranges include materials and labor. Subfloor preparation, demolition of old flooring, and furniture moving add $1–$3/sq ft. Always get an in-home measurement — online estimates based on room dimensions miss closets, transitions, and waste factor (typically 10% extra material).",
  },
  {
    question: "What should a flooring estimate include?",
    answer:
      "A professional flooring estimate should itemize: material cost per square foot by type (hardwood, tile, LVP, carpet, laminate), subfloor preparation (leveling, moisture barrier, demolition of existing flooring), transition strips and trim pieces, furniture moving if applicable, waste factor (10–15% for cuts and defects), and labor broken out by room. Include the specific product name and grade — 'hardwood' can mean $5/sq ft builder-grade or $15/sq ft wide-plank white oak. Vague estimates lead to disputes when the homeowner expected premium and got builder-grade.",
  },
  {
    question: "How do you calculate flooring costs per square foot?",
    answer:
      "Measure each room's length times width to get square footage, then add 10% for waste (15% for diagonal patterns or tile). Multiply the total square footage by your per-square-foot rate for each material type. Add subfloor prep separately — a concrete slab needing leveling costs $1–$3/sq ft extra. Include transitions between rooms ($15–$50 per doorway), removal of old flooring ($1–$2/sq ft), and baseboards (remove and reinstall at $2–$4/linear foot or replace at $4–$8/linear foot). Your final estimate should show each line item so the client understands where the money goes.",
  },
  {
    question: "Hardwood vs LVP flooring: which is more cost-effective?",
    answer:
      "LVP (luxury vinyl plank) costs $4.50–$7.50/sq ft installed versus $8–$13/sq ft for solid hardwood — roughly 40–50% less. LVP is waterproof, scratch-resistant, and installs faster (click-lock vs nail-down), making it ideal for kitchens, bathrooms, and rentals. Hardwood adds more resale value — the National Association of Realtors estimates hardwood floors increase home value by 2.5%. For budget-conscious clients, LVP in high-traffic areas and hardwood in living spaces is a common compromise. Present both options in your estimate so clients can choose.",
  },
  {
    question: "How long does flooring installation take?",
    answer:
      "Timeline depends on material and scope: carpet takes 1 day per 500 sq ft, LVP and laminate take 1–2 days per 500 sq ft, hardwood takes 2–3 days per 500 sq ft (plus 24–48 hours for acclimation), and tile takes 2–4 days per 500 sq ft (including grout cure time). Subfloor prep adds 1–2 days. A typical 1,200 sq ft whole-house flooring project takes 3–7 days depending on material mix. Always include timeline in your estimate — clients plan around installation disruption.",
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

export default function FlooringEstimateTemplate() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Free Flooring Estimate Template
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Build professional flooring estimates in minutes. Add rooms, select flooring type and subfloor prep, and get an instant cost breakdown. Preview and download as PDF — or use TradeQuote to send estimates your clients can approve with one tap.
        </p>

        {/* Inline estimate builder */}
        <section className="mt-10">
          <h2 className="text-xl font-bold">Build your flooring estimate</h2>
          <p className="mt-2 text-sm text-slate-500">
            Add each room with square footage, flooring type, and subfloor prep level.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
            <EstimateBuilder />
          </div>
        </section>

        {/* Sample estimate */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Sample flooring estimate</h2>
          <p className="mt-2 text-sm text-slate-500">
            Here is what a professional flooring estimate looks like for a multi-room project with mixed materials.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white">
              <p className="font-bold">Precision Floors LLC</p>
              <p className="text-sm text-slate-400">Estimate #PF-2026-117 · 245 Birch Lane</p>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-slate-500">
                Prepared for: <span className="text-slate-900 font-medium">Garcia Family</span>
              </p>
              <table className="w-full mt-4 text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="text-left pb-2">Room</th>
                    <th className="text-right pb-2">Sq ft</th>
                    <th className="text-right pb-2">Material</th>
                    <th className="text-right pb-2">Prep</th>
                    <th className="text-right pb-2">Labor</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleItems.map((item) => (
                    <tr key={item.room} className="border-b border-slate-100">
                      <td className="py-2.5">{item.room}</td>
                      <td className="py-2.5 text-right">{item.sqft}</td>
                      <td className="py-2.5 text-right">{item.material}</td>
                      <td className="py-2.5 text-right">{item.prep}</td>
                      <td className="py-2.5 text-right font-medium">{item.labor}</td>
                    </tr>
                  ))}
                  <tr className="text-slate-500">
                    <td colSpan={5} className="py-2 text-right">Subtotal: $13,780</td>
                  </tr>
                  <tr className="font-bold text-lg">
                    <td colSpan={5} className="py-2 text-right">Total estimate: $13,780</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 text-xs text-slate-400">Estimate valid for 30 days · Includes 10% waste factor · Transitions and trim included</p>
            </div>
          </div>
        </section>

        {/* Download template */}
        <section className="mt-12">
          <TemplateDownloadForm config={templateConfigs["flooring-estimate"]} />
        </section>

        {/* What to include */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">What every flooring estimate needs</h2>
          <p className="mt-2 text-sm text-slate-600">
            A detailed flooring estimate wins more jobs and prevents disputes. Here is what clients expect to see.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Room measurements", desc: "Square footage per room with 10–15% waste factor for cuts and transitions" },
              { title: "Material specification", desc: "Product name, grade, and per-square-foot cost for each flooring type" },
              { title: "Subfloor preparation", desc: "Leveling, moisture barrier, demolition of old flooring priced per square foot" },
              { title: "Labor breakdown", desc: "Installation rate per room — not a single lump sum across the whole job" },
              { title: "Transitions and trim", desc: "Door thresholds, baseboards, quarter-round, and stair nosing itemized" },
              { title: "Timeline", desc: "Start date, days per room, acclimation time for hardwood, and grout cure time for tile" },
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
          <h2 className="text-xl font-bold">Flooring estimate pricing guide</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Flooring is one of the highest-value home improvement projects, with the average whole-house installation running $7,000–$20,000 depending on materials and square footage. Homeowners typically get 2–4 estimates before choosing a contractor. The contractor who wins is not always the cheapest — it is the one whose estimate clearly explains what they are getting. An itemized estimate with material specs, room-by-room pricing, and a realistic timeline converts far better than a single-number quote scrawled on the back of a business card.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Hardwood flooring: premium price, premium value</h3>
            <p>
              Solid hardwood runs $8–$13 per square foot installed, with engineered hardwood slightly lower at $6–$10/sq ft. The cost range depends on wood species (oak is standard, walnut and maple are premium), plank width (wider = more expensive), and finish (pre-finished vs site-finished). Site-finished hardwood costs $2–$4/sq ft more in labor but allows custom stain matching. Hardwood requires 24–48 hours of acclimation before installation — factor this into your timeline. Always note the specific product in your estimate so the client knows exactly what they are paying for.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Luxury vinyl plank: the best value in flooring</h3>
            <p>
              LVP has become the most popular flooring choice for renovations because it offers the look of hardwood at 40–50% less cost. Quality LVP runs $4.50–$7.50/sq ft installed. It is waterproof, scratch-resistant, and installs over most existing subfloors without extensive prep. The key differentiator in LVP quality is the wear layer thickness: 12 mil is residential-grade (5–10 year warranty), 20 mil is heavy residential (15–25 year warranty), and 28+ mil is commercial-grade. Specify the wear layer in your estimate — it is the single biggest factor in how long the floor will last.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Tile flooring: durability at a cost</h3>
            <p>
              Porcelain and ceramic tile cost $7–$13/sq ft installed, with the wide range driven by tile size, pattern complexity, and subfloor condition. Large-format tiles (24x24 and above) require a perfectly level subfloor — expect $1.50–$3/sq ft in leveling costs on older homes. Heated floor systems add $5–$10/sq ft but are a strong selling point for bathrooms and kitchens. Tile installation generates the most waste of any flooring type — budget 15% extra for cuts, especially with diagonal patterns or large tiles with many cuts around cabinets and fixtures.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Subfloor prep: the hidden cost that makes or breaks the job</h3>
            <p>
              Subfloor preparation accounts for 10–25% of a flooring project and is the most common source of pricing disputes. A flat, clean subfloor needs minimal prep — just a sweep and moisture test. But an uneven concrete slab may need self-leveling compound ($1.50–$3/sq ft), old tile or adhesive may need grinding ($2–$4/sq ft), and water-damaged plywood may need full replacement ($3–$6/sq ft). Always inspect the subfloor before quoting final numbers. A separate line item for subfloor prep signals professionalism and prevents the awkward mid-job price increase that kills client trust.
            </p>
            <h3 className="font-semibold text-slate-900 text-base">Winning more flooring jobs with better estimates</h3>
            <p>
              The most successful flooring contractors present two or three material options at different price points in the same estimate. A client who came in asking about hardwood might choose LVP once they see the side-by-side pricing with the same professional presentation. Digital estimates that clients can review and approve online convert 40% better than paper or email quotes because they reduce friction between &quot;yes&quot; and signed contract. Include a material warranty summary and your workmanship guarantee — these are the trust signals that separate professionals from handymen.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-xl bg-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Send flooring estimates clients approve instantly</h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto">
            TradeQuote creates professional flooring estimates your clients can review and approve with one tap. No PDFs, no printing, no follow-up calls.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-amber-400"
          >
            Create and send flooring estimates — free
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
            <Link href="/templates/general-contractor-estimate" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">General Contractor Estimate</h3>
              <p className="mt-1 text-sm text-slate-500">For multi-trade renovation and remodeling projects</p>
            </Link>
            <Link href="/templates/painting-estimate" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Painting Estimate Template</h3>
              <p className="mt-1 text-sm text-slate-500">Interior and exterior painting by room and surface</p>
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
