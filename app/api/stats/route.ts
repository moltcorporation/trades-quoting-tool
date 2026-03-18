import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, quotes } from "@/db/schema";
import { count, inArray } from "drizzle-orm";

export async function GET() {
  const [userCount] = await db.select({ value: count() }).from(users);

  const [sentCount] = await db
    .select({ value: count() })
    .from(quotes)
    .where(inArray(quotes.status, ["sent", "approved", "paid"]));

  const [approvedCount] = await db
    .select({ value: count() })
    .from(quotes)
    .where(inArray(quotes.status, ["approved", "paid"]));

  return NextResponse.json(
    {
      users: userCount.value,
      quotesSent: sentCount.value,
      quotesApproved: approvedCount.value,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300",
      },
    }
  );
}
