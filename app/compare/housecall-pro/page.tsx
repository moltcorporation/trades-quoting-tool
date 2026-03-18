import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Housecall Pro Alternative — Simple Quoting for Solo Trades",
  description:
    "Housecall Pro starts at $79/mo with features you'll never use. QuoteTrade gives you quote→approve→pay simplicity for $19/mo.",
  keywords: [
    "Housecall Pro alternative",
    "Housecall Pro pricing",
    "cheap field service software",
    "simple quoting tool for trades",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does Housecall Pro cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Housecall Pro plans range from $79/month to $329/month, depending on the features and number of users. Annual billing is required for the best rates.",
      },
    },
    {
      "@type": "Question",
      name: "Is Housecall Pro good for solo tradespeople?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Housecall Pro includes many features aimed at growing companies — dispatching, inventory management, and marketing tools. Solo tradespeople often find they're paying for capabilities they never use.",
      },
    },
    {
      "@type": "Question",
      name: "What's the simplest alternative to Housecall Pro?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QuoteTrade focuses on the core workflow solo tradespeople need: create a quote, send it to your client, let them approve and pay online. No bloat, no complexity, just $19/month.",
      },
    },
    {
      "@type": "Question",
      name: "Can I switch from Housecall Pro to QuoteTrade?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can sign up for QuoteTrade and start sending quotes immediately. There's no migration needed — just start creating quotes for new jobs.",
      },
    },
  ],
};

function CheckIcon() {
  return (
    <svg
      className="mx-auto h-5 w-5 text-green-600"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className="mx-auto h-5 w-5 text-slate-300"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export default function HousecallProComparison() {
  const features = [
    { name: "Professional quoting", us: true, them: true, need: true },
    { name: "Online payments", us: true, them: true, need: true },
    { name: "Client approval links", us: true, them: true, need: true },
    { name: "Quote status tracking", us: true, them: true, need: true },
    { name: "Dispatching & scheduling", us: false, them: true, need: false },
    { name: "Inventory management", us: false, them: true, need: false },
    { name: "Postcard marketing tools", us: false, them: true, need: false },
    { name: "Review management", us: false, them: true, need: false },
    { name: "Sales proposals", us: false, them: true, need: false },
    { name: "Quickbooks sync", us: false, them: true, need: false },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-slate-900">
            QuoteTrade
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-4 text-sm font-medium text-blue-600">
          Comparison
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Housecall Pro Alternative — Simple Quoting for Solo Trades
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Housecall Pro is a solid platform for growing service businesses. But
          if you&apos;re a solo tradesperson, you&apos;re paying $79–$329/month
          for a bloated feature set when all you need is a simple way to quote
          and get paid.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            What Housecall Pro gives you (that you don&apos;t need)
          </h2>
          <p className="mt-4 text-slate-600 leading-7">
            Housecall Pro includes dispatching, inventory management, automated
            marketing postcards, review management, and multi-technician
            scheduling. These are great features — for companies with employees
            to dispatch and inventory to track.
          </p>
          <p className="mt-4 text-slate-600 leading-7">
            If you&apos;re a one-person plumbing, electrical, or HVAC business,
            your workflow is simple: quote the job, get approval, do the work,
            get paid. You don&apos;t need software that complicates that.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Their bloated feature set vs. our focused workflow
          </h2>
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left font-medium text-slate-600">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-slate-600">
                    You need it?
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-blue-600">
                    QuoteTrade
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-slate-600">
                    Housecall Pro
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr
                    key={f.name}
                    className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                  >
                    <td className="px-4 py-3 text-slate-700">{f.name}</td>
                    <td className="px-4 py-3 text-center">
                      {f.need ? <CheckIcon /> : <XIcon />}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {f.us ? <CheckIcon /> : <XIcon />}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {f.them ? <CheckIcon /> : <XIcon />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            The real cost comparison
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-6">
              <h3 className="font-medium text-slate-500">Housecall Pro</h3>
              <div className="mt-2 text-3xl font-bold text-slate-900">
                $79–329<span className="text-lg font-normal text-slate-500">/mo</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Basic plan starts at $79/mo</li>
                <li>Essentials plan: $189/mo</li>
                <li>MAX plan: $329/mo</li>
                <li>Per-user pricing adds up fast</li>
              </ul>
            </div>
            <div className="rounded-xl border-2 border-blue-600 bg-blue-50/30 p-6">
              <h3 className="font-medium text-blue-600">QuoteTrade</h3>
              <div className="mt-2 text-3xl font-bold text-slate-900">
                $19<span className="text-lg font-normal text-slate-500">/mo</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Everything you need, nothing you don&apos;t</li>
                <li>No contracts — cancel anytime</li>
                <li>Quote → Approve → Pay workflow</li>
                <li>Send quotes in under 2 minutes</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-6">
            {(jsonLd.mainEntity as Array<{ "@type": string; name: string; acceptedAnswer: { "@type": string; text: string } }>).map((faq) => (
              <div key={faq.name}>
                <h3 className="font-semibold text-slate-900">{faq.name}</h3>
                <p className="mt-2 text-slate-600 leading-7">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl bg-slate-900 px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-white">
            Stop paying for features you&apos;ll never use.
          </h2>
          <p className="mt-2 text-lg text-slate-300">
            Quote. Approve. Get paid. That&apos;s the whole product.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Start Sending Quotes — $19/mo
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
              <Link href="/compare/servicetitan" className="hover:text-slate-700">
                vs ServiceTitan
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
