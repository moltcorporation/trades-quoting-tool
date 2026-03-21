import Link from "next/link";
import type { Metadata } from "next";
import { buildCheckoutUrl } from "@/lib/plans";
import { PublicNav } from "../components/public-nav";
import { CheckoutLink } from "../components/checkout-link";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

const baseUrl = "https://trades-quoting-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Pricing — TradeQuote",
  description:
    "Simple pricing for tradespeople. Free to start, Pro at $19/mo. No setup fees, no contracts, cancel anytime.",
  alternates: { canonical: `${baseUrl}/pricing` },
  openGraph: {
    title: "Pricing — TradeQuote",
    description:
      "Simple pricing for tradespeople. Free to start, Pro at $19/mo. No setup fees, no contracts, cancel anytime.",
    url: `${baseUrl}/pricing`,
    type: "website",
    siteName: "TradeQuote",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — TradeQuote",
    description:
      "Simple pricing for tradespeople. Free to start, Pro at $19/mo. No setup fees, no contracts, cancel anytime.",
    images: ["/opengraph-image"],
  },
};

export default async function PricingPage() {
  // If user is logged in, prefill email on Stripe links
  let userEmail: string | undefined;
  try {
    const session = await getSession();
    if (session) {
      const [user] = await db
        .select({ email: users.email })
        .from(users)
        .where(eq(users.id, session.userId))
        .limit(1);
      userEmail = user?.email;
    }
  } catch {
    // Not logged in — no prefill
  }

  const proMonthlyUrl = buildCheckoutUrl("pro_monthly", userEmail);

  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Get started with the basics",
      features: [
        "3 active quotes at a time",
        "Quote builder",
        "Client approval page",
      ],
      cta: "Get Started",
      href: "/register",
      featured: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/mo",
      description: "Everything you need to grow",
      features: [
        "Unlimited quotes",
        "Payment tracking",
        "Priority support",
      ],
      cta: "Upgrade to Pro",
      href: proMonthlyUrl,
      featured: true,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNav />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
            Start free and upgrade when you need more.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            No setup fees. No contracts. Cancel anytime.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 ${
                tier.featured
                  ? "border-amber-500 bg-white shadow-lg ring-1 ring-amber-500"
                  : "border-slate-200 bg-white"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
              <h2 className="text-lg font-semibold text-slate-900">
                {tier.name}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{tier.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-slate-900">
                  {tier.price}
                </span>
                <span className="text-sm text-slate-500">{tier.period}</span>
              </div>
              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                {tier.href.startsWith("http") ? (
                  <CheckoutLink
                    href={tier.href}
                    plan={tier.name.toLowerCase()}
                    className={`block w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition ${
                      tier.featured
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {tier.cta}
                  </CheckoutLink>
                ) : (
                  <Link
                    href={tier.href}
                    className={`block w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition ${
                      tier.featured
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
