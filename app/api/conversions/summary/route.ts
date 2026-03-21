import { db } from "@/db";
import { conversionEvents } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

    return NextResponse.json({ bySource, byCampaign, totals });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch conversion summary" },
      { status: 500 }
    );
  }
}
