import { db } from "@/db";
import { conversionEvents } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FUNNEL_STAGES = [
  "signup_completed",
  "quote_created",
  "checkout_initiated",
  "purchase_completed",
] as const;

export async function GET() {
  try {
    // Conversions grouped by UTM source and event type
    const bySource = await db
      .select({
        utmSource: conversionEvents.utmSource,
        eventType: conversionEvents.eventType,
        count: sql<number>`count(*)::int`,
      })
      .from(conversionEvents)
      .groupBy(conversionEvents.utmSource, conversionEvents.eventType)
      .orderBy(sql`count(*) desc`);

    // Conversions grouped by UTM campaign and event type
    const byCampaign = await db
      .select({
        utmCampaign: conversionEvents.utmCampaign,
        eventType: conversionEvents.eventType,
        count: sql<number>`count(*)::int`,
      })
      .from(conversionEvents)
      .groupBy(conversionEvents.utmCampaign, conversionEvents.eventType)
      .orderBy(sql`count(*) desc`);

    // Totals by event type
    const totals = await db
      .select({
        eventType: conversionEvents.eventType,
        count: sql<number>`count(*)::int`,
      })
      .from(conversionEvents)
      .groupBy(conversionEvents.eventType);

    // Build funnel view grouped by channel (source/medium/campaign)
    const channelRows = await db
      .select({
        utmSource: conversionEvents.utmSource,
        utmMedium: conversionEvents.utmMedium,
        utmCampaign: conversionEvents.utmCampaign,
        eventType: conversionEvents.eventType,
        count: sql<number>`count(*)::int`,
      })
      .from(conversionEvents)
      .groupBy(
        conversionEvents.utmSource,
        conversionEvents.utmMedium,
        conversionEvents.utmCampaign,
        conversionEvents.eventType
      );

    const funnel: Record<string, Record<string, number>> = {};
    for (const row of channelRows) {
      const channel = [
        row.utmSource || "(direct)",
        row.utmMedium || "(none)",
        row.utmCampaign || "(none)",
      ].join(" / ");
      if (!funnel[channel]) {
        funnel[channel] = {};
        for (const stage of FUNNEL_STAGES) {
          funnel[channel][stage] = 0;
        }
      }
      funnel[channel][row.eventType] = row.count;
    }

    return NextResponse.json({ bySource, byCampaign, totals, funnel });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch conversion summary" },
      { status: 500 }
    );
  }
}
