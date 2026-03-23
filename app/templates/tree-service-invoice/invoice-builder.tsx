"use client";

import { useState } from "react";

export default function InvoiceBuilder() {
  const [formData, setFormData] = useState({
    businessName: "",
    clientName: "",
    invoiceNumber: "",
    serviceType: "tree-removal",
    serviceDescription: "",
    hours: "",
    hourlyRate: "75",
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
    parseFloat(formData.hours || "0") * parseFloat(formData.hourlyRate || "0");
  const materialsCost = parseFloat(formData.materials || "0");
  const subtotal = laborCost + materialsCost;
  const taxAmount = (subtotal * parseFloat(formData.tax || "0")) / 100;
  const total = subtotal + taxAmount;

  const getServiceLabel = () => {
    switch (formData.serviceType) {
      case "tree-removal":
        return "Tree Removal";
      case "trimming":
        return "Tree Trimming & Pruning";
      case "stump-grinding":
        return "Stump Grinding";
      case "emergency-service":
        return "Emergency Storm Cleanup";
      case "tree-planting":
        return "Tree Planting";
      case "land-clearing":
        return "Land Clearing";
      default:
        return "Tree Service";
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-900">
            Your Business Name
          </label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="e.g., Premier Tree Services"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900">
            Client Name
          </label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder="e.g., John Smith"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900">
            Invoice Number
          </label>
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            placeholder="e.g., INV-001"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900">
            Service Type
          </label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="tree-removal">Tree Removal</option>
            <option value="trimming">Tree Trimming & Pruning</option>
            <option value="stump-grinding">Stump Grinding</option>
            <option value="emergency-service">Emergency Storm Cleanup</option>
            <option value="tree-planting">Tree Planting</option>
            <option value="land-clearing">Land Clearing</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-900">
            Service Description
          </label>
          <textarea
            name="serviceDescription"
            value={formData.serviceDescription}
            onChange={handleChange}
            placeholder="e.g., Remove 40ft oak tree, grind stump, remove debris"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900">
            Labor Hours
          </label>
          <input
            type="number"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
            placeholder="0"
            step="0.5"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900">
            Hourly Rate ($)
          </label>
          <input
            type="number"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleChange}
            placeholder="75"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900">
            Materials & Equipment ($)
          </label>
          <input
            type="number"
            name="materials"
            value={formData.materials}
            onChange={handleChange}
            placeholder="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900">
            Tax Rate (%)
          </label>
          <input
            type="number"
            name="tax"
            value={formData.tax}
            onChange={handleChange}
            placeholder="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Invoice Preview */}
      <div className="border-t border-slate-200 pt-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Invoice Preview
        </h3>
        <div className="rounded-lg border border-slate-200 bg-white p-8">
          <div className="mb-6 flex justify-between border-b border-slate-200 pb-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {formData.businessName || "Your Business Name"}
              </p>
              <p className="text-xs text-slate-500">Tree Service</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">INVOICE</p>
              <p className="text-xs text-slate-500">
                #{formData.invoiceNumber || "INV-001"}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-slate-600">
              <span className="font-medium">Bill To:</span>{" "}
              {formData.clientName || "Client Name"}
            </p>
          </div>

          <div className="mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">
                {getServiceLabel()} ({formData.hours || "0"} hours @{" "}
                ${formData.hourlyRate || "0"}/hr)
              </span>
              <span className="font-medium text-slate-900">
                ${laborCost.toFixed(2)}
              </span>
            </div>
            {materialsCost > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Materials & Equipment</span>
                <span className="font-medium text-slate-900">
                  ${materialsCost.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-200 pt-2 font-medium text-slate-900">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {taxAmount > 0 && (
              <div className="flex justify-between text-sm text-slate-600">
                <span>Tax ({formData.tax}%)</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-200 pt-2 text-lg font-bold text-blue-600">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {formData.serviceDescription && (
            <div className="text-xs text-slate-500 italic">
              Description: {formData.serviceDescription}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
