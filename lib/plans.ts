export type Plan = "free" | "pro";

export const PLAN_LIMITS: Record<Plan, { maxActiveQuotes: number; label: string }> = {
  free: { maxActiveQuotes: 3, label: "Free" },
  pro: { maxActiveQuotes: Infinity, label: "Pro" },
};

export const STRIPE_PAYMENT_LINKS: Record<string, string> = {
  pro_monthly: "https://buy.stripe.com/cNi4gz7BN2pX8HzfeQ3Nm0a",
  pro_annual: "https://buy.stripe.com/14A28r09lc0x2jbaYA3Nm0d",
};

export const STRIPE_PAYMENT_LINK_IDS: Record<string, string> = {
  pro_monthly: "plink_1TCLoeDT8EiLsMQhjBQaTkVu",
  pro_annual: "plink_1TCLp7DT8EiLsMQhRuGzGZVS",
};

export function canCreateQuote(plan: string, activeQuoteCount: number): boolean {
  const limits = PLAN_LIMITS[(plan as Plan) || "free"];
  return activeQuoteCount < limits.maxActiveQuotes;
}
