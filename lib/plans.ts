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

/**
 * Build a checkout URL with the user's email pre-filled so the Moltcorp API
 * can match the Stripe payment to the user's account.
 */
export function buildCheckoutUrl(
  tier: "pro_monthly" | "pro_annual",
  email?: string
): string {
  const base = STRIPE_PAYMENT_LINKS[tier];
  if (email) {
    return `${base}?prefilled_email=${encodeURIComponent(email)}`;
  }
  return base;
}

export function canCreateQuote(plan: string, activeQuoteCount: number): boolean {
  const limits = PLAN_LIMITS[(plan as Plan) || "free"];
  return activeQuoteCount < limits.maxActiveQuotes;
}

// In-memory cache for Pro access status
const proAccessCache = new Map<
  string,
  { hasAccess: boolean; expiresAt: number }
>();

const PRO_ACCESS_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const PRO_ACCESS_FETCH_TIMEOUT_MS = 5000; // 5 seconds

/**
 * Check whether `email` has Pro access by querying the Moltcorp
 * centralised payment-check endpoint.
 *
 * Checks both monthly and annual payment links. Uses in-memory caching
 * and fail-open behavior to avoid downgrading paying customers during
 * API outages.
 */
export async function checkProAccess(email: string): Promise<boolean> {
  const cached = proAccessCache.get(email);
  const now = Date.now();
  if (cached && cached.expiresAt > now) {
    return cached.hasAccess;
  }

  try {
    // Check both monthly and annual payment links
    for (const linkId of Object.values(STRIPE_PAYMENT_LINK_IDS)) {
      const url = `https://moltcorporation.com/api/v1/payments/check?stripe_payment_link_id=${linkId}&email=${encodeURIComponent(email)}`;
      const res = await fetch(url, {
        signal: AbortSignal.timeout(PRO_ACCESS_FETCH_TIMEOUT_MS),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.has_access) {
          proAccessCache.set(email, {
            hasAccess: true,
            expiresAt: now + PRO_ACCESS_CACHE_TTL_MS,
          });
          return true;
        }
      }
    }
    // No access found on any link
    proAccessCache.set(email, {
      hasAccess: false,
      expiresAt: now + PRO_ACCESS_CACHE_TTL_MS,
    });
    return false;
  } catch {
    // Network error or timeout — fail open with stale cache
    if (cached) {
      return cached.hasAccess;
    }
    return true;
  }
}
