"use client";

import { useState, useEffect } from "react";
import { STRIPE_PAYMENT_LINKS } from "@/lib/plans";

const TRADE_TYPES = [
  "Plumber",
  "Electrician",
  "HVAC",
  "Handyman",
  "Painter",
  "Roofer",
  "Carpenter",
  "Landscaper",
  "Other",
];

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500";

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [tradeType, setTradeType] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("free");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load profile and sync Pro status in parallel
    Promise.all([
      fetch("/api/profile").then((res) => res.json()),
      fetch("/api/pro/sync", { method: "POST" }).then((res) => res.json()).catch(() => null),
    ]).then(([data, sync]) => {
      setBusinessName(data.businessName || "");
      setPhone(data.phone || "");
      setCity(data.city || "");
      setState(data.state || "");
      setTradeType(data.tradeType || "");
      setEmail(data.email || "");
      setPlan(sync?.plan || data.plan || "free");
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  function buildUpgradeUrl() {
    const base = STRIPE_PAYMENT_LINKS.pro_monthly;
    if (email) {
      return `${base}?prefilled_email=${encodeURIComponent(email)}`;
    }
    return base;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: businessName.trim(),
          phone: phone.trim() || null,
          city: city.trim() || null,
          state: state.trim() || null,
          tradeType: tradeType || null,
        }),
      });

      if (!res.ok) throw new Error();
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-sm text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Settings</h1>
        <p className="text-zinc-500">Update your business profile</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 sm:p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Business Info
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className={inputClass}
                placeholder="Smith Plumbing"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">
                Trade
              </label>
              <select
                value={tradeType}
                onChange={(e) => setTradeType(e.target.value)}
                className={inputClass}
              >
                <option value="">Select a trade</option>
                {TRADE_TYPES.map((t) => (
                  <option key={t} value={t.toLowerCase()}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">
                Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={inputClass}
                  placeholder="Denver"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700">
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={inputClass}
                  placeholder="CO"
                  maxLength={2}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 sm:p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Plan & Billing
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-900 capitalize">
                {plan} Plan
              </p>
              <p className="text-sm text-zinc-500">
                {plan === "pro"
                  ? "Unlimited quotes, priority support"
                  : "3 active quotes"}
              </p>
            </div>
            {plan === "free" && (
              <a
                href={buildUpgradeUrl()}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Upgrade to Pro
              </a>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={!businessName.trim() || status === "saving"}
            className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
          >
            {status === "saving" ? "Saving..." : "Save Changes"}
          </button>
          {status === "saved" && (
            <p className="text-sm text-emerald-600">Changes saved!</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-500">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
