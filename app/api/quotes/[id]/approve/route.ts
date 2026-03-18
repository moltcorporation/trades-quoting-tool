import { db } from "@/db";
import { quotes } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function PUT(
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

    if (quote.status !== "sent") {
      return NextResponse.json(
        { error: "Quote cannot be approved in its current state" },
        { status: 400 }
      );
    }

    await db
      .update(quotes)
      .set({ status: "approved", updatedAt: new Date() })
      .where(eq(quotes.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Approve quote error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
