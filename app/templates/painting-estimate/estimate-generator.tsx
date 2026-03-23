"use client";

import { useState } from "react";

interface LineItem {
  description: string;
  sqft: string;
  ratePerSqft: string;
  materials: string;
}

const emptyItem: LineItem = { description: "", sqft: "", ratePerSqft: "", materials: "" };

export function EstimateGenerator() {
  const [businessName, setBusinessName] = useState("");
  const [clientName, setClientName] = useState("");
  const [items, setItems] = useState<LineItem[]>([{ ...emptyItem }]);
  const [taxRate, setTaxRate] = useState("8");
  const [showPreview, setShowPreview] = useState(false);

  function updateItem(index: number, field: keyof LineItem, value: string) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  }

  function addItem() {
    setItems((prev) => [...prev, { ...emptyItem }]);
  }

  function removeItem(index: number) {
    if (items.length > 1) setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function laborTotal(item: LineItem) {
    return (parseFloat(item.sqft) || 0) * (parseFloat(item.ratePerSqft) || 0);
  }

  function materialsTotal(item: LineItem) {
    return parseFloat(item.materials) || 0;
  }

  const subtotal = items.reduce((sum, item) => sum + laborTotal(item) + materialsTotal(item), 0);
  const tax = subtotal * ((parseFloat(taxRate) || 0) / 100);
  const total = subtotal + tax;

  function fmt(n: number) {
    return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }

  function handlePrint() {
    window.print();
  }

  if (showPreview) {
    return (
      <div>
        <div id="estimate-preview" className="rounded-xl border border-slate-200 bg-white overflow-hidden print:border-0 print:rounded-none">
          <div className="bg-slate-900 px-6 py-4 text-white print:bg-slate-900 print:text-white">
            <p className="font-bold text-lg">{businessName || "Your Painting Company"}</p>
            <p className="text-sm text-slate-400">Estimate &middot; {new Date().toLocaleDateString()}</p>
          </div>
          <div className="px-6 py-5">
            <p className="text-sm text-slate-500">
              Prepared for: <span className="text-slate-900 font-medium">{clientName || "Client Name"}</span>
            </p>
            <table className="w-full mt-4 text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="text-left pb-2">Area / Service</th>
                  <th className="text-right pb-2">Labor</th>
                  <th className="text-right pb-2">Materials</th>
                  <th className="text-right pb-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-2.5">{item.description || "Painting area"}</td>
                    <td className="py-2.5 text-right">{fmt(laborTotal(item))}</td>
                    <td className="py-2.5 text-right">{fmt(materialsTotal(item))}</td>
                    <td className="py-2.5 text-right font-medium">{fmt(laborTotal(item) + materialsTotal(item))}</td>
                  </tr>
                ))}
                <tr className="text-slate-500">
                  <td colSpan={4} className="py-2 text-right">Subtotal: {fmt(subtotal)}</td>
                </tr>
                <tr className="text-slate-500">
                  <td colSpan={4} className="py-1 text-right">Tax ({taxRate}%): {fmt(tax)}</td>
                </tr>
                <tr className="font-bold text-lg">
                  <td colSpan={4} className="py-2 text-right">Total: {fmt(total)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 flex gap-3 print:hidden">
          <button onClick={handlePrint} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
            Download as PDF
          </button>
          <button onClick={() => setShowPreview(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
            Edit estimate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Your business name</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g. ProCoat Painting"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Client name</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g. Jane Smith"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700">Line items</label>
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-2 items-end">
            <div>
              {i === 0 && <span className="text-xs text-slate-500">Area / service</span>}
              <input
                type="text"
                value={item.description}
                onChange={(e) => updateItem(i, "description", e.target.value)}
                placeholder="e.g. Living room walls"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />
            </div>
            <div className="w-20">
              {i === 0 && <span className="text-xs text-slate-500">Sq ft</span>}
              <input
                type="number"
                value={item.sqft}
                onChange={(e) => updateItem(i, "sqft", e.target.value)}
                placeholder="400"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />
            </div>
            <div className="w-20">
              {i === 0 && <span className="text-xs text-slate-500">$/sq ft</span>}
              <input
                type="number"
                value={item.ratePerSqft}
                onChange={(e) => updateItem(i, "ratePerSqft", e.target.value)}
                placeholder="3.50"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />
            </div>
            <div className="w-24">
              {i === 0 && <span className="text-xs text-slate-500">Materials $</span>}
              <input
                type="number"
                value={item.materials}
                onChange={(e) => updateItem(i, "materials", e.target.value)}
                placeholder="120"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />
            </div>
            <button
              onClick={() => removeItem(i)}
              className="rounded-lg border border-slate-300 px-2 py-2 text-sm text-slate-400 hover:text-slate-700 hover:bg-slate-50"
              title="Remove item"
            >
              x
            </button>
          </div>
        ))}
        <button onClick={addItem} className="text-sm text-slate-500 hover:text-slate-700">+ Add line item</button>
      </div>

      <div className="w-24">
        <label className="block text-sm font-medium text-slate-700">Tax %</label>
        <input
          type="number"
          value={taxRate}
          onChange={(e) => setTaxRate(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div className="flex items-center justify-between rounded-lg bg-slate-100 px-4 py-3">
        <span className="font-semibold">Total: {fmt(total)}</span>
        <button
          onClick={() => setShowPreview(true)}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Preview estimate
        </button>
      </div>
    </div>
  );
}
