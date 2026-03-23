"use client";

import { useState } from "react";

export default function InvoiceBuilder() {
  const [formData, setFormData] = useState({
    businessName: "",
    clientName: "",
    invoiceNumber: "",
    repairType: "collision",
    serviceDescription: "",
    laborHours: "",
    laborRate: "65",
    partsCost: "",
    paintCost: "",
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
    parseFloat(formData.laborRate || "0");
  const partsCost = parseFloat(formData.partsCost || "0");
  const paintCost = parseFloat(formData.paintCost || "0");
  const subtotal = laborCost + partsCost + paintCost;
  const taxAmount = (subtotal * parseFloat(formData.tax || "0")) / 100;
  const total = subtotal + taxAmount;

  const getRepairLabel = () => {
    switch (formData.repairType) {
      case "collision":
        return "Collision Repair";
      case "dent":
        return "Dent Removal";
      case "paint":
        return "Paint & Refinish";
      case "frame":
        return "Frame Straightening";
      case "panel":
        return "Panel Replacement";
      case "bumper":
        return "Bumper Repair";
      default:
        return "Auto Body Repair";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Shop Name
          </label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400"
            placeholder="Premier Auto Body"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Invoice Number
          </label>
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400"
            placeholder="INV-001"
          />
        </div>

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
            Repair Type
          </label>
          <select
            name="repairType"
            value={formData.repairType}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
          >
            <option value="collision">Collision Repair</option>
            <option value="dent">Dent Removal</option>
            <option value="paint">Paint & Refinish</option>
            <option value="frame">Frame Straightening</option>
            <option value="panel">Panel Replacement</option>
            <option value="bumper">Bumper Repair</option>
          </select>
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
            Labor Rate ($/hr)
          </label>
          <input
            type="number"
            name="laborRate"
            value={formData.laborRate}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
            placeholder="65"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Parts Cost ($)
          </label>
          <input
            type="number"
            name="partsCost"
            value={formData.partsCost}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400"
            placeholder="350"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Paint & Materials ($)
          </label>
          <input
            type="number"
            name="paintCost"
            value={formData.paintCost}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400"
            placeholder="200"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700">
            Tax Rate (%)
          </label>
          <input
            type="number"
            name="tax"
            value={formData.tax}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 sm:max-w-[200px]"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Repair Details
        </label>
        <textarea
          name="serviceDescription"
          value={formData.serviceDescription}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400"
          placeholder="Driver side front fender dent repair, sand, prime, and repaint to factory color match"
          rows={3}
        />
      </div>

      {/* Invoice Preview */}
      {formData.businessName && formData.clientName && (
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
            <p className="text-sm font-medium text-slate-700">
              {formData.businessName}
            </p>
            {formData.invoiceNumber && (
              <p className="text-xs text-slate-500">
                Invoice #{formData.invoiceNumber}
              </p>
            )}
          </div>

          <div className="border-b border-slate-100 bg-white px-5 py-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-slate-600">BILL TO</p>
                <p className="mt-1 text-sm text-slate-700">
                  {formData.clientName}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-600">
                  REPAIR TYPE
                </p>
                <p className="mt-1 text-sm text-slate-700 capitalize">
                  {getRepairLabel()}
                </p>
              </div>
            </div>
          </div>

          {formData.serviceDescription && (
            <div className="border-b border-slate-100 bg-white px-5 py-3">
              <p className="text-xs font-medium text-slate-600">
                REPAIR DETAILS
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {formData.serviceDescription}
              </p>
            </div>
          )}

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-5 py-2.5 text-left font-medium text-slate-600">
                  Description
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
                    {getRepairLabel()} — Labor ({formData.laborHours} hrs @ $
                    {formData.laborRate}/hr)
                  </td>
                  <td className="px-5 py-2.5 text-right text-slate-700">
                    ${laborCost.toFixed(2)}
                  </td>
                </tr>
              )}
              {formData.partsCost && (
                <tr>
                  <td className="px-5 py-2.5 text-slate-700">Parts</td>
                  <td className="px-5 py-2.5 text-right text-slate-700">
                    ${partsCost.toFixed(2)}
                  </td>
                </tr>
              )}
              {formData.paintCost && (
                <tr>
                  <td className="px-5 py-2.5 text-slate-700">
                    Paint & Materials
                  </td>
                  <td className="px-5 py-2.5 text-right text-slate-700">
                    ${paintCost.toFixed(2)}
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
                <td className="px-5 py-3 font-semibold">Total Due</td>
                <td className="px-5 py-3 text-right font-semibold">
                  ${total.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="border-t border-slate-100 bg-white px-5 py-3">
            <p className="text-xs font-medium text-slate-600">PAYMENT TERMS</p>
            <p className="mt-1 text-sm text-slate-700">
              Due upon vehicle pickup. Thank you for your business!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
