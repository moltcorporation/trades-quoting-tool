export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { users, quotes } from "@/db/schema";
import { eq, count, and } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { checkProAccess } from "@/lib/plans";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  if (!user) redirect("/login");

  // Sync Pro status from Moltcorp API on dashboard load
  const isPro = await checkProAccess(user.email);
  const expectedPlan = isPro ? "pro" : "free";
  if (user.plan !== expectedPlan) {
    await db
      .update(users)
      .set({ plan: expectedPlan })
      .where(eq(users.id, session.userId));
    user.plan = expectedPlan;
  }

  const [totalQuotes] = await db
    .select({ value: count() })
    .from(quotes)
    .where(eq(quotes.userId, session.userId));

  const [pendingQuotes] = await db
    .select({ value: count() })
    .from(quotes)
    .where(
      and(eq(quotes.userId, session.userId), eq(quotes.status, "sent"))
    );

  const [approvedQuotes] = await db
    .select({ value: count() })
    .from(quotes)
    .where(
      and(eq(quotes.userId, session.userId), eq(quotes.status, "approved"))
    );

  const stats = [
    { label: "Total Quotes", value: totalQuotes.value, href: "/dashboard/quotes" },
    { label: "Awaiting Response", value: pendingQuotes.value, href: "/dashboard/quotes" },
    { label: "Approved", value: approvedQuotes.value, href: "/dashboard/quotes" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">
            Welcome, {user.name}!
          </h1>
          <p className="text-zinc-500">{user.businessName}</p>
        </div>
        <Link
          href="/dashboard/quotes/new"
          className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
        >
          New Quote
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-lg border border-zinc-200 bg-white p-6 hover:shadow-sm transition-shadow"
          >
            <p className="text-sm text-zinc-500">{stat.label}</p>
            {stat.value > 0 ? (
              <p className="text-3xl font-bold mt-1 text-zinc-900">
                {stat.value}
              </p>
            ) : (
              <p className="text-sm text-zinc-400 mt-2">
                None yet &rarr;
              </p>
            )}
          </Link>
        ))}
      </div>

      {/* Subscription management for Pro users */}
      {user.plan === "pro" && process.env.NEXT_PUBLIC_STRIPE_PORTAL_LINK && (
        <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-700">Pro Plan</p>
            <p className="text-xs text-zinc-400">Manage billing, update payment, or cancel</p>
          </div>
          <a
            href={process.env.NEXT_PUBLIC_STRIPE_PORTAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-amber-600 hover:text-amber-700"
          >
            Manage Subscription &rarr;
          </a>
        </div>
      )}

      {/* Contact support */}
      <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-700">Need help?</p>
          <p className="text-xs text-zinc-400">We respond within 48 hours</p>
        </div>
        <Link
          href="/contact"
          className="text-sm font-medium text-amber-600 hover:text-amber-700"
        >
          Contact Support &rarr;
        </Link>
      </div>

      {totalQuotes.value === 0 && (
        <>
          <div className="mt-8 rounded-xl border-2 border-blue-200 bg-blue-50 p-8 text-center">
            <h2 className="text-lg font-bold text-zinc-900">
              Welcome! Let&apos;s get your first quote out in under 3 minutes.
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Our quick setup wizard will walk you through creating and sending
              your first professional quote.
            </p>
            <Link
              href="/dashboard/onboarding"
              className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Start Setup Wizard
            </Link>
          </div>

          <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-8 text-center">
            <h2 className="text-lg font-semibold text-zinc-900">
              Or create a quote directly
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Build a professional quote in minutes. Your client approves with one
              tap.
            </p>
            <Link
              href="/dashboard/quotes/new"
              className="mt-4 inline-block rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Create Quote
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
