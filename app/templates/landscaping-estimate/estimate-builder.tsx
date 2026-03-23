"use client";

import { useState } from "react";

export default function EstimateBuilder() {
  const [formData, setFormData] = useState({
    clientName: "",
    serviceType: "lawn-care",
    squareFootage: "",
    serviceDescription: "",
    laborHours: "",
    hourlyRate: "85",
    materials: "",
    tax: "0",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const laborCost =
    parseFloat(formData.laborHours || "0") *
    parseFloat(formData.hourlyRate || "0");
  const materialsCost = parseFloat(formData.materials || "0");
  const subtotal = laborCost + materialsCost;
  const taxAmount = (subtotal * parseFloat(formData.tax || "0")) / 100;
  const total = subtotal + taxAmount;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Client Name
          </label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Service Type
          </label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
          >
            <option value="lawn-care">Lawn Care</option>
            <option value="hardscaping">Hardscaping</option>
            <option value="planting">Planting & Trees</option>
            <option value="mulch">Mulch & Soil</option>
            <option value="design">Full Design</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Square Footage
          </label>
          <input
            type="number"
            name="squareFootage"
            value={formData.squareFootage}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400"
            placeholder="5000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Labor Hours
          </label>
          <input
            type="number"
            name="laborHours"
            value={formData.laborHours}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400"
            placeholder="8"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Hourly Rate ($)
          </label>
          <input
            type="number"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
            placeholder="85"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Materials Cost ($)
          </label>
          <input
            type="number"
            name="materials"
            value={formData.materials}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400"
            placeholder="500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Service Description
        </label>
        <textarea
          name="serviceDescription"
          value={formData.serviceDescription}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400"
          placeholder="Describe the work: soil preparation, planting, mulching, etc."
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Tax Rate (%)
        </label>
        <input
          type="number"
          name="tax"
          value={formData.tax}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
          placeholder="0"
        />
      </div>

      {/* Estimate Preview */}
      {formData.clientName && (
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
            <p className="text-sm font-medium text-slate-700">
              {formData.clientName || "Your Company"} — Landscaping Estimate
            </p>
            <p className="text-xs text-slate-500 capitalize">
              {formData.serviceType}
            </p>
          </div>

          {formData.serviceDescription && (
            <div className="border-b border-slate-100 bg-white px-5 py-3">
              <p className="text-xs font-medium text-slate-600">Description</p>
              <p className="mt-1 text-sm text-slate-700">
                {formData.serviceDescription}
              </p>
            </div>
          )}

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-5 py-2.5 text-left font-medium text-slate-600">
                  Item
                </th>
                <th className="px-5 py-2.5 text-right font-medium text-slate-600">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {formData.laborHours && (
                <tr>
                  <td className="px-5 py-2.5 text-slate-700">
                    Labor ({formData.laborHours} hrs @ ${formData.hourlyRate}
                    /hr)
                  </td>
                  <td className="px-5 py-2.5 text-right text-slate-700">
                    ${laborCost.toFixed(2)}
                  </td>
                </tr>
              )}
              {formData.materials && (
                <tr>
                  <td className="px-5 py-2.5 text-slate-700">Materials</td>
                  <td className="px-5 py-2.5 text-right text-slate-700">
                    ${materialsCost.toFixed(2)}
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-200 bg-slate-50">
                <td className="px-5 py-2.5 text-slate-700">Subtotal</td>
                <td className="px-5 py-2.5 text-right font-medium text-slate-900">
                  ${subtotal.toFixed(2)}
                </td>
              </tr>
              {parseFloat(formData.tax || "0") > 0 && (
                <tr className="bg-white">
                  <td className="px-5 py-2.5 text-slate-700">
                    Tax ({formData.tax}%)
                  </td>
                  <td className="px-5 py-2.5 text-right text-slate-700">
                    ${taxAmount.toFixed(2)}
                  </td>
                </tr>
              )}
              <tr className="border-t border-slate-200 bg-slate-900 text-white">
                <td className="px-5 py-3 font-semibold">Total</td>
                <td className="px-5 py-3 text-right font-semibold">
                  ${total.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
