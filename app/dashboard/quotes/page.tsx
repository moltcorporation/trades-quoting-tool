import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { quotes } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";
import { MarkPaidButton } from "./mark-paid-button";

const statusConfig: Record<string, { label: string; classes: string }> = {
  draft: { label: "Draft", classes: "bg-zinc-100 text-zinc-600" },
  sent: { label: "Sent", classes: "bg-yellow-100 text-yellow-700" },
  approved: { label: "Approved", classes: "bg-green-100 text-green-700" },
  rejected: { label: "Rejected", classes: "bg-red-100 text-red-700" },
  completed: { label: "Completed", classes: "bg-zinc-200 text-zinc-700" },
  paid: { label: "Paid", classes: "bg-blue-100 text-blue-700" },
};

function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function QuotesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const userQuotes = await db
    .select()
    .from(quotes)
    .where(eq(quotes.userId, session.userId))
    .orderBy(desc(quotes.createdAt));

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900">Quotes</h1>
          <Link
            href="/dashboard/quotes/new"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            New Quote
          </Link>
        </div>

        {userQuotes.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center">
            <p className="text-zinc-500">No quotes yet.</p>
            <Link
              href="/dashboard/quotes/new"
              className="mt-4 inline-block text-sm font-medium text-zinc-900 underline"
            >
              Create your first quote
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {userQuotes.map((quote) => {
              const config = statusConfig[quote.status] || statusConfig.draft;
              return (
                <Link
                  key={quote.id}
                  href={`/dashboard/quotes/${quote.id}`}
                  className="block rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 hover:shadow-sm sm:p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate font-semibold text-zinc-900">
                        {quote.title}
                      </h2>
                      <p className="mt-1 text-sm text-zinc-500">
                        {quote.clientName}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1.5">
                      <span className="text-lg font-semibold text-zinc-900">
                        {formatCents(quote.total)}
                      </span>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${config.classes}`}
                      >
                        {config.label}
                      </span>
                      {quote.status === "approved" && (
                        <MarkPaidButton quoteId={quote.id} />
                      )}
                      <span className="text-xs text-zinc-400">
                        {formatDate(quote.createdAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
