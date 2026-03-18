import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { quotes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const [quote] = await db.select().from(quotes).where(eq(quotes.id, id));

  if (!quote) {
    return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  }

  if (quote.userId !== session.userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (quote.status !== "approved") {
    return NextResponse.json(
      { error: "Only approved quotes can be marked as paid" },
      { status: 400 }
    );
  }

  const [updated] = await db
    .update(quotes)
    .set({ status: "paid" })
    .where(eq(quotes.id, id))
    .returning();

  return NextResponse.json(updated);
}
