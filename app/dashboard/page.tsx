export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { quotes, lineItems } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.id, session.userId),
  });

  if (!user) redirect("/login");

  const userQuotes = await db
    .select()
    .from(quotes)
    .where(eq(quotes.userId, session.userId));

  const totalQuotes = userQuotes.length;
  const sentQuotes = userQuotes.filter((q) => q.status === "sent").length;
  const approvedQuotes = userQuotes.filter(
    (q) => q.status === "approved" || q.status === "completed" || q.status === "paid"
  ).length;

  // Calculate revenue from approved/completed/paid quotes
  const approvedIds = userQuotes
    .filter((q) => q.status === "approved" || q.status === "completed" || q.status === "paid")
    .map((q) => q.id);

  let totalRevenue = 0;
  if (approvedIds.length > 0) {
    for (const q of userQuotes.filter(
      (q) => q.status === "approved" || q.status === "completed" || q.status === "paid"
    )) {
      const items = await db
        .select({
          total: sql<number>`sum(${lineItems.quantity} * ${lineItems.unitPrice})`,
        })
        .from(lineItems)
        .where(eq(lineItems.quoteId, q.id));

      const subtotal = Number(items[0]?.total || 0);
      const taxAmount = q.taxRate ? Math.round(subtotal * q.taxRate / 10000) : 0;
      totalRevenue += subtotal + taxAmount;
    }
  }

  const stats = [
    { label: "Total Quotes", value: totalQuotes },
    { label: "Sent", value: sentQuotes },
    { label: "Approved", value: approvedQuotes },
    {
      label: "Total Revenue",
      value: `$${(totalRevenue / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">
        Welcome back, {user.businessName}
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Here&apos;s an overview of your quoting activity.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-slate-200 bg-white p-6"
          >
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
