"use client";

import { useState } from "react";

interface Phase {
  name: string;
  labor: string;
  materials: string;
}

const emptyPhase: Phase = { name: "", labor: "", materials: "" };

export function InvoiceGenerator() {
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [phases, setPhases] = useState<Phase[]>([{ ...emptyPhase }]);
  const [permitFees, setPermitFees] = useState("0");
  const [markupRate, setMarkupRate] = useState("10");
  const [showPreview, setShowPreview] = useState(false);

  function updatePhase(index: number, field: keyof Phase, value: string) {
    setPhases((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  }

  function addPhase() {
    setPhases((prev) => [...prev, { ...emptyPhase }]);
  }

  function removePhase(index: number) {
    if (phases.length > 1) setPhases((prev) => prev.filter((_, i) => i !== index));
  }

  function phaseTotal(p: Phase) {
    return (parseFloat(p.labor) || 0) + (parseFloat(p.materials) || 0);
  }

  const subtotal = phases.reduce((sum, p) => sum + phaseTotal(p), 0) + (parseFloat(permitFees) || 0);
  const markup = subtotal * ((parseFloat(markupRate) || 0) / 100);
  const total = subtotal + markup;

  function fmt(n: number) {
    return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }

  function handlePrint() {
    window.print();
  }

  if (showPreview) {
    return (
      <div>
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden print:border-0 print:rounded-none">
          <div className="bg-slate-900 px-6 py-4 text-white">
            <p className="font-bold text-lg">Construction Invoice</p>
            <p className="text-sm text-slate-400">{projectName || "Project Name"} · {new Date().toLocaleDateString()}</p>
          </div>
          <div className="px-6 py-5">
            <p className="text-sm text-slate-500">
              Bill to: <span className="text-slate-900 font-medium">{clientName || "Client Name"}</span>
            </p>
            <table className="w-full mt-4 text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="text-left pb-2">Phase</th>
                  <th className="text-right pb-2">Labor</th>
                  <th className="text-right pb-2">Materials</th>
                  <th className="text-right pb-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {phases.map((p, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-2.5">{p.name || `Phase ${i + 1}`}</td>
                    <td className="py-2.5 text-right">{fmt(parseFloat(p.labor) || 0)}</td>
                    <td className="py-2.5 text-right">{fmt(parseFloat(p.materials) || 0)}</td>
                    <td className="py-2.5 text-right font-medium">{fmt(phaseTotal(p))}</td>
                  </tr>
                ))}
                {(parseFloat(permitFees) || 0) > 0 && (
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5">Permits &amp; fees</td>
                    <td className="py-2.5 text-right">—</td>
                    <td className="py-2.5 text-right">—</td>
                    <td className="py-2.5 text-right font-medium">{fmt(parseFloat(permitFees) || 0)}</td>
                  </tr>
                )}
                <tr className="text-slate-500">
                  <td colSpan={4} className="py-2 text-right">Subtotal: {fmt(subtotal)}</td>
                </tr>
                {markup > 0 && (
                  <tr className="text-slate-500">
                    <td colSpan={4} className="py-1 text-right">GC markup ({markupRate}%): {fmt(markup)}</td>
                  </tr>
                )}
                <tr className="font-bold text-lg">
                  <td colSpan={4} className="py-2 text-right">Total: {fmt(total)}</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4 text-xs text-slate-400">Payment terms: Progress billing per phase completion</p>
          </div>
        </div>
        <div className="mt-4 flex gap-3 print:hidden">
          <button onClick={handlePrint} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
            Download as PDF
          </button>
          <button onClick={() => setShowPreview(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
            Edit invoice
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Project name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="e.g. Kitchen remodel — 123 Oak St"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Client name</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g. Johnson Family"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700">Project phases</label>
        {phases.map((p, i) => (
          <div key={i} className="grid grid-cols-[1fr_auto_auto_auto] gap-2 items-end">
            <div>
              {i === 0 && <span className="text-xs text-slate-500">Phase description</span>}
              <input
                type="text"
                value={p.name}
                onChange={(e) => updatePhase(i, "name", e.target.value)}
                placeholder="e.g. Demolition"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />
            </div>
            <div className="w-24">
              {i === 0 && <span className="text-xs text-slate-500">Labor $</span>}
              <input
                type="number"
                value={p.labor}
                onChange={(e) => updatePhase(i, "labor", e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />
            </div>
            <div className="w-24">
              {i === 0 && <span className="text-xs text-slate-500">Materials $</span>}
              <input
                type="number"
                value={p.materials}
                onChange={(e) => updatePhase(i, "materials", e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />
            </div>
            <button
              onClick={() => removePhase(i)}
              className="rounded-lg border border-slate-300 px-2 py-2 text-sm text-slate-400 hover:text-slate-700 hover:bg-slate-50"
              title="Remove phase"
            >
              x
            </button>
          </div>
        ))}
        <button onClick={addPhase} className="text-sm text-slate-500 hover:text-slate-700">+ Add phase</button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Permit fees $</label>
          <input
            type="number"
            value={permitFees}
            onChange={(e) => setPermitFees(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">GC markup %</label>
          <input
            type="number"
            value={markupRate}
            onChange={(e) => setMarkupRate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-slate-100 px-4 py-3">
        <span className="font-semibold">Total: {fmt(total)}</span>
        <button
          onClick={() => setShowPreview(true)}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Preview invoice
        </button>
      </div>
    </div>
  );
}
