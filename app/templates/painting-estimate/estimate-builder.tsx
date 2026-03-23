"use client";

import { useState } from "react";

interface Room {
  name: string;
  sqft: string;
  type: "interior" | "exterior";
  paintQuality: "standard" | "premium" | "designer";
  prepLevel: "light" | "moderate" | "heavy";
}

const emptyRoom: Room = { name: "", sqft: "", type: "interior", paintQuality: "standard", prepLevel: "light" };

const PAINT_RATES: Record<string, number> = { standard: 1.5, premium: 2.5, designer: 4.0 };
const PREP_RATES: Record<string, number> = { light: 0.5, moderate: 1.25, heavy: 2.5 };
const LABOR_RATE_INTERIOR = 2.0;
const LABOR_RATE_EXTERIOR = 2.75;

export function EstimateBuilder() {
  const [clientName, setClientName] = useState("");
  const [rooms, setRooms] = useState<Room[]>([{ ...emptyRoom }]);
  const [showPreview, setShowPreview] = useState(false);

  function updateRoom(index: number, field: keyof Room, value: string) {
    setRooms((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  }

  function addRoom() {
    setRooms((prev) => [...prev, { ...emptyRoom }]);
  }

  function removeRoom(index: number) {
    if (rooms.length > 1) setRooms((prev) => prev.filter((_, i) => i !== index));
  }

  function roomCost(r: Room) {
    const sqft = parseFloat(r.sqft) || 0;
    const paint = sqft * PAINT_RATES[r.paintQuality];
    const prep = sqft * PREP_RATES[r.prepLevel];
    const labor = sqft * (r.type === "exterior" ? LABOR_RATE_EXTERIOR : LABOR_RATE_INTERIOR);
    return { paint, prep, labor, total: paint + prep + labor };
  }

  const totalCost = rooms.reduce((sum, r) => sum + roomCost(r).total, 0);

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
            <p className="font-bold text-lg">Painting Estimate</p>
            <p className="text-sm text-slate-400">{new Date().toLocaleDateString()}</p>
          </div>
          <div className="px-6 py-5">
            <p className="text-sm text-slate-500">
              Prepared for: <span className="text-slate-900 font-medium">{clientName || "Client Name"}</span>
            </p>
            <table className="w-full mt-4 text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="text-left pb-2">Area</th>
                  <th className="text-right pb-2">Sq ft</th>
                  <th className="text-right pb-2">Paint</th>
                  <th className="text-right pb-2">Prep</th>
                  <th className="text-right pb-2">Labor</th>
                  <th className="text-right pb-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((r, i) => {
                  const c = roomCost(r);
                  return (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="py-2.5">{r.name || `Area ${i + 1}`} <span className="text-xs text-slate-400">({r.type})</span></td>
                      <td className="py-2.5 text-right">{r.sqft || "0"}</td>
                      <td className="py-2.5 text-right">{fmt(c.paint)}</td>
                      <td className="py-2.5 text-right">{fmt(c.prep)}</td>
                      <td className="py-2.5 text-right">{fmt(c.labor)}</td>
                      <td className="py-2.5 text-right font-medium">{fmt(c.total)}</td>
                    </tr>
                  );
                })}
                <tr className="font-bold text-lg">
                  <td colSpan={6} className="py-2 text-right">Total estimate: {fmt(totalCost)}</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4 text-xs text-slate-400">Estimate valid for 30 days · Paint and materials included</p>
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
      <div>
        <label className="block text-sm font-medium text-slate-700">Client name</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="e.g. Smith Family"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700">Areas to paint</label>
        {rooms.map((r, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-slate-200 p-3">
            <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-end">
              <div>
                {i === 0 && <span className="text-xs text-slate-500">Area name</span>}
                <input
                  type="text"
                  value={r.name}
                  onChange={(e) => updateRoom(i, "name", e.target.value)}
                  placeholder="e.g. Living room"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                />
              </div>
              <div className="w-24">
                {i === 0 && <span className="text-xs text-slate-500">Sq ft</span>}
                <input
                  type="number"
                  value={r.sqft}
                  onChange={(e) => updateRoom(i, "sqft", e.target.value)}
                  placeholder="400"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                />
              </div>
              <button
                onClick={() => removeRoom(i)}
                className="rounded-lg border border-slate-300 px-2 py-2 text-sm text-slate-400 hover:text-slate-700 hover:bg-slate-50"
                title="Remove area"
              >
                x
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-xs text-slate-500">Type</span>
                <select
                  value={r.type}
                  onChange={(e) => updateRoom(i, "type", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                >
                  <option value="interior">Interior</option>
                  <option value="exterior">Exterior</option>
                </select>
              </div>
              <div>
                <span className="text-xs text-slate-500">Paint quality</span>
                <select
                  value={r.paintQuality}
                  onChange={(e) => updateRoom(i, "paintQuality", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                >
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="designer">Designer</option>
                </select>
              </div>
              <div>
                <span className="text-xs text-slate-500">Prep level</span>
                <select
                  value={r.prepLevel}
                  onChange={(e) => updateRoom(i, "prepLevel", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                >
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        <button onClick={addRoom} className="text-sm text-slate-500 hover:text-slate-700">+ Add area</button>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-slate-100 px-4 py-3">
        <span className="font-semibold">Estimate: {fmt(totalCost)}</span>
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
