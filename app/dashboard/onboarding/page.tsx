"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const tradeTypes = [
  "Plumber",
  "Electrician",
  "HVAC",
  "Handyman",
  "Painter",
  "Other",
];

const sampleQuotesByTrade: Record<string, { title: string; items: Array<{ description: string; quantity: number; amount: number }> }> = {
  plumber: {
    title: "Kitchen & Bathroom Plumbing",
    items: [
      { description: "Install new kitchen faucet", quantity: 1, amount: 350 },
      { description: "Bathroom sink repair", quantity: 1, amount: 200 },
      { description: "Labor (2 hours)", quantity: 2, amount: 75 },
    ],
  },
  electrician: {
    title: "Electrical Panel Upgrade & Wiring",
    items: [
      { description: "Panel upgrade to 200A", quantity: 1, amount: 800 },
      { description: "New outlet installation (4x)", quantity: 4, amount: 150 },
      { description: "Labor (6 hours)", quantity: 6, amount: 100 },
    ],
  },
  hvac: {
    title: "HVAC System Service & Inspection",
    items: [
      { description: "Full system inspection", quantity: 1, amount: 150 },
      { description: "Filter replacement & cleaning", quantity: 1, amount: 100 },
      { description: "Seasonal maintenance", quantity: 1, amount: 250 },
    ],
  },
  handyman: {
    title: "Home Repair & Maintenance",
    items: [
      { description: "Drywall repair (3 sections)", quantity: 3, amount: 75 },
      { description: "Paint touch-up", quantity: 1, amount: 100 },
      { description: "Hardware installation", quantity: 1, amount: 50 },
    ],
  },
  painter: {
    title: "Interior Painting",
    items: [
      { description: "Living room (400 sq ft)", quantity: 1, amount: 600 },
      { description: "Bedroom (300 sq ft)", quantity: 1, amount: 450 },
      { description: "Paint & materials", quantity: 1, amount: 200 },
    ],
  },
  other: {
    title: "Professional Service",
    items: [
      { description: "Service work", quantity: 1, amount: 300 },
      { description: "Materials & supplies", quantity: 1, amount: 150 },
      { description: "Labor (3 hours)", quantity: 3, amount: 75 },
    ],
  },
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1 fields
  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [tradeType, setTradeType] = useState("");

  // Step 2 - Pre-filled sample quote
  const [clientName, setClientName] = useState("Sample Client");
  const [quoteTitle, setQuoteTitle] = useState("");

  // Step 3
  const [quoteId, setQuoteId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [quoteCount, setQuoteCount] = useState(0);
  const [isPro, setIsPro] = useState(false);

  const quoteLink =
    quoteId && typeof window !== "undefined"
      ? `${window.location.origin}/q/${quoteId}`
      : "";

  const sampleQuote = tradeType ? sampleQuotesByTrade[tradeType.toLowerCase()] || sampleQuotesByTrade.other : null;

  async function handleStep1() {
    if (!businessName || !city || !state || !tradeType) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName, city, state, tradeType }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save profile");
      }
      // Pre-set the sample quote title from the selected trade
      const sample = sampleQuotesByTrade[tradeType.toLowerCase()] || sampleQuotesByTrade.other;
      setQuoteTitle(sample.title);
      setStep(2);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleStep2() {
    if (!clientName || !quoteTitle) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (!sampleQuote) {
        throw new Error("Invalid trade type");
      }

      const lineItems = sampleQuote.items.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: Math.round(item.amount * 100),
      }));

      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: clientName.trim(),
          title: quoteTitle.trim(),
          lineItems,
          status: "draft",
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        if (data.upgrade) {
          setIsPro(false);
        }
        throw new Error(data.error || "Failed to create quote");
      }
      const quote = await res.json();

      // Fetch quote count to show upgrade nudge if needed
      const countRes = await fetch("/api/quotes/count");
      if (countRes.ok) {
        const { count, plan } = await countRes.json();
        setQuoteCount(count);
        setIsPro(plan === "pro");
      }

      setQuoteId(quote.id);
      setStep(3);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkSent() {
    if (!quoteId) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/quotes/${quoteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "sent" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update quote");
      }
      router.push("/dashboard");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(quoteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-zinc-500 mb-2">
          <span>Step {step} of 3</span>
          <span>
            {step === 1 && "Set up your business"}
            {step === 2 && "Create your first quote"}
            {step === 3 && "Send it!"}
          </span>
        </div>
        <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Step 1: Business setup */}
      {step === 1 && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-bold text-zinc-900">
            Set up your business
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            This info appears on your quotes.
          </p>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Business name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Mike's Plumbing"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Austin"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. TX"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Trade type
              </label>
              <select
                value={tradeType}
                onChange={(e) => setTradeType(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="">Select your trade</option>
                {tradeTypes.map((t) => (
                  <option key={t} value={t.toLowerCase()}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="text-sm text-zinc-400 hover:text-zinc-600"
            >
              Skip
            </button>
            <button
              onClick={handleStep1}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Next"}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Review pre-filled sample quote */}
      {step === 2 && sampleQuote && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-bold text-zinc-900">
            Review your sample quote
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            We&apos;ve pre-filled a sample quote for {tradeType}. Customize it or send as-is.
          </p>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Client name
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Sarah Johnson"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Quote title
              </label>
              <input
                type="text"
                value={quoteTitle}
                onChange={(e) => setQuoteTitle(e.target.value)}
                placeholder="e.g. Kitchen Renovation"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="rounded-lg bg-zinc-50 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-zinc-700">Sample Line Items</h3>
              {sampleQuote.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm text-zinc-600">
                  <span>{item.description}</span>
                  <span className="font-medium">${item.amount.toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-zinc-200 pt-2 flex justify-between text-sm font-semibold text-zinc-900">
                <span>Total</span>
                <span>${sampleQuote.items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-zinc-500">
              Tip: You can edit all details after creation
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => router.push("/dashboard")}
              className="text-sm text-zinc-400 hover:text-zinc-600"
            >
              Skip
            </button>
            <button
              onClick={handleStep2}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Quote"}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Client preview & send */}
      {step === 3 && quoteId && (
        <div className="space-y-6">
          {/* Client preview highlight */}
          <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-900">Quote created! Here&apos;s what your client sees:</h3>
                <p className="mt-1 text-sm text-green-800">
                  This is the professional, branded page your client will view. They can approve with one tap.
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-green-200 bg-white p-4 overflow-hidden">
              <div className="text-center space-y-3">
                <div className="text-sm text-zinc-500">Preview:</div>
                <div className="bg-gradient-to-br from-zinc-50 to-zinc-100 rounded p-6">
                  <p className="text-sm font-medium text-zinc-700 mb-2">Sample Client</p>
                  <p className="text-lg font-bold text-zinc-900 mb-4">{quoteTitle}</p>
                  <Link href={`/q/${quoteId}`} target="_blank" className="text-blue-600 hover:underline text-sm font-medium">
                    View Client Preview →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Share section */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="text-xl font-bold text-zinc-900">Share with your client</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Copy and send this link via text, email, or chat for instant approval.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={quoteLink}
                className="flex-1 rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 outline-none font-mono"
              />
              <button
                onClick={handleCopy}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 whitespace-nowrap"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Upgrade nudge if on free tier with 2+ quotes */}
          {!isPro && quoteCount >= 2 && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-amber-900">You're on the free plan (3 quotes max)</h3>
                  <p className="mt-1 text-sm text-amber-800">
                    Go Pro for unlimited quotes, custom branding, and more.
                  </p>
                </div>
              </div>
              <Link
                href="/pricing"
                className="mt-4 inline-block rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
              >
                View Pricing
              </Link>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/dashboard")}
              className="text-sm text-zinc-400 hover:text-zinc-600"
            >
              Done
            </button>
            <button
              onClick={handleMarkSent}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Mark as Sent & Close"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
