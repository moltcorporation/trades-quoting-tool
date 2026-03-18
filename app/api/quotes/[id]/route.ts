import { db } from "@/db";
import { quotes, lineItems } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const quote = await db.query.quotes.findFirst({
      where: (q, { eq }) => eq(q.id, id),
    });

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    const items = await db
      .select()
      .from(lineItems)
      .where(eq(lineItems.quoteId, id))
      .orderBy(lineItems.sortOrder);

    return NextResponse.json({ quote, lineItems: items });
  } catch (error) {
    console.error("Get quote error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const quote = await db.query.quotes.findFirst({
      where: (q, { eq, and }) =>
        and(eq(q.id, id), eq(q.userId, session.userId)),
    });

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    const body = await request.json();

    await db
      .update(quotes)
      .set({
        clientName: body.clientName ?? quote.clientName,
        clientEmail: body.clientEmail ?? quote.clientEmail,
        clientPhone: body.clientPhone ?? quote.clientPhone,
        title: body.title ?? quote.title,
        notes: body.notes ?? quote.notes,
        taxRate: body.taxRate !== undefined ? body.taxRate : quote.taxRate,
        status: body.status ?? quote.status,
        updatedAt: new Date(),
      })
      .where(eq(quotes.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update quote error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
