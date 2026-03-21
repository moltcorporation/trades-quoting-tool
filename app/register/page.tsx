"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData(e.currentTarget);

    // Read UTM params from cookie
    let utmSource: string | undefined;
    let utmMedium: string | undefined;
    let utmCampaign: string | undefined;
    try {
      const utmCookie = document.cookie
        .split("; ")
        .find((c) => c.startsWith("utm="));
      if (utmCookie) {
        const utmData = JSON.parse(decodeURIComponent(utmCookie.split("=").slice(1).join("=")));
        utmSource = utmData.utm_source;
        utmMedium = utmData.utm_medium;
        utmCampaign = utmData.utm_campaign;
      }
    } catch {
      // Cookie parse failed — proceed without UTM
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
        name: data.get("name"),
        businessName: data.get("businessName"),
        utmSource,
        utmMedium,
        utmCampaign,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.error || "Registration failed");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Minimal nav */}
      <nav className="px-6 py-4">
        <Link href="/" className="text-lg font-bold text-slate-900 hover:text-amber-600 transition-colors">
          TradeQuote
        </Link>
      </nav>

      <div className="flex items-center justify-center px-4 py-8 sm:py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-slate-900">Start sending professional quotes</h1>
        <p className="mt-1 text-sm text-slate-500">
          Free plan includes 3 active quotes. No credit card required.
        </p>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Your name</label>
            <input type="text" name="name" id="name" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-slate-700 mb-1">Business name</label>
            <input type="text" name="businessName" id="businessName" required placeholder="e.g. Mike's Plumbing" className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" name="email" id="email" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input type="password" name="password" id="password" required minLength={8} className={inputClass} />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-50 transition-colors"
          >
            {loading ? "Creating account..." : "Create Free Account"}
          </button>
        </form>

        {/* Trust signals for ad traffic */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            No credit card
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Setup in 2 min
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Cancel anytime
          </span>
        </div>

        <p className="mt-4 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-slate-900 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
}
