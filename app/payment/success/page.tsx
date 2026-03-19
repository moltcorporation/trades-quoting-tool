"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [synced, setSynced] = useState(false);
  const [syncError, setSyncError] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    fetch("/api/pro/sync", { method: "POST" })
      .then((res) => {
        if (res.ok) setSynced(true);
        else setSyncError(true);
      })
      .catch(() => setSyncError(true));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-5xl items-center px-4">
          <Link href="/" className="text-lg font-bold text-slate-900">
            TradeQuote
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center">
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            {/* Success checkmark */}
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>

            <span className="inline-block rounded-full bg-amber-500 px-3 py-0.5 text-xs font-semibold text-white">
              PRO
            </span>

            <h1 className="mt-3 text-2xl font-bold text-slate-900">
              Welcome to TradeQuote Pro!
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Your payment was successful. Your account has been upgraded to the
              Pro plan at $19/mo.
            </p>

            {/* Sync status */}
            {syncError && (
              <p className="mt-3 text-xs text-red-500">
                Plan sync failed — don&apos;t worry, it will retry
                automatically.
              </p>
            )}

            {/* Unlocked features */}
            <div className="mt-6 rounded-lg border border-slate-100 bg-slate-50 p-4 text-left">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Now unlocked
              </p>
              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  Unlimited quotes
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  Payment tracking
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  Priority support
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/dashboard/quotes/new"
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Create a Quote
              </Link>
            </div>

            {/* Countdown */}
            <p className="mt-5 text-xs text-slate-400">
              Redirecting to dashboard in {countdown}s
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
