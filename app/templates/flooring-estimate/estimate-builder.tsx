"use client";

import { useState } from "react";

interface Room {
  name: string;
  sqft: string;
  floorType: "hardwood" | "lvp" | "tile" | "carpet" | "laminate";
  subfloorPrep: "none" | "light" | "heavy";
}

const emptyRoom: Room = { name: "", sqft: "", floorType: "lvp", subfloorPrep: "none" };

const MATERIAL_RATES: Record<string, number> = {
  hardwood: 8.0,
  lvp: 4.5,
  tile: 7.0,
  carpet: 3.5,
  laminate: 3.0,
};

const LABOR_RATES: Record<string, number> = {
  hardwood: 5.0,
  lvp: 3.0,
  tile: 6.0,
  carpet: 2.0,
  laminate: 2.5,
};

const PREP_RATES: Record<string, number> = { none: 0, light: 1.0, heavy: 2.5 };

const FLOOR_LABELS: Record<string, string> = {
  hardwood: "Hardwood",
  lvp: "Luxury Vinyl Plank",
  tile: "Tile",
  carpet: "Carpet",
  laminate: "Laminate",
};

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
    const material = sqft * MATERIAL_RATES[r.floorType];
    const labor = sqft * LABOR_RATES[r.floorType];
    const prep = sqft * PREP_RATES[r.subfloorPrep];
    return { material, labor, prep, total: material + labor + prep };
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
            <p className="font-bold text-lg">Flooring Estimate</p>
            <p className="text-sm text-slate-400">{new Date().toLocaleDateString()}</p>
          </div>
          <div className="px-6 py-5">
            <p className="text-sm text-slate-500">
              Prepared for: <span className="text-slate-900 font-medium">{clientName || "Client Name"}</span>
            </p>
            <table className="w-full mt-4 text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="text-left pb-2">Room</th>
                  <th className="text-right pb-2">Sq ft</th>
                  <th className="text-right pb-2">Material</th>
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
                      <td className="py-2.5">{r.name || `Room ${i + 1}`} <span className="text-xs text-slate-400">({FLOOR_LABELS[r.floorType]})</span></td>
                      <td className="py-2.5 text-right">{r.sqft || "0"}</td>
                      <td className="py-2.5 text-right">{fmt(c.material)}</td>
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
            <p className="mt-4 text-xs text-slate-400">Estimate valid for 30 days · Materials and installation included</p>
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
          placeholder="e.g. Johnson Family"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700">Rooms / areas</label>
        {rooms.map((r, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-slate-200 p-3">
            <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-end">
              <div>
                {i === 0 && <span className="text-xs text-slate-500">Room name</span>}
                <input
                  type="text"
                  value={r.name}
                  onChange={(e) => updateRoom(i, "name", e.target.value)}
                  placeholder="e.g. Kitchen"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                />
              </div>
              <div className="w-24">
                {i === 0 && <span className="text-xs text-slate-500">Sq ft</span>}
                <input
                  type="number"
                  value={r.sqft}
                  onChange={(e) => updateRoom(i, "sqft", e.target.value)}
                  placeholder="200"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                />
              </div>
              <button
                onClick={() => removeRoom(i)}
                className="rounded-lg border border-slate-300 px-2 py-2 text-sm text-slate-400 hover:text-slate-700 hover:bg-slate-50"
                title="Remove room"
              >
                x
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-xs text-slate-500">Flooring type</span>
                <select
                  value={r.floorType}
                  onChange={(e) => updateRoom(i, "floorType", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                >
                  <option value="hardwood">Hardwood</option>
                  <option value="lvp">Luxury Vinyl Plank</option>
                  <option value="tile">Tile</option>
                  <option value="carpet">Carpet</option>
                  <option value="laminate">Laminate</option>
                </select>
              </div>
              <div>
                <span className="text-xs text-slate-500">Subfloor prep</span>
                <select
                  value={r.subfloorPrep}
                  onChange={(e) => updateRoom(i, "subfloorPrep", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                >
                  <option value="none">None</option>
                  <option value="light">Light (leveling)</option>
                  <option value="heavy">Heavy (demo + leveling)</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        <button onClick={addRoom} className="text-sm text-slate-500 hover:text-slate-700">+ Add room</button>
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
