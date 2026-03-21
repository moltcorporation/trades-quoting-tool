import type { Metadata } from "next";
import { buildCheckoutUrl } from "@/lib/plans";
import { PublicNav } from "../components/public-nav";
import { PricingCards } from "./pricing-cards";
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
  let userPlan: string | undefined;
  try {
    const session = await getSession();
    if (session) {
      const [user] = await db
        .select({ email: users.email, plan: users.plan })
        .from(users)
        .where(eq(users.id, session.userId))
        .limit(1);
      userEmail = user?.email;
      userPlan = user?.plan;
    }
  } catch {
    // Not logged in — no prefill
  }

  const proMonthlyUrl = buildCheckoutUrl("pro_monthly", userEmail);
  const proAnnualUrl = buildCheckoutUrl("pro_annual", userEmail);
  const portalUrl = process.env.NEXT_PUBLIC_STRIPE_PORTAL_LINK || null;

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

        <PricingCards
          proMonthlyUrl={proMonthlyUrl}
          proAnnualUrl={proAnnualUrl}
          userPlan={userPlan}
          portalUrl={portalUrl}
        />
      </div>
    </div>
  );
}
