"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const source = searchParams.get("utm_source") || undefined;
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <section className="bg-white px-6 py-14">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-4">
            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-slate-900">You&apos;re in!</p>
          <p className="mt-1 text-sm text-slate-500">We&apos;ll send quoting tips straight to your inbox.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white px-6 py-14">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          Get quoting tips for your trade
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Short, actionable tips to win more jobs and get paid faster. No spam.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-6 py-3 text-sm transition-colors disabled:opacity-60"
          >
            {status === "loading" ? "Subscribing..." : "Get tips"}
          </button>
        </form>
        {status === "error" && (
          <p className="mt-3 text-sm text-red-600">{errorMsg}</p>
        )}
      </div>
    </section>
  );
}
