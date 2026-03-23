export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { users, quotes } from "@/db/schema";
import { eq, count, and } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { checkProAccess } from "@/lib/plans";

function getProfileCompletion(user: {
  name: string | null;
  businessName: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  tradeType: string | null;
}) {
  const fields = [
    { key: "name", label: "Your name", done: !!user.name },
    { key: "businessName", label: "Business name", done: !!user.businessName },
    { key: "tradeType", label: "Trade type", done: !!user.tradeType },
    { key: "city", label: "City", done: !!user.city },
    { key: "state", label: "State", done: !!user.state },
    { key: "phone", label: "Phone number", done: !!user.phone },
  ];
  const completed = fields.filter((f) => f.done).length;
  return { fields, completed, total: fields.length, percent: Math.round((completed / fields.length) * 100) };
}

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

  const profile = getProfileCompletion(user);

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

      {/* Profile completion progress */}
      {profile.percent < 100 && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-amber-900">
              Profile {profile.percent}% complete
            </p>
            <Link
              href="/dashboard/settings"
              className="text-xs font-medium text-amber-700 hover:text-amber-800"
            >
              Complete setup &rarr;
            </Link>
          </div>
          <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all"
              style={{ width: `${profile.percent}%` }}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {profile.fields.filter((f) => !f.done).map((f) => (
              <span
                key={f.key}
                className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs text-amber-800"
              >
                + {f.label}
              </span>
            ))}
          </div>
        </div>
      )}

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
        <div className="mt-8 rounded-xl border-2 border-blue-200 bg-blue-50 p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-zinc-900">
            Create your first quote
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Build a professional quote in under 3 minutes. Your client approves with one tap.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard/onboarding"
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Guided Setup (2 min)
            </Link>
            <Link
              href="/dashboard/quotes/new"
              className="rounded-lg border border-zinc-300 bg-white px-6 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Create Quote Directly
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
