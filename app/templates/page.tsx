import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Estimate Templates for Trades | TradeQuote",
  description:
    "Free estimate templates for plumbers, HVAC techs, and electricians. Download or create professional estimates instantly with TradeQuote.",
  keywords: [
    "estimate template",
    "plumber estimate template",
    "hvac estimate template",
    "electrician quote template",
    "free estimate template",
    "contractor estimate template",
    "roofing estimate template",
    "handyman invoice template",
    "plumbing invoice template",
    "cleaning invoice template",
    "electrician invoice template",
    "landscaping estimate template",
  ],
};

const templates = [
  {
    title: "Roofing Estimate Template",
    description:
      "Free roofing estimate calculator. Enter job type, square footage, and materials to get an instant cost breakdown for new roofs, repairs, and replacements.",
    href: "/templates/roofing-estimate",
    trade: "Roofers",
    avgJob: "$8,000 – $25,000",
  },
  {
    title: "Handyman Invoice Template",
    description:
      "Free handyman invoice template with an inline generator. Add services, hours, rates, and materials — then preview and download as PDF.",
    href: "/templates/handyman-invoice",
    trade: "Handymen",
    avgJob: "$150 – $500",
  },
  {
    title: "Plumbing Invoice Template",
    description:
      "Free plumbing invoice template with labor, parts, and service descriptions. Create, preview, and download professional plumber invoices instantly.",
    href: "/templates/plumbing-invoice",
    trade: "Plumbers",
    avgJob: "$150 – $2,000",
  },
  {
    title: "Plumbing Estimate Template",
    description:
      "Professional plumbing estimates with line items for labor, parts, and disposal. Covers faucet repairs, drain clearing, pipe replacement, and more.",
    href: "/templates/plumbing-estimate",
    trade: "Plumbers",
    avgJob: "$200 – $3,000",
  },
  {
    title: "HVAC Estimate Template",
    description:
      "HVAC estimates for installations, repairs, and maintenance. Includes equipment, labor, refrigerant, and permit line items.",
    href: "/templates/hvac-estimate",
    trade: "HVAC Techs",
    avgJob: "$500 – $10,000",
  },
  {
    title: "Electrician Quote Template",
    description:
      "Electrical quotes for panel upgrades, wiring, outlet installs, and more. Covers labor, materials, and permit fees.",
    href: "/templates/electrical-estimate",
    trade: "Electricians",
    avgJob: "$300 – $5,000",
  },
  {
    title: "Lawn Care Invoice Template",
    description:
      "Free lawn care invoice template for mowing, edging, trimming, leaf removal, and seasonal cleanup. Create and download professional invoices instantly.",
    href: "/templates/lawn-care-invoice",
    trade: "Lawn Care",
    avgJob: "$30 – $500",
  },
  {
    title: "Auto Body Repair Invoice Template",
    description:
      "Free auto body repair invoice template for collision repair, dent removal, paint jobs, and panel replacement. Itemize labor, parts, and materials instantly.",
    href: "/templates/auto-body-repair-invoice",
    trade: "Auto Body",
    avgJob: "$500 – $10,000",
  },
  {
    title: "Pressure Washing Estimate Template",
    description:
      "Free pressure washing estimate template with inline calculator. Select surface type and job size for instant pricing on driveways, decks, siding, and patios.",
    href: "/templates/pressure-washing-estimate",
    trade: "Pressure Washing",
    avgJob: "$150 – $800",
  },
  {
    title: "Cleaning Invoice Template",
    description:
      "Free cleaning invoice template for house cleaning, carpet cleaning, and commercial cleaning businesses. Create and download professional invoices instantly.",
    href: "/templates/cleaning-invoice",
    trade: "Cleaning",
    avgJob: "$100 – $500",
  },
  {
    title: "Electrician Invoice Template",
    description:
      "Free electrician invoice template with service types, materials, labor hours, and permit fees. Create and download professional electrical invoices instantly.",
    href: "/templates/electrician-invoice",
    trade: "Electricians",
    avgJob: "$200 – $3,000",
  },
  {
    title: "Landscaping Estimate Template",
    description:
      "Free landscaping estimate template for lawn care, hardscaping, and landscaping projects. Build custom estimates with materials, labor, and equipment costs.",
    href: "/templates/landscaping-estimate",
    trade: "Landscaping",
    avgJob: "$500 – $15,000",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Free Estimate Templates for Trades",
  description:
    "Free estimate templates for plumbers, HVAC techs, and electricians.",
  hasPart: templates.map((t) => ({
    "@type": "WebPage",
    name: t.title,
    url: `https://trades-quoting-tool-moltcorporation.vercel.app${t.href}`,
  })),
};

export default function TemplatesIndex() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Free Estimate Templates for Trades
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Professional estimate templates for plumbers, HVAC techs, and
          electricians. Use them as-is or create estimates instantly with
          TradeQuote.
        </p>

        <div className="mt-10 space-y-6">
          {templates.map((template) => (
            <Link
              key={template.href}
              href={template.href}
              className="block rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold">{template.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {template.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-4 text-xs text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  {template.trade}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  Avg job: {template.avgJob}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-12 rounded-xl bg-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">
            Skip the template
          </h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto">
            TradeQuote creates professional estimates your clients can approve
            with one tap. No PDFs, no printing, no chasing.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-amber-400"
          >
            Create your first estimate — free
          </Link>
        </section>
      </main>
    </div>
  );
}
