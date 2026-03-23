import type { Metadata } from "next";
import Link from "next/link";
import { EstimateGenerator } from "./estimate-generator";
import { TemplateDownloadForm } from "@/components/template-download-form";
import { templateConfigs } from "@/components/template-pdf-configs";

export const metadata: Metadata = {
  title: "Free HVAC Estimate Template | TradeQuote",
  description:
    "Free HVAC estimate template with an inline calculator. Select system type, tonnage, and job type to get an instant HVAC estimate. Download or create professional estimates with TradeQuote.",
  keywords: [
    "hvac estimate template",
    "free hvac estimate template",
    "hvac proposal template",
    "hvac quote template",
    "free hvac estimate form",
    "hvac bid template",
    "hvac contractor estimate",
    "air conditioning estimate template",
  ],
};

const sampleLineItems = [
  { description: "Remove old 2.5-ton AC condenser & air handler", amount: "$300" },
  { description: "Carrier Performance 3-ton 16 SEER2 condenser", amount: "$2,800" },
  { description: "Carrier FX4D fan coil / air handler", amount: "$1,200" },
  { description: "R-410A refrigerant charge (8 lbs)", amount: "$320" },
  { description: "New refrigerant line set (30 ft)", amount: "$350" },
  { description: "Electrical disconnect & wiring", amount: "$400" },
  { description: "Concrete pad for condenser", amount: "$150" },
  { description: "Building permit", amount: "$200" },
  { description: "Installation labor (2 techs, 8 hrs)", amount: "$1,600" },
];

