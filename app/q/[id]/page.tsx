export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { db } from "@/db";
import { quotes, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ApproveButton } from "./approve-button";

function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function PublicQuotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [quote] = await db.select().from(quotes).where(eq(quotes.id, id));
  if (!quote) notFound();

  const [user] = await db
    .select({ businessName: users.businessName, name: users.name })
    .from(users)
    .where(eq(users.id, quote.userId));

  const lineItems = quote.lineItems as {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];

  const taxRateNum = parseFloat(quote.taxRate || "0");
  const taxAmount = quote.total - quote.subtotal;

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-zinc-100 p-5 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-wide text-zinc-400">
              Quote
            </p>
            <h1 className="mt-1 text-xl font-bold text-zinc-900 sm:text-2xl">
              {quote.title}
            </h1>
            <div className="mt-4 flex flex-col gap-1 text-sm text-zinc-600 sm:flex-row sm:gap-6">
              <div>
                <span className="font-medium text-zinc-500">From:</span>{" "}
                {user?.businessName || user?.name || "Unknown"}
              </div>
              <div>
                <span className="font-medium text-zinc-500">To:</span>{" "}
                {quote.clientName}
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="p-5 sm:p-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  <th className="pb-3">Description</th>
                  <th className="pb-3 text-right">Qty</th>
                  <th className="pb-3 text-right">Price</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm text-zinc-700">
                {lineItems.map((item, i) => (
                  <tr key={i} className="border-b border-zinc-100">
                    <td className="py-3">{item.description}</td>
                    <td className="py-3 text-right">{item.quantity}</td>
                    <td className="py-3 text-right">
                      {formatCents(item.unitPrice)}
                    </td>
                    <td className="py-3 text-right font-medium">
                      {formatCents(
                        Math.round(item.quantity * item.unitPrice)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="mt-6 space-y-2 border-t border-zinc-200 pt-4">
              <div className="flex justify-between text-sm text-zinc-600">
                <span>Subtotal</span>
                <span>{formatCents(quote.subtotal)}</span>
              </div>
              {taxRateNum > 0 && (
                <div className="flex justify-between text-sm text-zinc-600">
                  <span>Tax ({taxRateNum}%)</span>
                  <span>{formatCents(taxAmount)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-zinc-200 pt-3 text-lg font-bold text-zinc-900">
                <span>Total</span>
                <span>{formatCents(quote.total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {quote.notes && (
            <div className="border-t border-zinc-100 p-5 sm:p-8">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Notes
              </h3>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-600">
                {quote.notes}
              </p>
            </div>
          )}

          {/* Status / Action */}
          <div className="border-t border-zinc-100 p-5 sm:p-8">
            {quote.status === "sent" && <ApproveButton quoteId={quote.id} />}
            {quote.status === "approved" && (
              <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4 text-center">
                <p className="text-lg font-semibold text-yellow-800">
                  Quote Approved &#10003; &mdash; Awaiting Payment
                </p>
                {quote.approvedAt && (
                  <p className="mt-1 text-sm text-yellow-700">
                    Approved on{" "}
                    {new Date(quote.approvedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            )}
            {quote.status === "draft" && (
              <div className="rounded-lg bg-zinc-100 p-4 text-center">
                <p className="text-sm text-zinc-500">
                  This quote hasn&apos;t been sent yet.
                </p>
              </div>
            )}
            {quote.status === "rejected" && (
              <div className="rounded-lg bg-red-50 p-4 text-center">
                <p className="text-sm font-medium text-red-600">
                  This quote was rejected.
                </p>
              </div>
            )}
            {quote.status === "paid" && (
              <div className="rounded-lg bg-green-100 border border-green-300 p-4 text-center">
                <p className="text-lg font-semibold text-green-800">
                  Quote Approved &amp; Paid &#10003;
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
