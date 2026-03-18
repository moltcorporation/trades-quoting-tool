import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { quotes } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const [quote] = await db.select().from(quotes).where(eq(quotes.id, id));

  if (!quote) {
    return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  }

  if (quote.status !== "sent") {
    return NextResponse.json(
      { error: "Only sent quotes can be approved" },
      { status: 400 }
    );
  }

  const [updated] = await db
    .update(quotes)
    .set({
      status: "approved",
      approvedAt: new Date(),
    })
    .where(eq(quotes.id, id))
    .returning();

  return NextResponse.json(updated);
}
