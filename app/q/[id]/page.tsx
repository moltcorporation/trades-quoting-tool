export const dynamic = "force-dynamic";

import { db } from "@/db";
import { lineItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ApproveButton } from "./approve-button";

export default async function ClientQuotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const quote = await db.query.quotes.findFirst({
    where: (q, { eq }) => eq(q.id, id),
  });

  if (!quote) notFound();

  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.id, quote.userId),
  });

  const items = await db
    .select()
    .from(lineItems)
    .where(eq(lineItems.quoteId, id))
    .orderBy(lineItems.sortOrder);

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const taxAmount = quote.taxRate
    ? Math.round((subtotal * quote.taxRate) / 10000)
    : 0;
  const total = subtotal + taxAmount;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="rounded-lg border border-slate-200 bg-white p-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                {user?.businessName || "Quote"}
              </h1>
              {user?.phone && (
                <p className="mt-1 text-sm text-slate-500">{user.phone}</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Quote
              </p>
              <p className="text-sm text-slate-500">
                {quote.createdAt
                  ? new Date(quote.createdAt).toLocaleDateString()
                  : ""}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <h2 className="text-lg font-semibold text-slate-900">
              {quote.title}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Prepared for: {quote.clientName}
            </p>
          </div>

          {/* Line Items Table */}
          <div className="mt-6 overflow-hidden rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Description
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                    Unit Price
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 text-sm text-slate-900">
                      {item.description}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700">
                      ${(item.unitPrice / 100).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">
                      ${((item.quantity * item.unitPrice) / 100).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-4 flex flex-col items-end gap-1">
            <div className="flex w-56 justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="text-slate-900">
                ${(subtotal / 100).toFixed(2)}
              </span>
            </div>
            {quote.taxRate != null && quote.taxRate > 0 && (
              <div className="flex w-56 justify-between text-sm">
                <span className="text-slate-500">
                  Tax ({(quote.taxRate / 100).toFixed(2)}%)
                </span>
                <span className="text-slate-900">
                  ${(taxAmount / 100).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex w-56 justify-between border-t border-slate-200 pt-2 mt-1">
              <span className="text-lg font-bold text-slate-900">Total</span>
              <span className="text-lg font-bold text-slate-900">
                ${(total / 100).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Notes */}
          {quote.notes && (
            <div className="mt-6 border-t border-slate-200 pt-6">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                Notes / Scope of Work
              </h3>
              <p className="mt-2 text-sm text-slate-700 whitespace-pre-wrap">
                {quote.notes}
              </p>
            </div>
          )}

          {/* Status Actions */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            {quote.status === "draft" && (
              <div className="rounded-md bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-500">
                  This quote hasn&apos;t been sent yet.
                </p>
              </div>
            )}
            {quote.status === "sent" && <ApproveButton quoteId={quote.id} />}
            {quote.status === "approved" && (
              <div className="rounded-md bg-green-50 p-4 text-center">
                <p className="text-lg font-semibold text-green-700">
                  Quote Approved &#10003;
                </p>
              </div>
            )}
            {(quote.status === "completed" || quote.status === "paid") && (
              <div className="rounded-md bg-emerald-50 p-4 text-center">
                <p className="text-lg font-semibold text-emerald-700">
                  {quote.status === "paid"
                    ? "Quote Paid &#10003;"
                    : "Quote Completed &#10003;"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
