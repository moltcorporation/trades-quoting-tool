"use client";

import { useState } from "react";

type JobType = "install_ac" | "install_furnace" | "install_full" | "repair" | "maintenance";
type SystemType = "central_ac" | "heat_pump" | "furnace_gas" | "furnace_electric" | "mini_split" | "package_unit";

const jobLabels: Record<JobType, string> = {
  install_ac: "AC Unit Installation",
  install_furnace: "Furnace Installation",
  install_full: "Full System Replacement (AC + Furnace)",
  repair: "HVAC Repair",
  maintenance: "Seasonal Maintenance / Tune-Up",
};

const systemLabels: Record<SystemType, string> = {
  central_ac: "Central Air Conditioner",
  heat_pump: "Heat Pump",
  furnace_gas: "Gas Furnace",
  furnace_electric: "Electric Furnace",
  mini_split: "Ductless Mini-Split",
  package_unit: "Package Unit (Rooftop)",
};

// Base equipment cost by system type
const equipmentCost: Record<SystemType, number> = {
  central_ac: 2800,
  heat_pump: 3500,
  furnace_gas: 2200,
  furnace_electric: 1800,
  mini_split: 3000,
  package_unit: 4500,
};

// Labor base cost by job type
const laborBase: Record<JobType, number> = {
  install_ac: 1500,
  install_furnace: 1200,
  install_full: 2400,
  repair: 350,
  maintenance: 150,
};

const tonnageOptions = ["1.5", "2", "2.5", "3", "3.5", "4", "5"];

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function EstimateGenerator() {
  const [jobType, setJobType] = useState<JobType>("install_ac");
  const [systemType, setSystemType] = useState<SystemType>("central_ac");
  const [tonnage, setTonnage] = useState("3");
  const [showBreakdown, setShowBreakdown] = useState(false);

  const tons = parseFloat(tonnage) || 3;
  const tonnageMultiplier = tons / 3; // 3-ton is baseline

  const isInstall = jobType.startsWith("install");
  const isMaintenance = jobType === "maintenance";
  const isRepair = jobType === "repair";

  const equipment = isInstall ? equipmentCost[systemType] * tonnageMultiplier : 0;
  const labor = laborBase[jobType] * (isInstall ? tonnageMultiplier : 1);
  const refrigerant = isInstall ? 250 + (tons - 1.5) * 60 : isRepair ? 180 : 0;
  const lineset = isInstall ? 350 : 0;
  const electrical = isInstall ? 400 : 0;
  const permit = isInstall ? 200 : 0;
  const disposal = isInstall ? 150 : 0;
  const diagnosticFee = isRepair ? 95 : 0;
  const filterInspection = isMaintenance ? 45 : 0;

  const subtotal = equipment + labor + refrigerant + lineset + electrical + permit + disposal + diagnosticFee + filterInspection;
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
          <label className="block text-sm font-medium text-slate-700">System type</label>
          <select
            value={systemType}
            onChange={(e) => setSystemType(e.target.value as SystemType)}
            disabled={!isInstall}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none disabled:opacity-50"
          >
            {Object.entries(systemLabels).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">System size (tons)</label>
        <select
          value={tonnage}
          onChange={(e) => setTonnage(e.target.value)}
          disabled={isMaintenance}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none disabled:opacity-50 sm:w-1/2"
        >
          {tonnageOptions.map((t) => (
            <option key={t} value={t}>{t} ton</option>
          ))}
        </select>
        <p className="mt-1 text-xs text-slate-400">
          Rule of thumb: 1 ton per 500 sq ft of living space. A 1,500 sq ft home typically needs a 3-ton system.
        </p>
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
            {isInstall && (
              <div className="flex justify-between">
                <span className="text-slate-600">{systemLabels[systemType]} ({tonnage} ton)</span>
                <span className="font-medium">{fmt(equipment)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-600">{isMaintenance ? "Tune-up service" : isRepair ? "Repair labor" : "Installation labor"}</span>
              <span className="font-medium">{fmt(labor)}</span>
            </div>
            {refrigerant > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Refrigerant</span>
                <span className="font-medium">{fmt(refrigerant)}</span>
              </div>
            )}
            {lineset > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Refrigerant line set</span>
                <span className="font-medium">{fmt(lineset)}</span>
              </div>
            )}
            {electrical > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Electrical connections</span>
                <span className="font-medium">{fmt(electrical)}</span>
              </div>
            )}
            {permit > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Permit fees</span>
                <span className="font-medium">{fmt(permit)}</span>
              </div>
            )}
            {disposal > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Old unit disposal</span>
                <span className="font-medium">{fmt(disposal)}</span>
              </div>
            )}
            {diagnosticFee > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Diagnostic fee</span>
                <span className="font-medium">{fmt(diagnosticFee)}</span>
              </div>
            )}
            {filterInspection > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Filter + inspection</span>
                <span className="font-medium">{fmt(filterInspection)}</span>
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
        * Estimates are approximate and vary by region, equipment brand, and contractor. Use this as a starting point for client conversations.
      </p>
    </div>
  );
}
