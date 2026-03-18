export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { quotes, lineItems } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";

const statusStyles: Record<string, string> = {
  draft: "bg-slate-100 text-slate-700",
  sent: "bg-blue-100 text-blue-700",
  approved: "bg-green-100 text-green-700",
  completed: "bg-emerald-100 text-emerald-700",
  paid: "bg-purple-100 text-purple-700",
};

export default async function QuotesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const userQuotes = await db
    .select()
    .from(quotes)
    .where(eq(quotes.userId, session.userId))
    .orderBy(desc(quotes.createdAt));

  // Get line items for totals
  const quotesWithTotals = await Promise.all(
    userQuotes.map(async (q) => {
      const items = await db
        .select()
        .from(lineItems)
        .where(eq(lineItems.quoteId, q.id));
      const subtotal = items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      );
      const taxAmount = q.taxRate
        ? Math.round((subtotal * q.taxRate) / 10000)
        : 0;
      return { ...q, total: subtotal + taxAmount };
    })
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Quotes</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your quotes and proposals.
          </p>
        </div>
        <Link
          href="/dashboard/quotes/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          New Quote
        </Link>
      </div>

      {quotesWithTotals.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            No quotes yet. Create your first quote to get started.
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {quotesWithTotals.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <Link
                      href={`/q/${q.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      {q.title}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                    {q.clientName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                    ${(q.total / 100).toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusStyles[q.status] || statusStyles.draft}`}
                    >
                      {q.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                    {q.createdAt
                      ? new Date(q.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
