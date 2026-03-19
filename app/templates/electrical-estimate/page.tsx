import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Electrical Estimate Template | TradeQuote",
  description:
    "Free electrical estimate template with line items, labor, parts, and tax. Or skip the template — create professional estimates instantly with TradeQuote.",
  keywords: [
    "electrical estimate template",
    "electrician estimate template free",
    "electrical quote template",
    "free electrical estimate form",
  ],
};

const sampleLineItems = [
  { description: "200A panel upgrade (labor)", amount: "$1,200" },
  { description: "Square D panel + breakers (parts)", amount: "$850" },
  { description: "Wire 4 new 20A circuits", amount: "$480" },
  { description: "Permit fee", amount: "$175" },
];

const faqItems = [
  {
    question: "What should a electrical estimate include?",
    answer: "A professional electrical estimate should include: your business name and contact info, client name and address, detailed description of work, line items for labor and materials separately, subtotal, tax, total, payment terms, and an expiration date (usually 30 days).",
  },
  {
    question: "How do I price a electrical job?",
    answer: "Most electricians charge $80–$160/hour for labor plus materials with a 15–30% markup. For fixed-price jobs, estimate hours needed, add materials cost, include markup, and add a 10% contingency for unexpected issues.",
  },
  {
    question: "Should I give free estimates?",
    answer: "For standard residential jobs (outlet install, switch replacement, fixture wiring), free estimates are expected and help you win work. For complex jobs requiring on-site inspection (panel upgrades, whole-house rewiring), charging $50–$150 for a detailed estimate is reasonable.",
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

export default function ElectricalEstimateTemplate() {
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
          Free Electrical Estimate Template
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Use this template to create professional electrical estimates. Or skip the copy-paste — TradeQuote lets you build, send, and track estimates in minutes.
        </p>

        {/* Sample estimate */}
        <section className="mt-10">
          <h2 className="text-xl font-bold">What a professional electrical estimate looks like</h2>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white">
              <p className="font-bold">Mike&apos;s Electrical LLC</p>
              <p className="text-sm text-slate-400">Estimate #1042 · Valid for 30 days</p>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-slate-500">Prepared for: <span className="text-slate-900 font-medium">Sarah Johnson</span></p>
              <p className="text-sm text-slate-500 mt-1">Job: Panel upgrade & outlet installation</p>
              <table className="w-full mt-4 text-sm">
                <thead><tr className="border-b border-slate-200 text-slate-500"><th className="text-left pb-2">Description</th><th className="text-right pb-2">Amount</th></tr></thead>
                <tbody>
                  {sampleLineItems.map((item) => (
                    <tr key={item.description} className="border-b border-slate-100">
                      <td className="py-2.5">{item.description}</td>
                      <td className="py-2.5 text-right font-medium">{item.amount}</td>
                    </tr>
                  ))}
                  <tr className="text-slate-500"><td className="py-2 text-right" colSpan={2}>Subtotal: $2,705</td></tr>
                  <tr className="text-slate-500"><td className="py-1 text-right" colSpan={2}>Tax (8%): $216.40</td></tr>
                  <tr className="font-bold text-lg"><td className="py-2 text-right" colSpan={2}>Total: $2,921.40</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* What to include */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">What every electrical estimate needs</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Business info", desc: "Your name, license number, phone, email" },
              { title: "Client details", desc: "Name, address, contact info" },
              { title: "Scope of work", desc: "Detailed description of what you'll do" },
              { title: "Line items", desc: "Labor and materials listed separately" },
              { title: "Payment terms", desc: "When payment is due, accepted methods" },
              { title: "Expiration date", desc: "Usually 30 days — protects against price changes" },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-xl bg-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Skip the template</h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto">
            TradeQuote creates professional estimates your clients can approve with one tap. No PDFs, no printing, no chasing.
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
