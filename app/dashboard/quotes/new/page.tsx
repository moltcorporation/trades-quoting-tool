"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number; // in cents
}

export default function NewQuotePage() {
  const router = useRouter();
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [items, setItems] = useState<LineItem[]>([
    { description: "", quantity: 1, unitPrice: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function addItem() {
    setItems([...items, { description: "", quantity: 1, unitPrice: 0 }]);
  }

  function removeItem(index: number) {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  }

  function updateItem(index: number, field: keyof LineItem, value: string) {
    const updated = [...items];
    if (field === "description") {
      updated[index].description = value;
    } else if (field === "quantity") {
      updated[index].quantity = Math.max(1, parseInt(value) || 1);
    } else if (field === "unitPrice") {
      // User enters dollars, store as cents
      updated[index].unitPrice = Math.round(parseFloat(value || "0") * 100);
    }
    setItems(updated);
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const taxPercent = parseFloat(taxRate) || 0;
  const taxAmount = Math.round(subtotal * taxPercent / 100);
  const total = subtotal + taxAmount;

  async function handleSubmit(status: "draft" | "sent") {
    setError("");

    if (!clientName || !title) {
      setError("Client name and title are required");
      return;
    }

    if (items.some((item) => !item.description || item.unitPrice <= 0)) {
      setError("Each line item needs a description and price");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quote: {
            clientName,
            clientEmail,
            clientPhone,
            title,
            notes,
            taxRate: taxPercent || null,
            status,
          },
          lineItems: items.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create quote");
        return;
      }

      const data = await res.json();

      if (status === "sent") {
        // Also mark as sent
        await fetch(`/api/quotes/${data.id}/send`, { method: "PUT" });
      }

      router.push("/dashboard/quotes");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold text-slate-900">New Quote</h1>
      <p className="mt-1 text-sm text-slate-500">
        Create a quote for your client.
      </p>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 space-y-6">
        {/* Client Info */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
            Client Information
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Client Name *
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </div>

        {/* Quote Details */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
            Quote Details
          </h2>
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Kitchen sink repair"
            />
          </div>
        </div>

        {/* Line Items */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
            Line Items
          </h2>
          <div className="mt-4 space-y-3">
            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-3 items-end"
              >
                <div className="col-span-5">
                  {index === 0 && (
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Description
                    </label>
                  )}
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(index, "description", e.target.value)
                    }
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Labor, parts, etc."
                  />
                </div>
                <div className="col-span-2">
                  {index === 0 && (
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Qty
                    </label>
                  )}
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(index, "quantity", e.target.value)
                    }
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  {index === 0 && (
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Unit Price
                    </label>
                  )}
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice ? (item.unitPrice / 100).toFixed(2) : ""}
                      onChange={(e) =>
                        updateItem(index, "unitPrice", e.target.value)
                      }
                      className="w-full rounded-md border border-slate-300 pl-7 pr-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  {index === 0 && (
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Total
                    </label>
                  )}
                  <p className="py-2 text-sm font-medium text-slate-900">
                    ${((item.quantity * item.unitPrice) / 100).toFixed(2)}
                  </p>
                </div>
                <div className="col-span-1">
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="rounded p-2 text-slate-400 hover:text-red-500"
                    title="Remove item"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addItem}
            className="mt-4 rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            + Add Line Item
          </button>
        </div>

        {/* Tax & Notes */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Tax Rate (%)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Notes / Scope of Work
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Additional details, terms, scope of work..."
            />
          </div>
        </div>

        {/* Totals */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <div className="flex flex-col items-end gap-2">
            <div className="flex w-48 justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-medium text-slate-900">
                ${(subtotal / 100).toFixed(2)}
              </span>
            </div>
            {taxPercent > 0 && (
              <div className="flex w-48 justify-between text-sm">
                <span className="text-slate-500">Tax ({taxPercent}%)</span>
                <span className="font-medium text-slate-900">
                  ${(taxAmount / 100).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex w-48 justify-between border-t border-slate-200 pt-2">
              <span className="text-base font-semibold text-slate-900">
                Total
              </span>
              <span className="text-base font-semibold text-slate-900">
                ${(total / 100).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => handleSubmit("draft")}
            disabled={loading}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Draft"}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit("sent")}
            disabled={loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send to Client"}
          </button>
        </div>
      </div>
    </div>
  );
}
