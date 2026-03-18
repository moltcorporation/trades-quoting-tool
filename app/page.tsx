import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trades Quoting Tool — Professional Quotes, Approvals & Payments for Tradespeople",
  description:
    "Send professional quotes, get client approvals, and collect payments. Built for plumbers, electricians, HVAC techs, and contractors. Free to start, Pro at $19/mo.",
};

const steps = [
  { number: 1, title: "Create your quote", description: "Add line items, labor, and parts in minutes." },
  { number: 2, title: "Send the link", description: "Text or email a professional quote page to your client." },
  { number: 3, title: "Client approves & pays", description: "One tap to approve. Payment collected via Stripe." },
];

const competitors = [
  { name: "ServiceTitan", price: "$300+/mo" },
  { name: "Housecall Pro", price: "$79/mo" },
  { name: "Tradify", price: "$47/mo" },
  { name: "Us", price: "$19/mo", highlight: true },
];

const quoteLineItems = [
  { description: "Replace kitchen faucet", amount: 350 },
  { description: "Install disposal", amount: 275 },
  { description: "Parts", amount: 85 },
];

const subtotal = quoteLineItems.reduce((sum, item) => sum + item.amount, 0);
const tax = Math.round(subtotal * 0.08 * 100) / 100;
const total = subtotal + tax;

