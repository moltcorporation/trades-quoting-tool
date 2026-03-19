import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { quotes, users } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, count } from "drizzle-orm";
import { checkProAccess } from "@/lib/plans";

export async function GET(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [user] = await db
    .select({ plan: users.plan, email: users.email })
    .from(users)
    .where(eq(users.id, session.userId));

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  // Check Pro status via Moltcorp API
  const isPro = await checkProAccess(user.email);
  const effectivePlan = isPro ? "pro" : user.plan;

  // Get total quote count
  const [result] = await db
    .select({ value: count() })
    .from(quotes)
    .where(eq(quotes.userId, session.userId));

  return NextResponse.json({
    count: result?.value || 0,
    plan: effectivePlan,
  });
}
