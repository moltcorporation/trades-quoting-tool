import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { db } from "@/db";
import { users, conversionEvents } from "@/db/schema";
import { eq } from "drizzle-orm";

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

function verifyStripeWebhook(body: string, signature: string): boolean {
  if (!STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return false;
  }

  try {
    // Stripe signature format: "t=timestamp,v1=signature"
    const signatureParts = signature
      .split(",")
      .reduce((acc: Record<string, string>, part) => {
        const [key, value] = part.split("=");
        acc[key] = value;
        return acc;
      }, {});

    const timestamp = signatureParts.t;
    const signedContent = `${timestamp}.${body}`;
    const expectedSignature = createHmac("sha256", STRIPE_WEBHOOK_SECRET)
      .update(signedContent)
      .digest("hex");

    return signatureParts.v1 === expectedSignature;
  } catch (error) {
    console.error("Webhook verification error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";

  // Verify webhook signature
  if (!verifyStripeWebhook(body, signature)) {
    console.warn("Invalid webhook signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    const event = JSON.parse(body);

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Extract email from session
      const email =
        session.customer_details?.email ||
        session.metadata?.email ||
        session.customer_email;

      if (!email) {
        console.error("No email found in webhook event");
        return NextResponse.json(
          { error: "No email in event" },
          { status: 400 }
        );
      }

      // Determine if Pro based on payment link ID
      const paymentLinkId = session.payment_link;
      const proMonthlyLinkId =
        process.env.STRIPE_PRO_MONTHLY_LINK_ID ||
        "plink_1TCLyVDT8EiLsMQhD88O8ZU2";
      const proAnnualLinkId =
        process.env.STRIPE_PRO_ANNUAL_LINK_ID ||
        "plink_1TCLyNDT8EiLsMQhaLqRjqpI";

      const isPro =
        paymentLinkId === proMonthlyLinkId ||
        paymentLinkId === proAnnualLinkId ||
        session.metadata?.tier === "pro";

      if (!isPro) {
        // Not a Pro payment, acknowledge but don't process
        return NextResponse.json({
          success: true,
          message: "Non-Pro payment received",
        });
      }

      // Find user by email (include UTM fields for conversion attribution)
      const [user] = await db
        .select({
          id: users.id,
          plan: users.plan,
          utmSource: users.utmSource,
          utmMedium: users.utmMedium,
          utmCampaign: users.utmCampaign,
        })
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (!user) {
        console.error(`User not found for email: ${email}`);
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      // Update plan only if upgrading (fail-closed default to free)
      if (user.plan !== "pro") {
        await db
          .update(users)
          .set({ plan: "pro" })
          .where(eq(users.id, user.id));

        console.log(`Updated user ${user.id} to Pro plan`);
      }

      // Track purchase conversion event with UTM attribution from user record
      try {
        await db.insert(conversionEvents).values({
          userId: user.id,
          eventType: "purchase_completed",
          utmSource: user.utmSource,
          utmMedium: user.utmMedium,
          utmCampaign: user.utmCampaign,
        });
      } catch {
        // Non-blocking — don't fail webhook if event tracking fails
      }

      return NextResponse.json({
        success: true,
        message: "Payment processed",
        plan: "pro",
      });
    }

    // Acknowledge other webhook events
    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
