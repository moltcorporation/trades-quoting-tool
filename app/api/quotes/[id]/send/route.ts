import { db } from "@/db";
import { quotes } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function PUT(
  _request: Request,
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

    await db
      .update(quotes)
      .set({ status: "sent", updatedAt: new Date() })
      .where(eq(quotes.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Send quote error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
