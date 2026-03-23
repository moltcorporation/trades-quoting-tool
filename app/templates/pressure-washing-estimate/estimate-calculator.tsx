"use client";

import { useState } from "react";

type SurfaceType = "driveway" | "deck" | "siding" | "patio" | "fence" | "roof";
type JobSize = "small" | "medium" | "large";

const surfaceLabels: Record<SurfaceType, string> = {
  driveway: "Driveway / Concrete",
  deck: "Wood Deck",
  siding: "House Siding (Soft Wash)",
  patio: "Patio / Walkway",
  fence: "Fence",
  roof: "Roof (Soft Wash)",
};

const jobSizeLabels: Record<JobSize, string> = {
  small: "Small (under 500 sq ft)",
  medium: "Medium (500–1,500 sq ft)",
  large: "Large (1,500+ sq ft)",
};

// Price per sq ft by surface type
const pricePerSqFt: Record<SurfaceType, number> = {
  driveway: 0.2,
  deck: 0.35,
  siding: 0.3,
  patio: 0.2,
  fence: 0.25,
  roof: 0.4,
};

// Sq ft by job size
const sqFtBySize: Record<JobSize, number> = {
  small: 350,
  medium: 1000,
  large: 2000,
};

const minimumCharge = 150;

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function EstimateCalculator() {
  const [surface, setSurface] = useState<SurfaceType>("driveway");
  const [jobSize, setJobSize] = useState<JobSize>("medium");
  const [showBreakdown, setShowBreakdown] = useState(false);

  const sqft = sqFtBySize[jobSize];
  const baseCost = Math.max(sqft * pricePerSqFt[surface], minimumCharge);
  const setupFee = 50;
  const chemicalsSurcharge = surface === "siding" || surface === "roof" ? 75 : 0;
  const sealant = surface === "driveway" || surface === "deck" ? 0.08 * sqft : 0;
  const subtotal = baseCost + setupFee + chemicalsSurcharge + sealant;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Surface type</label>
          <select
            value={surface}
            onChange={(e) => setSurface(e.target.value as SurfaceType)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          >
            {Object.entries(surfaceLabels).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Job size</label>
          <select
            value={jobSize}
            onChange={(e) => setJobSize(e.target.value as JobSize)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          >
            {Object.entries(jobSizeLabels).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-lg bg-slate-100 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">Estimated total</p>
            <p className="text-2xl font-bold text-slate-900">{fmt(total)}</p>
          </div>
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="text-sm text-slate-500 hover:text-slate-700 underline"
          >
            {showBreakdown ? "Hide" : "Show"} breakdown
          </button>
        </div>

        {showBreakdown && (
          <div className="mt-4 space-y-1 text-sm border-t border-slate-200 pt-3">
            <div className="flex justify-between">
              <span className="text-slate-600">{surfaceLabels[surface]} ({sqft} sq ft @ {fmt(pricePerSqFt[surface])}/sq ft)</span>
              <span className="font-medium">{fmt(baseCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Equipment setup & travel</span>
              <span className="font-medium">{fmt(setupFee)}</span>
            </div>
            {chemicalsSurcharge > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Soft wash chemicals</span>
                <span className="font-medium">{fmt(chemicalsSurcharge)}</span>
              </div>
            )}
            {sealant > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Post-wash sealant</span>
                <span className="font-medium">{fmt(sealant)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-200 pt-2">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-medium">{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Tax (8%)</span>
              <span className="font-medium">{fmt(tax)}</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-1">
              <span>Total</span>
              <span>{fmt(total)}</span>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400">
        * Estimates are approximate and vary by region, surface condition, and contractor. Use this as a starting point for client conversations.
      </p>
    </div>
  );
}
