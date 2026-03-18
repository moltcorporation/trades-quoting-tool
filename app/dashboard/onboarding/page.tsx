"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const tradeTypes = [
  "Plumber",
  "Electrician",
  "HVAC",
  "Handyman",
  "Painter",
  "Other",
];

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

  // Step 2 fields
  const [clientName, setClientName] = useState("");
  const [lineItemDesc, setLineItemDesc] = useState("");
  const [lineItemAmount, setLineItemAmount] = useState("");

  // Step 3
  const [quoteId, setQuoteId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const quoteLink =
    quoteId && typeof window !== "undefined"
      ? `${window.location.origin}/q/${quoteId}`
      : "";

  async function handleStep1() {
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
      setStep(2);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleStep2() {
    if (!clientName || !lineItemDesc || !lineItemAmount) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const amount = Math.round(parseFloat(lineItemAmount) * 100);
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Enter a valid amount");
      }
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          title: lineItemDesc,
          lineItems: [
            {
              description: lineItemDesc,
              quantity: 1,
              unitPrice: amount,
            },
          ],
          status: "draft",
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create quote");
      }
      const quote = await res.json();
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

      {/* Step 2: Create first quote */}
      {step === 2 && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-bold text-zinc-900">
            Create your first quote
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Keep it simple — you can edit it later.
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
                Description
              </label>
              <input
                type="text"
                value={lineItemDesc}
                onChange={(e) => setLineItemDesc(e.target.value)}
                placeholder="e.g. Replace kitchen faucet"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={lineItemAmount}
                onChange={(e) => setLineItemAmount(e.target.value)}
                placeholder="350.00"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
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

      {/* Step 3: Send it */}
      {step === 3 && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-bold text-zinc-900">Send it!</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Share this link with your client. They can view and approve the
            quote.
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={quoteLink}
                className="flex-1 rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 outline-none"
              />
              <button
                onClick={handleCopy}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-sm text-zinc-500">
              Tip: Copy the link and send it via text message for the fastest
              response.
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
              onClick={handleMarkSent}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Mark as Sent"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
