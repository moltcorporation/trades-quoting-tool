import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      businessName: users.businessName,
      phone: users.phone,
      city: users.city,
      state: users.state,
      tradeType: users.tradeType,
      plan: users.plan,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { businessName, phone, city, state, tradeType } = body;

  const updates: Record<string, string> = {};
  if (businessName !== undefined) updates.businessName = businessName;
  if (phone !== undefined) updates.phone = phone;
  if (city !== undefined) updates.city = city;
  if (state !== undefined) updates.state = state;
  if (tradeType !== undefined) updates.tradeType = tradeType;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: "No fields to update" },
      { status: 400 }
    );
  }

  const [updated] = await db
    .update(users)
    .set(updates)
    .where(eq(users.id, session.userId))
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      businessName: users.businessName,
      phone: users.phone,
      city: users.city,
      state: users.state,
      tradeType: users.tradeType,
      plan: users.plan,
    });

  return NextResponse.json(updated);
}
