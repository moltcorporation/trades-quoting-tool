"use client";

import { useState } from "react";

type JobType = "new_roof" | "repair" | "replacement" | "inspection";
type Material = "asphalt_3tab" | "asphalt_architectural" | "metal_standing_seam" | "metal_corrugated" | "tile_concrete" | "tile_clay";

const jobLabels: Record<JobType, string> = {
  new_roof: "New Roof Installation",
  repair: "Roof Repair",
  replacement: "Full Roof Replacement",
  inspection: "Roof Inspection",
};

const materialLabels: Record<Material, string> = {
  asphalt_3tab: "Asphalt Shingles (3-Tab)",
  asphalt_architectural: "Asphalt Shingles (Architectural)",
  metal_standing_seam: "Metal (Standing Seam)",
  metal_corrugated: "Metal (Corrugated)",
  tile_concrete: "Concrete Tile",
  tile_clay: "Clay Tile",
};

// Price per sq ft for materials (installed)
const materialCostPerSqFt: Record<Material, number> = {
  asphalt_3tab: 3.5,
  asphalt_architectural: 4.5,
  metal_standing_seam: 10,
  metal_corrugated: 7.5,
  tile_concrete: 9,
  tile_clay: 12,
};

// Labor cost per sq ft by job type
const laborCostPerSqFt: Record<JobType, number> = {
  new_roof: 2.5,
  repair: 4, // higher per sq ft since repairs are smaller
  replacement: 3, // includes tear-off
  inspection: 0,
};

const inspectionFlat = 250;
const tearOffPerSqFt = 1.25;
const underlaymentPerSqFt = 0.75;
const dumpsterFee = 450;
const permitFee = 350;

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function EstimateGenerator() {
  const [jobType, setJobType] = useState<JobType>("replacement");
  const [material, setMaterial] = useState<Material>("asphalt_architectural");
  const [sqft, setSqft] = useState("2000");
  const [stories, setStories] = useState("1");
  const [showBreakdown, setShowBreakdown] = useState(false);

  const area = parseFloat(sqft) || 0;
  const storyCount = parseInt(stories) || 1;
  const storyMultiplier = storyCount > 1 ? 1 + (storyCount - 1) * 0.15 : 1;

  const isInspection = jobType === "inspection";
  const isReplacement = jobType === "replacement";

  const materialsCost = isInspection ? 0 : area * materialCostPerSqFt[material] * storyMultiplier;
  const laborCost = isInspection ? inspectionFlat : area * laborCostPerSqFt[jobType] * storyMultiplier;
  const tearOff = isReplacement ? area * tearOffPerSqFt : 0;
  const underlayment = isInspection ? 0 : area * underlaymentPerSqFt;
  const dumpster = isReplacement ? dumpsterFee : 0;
  const permit = isInspection ? 0 : permitFee;
  const subtotal = materialsCost + laborCost + tearOff + underlayment + dumpster + permit;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Job type</label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value as JobType)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          >
            {Object.entries(jobLabels).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Roofing material</label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value as Material)}
            disabled={isInspection}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none disabled:opacity-50"
          >
            {Object.entries(materialLabels).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Roof area (sq ft)</label>
          <input
            type="number"
            value={sqft}
            onChange={(e) => setSqft(e.target.value)}
            placeholder="2000"
            disabled={isInspection}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Stories</label>
          <select
            value={stories}
            onChange={(e) => setStories(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          >
            <option value="1">1 story</option>
            <option value="2">2 stories</option>
            <option value="3">3+ stories</option>
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
            {!isInspection && (
              <div className="flex justify-between">
                <span className="text-slate-600">{materialLabels[material]}</span>
                <span className="font-medium">{fmt(materialsCost)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-600">{isInspection ? "Inspection fee" : "Labor"}</span>
              <span className="font-medium">{fmt(laborCost)}</span>
            </div>
            {!isInspection && (
              <div className="flex justify-between">
                <span className="text-slate-600">Underlayment / ice shield</span>
                <span className="font-medium">{fmt(underlayment)}</span>
              </div>
            )}
            {isReplacement && (
              <>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tear-off old roofing</span>
                  <span className="font-medium">{fmt(tearOff)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Dumpster / debris removal</span>
                  <span className="font-medium">{fmt(dumpster)}</span>
                </div>
              </>
            )}
            {!isInspection && (
              <div className="flex justify-between">
                <span className="text-slate-600">Permit fees</span>
                <span className="font-medium">{fmt(permit)}</span>
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
        * Estimates are approximate and vary by region, roof complexity, and contractor. Use this as a starting point for client conversations.
      </p>
    </div>
  );
}
