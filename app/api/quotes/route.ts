import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { quotes } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    clientName,
    clientEmail,
    clientPhone,
    title,
    lineItems,
    taxRate,
    notes,
    status,
  } = body;

  if (!clientName || !title || !lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
    return NextResponse.json(
      { error: "Client name, title, and at least one line item are required" },
      { status: 400 }
    );
  }

  if (status && status !== "draft" && status !== "sent") {
    return NextResponse.json(
      { error: "Status must be draft or sent" },
      { status: 400 }
    );
  }

  const subtotal = lineItems.reduce(
    (sum: number, item: { quantity: number; unitPrice: number }) =>
      sum + Math.round(item.quantity * item.unitPrice),
    0
  );

  const tax = taxRate ? Math.round(subtotal * (parseFloat(taxRate) / 100)) : 0;
  const total = subtotal + tax;

  const quoteStatus = status || "draft";
  const sentAt = quoteStatus === "sent" ? new Date() : null;

  const [quote] = await db
    .insert(quotes)
    .values({
      userId: session.userId,
      clientName,
      clientEmail: clientEmail || null,
      clientPhone: clientPhone || null,
      title,
      lineItems,
      subtotal,
      taxRate: taxRate ? String(taxRate) : "0",
      total,
      status: quoteStatus,
      notes: notes || null,
      sentAt,
    })
    .returning();

  return NextResponse.json(quote, { status: 201 });
}

export async function GET(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userQuotes = await db
    .select()
    .from(quotes)
    .where(eq(quotes.userId, session.userId))
    .orderBy(desc(quotes.createdAt));

  return NextResponse.json(userQuotes);
}
