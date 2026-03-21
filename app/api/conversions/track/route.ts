import { db } from "@/db";
import { conversionEvents } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

const VALID_EVENTS = [
  "signup_completed",
  "checkout_initiated",
  "purchase_completed",
  "page_view",
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, userId, utmSource, utmMedium, utmCampaign, utmContent, utmTerm } = body;

    if (!eventType || !VALID_EVENTS.includes(eventType)) {
      return NextResponse.json(
        { error: "Invalid event type" },
        { status: 400 }
      );
    }

    await db.insert(conversionEvents).values({
      eventType,
      userId: userId || null,
      utmSource: utmSource || null,
      utmMedium: utmMedium || null,
      utmCampaign: utmCampaign || null,
      utmContent: utmContent || null,
      utmTerm: utmTerm || null,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
