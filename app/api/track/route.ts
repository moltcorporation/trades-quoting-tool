export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { conversionEvents } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { sendToGA4 } from "@/lib/ga4";

const VALID_EVENTS = [
  "signup_completed",
  "quote_created",
  "checkout_initiated",
  "purchase_completed",
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, properties } = body;

    if (!event || !VALID_EVENTS.includes(event)) {
      return NextResponse.json(
        { error: "Invalid or missing event" },
        { status: 400 }
      );
    }

    // Get user ID from session if available
    const session = await getSession(request);
    const userId = session?.userId || body.userId || null;

    // Read UTM from cookie
    const utmCookie = request.cookies.get("utm")?.value;
    let utmSource: string | null = null;
    let utmMedium: string | null = null;
    let utmCampaign: string | null = null;

    if (utmCookie) {
      try {
        const utm = JSON.parse(decodeURIComponent(utmCookie));
        utmSource = utm.utm_source || null;
        utmMedium = utm.utm_medium || null;
        utmCampaign = utm.utm_campaign || null;
      } catch {
        // ignore malformed cookie
      }
    }

    // Log to database
    await db.insert(conversionEvents).values({
      userId,
      eventType: event,
      properties: properties ? JSON.stringify(properties) : null,
      utmSource,
      utmMedium,
      utmCampaign,
    });

    // Send to GA4 (fire-and-forget)
    await sendToGA4({
      event_type: event,
      user_id: userId,
      timestamp: Date.now(),
      product_name: "TradeQuote",
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      ...properties,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Track event error:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}
