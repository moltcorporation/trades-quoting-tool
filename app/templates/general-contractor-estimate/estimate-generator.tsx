"use client";

import { useState } from "react";

type ProjectType = "kitchen_remodel" | "bathroom_remodel" | "home_addition" | "basement_finish" | "full_renovation" | "deck_patio";
type FinishLevel = "budget" | "mid_range" | "upscale";

const projectLabels: Record<ProjectType, string> = {
  kitchen_remodel: "Kitchen Remodel",
  bathroom_remodel: "Bathroom Remodel",
  home_addition: "Home Addition",
  basement_finish: "Basement Finishing",
  full_renovation: "Full Home Renovation",
  deck_patio: "Deck / Patio Build",
};

const finishLabels: Record<FinishLevel, string> = {
  budget: "Budget / Builder Grade",
  mid_range: "Mid-Range",
  upscale: "Upscale / Custom",
};

// Cost per sq ft by project type and finish level
const costPerSqFt: Record<ProjectType, Record<FinishLevel, number>> = {
  kitchen_remodel: { budget: 75, mid_range: 150, upscale: 300 },
  bathroom_remodel: { budget: 125, mid_range: 250, upscale: 500 },
  home_addition: { budget: 100, mid_range: 200, upscale: 350 },
  basement_finish: { budget: 30, mid_range: 60, upscale: 120 },
  full_renovation: { budget: 60, mid_range: 125, upscale: 250 },
  deck_patio: { budget: 20, mid_range: 45, upscale: 90 },
};

// Default sq ft by project type
const defaultSqFt: Record<ProjectType, string> = {
  kitchen_remodel: "200",
  bathroom_remodel: "80",
  home_addition: "400",
  basement_finish: "800",
  full_renovation: "2000",
  deck_patio: "300",
};

const permitBase: Record<ProjectType, number> = {
  kitchen_remodel: 500,
  bathroom_remodel: 350,
  home_addition: 1200,
  basement_finish: 400,
  full_renovation: 1500,
  deck_patio: 300,
};

const designFeeRate = 0.08; // 8% of construction for design/plans
const gcMarkup = 0.2; // 20% GC overhead + profit

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function EstimateGenerator() {
  const [projectType, setProjectType] = useState<ProjectType>("kitchen_remodel");
  const [finishLevel, setFinishLevel] = useState<FinishLevel>("mid_range");
  const [sqft, setSqft] = useState("200");
  const [showBreakdown, setShowBreakdown] = useState(false);

  const area = parseFloat(sqft) || 0;

  const constructionCost = area * costPerSqFt[projectType][finishLevel];
  const designFee = constructionCost * designFeeRate;
  const permit = permitBase[projectType];
  const subtotalBeforeMarkup = constructionCost + designFee + permit;
  const markup = subtotalBeforeMarkup * gcMarkup;
  const subtotal = subtotalBeforeMarkup + markup;
  const tax = constructionCost * 0.08; // tax on materials/labor only
  const total = subtotal + tax;

  function handleProjectChange(value: ProjectType) {
    setProjectType(value);
    setSqft(defaultSqFt[value]);
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Project type</label>
          <select
            value={projectType}
            onChange={(e) => handleProjectChange(e.target.value as ProjectType)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          >
            {Object.entries(projectLabels).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Finish level</label>
          <select
            value={finishLevel}
            onChange={(e) => setFinishLevel(e.target.value as FinishLevel)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          >
            {Object.entries(finishLabels).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Project area (sq ft)</label>
        <input
          type="number"
          value={sqft}
          onChange={(e) => setSqft(e.target.value)}
          placeholder="200"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none sm:w-1/2"
        />
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
              <span className="text-slate-600">Construction ({finishLabels[finishLevel].toLowerCase()})</span>
              <span className="font-medium">{fmt(constructionCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Design / architectural plans (8%)</span>
              <span className="font-medium">{fmt(designFee)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Permits</span>
              <span className="font-medium">{fmt(permit)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">GC overhead + profit (20%)</span>
              <span className="font-medium">{fmt(markup)}</span>
            </div>
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
        * Estimates vary by region, project complexity, and material selections. Use this as a starting point for client conversations.
      </p>
    </div>
  );
}