export default function LandingPage() {
  return (
    <main className="min-h-screen font-sans">
      {/* ──────────────── Hero ──────────────── */}
      <section className="bg-slate-900 text-slate-50 px-6 py-24 md:py-32 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Send quotes. Get approvals. Collect payment.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Professional quoting for plumbers, electricians, and contractors.
            Stop texting estimates and chasing payments on Venmo.
          </p>
          <Link
            href="/register"
            className="mt-10 inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold text-lg px-8 py-4 rounded-lg transition-colors"
          >
            Create your first quote &mdash; free
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <span>Powered by Stripe</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <span>Your data is encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>No long-term contracts</span>
          </div>
        </div>
      </section>

      {/* ──────────────── How It Works ──────────────── */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 text-slate-900 text-xl font-bold">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── Problem / Solution ──────────────── */}
      <section className="bg-slate-900 text-slate-50 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center">
            Your work is worth more than a text message estimate.
          </h2>

          <div className="mt-14 grid gap-12 md:grid-cols-2">
            {/* Pain */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-4">The problem</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">&#x2717;</span>
                  Texting rough estimates that look unprofessional
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">&#x2717;</span>
                  Losing track of who approved what
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">&#x2717;</span>
                  Chasing payments through Venmo and Zelle
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">&#x2717;</span>
                  No paper trail when disputes happen
                </li>
              </ul>
            </div>

            {/* Fix */}
            <div>
              <h3 className="text-xl font-semibold text-emerald-400 mb-4">The fix</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-0.5">&#x2713;</span>
                  Professional quote page with your business name
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-0.5">&#x2713;</span>
                  One-tap client approval with timestamp
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-0.5">&#x2713;</span>
                  Stripe-powered payment collection
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-0.5">&#x2713;</span>
                  Everything recorded — no more he-said, she-said
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── Quote Preview Mockup ──────────────── */}
      <section className="bg-slate-100 px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            What your client sees
          </h2>
          <p className="text-slate-600 mb-10">
            A clean, professional quote — not a screenshot of your Notes app.
          </p>

          {/* Mockup card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 text-left overflow-hidden">
            {/* Header */}
            <div className="bg-slate-900 text-white px-6 py-5">
              <h3 className="text-xl font-bold">Mike&apos;s Plumbing</h3>
              <p className="text-sm text-slate-400 mt-1">Quote #1042</p>
            </div>

            <div className="px-6 py-6">
              <p className="text-sm text-slate-500 mb-1">Prepared for</p>
              <p className="font-semibold text-slate-900 mb-6">Sarah Johnson</p>

              {/* Line items */}
              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="text-left pb-2 font-medium">Description</th>
                    <th className="text-right pb-2 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {quoteLineItems.map((item) => (
                    <tr key={item.description} className="border-b border-slate-100">
                      <td className="py-3 text-slate-800">{item.description}</td>
                      <td className="py-3 text-right text-slate-800">
                        ${item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="space-y-1 text-sm text-right">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="text-slate-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tax (8%)</span>
                  <span className="text-slate-800">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-slate-200 mt-2">
                  <span className="text-slate-900">Total</span>
                  <span className="text-slate-900">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Approve button (decorative) */}
              <div className="mt-8 text-center">
                <span className="inline-block bg-emerald-500 text-white font-semibold px-8 py-3 rounded-lg text-base cursor-default">
                  Approve Quote
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── Competitor Pricing ──────────────── */}
      <section className="bg-slate-900 text-slate-50 px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">
            They build for big companies. We build for you.
          </h2>

          <div className="overflow-hidden rounded-xl border border-slate-700">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-800 text-slate-400">
                  <th className="px-6 py-3 font-medium">Platform</th>
                  <th className="px-6 py-3 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((c) => (
                  <tr
                    key={c.name}
                    className={
                      c.highlight
                        ? "bg-amber-500/10 border-t border-slate-700"
                        : "border-t border-slate-700"
                    }
                  >
                    <td
                      className={`px-6 py-4 ${
                        c.highlight ? "font-bold text-amber-400" : "text-slate-300"
                      }`}
                    >
                      {c.name}
                    </td>
                    <td
                      className={`px-6 py-4 text-right ${
                        c.highlight ? "font-bold text-amber-400" : "text-slate-300"
                      }`}
                    >
                      {c.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ──────────────── Pricing ──────────────── */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900">Simple pricing</h2>
          <p className="mt-3 text-slate-600">No setup fees. No contracts. Cancel anytime.</p>

          <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            {/* Free tier */}
            <div className="rounded-2xl border border-slate-200 p-8 text-left">
              <h3 className="text-xl font-bold text-slate-900">Free</h3>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                $0<span className="text-base font-normal text-slate-500">/mo</span>
              </p>
              <ul className="mt-6 space-y-3 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">&#x2713;</span>
                  3 active quotes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">&#x2713;</span>
                  Send via link
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">&#x2713;</span>
                  Client approval
                </li>
              </ul>
              <Link
                href="/register"
                className="mt-8 block text-center border-2 border-slate-900 text-slate-900 font-semibold py-3 rounded-lg hover:bg-slate-900 hover:text-white transition-colors"
              >
                Get started free
              </Link>
            </div>

            {/* Pro tier */}
            <div className="rounded-2xl border-2 border-amber-500 p-8 text-left relative">
              <span className="absolute -top-3 left-6 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Most popular
              </span>
              <h3 className="text-xl font-bold text-slate-900">Pro</h3>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                $19<span className="text-base font-normal text-slate-500">/mo</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">
                or $149/yr <span className="text-emerald-600 font-medium">(save 35%)</span>
              </p>
              <ul className="mt-6 space-y-3 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">&#x2713;</span>
                  Unlimited quotes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">&#x2713;</span>
                  Payment collection via Stripe
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">&#x2713;</span>
                  Priority support
                </li>
              </ul>
              <a
                href="https://buy.stripe.com/cNi4gz7BN2pX8HzfeQ3Nm0a"
                className="mt-8 block text-center bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-3 rounded-lg transition-colors"
              >
                Start Pro
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── FAQ ──────────────── */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center">Frequently asked questions</h2>
          <div className="mt-12 space-y-6">
            {[
              { q: "Is the free tier really free?", a: "Yes. Create up to 3 active quotes, send them to clients, and get approvals — no credit card required. Upgrade to Pro when you need unlimited quotes and payment collection." },
              { q: "How do clients pay?", a: "When a client approves a quote, they pay through Stripe Checkout — the same secure payment system used by Amazon, Shopify, and millions of businesses. All payments are PCI compliant and encrypted." },
              { q: "Can I use this on my phone?", a: "Yes. The entire tool is designed mobile-first. Create quotes on your phone between jobs, and your clients view and approve quotes on their phones too." },
              { q: "What happens when a client approves a quote?", a: "They're taken to a Stripe payment page. Once payment is complete, you get notified and the quote is marked as paid in your dashboard." },
              { q: "Do I need a Stripe account?", a: "Yes, but it's free to create. You keep 100% of your quote amount minus standard Stripe processing fees (2.9% + 30¢). We don't take any additional cut." },
            ].map((faq, i) => (
              <details key={i} className="group rounded-lg border border-slate-200 bg-white">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-left font-medium text-slate-900">
                  {faq.q}
                  <svg className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="px-6 pb-4 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                { "@type": "Question", name: "Is the free tier really free?", acceptedAnswer: { "@type": "Answer", text: "Yes. Create up to 3 active quotes, send them to clients, and get approvals — no credit card required." } },
                { "@type": "Question", name: "How do clients pay?", acceptedAnswer: { "@type": "Answer", text: "When a client approves a quote, they pay through Stripe Checkout — PCI compliant and encrypted." } },
                { "@type": "Question", name: "Can I use this on my phone?", acceptedAnswer: { "@type": "Answer", text: "Yes. The entire tool is designed mobile-first for tradespeople on the go." } },
                { "@type": "Question", name: "What happens when a client approves a quote?", acceptedAnswer: { "@type": "Answer", text: "They pay through Stripe, you get notified, and the quote is marked as paid in your dashboard." } },
                { "@type": "Question", name: "Do I need a Stripe account?", acceptedAnswer: { "@type": "Answer", text: "Yes, but it's free. You keep 100% minus standard Stripe fees (2.9% + 30¢)." } },
              ],
            }),
          }}
        />
      </section>

      {/* ──────────────── Footer ──────────────── */}
      <footer className="bg-slate-900 text-slate-400 px-6 py-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>Built by AI agents at Moltcorp</p>
          <nav className="flex gap-6">
            <Link href="/login" className="hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/register" className="hover:text-white transition-colors">
              Register
            </Link>
            <Link href="/feedback" className="hover:text-white transition-colors">
              Feedback
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
