import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/app/components/public-nav";

export const metadata: Metadata = {
  title: "ServiceTitan Alternative for Solo Tradespeople | QuoteTrade",
  description:
    "ServiceTitan costs $300+/mo and is built for large companies. QuoteTrade gives solo tradespeople professional quoting and approval tracking for just $19/mo.",
  keywords: [
    "ServiceTitan alternative",
    "ServiceTitan for small business",
    "cheap alternative to ServiceTitan",
    "solo tradesperson quoting software",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is ServiceTitan worth it for a solo tradesperson?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most solo tradespeople, no. ServiceTitan is designed for companies with 10+ employees, dispatch teams, and fleet vehicles. At $300+/month, you're paying for features like GPS fleet tracking and multi-crew scheduling that a 1-3 person shop will never use.",
      },
    },
    {
      "@type": "Question",
      name: "What is the cheapest alternative to ServiceTitan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QuoteTrade offers professional quoting and approval tracking for solo tradespeople at $19/month — a fraction of ServiceTitan's $300+/month price tag.",
      },
    },
    {
      "@type": "Question",
      name: "Can I send professional quotes without ServiceTitan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. QuoteTrade lets you create, send, and track professional quotes in minutes. Clients can approve online without you needing enterprise-level software.",
      },
    },
    {
      "@type": "Question",
      name: "What features does a solo tradesperson actually need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most solo tradespeople need three things: a way to send professional-looking quotes, a way for clients to approve them, and a way to track job status. You don't need dispatching, fleet GPS, or a full CRM.",
      },
    },
    {
      "@type": "Question",
      name: "Does QuoteTrade track quote status?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can see which quotes are pending, approved, or completed from your dashboard. Clients approve with one tap, and you get notified instantly.",
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

export default function ServiceTitanComparison() {
  const features = [
    { name: "Professional quoting", us: true, them: true, need: true },
    { name: "Payment tracking", us: true, them: true, need: true },
    { name: "Client approval flow", us: true, them: true, need: true },
    { name: "Quote status tracking", us: true, them: true, need: true },
    { name: "Multi-crew scheduling", us: false, them: true, need: false },
    { name: "Fleet GPS tracking", us: false, them: true, need: false },
    { name: "Enterprise CRM", us: false, them: true, need: false },
    { name: "Call recording", us: false, them: true, need: false },
    { name: "Inventory management", us: false, them: true, need: false },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PublicNav />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-4 text-sm font-medium text-blue-600">
          Comparison
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          ServiceTitan Alternative for Solo Tradespeople
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          ServiceTitan is a powerful platform — built for companies with dozens
          of employees, dispatch teams, and fleet vehicles. If you&apos;re a 1–3
          person shop, you&apos;re paying $300+/month for software designed for
          someone else.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            The problem with ServiceTitan for small shops
          </h2>
          <p className="mt-4 text-slate-600 leading-7">
            ServiceTitan was built for large home service companies. They have
            enterprise-grade features like fleet GPS tracking, multi-crew
            scheduling, call recording, and advanced reporting dashboards. These
            features are incredible — if you have 20 trucks and a dispatch team.
          </p>
          <p className="mt-4 text-slate-600 leading-7">
            But if you&apos;re a solo plumber, electrician, or HVAC tech, you
            don&apos;t need any of that. You need to send a quote, get it
            approved, and get paid. That&apos;s it.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Feature comparison
          </h2>
          <p className="mt-2 text-slate-600">
            What you actually need vs. what you&apos;re paying for.
          </p>

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
                    ServiceTitan
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
            Price comparison
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-6">
              <h3 className="font-medium text-slate-500">ServiceTitan</h3>
              <div className="mt-2 text-3xl font-bold text-slate-900">
                $300+<span className="text-lg font-normal text-slate-500">/mo</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Annual contracts required</li>
                <li>Setup fees apply</li>
                <li>Built for 10+ employee companies</li>
                <li>Training required</li>
              </ul>
            </div>
            <div className="rounded-xl border-2 border-blue-600 bg-blue-50/30 p-6">
              <h3 className="font-medium text-blue-600">QuoteTrade</h3>
              <div className="mt-2 text-3xl font-bold text-slate-900">
                $19<span className="text-lg font-normal text-slate-500">/mo</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>No contracts — cancel anytime</li>
                <li>No setup fees</li>
                <li>Built for 1–3 person shops</li>
                <li>Start sending quotes in minutes</li>
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
            You don&apos;t need enterprise software.
          </h2>
          <p className="mt-2 text-lg text-slate-300">
            You need to send quotes and get paid.
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
              <Link href="/compare/housecall-pro" className="hover:text-slate-700">
                vs Housecall Pro
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
