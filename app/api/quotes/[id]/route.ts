import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { quotes } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, and } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const [quote] = await db.select().from(quotes).where(eq(quotes.id, id));

  if (!quote) {
    return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  }

  return NextResponse.json(quote);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const [existing] = await db
    .select()
    .from(quotes)
    .where(and(eq(quotes.id, id), eq(quotes.userId, session.userId)));

  if (!existing) {
    return NextResponse.json({ error: "Quote not found" }, { status: 404 });
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

  const updates: Record<string, unknown> = {};

  if (clientName !== undefined) updates.clientName = clientName;
  if (clientEmail !== undefined) updates.clientEmail = clientEmail;
  if (clientPhone !== undefined) updates.clientPhone = clientPhone;
  if (title !== undefined) updates.title = title;
  if (notes !== undefined) updates.notes = notes;

  if (lineItems !== undefined) {
    updates.lineItems = lineItems;
    const subtotal = lineItems.reduce(
      (sum: number, item: { quantity: number; unitPrice: number }) =>
        sum + Math.round(item.quantity * item.unitPrice),
      0
    );
    updates.subtotal = subtotal;

    const rate = taxRate !== undefined ? parseFloat(taxRate) : parseFloat(existing.taxRate || "0");
    const tax = Math.round(subtotal * (rate / 100));
    updates.total = subtotal + tax;
  }

  if (taxRate !== undefined) {
    updates.taxRate = String(taxRate);
    const subtotal = (updates.subtotal as number) ?? existing.subtotal;
    const tax = Math.round(subtotal * (parseFloat(taxRate) / 100));
    updates.total = subtotal + tax;
  }

  if (status !== undefined) {
    updates.status = status;
    if (status === "sent" && !existing.sentAt) {
      updates.sentAt = new Date();
    }
  }

  const [updated] = await db
    .update(quotes)
    .set(updates)
    .where(eq(quotes.id, id))
    .returning();

  return NextResponse.json(updated);
}
