import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/app/components/public-nav";

export const metadata: Metadata = {
  title: "How to Write a Plumbing Estimate: Template + Tips | QuoteTrade",
  description:
    "Learn how to write a professional plumbing estimate with our free template. Includes materials breakdown, labor costs, and tips to avoid common quoting mistakes.",
  keywords: [
    "plumber estimate template",
    "how to quote a plumbing job",
    "plumbing estimate example",
    "plumbing quote template free",
    "how to write a plumbing estimate",
  ],
};

const faqItems = [
  {
    question: "How much should I charge for a plumbing estimate?",
    answer:
      "Most solo plumbers provide free estimates for standard jobs to win the work. For complex jobs that require on-site inspection (like repiping or sewer line work), it's reasonable to charge $50–$150 for a detailed estimate, which can be credited toward the job if they hire you.",
  },
  {
    question: "Should I include a materials markup in my plumbing estimate?",
    answer:
      "Yes. A 15–30% markup on materials is standard in the plumbing industry. This covers your time sourcing materials, gas to pick them up, and the risk of returns. Be transparent about materials costs but you don't need to disclose your markup percentage.",
  },
  {
    question: "How do I handle estimate changes after the job starts?",
    answer:
      "Always include a clause in your estimate that says the final price may change if unexpected issues are found. When changes arise, communicate immediately and send an updated quote before proceeding with additional work.",
  },
  {
    question:
      "What's the difference between a plumbing estimate and a plumbing quote?",
    answer:
      "An estimate is an approximation — the final price may vary. A quote (or bid) is a fixed price you commit to. For most residential plumbing jobs, clients expect a fixed quote. Use estimates for jobs where hidden issues may arise (like drain repair or repiping).",
  },
  {
    question: "How long should a plumbing estimate be valid?",
    answer:
      "Most plumbing estimates are valid for 30 days. This protects you from materials price increases. For large jobs, you may want to shorten this to 14 days. Always state the expiration date clearly on your estimate.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Write a Plumbing Estimate",
    description:
      "Step-by-step guide to writing a professional plumbing estimate that wins jobs and protects your business.",
    step: [
      {
        "@type": "HowToStep",
        name: "Write a clear job description",
        text: "Start with a detailed description of the work to be performed. Be specific about what's included and what's not.",
      },
      {
        "@type": "HowToStep",
        name: "List all materials with costs",
        text: "Itemize every material needed — pipes, fittings, fixtures, sealants. Include quantities and per-unit costs with a standard markup.",
      },
      {
        "@type": "HowToStep",
        name: "Break down labor costs",
        text: "Calculate labor based on estimated hours and your hourly rate. Include travel time if the job is outside your normal service area.",
      },
      {
        "@type": "HowToStep",
        name: "Add tax and fees",
        text: "Include applicable sales tax on materials and any permit fees required for the job.",
      },
      {
        "@type": "HowToStep",
        name: "Specify payment terms",
        text: "State your payment terms clearly: deposit amount, when final payment is due, and accepted payment methods.",
      },
      {
        "@type": "HowToStep",
        name: "Set a timeline and expiration",
        text: "Include an estimated completion timeline and how long the quote is valid (typically 30 days).",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
];

export default function PlumbingEstimateGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PublicNav />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-4 text-sm font-medium text-blue-600">Guide</div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          How to Write a Plumbing Estimate: Template + Tips
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          A professional estimate protects your business, sets clear
          expectations, and helps you win more jobs. Here&apos;s exactly what to
          include and the common mistakes to avoid.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Why written estimates matter
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Legal protection
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                A written estimate serves as a record of the agreed scope and
                price. If a dispute arises, you have documentation to fall back
                on. Verbal agreements are nearly impossible to enforce.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Professionalism
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Clients compare quotes. A well-formatted estimate with clear
                line items signals that you run a professional operation — and
                justifies your pricing.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Fewer surprises
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                When clients see exactly what they&apos;re paying for, there are
                fewer &quot;I didn&apos;t expect that&quot; conversations at the
                end of the job.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Faster payment
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Estimates that include payment terms and accepted methods get
                paid faster. Clients know what to expect and when.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            What to include in your plumbing estimate
          </h2>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                1. Job description
              </h3>
              <p className="mt-2 text-slate-600 leading-7">
                Start with a clear, specific description of the work. Not
                &quot;fix plumbing&quot; — something like &quot;Replace 40-gallon gas water
                heater including removal and disposal of existing unit, new
                supply lines, and updated gas connections.&quot;
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                2. Materials list with costs
              </h3>
              <p className="mt-2 text-slate-600 leading-7">
                Itemize every material: pipes, fittings, fixtures, sealants,
                connectors. Include quantities and per-unit prices. Apply a
                15–30% markup, which is standard in the industry.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                3. Labor breakdown
              </h3>
              <p className="mt-2 text-slate-600 leading-7">
                State your hourly rate and estimated hours. For fixed-price
                jobs, you can show a single labor line item instead. Include
                travel time if the job is outside your normal service area.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                4. Tax and permit fees
              </h3>
              <p className="mt-2 text-slate-600 leading-7">
                Include applicable sales tax on materials. If the job requires a
                permit (water heater installation, re-piping, etc.), list the
                permit fee as a separate line item.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                5. Payment terms
              </h3>
              <p className="mt-2 text-slate-600 leading-7">
                Specify: deposit amount (typically 25–50% for larger jobs), when
                the balance is due (on completion or net-30), and how you accept
                payment (card, bank transfer, check).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                6. Timeline and validity
              </h3>
              <p className="mt-2 text-slate-600 leading-7">
                Include your estimated start date and completion time. State how
                long the quote is valid — 30 days is standard. This protects
                you from materials price increases.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Sample estimate: Water heater replacement
          </h2>
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
              <p className="text-sm font-medium text-slate-700">
                Mike&apos;s Plumbing — Estimate #1042
              </p>
              <p className="text-xs text-slate-500">
                Replace 40-gallon gas water heater, including removal and
                disposal of existing unit
              </p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-5 py-2.5 text-left font-medium text-slate-600">
                    Item
                  </th>
                  <th className="px-5 py-2.5 text-right font-medium text-slate-600">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-5 py-2.5 text-slate-700">
                    40-gal gas water heater (Rheem)
                  </td>
                  <td className="px-5 py-2.5 text-right text-slate-700">
                    $680.00
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-2.5 text-slate-700">
                    Supply lines, fittings, gas connector
                  </td>
                  <td className="px-5 py-2.5 text-right text-slate-700">
                    $85.00
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-2.5 text-slate-700">
                    Expansion tank
                  </td>
                  <td className="px-5 py-2.5 text-right text-slate-700">
                    $45.00
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-2.5 text-slate-700">
                    Labor (4 hours @ $95/hr)
                  </td>
                  <td className="px-5 py-2.5 text-right text-slate-700">
                    $380.00
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-2.5 text-slate-700">
                    Haul-away &amp; disposal
                  </td>
                  <td className="px-5 py-2.5 text-right text-slate-700">
                    $75.00
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-2.5 text-slate-700">Permit fee</td>
                  <td className="px-5 py-2.5 text-right text-slate-700">
                    $60.00
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-2.5 text-slate-700">
                    Sales tax (materials)
                  </td>
                  <td className="px-5 py-2.5 text-right text-slate-700">
                    $64.80
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t border-slate-200 bg-slate-50">
                  <td className="px-5 py-3 font-semibold text-slate-900">
                    Total
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-slate-900">
                    $1,389.80
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="border-t border-slate-100 bg-white px-5 py-3">
              <p className="text-xs text-slate-500">
                50% deposit due on approval. Balance due on completion. Estimate
                valid for 30 days.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Common mistakes to avoid
          </h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
              <h3 className="font-semibold text-slate-900">Underquoting to win the job</h3>
              <p className="mt-1 text-sm text-slate-600">
                Cutting your price to beat a competitor only hurts you. Quote
                fairly and let your professionalism sell the job.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Forgetting materials markup
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Your time sourcing and transporting materials has value. A
                15–30% markup is standard and expected. Don&apos;t sell materials
                at cost.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
              <h3 className="font-semibold text-slate-900">
                No payment terms
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                If you don&apos;t specify when and how you expect payment,
                you&apos;re leaving it to the client to decide. Always include
                deposit requirements and payment due dates.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Vague job descriptions
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                &quot;Fix plumbing&quot; invites scope creep. Be specific about
                what&apos;s included so there&apos;s no confusion later.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-6">
            {faqItems.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-slate-900">
                  {faq.question}
                </h3>
                <p className="mt-2 text-slate-600 leading-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl bg-slate-900 px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-white">
            Skip the spreadsheet. Send professional quotes in minutes.
          </h2>
          <p className="mt-2 text-lg text-slate-300">
            Create, send, and track plumbing estimates — with built-in approval
            and payment.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Create Your First Quote — Free
          </Link>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <Link href="/" className="text-sm font-semibold text-slate-900">
              QuoteTrade
            </Link>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="/register" className="hover:text-slate-700">
                Sign Up
              </Link>
              <Link href="/login" className="hover:text-slate-700">
                Log In
              </Link>
              <Link
                href="/guides/getting-paid-faster-as-a-tradesperson"
                className="hover:text-slate-700"
              >
                Getting Paid Faster
              </Link>
              <Link href="/compare/spreadsheets" className="hover:text-slate-700">
                vs Spreadsheets
              </Link>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} QuoteTrade. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
