import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { checkProAccess } from "@/lib/plans";

/**
 * POST /api/pro/sync
 *
 * Re-checks Pro status for the authenticated user via Moltcorp API
 * and updates the user's plan in the database accordingly.
 */
export async function POST(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [user] = await db
    .select({ email: users.email, plan: users.plan })
    .from(users)
    .where(eq(users.id, session.userId));

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isPro = await checkProAccess(user.email);
  const newPlan = isPro ? "pro" : "free";

  if (newPlan !== user.plan) {
    await db
      .update(users)
      .set({ plan: newPlan })
      .where(eq(users.id, session.userId));
  }

  return NextResponse.json({ plan: newPlan, synced: true });
}
