import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Estimate Template for Plumbers & Electricians | TradeQuote",
  description:
    "Spreadsheet estimates are free but unprofessional. Send client-facing quotes with approve buttons and status tracking for just $19/mo.",
  keywords: [
    "free estimate template plumber",
    "electrician quote template",
    "plumbing estimate spreadsheet",
    "professional quote template trades",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I use a spreadsheet to send estimates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can, but spreadsheet estimates lack a client-facing approval page, status tracking, and a professional appearance. You'll end up emailing PDFs and chasing approvals manually.",
      },
    },
    {
      "@type": "Question",
      name: "What's wrong with emailing a PDF quote?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PDF quotes create a disconnected workflow: you email a file, wait for a reply, and have no way to track if the client even opened it. There's no approve button, no status tracking, and no professional client-facing page.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free estimate template for plumbers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many free templates exist online, but they only solve the formatting problem. They don't help you collect approvals, track status, or get paid faster. TradeQuote handles the entire workflow for $19/month.",
      },
    },
    {
      "@type": "Question",
      name: "How do tradespeople get paid faster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The fastest way to get paid is to send a professional quote with a one-tap approve link. When clients can approve instantly, you eliminate the back-and-forth that delays getting started on the job.",
      },
    },
    {
      "@type": "Question",
      name: "Do clients take you more seriously with a professional quote?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A professional-looking quote with your business name, clear line items, and a simple approval process builds trust and signals that you run a real business — not a side hustle.",
      },
    },
  ],
};

export default function SpreadsheetsComparison() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-slate-900">
            TradeQuote
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
          Free Estimate Template for Plumbers &amp; Electricians
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Yes, spreadsheets are free. But free comes with a cost: no
          client-facing page, no approve button, no status tracking, and an
          unprofessional look that undersells your work.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            The spreadsheet workflow vs. the professional workflow
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Spreadsheet Estimate
              </h3>
              <ol className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-500">
                    1
                  </span>
                  <span>Open spreadsheet, type in line items</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-500">
                    2
                  </span>
                  <span>Export as PDF</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-500">
                    3
                  </span>
                  <span>Email PDF to client</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-500">
                    4
                  </span>
                  <span>Wait for a reply (did they even open it?)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-500">
                    5
                  </span>
                  <span>Do the work</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-medium text-red-500">
                    6
                  </span>
                  <span>Chase payment via text, Venmo, or awkward conversation</span>
                </li>
              </ol>
            </div>

            <div className="rounded-xl border-2 border-blue-600 bg-blue-50/30 p-6">
              <h3 className="text-lg font-semibold text-blue-700">
                TradeQuote
              </h3>
              <ol className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                    1
                  </span>
                  <span>Create a quote in 2 minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                    2
                  </span>
                  <span>Send client a link</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-medium text-green-600">
                    3
                  </span>
                  <span>Client approves with one click</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                    4
                  </span>
                  <span>Do the work</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-medium text-green-600">
                    5
                  </span>
                  <span>Track status from your dashboard</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            What spreadsheets can&apos;t do
          </h2>
          <div className="mt-6 space-y-4">
            {[
              {
                title: "No client-facing page",
                desc: "Your client gets a PDF attachment — not a clean, professional page with your business name and branding.",
              },
              {
                title: "No approve button",
                desc: "Clients have to reply to an email to say \"yes.\" That means delays, lost emails, and uncertainty about whether you have the green light.",
              },
              {
                title: "No payment tracking",
                desc: "You have no way to track whether a job has been paid. Payment status is completely separate from the quote.",
              },
              {
                title: "No status tracking",
                desc: "You have no idea if the client opened your estimate, and no dashboard to see which quotes are pending, approved, or paid.",
              },
              {
                title: "Unprofessional appearance",
                desc: "A spreadsheet export looks like... a spreadsheet. Your quotes should look as professional as your work.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-slate-200 p-4"
              >
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            &quot;But spreadsheets are free&quot;
          </h2>
          <p className="mt-4 text-slate-600 leading-7">
            They are. But think about what your time is worth. If you spend 20
            minutes per quote formatting a spreadsheet, exporting a PDF, and
            emailing it — and then another 20 minutes chasing payment — that
            adds up fast. At 10 quotes a month, that&apos;s nearly 7 hours of
            admin work.
          </p>
          <p className="mt-4 text-slate-600 leading-7">
            TradeQuote costs $19/month. If it saves you even one hour of admin
            time, it&apos;s paid for itself.
          </p>
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
            Your quotes should look as professional as your work.
          </h2>
          <p className="mt-2 text-lg text-slate-300">
            Ditch the spreadsheets. Start sending real quotes.
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
              TradeQuote
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
              <Link href="/compare/housecall-pro" className="hover:text-slate-700">
                vs Housecall Pro
              </Link>
              <Link href="/privacy" className="hover:text-slate-700">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-slate-700">
                Terms
              </Link>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} TradeQuote. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
