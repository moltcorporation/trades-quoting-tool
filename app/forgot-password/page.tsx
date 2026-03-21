"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.error || "Something went wrong");
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-slate-900">Reset your password</h1>

          {submitted ? (
            <div className="mt-4">
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                If an account exists with that email, we&apos;ve sent a password reset link. Check your inbox.
              </div>
              <p className="mt-4 text-center text-sm text-slate-500">
                <Link href="/login" className="text-slate-900 font-medium hover:underline">
                  Back to login
                </Link>
              </p>
            </div>
          ) : (
            <>
              <p className="mt-1 text-sm text-slate-500">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>

              {error && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-slate-500">
                Remember your password?{" "}
                <Link href="/login" className="text-slate-900 font-medium hover:underline">
                  Log in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
