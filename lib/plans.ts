export type Plan = "free" | "pro";

export const PLAN_LIMITS: Record<Plan, { maxActiveQuotes: number; label: string }> = {
  free: { maxActiveQuotes: 3, label: "Free" },
  pro: { maxActiveQuotes: Infinity, label: "Pro" },
};

export const STRIPE_PAYMENT_LINKS: Record<string, string> = {
  pro_monthly: "https://buy.stripe.com/00w8wP7BN0hP4rjeaM3Nm0f",
  pro_annual: "https://buy.stripe.com/4gMcN56xJd4B2jbaYA3Nm0e",
};

export const STRIPE_PAYMENT_LINK_IDS: Record<string, string> = {
  pro_monthly: "plink_1TCLyVDT8EiLsMQhD88O8ZU2",
  pro_annual: "plink_1TCLyNDT8EiLsMQhaLqRjqpI",
};

export function canCreateQuote(plan: string, activeQuoteCount: number): boolean {
  const limits = PLAN_LIMITS[(plan as Plan) || "free"];
  return activeQuoteCount < limits.maxActiveQuotes;
}