const faqItems = [
  {
    question: "What should an HVAC estimate include?",
    answer:
      "A professional HVAC estimate should include: your business name, license number, and contact info; client name and property address; detailed scope of work; equipment brand, model, SEER rating, and tonnage; line items for equipment, labor, materials, and permits separately; warranty details (manufacturer and workmanship); payment terms; and a validity period (typically 30 days).",
  },
  {
    question: "How much does a new AC unit cost to install?",
    answer:
      "A central AC installation costs $3,500 to $7,500 for a standard 2.5 to 3.5 ton unit. A full system replacement (AC + furnace) runs $6,000 to $15,000+. Heat pumps cost $4,500 to $10,000 installed. Ductless mini-splits range $3,000 to $8,000 depending on zones. The main cost drivers are system size (tonnage), efficiency rating (SEER), brand, and installation complexity.",
  },
  {
    question: "How do HVAC contractors price a job?",
    answer:
      "Most HVAC contractors price installations as equipment cost plus a labor flat rate (typically $1,200–$2,500 depending on complexity). Repairs are usually billed at $85–$175/hour plus parts with a diagnostic fee ($75–$150). Maintenance contracts run $150–$300/year for two tune-ups. Always itemize equipment, labor, materials, and permits separately so the client can compare bids fairly.",
  },
  {
    question: "What size HVAC system do I need?",
    answer:
      "The general rule is 1 ton of cooling per 500 square feet of living space. A 1,500 sq ft home typically needs a 3-ton system. However, factors like climate zone, insulation quality, window count, ceiling height, and sun exposure affect sizing. A proper Manual J load calculation is the gold standard — oversizing wastes energy and causes humidity problems; undersizing cannot maintain comfort on peak days.",
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

export default function HVACEstimateTemplate() {
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
          Free HVAC Estimate Template
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Use the calculator below to generate an HVAC estimate for any job — installations, repairs, or maintenance. Or skip the spreadsheet and use TradeQuote to create, send, and track professional estimates your clients approve with one tap.
        </p>

        {/* Inline estimate generator */}
        <section className="mt-10">
          <h2 className="text-xl font-bold">HVAC estimate calculator</h2>
          <p className="mt-2 text-sm text-slate-500">
            Select your job type, system type, and tonnage to get an instant estimate with a full cost breakdown.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
            <EstimateGenerator />
          </div>
        </section>

        {/* Sample estimate */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Sample HVAC estimate</h2>
          <p className="mt-2 text-sm text-slate-500">
            Here is what a professional HVAC estimate looks like for a typical residential AC replacement.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white">
              <p className="font-bold">Comfort Pro HVAC LLC</p>
              <p className="text-sm text-slate-400">Estimate #H-1087 · Valid for 30 days</p>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-slate-500">
                Prepared for: <span className="text-slate-900 font-medium">David & Maria Chen</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">Job: 3-ton AC system replacement — 1,800 sq ft single-story home</p>
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
                    <td className="py-2 text-right" colSpan={2}>Subtotal: $7,320</td>
                  </tr>
                  <tr className="text-slate-500">
                    <td className="py-1 text-right" colSpan={2}>Tax (8%): $585.60</td>
                  </tr>
                  <tr className="font-bold text-lg">
                    <td className="py-2 text-right" colSpan={2}>Total: $7,905.60</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>


        {/* Download template */}
        <section className="mt-12">
          <TemplateDownloadForm config={templateConfigs["hvac-estimate"]} />
        </section>
        {/* What to include */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">What every HVAC estimate needs</h2>
          <p className="mt-2 text-sm text-slate-600">
            A complete HVAC estimate protects you from scope disputes and helps clients compare bids fairly. Include these elements:
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Contractor info", desc: "Business name, HVAC license number, EPA certification, phone, email" },
              { title: "Client details", desc: "Name, property address, system access notes" },
              { title: "Equipment spec", desc: "Brand, model number, tonnage, SEER/AFUE rating, and warranty tier" },
              { title: "Scope of work", desc: "Removal, installation, ductwork modifications, electrical, refrigerant" },
              { title: "Line items", desc: "Equipment, labor, materials, permits, and disposal listed separately" },
              { title: "Warranty details", desc: "Manufacturer warranty (5–10 years parts) plus workmanship warranty" },
              { title: "Timeline", desc: "Installation date, estimated duration, and scheduling contingency" },
              { title: "Payment terms", desc: "Deposit, progress payment, and final on completion with accepted methods" },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO content - HVAC best practices */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">HVAC estimate best practices</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              An HVAC system is one of the most expensive mechanical systems in a home, with replacement costs ranging from $5,000 to $15,000 or more. For HVAC contractors, the estimate is not just a price quote — it is your first opportunity to demonstrate expertise, build trust, and differentiate yourself from competitors who hand over a one-line number on a business card.
            </p>

            <h3 className="font-semibold text-slate-900 text-base">Always perform a proper load calculation</h3>
            <p>
              The single biggest mistake in HVAC estimating is guessing system size based on square footage alone. A Manual J load calculation accounts for insulation R-values, window area and orientation, climate zone, duct losses, and occupancy. An oversized system short-cycles — running frequent short bursts that waste energy, fail to dehumidify, and wear out components faster. An undersized system runs constantly and never reaches setpoint on peak days. Either way, the customer blames the installer. A load calculation takes 30 minutes and eliminates callback risk.
            </p>

            <h3 className="font-semibold text-slate-900 text-base">Specify equipment by brand, model, and efficiency rating</h3>
            <p>
              &quot;3-ton AC unit&quot; is not a specification — it is a category. Your estimate should name the manufacturer (Carrier, Trane, Lennox, Goodman, Daikin), the exact model number, the SEER2 rating for cooling, and the AFUE rating for furnaces. This matters because a 14 SEER2 Goodman and a 20 SEER2 Carrier are both &quot;3-ton AC units&quot; but differ by $3,000+ in equipment cost and will save the homeowner very different amounts on monthly energy bills. Being specific protects you from clients claiming you promised a higher-tier unit.
            </p>

            <h3 className="font-semibold text-slate-900 text-base">Itemize refrigerant charges and line sets</h3>
            <p>
              R-410A refrigerant costs $50–$100 per pound, and a typical residential system needs 6–12 pounds. If the existing line set is the wrong diameter for the new system (common when upgrading from R-22 to R-410A equipment), replacement adds $350–$800. These are significant costs that customers do not understand unless you call them out. Listing refrigerant and line set as separate line items prevents sticker shock and shows the client exactly where their money goes.
            </p>

            <h3 className="font-semibold text-slate-900 text-base">Account for electrical and permit requirements</h3>
            <p>
              Many AC replacements require electrical upgrades — a new disconnect, a larger breaker, or updated wiring to meet current code. These costs are real ($200–$600) and should appear on the estimate, not surface as a surprise on installation day. Building permits for HVAC work typically run $100–$300 and are required in most jurisdictions. Including them on the estimate shows professionalism and compliance — two things that set you apart from the handyman offering to install a unit &quot;cash, no permit.&quot;
            </p>

            <h3 className="font-semibold text-slate-900 text-base">Include seasonal pricing context</h3>
            <p>
              HVAC is intensely seasonal. Emergency AC replacements in July command premium pricing because every contractor is booked and homeowners are desperate. Off-season installations (October through March in warm climates, April through June in cold climates) often come with manufacturer rebates and lower labor rates. If you are quoting in the off-season, mention the savings. If you are quoting during peak season, explain why pricing is higher and offer to schedule for off-peak if the client can wait. Transparency about seasonal factors builds trust.
            </p>

            <h3 className="font-semibold text-slate-900 text-base">Set a 30-day validity and follow up</h3>
            <p>
              Equipment prices change quarterly, and manufacturer promotions expire. Set a 30-day validity on every estimate. This protects your margins and creates a natural follow-up point. Most homeowners get 2–3 estimates and make a decision within two weeks. If you have not heard back in 10 days, a brief follow-up call or email keeps you top of mind without being pushy.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-xl bg-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Skip the spreadsheet</h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto">
            TradeQuote creates professional HVAC estimates your clients can approve with one tap. No PDFs, no printing, no chasing.
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
            <Link href="/templates/roofing-estimate" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Roofing Estimate Template</h3>
              <p className="mt-1 text-sm text-slate-500">For new roofs, repairs, and full replacements</p>
            </Link>
            <Link href="/templates/electrical-estimate" className="flex-1 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm">
              <h3 className="font-semibold">Electrical Estimate Template</h3>
              <p className="mt-1 text-sm text-slate-500">For panel upgrades, wiring, and installations</p>
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
