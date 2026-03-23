import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Painting Estimate Template | TradeQuote",
  description:
    "Free painting estimate template with interior/exterior pricing, labor, materials, and prep costs. Create professional estimates instantly with TradeQuote.",
  keywords: [
    "painting estimate template",
    "painter estimate template free",
    "painting quote template",
    "interior painting estimate",
    "exterior painting estimate",
    "painting estimate form",
  ],
};

const sampleLineItems = [
  { description: "Interior paint - living room (labor)", amount: "$450" },
  { description: "Benjamin Moore Premium Plus paint (2 gal)", amount: "$120" },
  { description: "Surface prep (walls, trim, caulking)", amount: "$180" },
  { description: "Ceiling paint and trim (labor)", amount: "$280" },
  { description: "Cleanup and waste removal", amount: "$60" },
];

const faqItems = [
  {
    question: "What should a painting estimate include?",
    answer: "A professional painting estimate should include: your business name, license, and contact info; client name and address; detailed scope (interior/exterior, room count, type of paint); labor costs per room; material costs (paint, primer, supplies); surface prep costs; travel fee if applicable; subtotal, tax, total; timeline; and expiration date (usually 30 days).",
  },
  {
    question: "How do I price a painting job?",
    answer: "Most professional painters charge $40–$70/hour for labor, or use square footage pricing ($0.75–$2.50/sq ft depending on complexity). Calculate materials cost (paint, primer, supplies), add markup for overhead (20–30%), include prep work separately, add 10–15% for contingencies, and adjust for travel time if needed.",
  },
  {
    question: "How much do interior vs. exterior painting estimates differ?",
    answer: "Exterior painting is typically 20–30% more expensive due to weather conditions, equipment needs (ladders, scaffolding), surface prep (pressure washing, scraping), and higher-grade materials. Interior is faster and requires less prep, but quality finish standards are stricter. Both should be itemized separately in estimates.",
  },
  {
    question: "Should I charge for paint prep work?",
    answer: "Yes. Surface prep (sanding, caulking, filling holes, drop cloths, taping) is 30–40% of total labor cost. Professional-looking results require quality prep. Always itemize it separately so clients understand the value.",
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

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">TradeQuote</Link>
          <Link href="/register" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">Create free estimate</Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Free Painting Estimate Template
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Use this template to create professional painting estimates for interior and exterior work. Or skip the copy-paste — TradeQuote lets you build, send, and track estimates in minutes.
        </p>

        {/* Sample estimate */}
        <section className="mt-10">
          <h2 className="text-xl font-bold">What a professional painting estimate looks like</h2>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white">
              <p className="font-bold">Quality Brush Painting Co.</p>
              <p className="text-sm text-slate-400">Estimate #2847 · Valid for 30 days</p>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-slate-500">Prepared for: <span className="text-slate-900 font-medium">Robert Martinez</span></p>
              <p className="text-sm text-slate-500 mt-1">Job: Interior living room and hallway refresh</p>
              <table className="w-full mt-4 text-sm">
                <thead><tr className="border-b border-slate-200 text-slate-500"><th className="text-left pb-2">Description</th><th className="text-right pb-2">Amount</th></tr></thead>
                <tbody>
                  {sampleLineItems.map((item) => (
                    <tr key={item.description} className="border-b border-slate-100">
                      <td className="py-2.5">{item.description}</td>
                      <td className="py-2.5 text-right font-medium">{item.amount}</td>
                    </tr>
                  ))}
                  <tr className="text-slate-500"><td className="py-2 text-right" colSpan={2}>Subtotal: $1,090</td></tr>
                  <tr className="text-slate-500"><td className="py-1 text-right" colSpan={2}>Tax (8%): $87.20</td></tr>
                  <tr className="font-bold text-lg"><td className="py-2 text-right" colSpan={2}>Total: $1,177.20</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* What to include */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">What every painting estimate needs</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Business info", desc: "Your name, license number, phone, email" },
              { title: "Client details", desc: "Name, address, contact info, phone" },
              { title: "Scope of work", desc: "Interior/exterior, rooms, paint type, prep needed" },
              { title: "Line items", desc: "Labor, materials, prep, and travel listed separately" },
              { title: "Payment terms", desc: "Deposit required, payment schedule, accepted methods" },
              { title: "Expiration date", desc: "Usually 30 days — accounts for material price changes" },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interior vs. Exterior */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Interior vs. Exterior Painting Estimates</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-lg">Interior Painting</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Typical hourly rate: $40–$60</li>
                <li>• Prep work: 30–40% of labor</li>
                <li>• Paint quality: Premium finishes expected</li>
                <li>• Timeline: 1–3 days per room</li>
                <li>• Focus: Smooth walls, crisp trim lines</li>
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-lg">Exterior Painting</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Typical hourly rate: $50–$70</li>
                <li>• Prep work: 40–50% of labor</li>
                <li>• Paint quality: Weather-resistant required</li>
                <li>• Equipment: Ladders, scaffolding, safety gear</li>
                <li>• Focus: Durability, weather protection</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-xl bg-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Skip the template</h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto">
            TradeQuote creates professional painting estimates your clients can approve with one tap. Track acceptance, payment, and project status — all in one place.
          </p>
          <Link href="/register" className="mt-6 inline-block rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-amber-400">
            Create your first estimate — free
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
