import { db } from "@/db";
import { users, conversionEvents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, createSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, businessName, utmSource, utmMedium, utmCampaign } =
      await request.json();

    if (!email || !password || !name || !businessName) {
      return NextResponse.json(
        { error: "Email, password, name, and business name are required" },
        { status: 400 }
      );
    }

    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .then((rows) => rows[0]);

    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const [user] = await db
      .insert(users)
      .values({
        email: email.toLowerCase(),
        passwordHash,
        name,
        businessName,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
      })
      .returning();

    await createSession(user.id);

    // Track signup conversion event with UTM attribution
    try {
      await db.insert(conversionEvents).values({
        userId: user.id,
        eventType: "signup_completed",
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
      });
    } catch {
      // Non-blocking — don't fail signup if event tracking fails
    }

    return NextResponse.json({ id: user.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
