import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword, createSession } from "@/lib/auth";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, businessName } = await request.json();

    if (!email || !password || !businessName) {
      return NextResponse.json(
        { error: "Email, password, and business name are required" },
        { status: 400 }
      );
    }

    const existing = await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.email, email.toLowerCase()),
    });

    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const id = nanoid();
    const passwordHash = await hashPassword(password);

    await db.insert(users).values({
      id,
      email: email.toLowerCase(),
      passwordHash,
      businessName,
    });

    await createSession(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
