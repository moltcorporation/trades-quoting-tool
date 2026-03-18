import { db } from "@/db";
import { quotes, lineItems } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { quote, lineItems: items } = body;

    const quoteId = nanoid();

    await db.insert(quotes).values({
      id: quoteId,
      userId: session.userId,
      clientName: quote.clientName,
      clientEmail: quote.clientEmail || null,
      clientPhone: quote.clientPhone || null,
      title: quote.title,
      notes: quote.notes || null,
      taxRate: quote.taxRate != null ? Math.round(quote.taxRate * 100) : null,
      status: quote.status || "draft",
    });

    if (items && items.length > 0) {
      await db.insert(lineItems).values(
        items.map((item: { description: string; quantity: number; unitPrice: number }, index: number) => ({
          id: nanoid(),
          quoteId,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          sortOrder: index,
        }))
      );
    }

    return NextResponse.json({ id: quoteId });
  } catch (error) {
    console.error("Create quote error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userQuotes = await db
      .select()
      .from(quotes)
      .where(eq(quotes.userId, session.userId))
      .orderBy(desc(quotes.createdAt));

    // Get line items for all quotes to compute totals
    const quoteIds = userQuotes.map((q) => q.id);
    const allItems =
      quoteIds.length > 0
        ? await db.select().from(lineItems)
        : [];

    const itemsByQuote = allItems.reduce(
      (acc, item) => {
        if (!acc[item.quoteId]) acc[item.quoteId] = [];
        acc[item.quoteId].push(item);
        return acc;
      },
      {} as Record<string, typeof allItems>
    );

    const quotesWithTotals = userQuotes.map((q) => {
      const items = itemsByQuote[q.id] || [];
      const subtotal = items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      );
      const taxAmount = q.taxRate ? Math.round(subtotal * q.taxRate / 10000) : 0;
      const total = subtotal + taxAmount;
      return { ...q, subtotal, taxAmount, total };
    });

    return NextResponse.json(quotesWithTotals);
  } catch (error) {
    console.error("List quotes error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
