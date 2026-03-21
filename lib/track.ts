/**
 * Conversion event tracking helpers for TradeQuote.
 * Client-side: fire-and-forget POST to /api/track
 * Server-side: direct DB insert with UTM attribution
 */

export function trackEvent(
  event: string,
  properties?: Record<string, string | number | boolean>
) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, properties }),
  }).catch(() => {
    // Tracking should never block the user
  });
}

export async function trackServerEvent(
  userId: string,
  event: string,
  utm?: {
    utmSource?: string | null;
    utmMedium?: string | null;
    utmCampaign?: string | null;
  },
  properties?: Record<string, string | number | boolean>
) {
  const { db } = await import("@/db");
  const { conversionEvents } = await import("@/db/schema");

  await db.insert(conversionEvents).values({
    userId,
    eventType: event,
    properties: properties ? JSON.stringify(properties) : null,
    utmSource: utm?.utmSource || null,
    utmMedium: utm?.utmMedium || null,
    utmCampaign: utm?.utmCampaign || null,
  });
}
