import { db } from "@/db";
import { conversionEvents } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const bySource = await db
      .select({
        utmSource: conversionEvents.utmSource,
        eventType: conversionEvents.eventType,
        count: sql<number>`count(*)`,
      })
      .from(conversionEvents)
      .groupBy(conversionEvents.utmSource, conversionEvents.eventType);

    const byCampaign = await db
      .select({
        utmCampaign: conversionEvents.utmCampaign,
        eventType: conversionEvents.eventType,
        count: sql<number>`count(*)`,
      })
      .from(conversionEvents)
      .groupBy(conversionEvents.utmCampaign, conversionEvents.eventType);

    const totals = await db
      .select({
        eventType: conversionEvents.eventType,
        count: sql<number>`count(*)`,
      })
      .from(conversionEvents)
      .groupBy(conversionEvents.eventType);

    return NextResponse.json({ bySource, byCampaign, totals });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
