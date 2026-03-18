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

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
        name: data.get("name"),
        businessName: data.get("businessName"),
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
    "w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500";

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-zinc-900">Create your account</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Start sending professional quotes in minutes.
        </p>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-1">Your name</label>
            <input type="text" name="name" id="name" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-zinc-700 mb-1">Business name</label>
            <input type="text" name="businessName" id="businessName" required placeholder="e.g. Mike's Plumbing" className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1">Email</label>
            <input type="email" name="email" id="email" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700 mb-1">Password</label>
            <input type="password" name="password" id="password" required minLength={8} className={inputClass} />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="text-zinc-900 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
