"use client";

import { useState } from "react";

export default function InvoiceBuilder() {
  const [formData, setFormData] = useState({
    businessName: "",
    clientName: "",
    invoiceNumber: "",
    cleaningType: "house-cleaning",
    serviceDescription: "",
    hours: "",
    hourlyRate: "50",
    materials: "",
    tax: "0",
    paymentMethod: "cash",
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

  const getServiceRate = () => {
    switch (formData.cleaningType) {
      case "house-cleaning":
        return "House Cleaning";
      case "carpet-cleaning":
        return "Carpet Cleaning";
      case "commercial-cleaning":
        return "Commercial Cleaning";
      case "deep-cleaning":
        return "Deep Cleaning";
      default:
        return "Cleaning Services";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Your Business Name
          </label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400"
            placeholder="Clean Sweep Cleaning"
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
            Cleaning Type
          </label>
          <select
            name="cleaningType"
            value={formData.cleaningType}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
          >
            <option value="house-cleaning">House Cleaning</option>
            <option value="carpet-cleaning">Carpet Cleaning</option>
            <option value="commercial-cleaning">Commercial Cleaning</option>
            <option value="deep-cleaning">Deep Cleaning</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Hours Worked
          </label>
          <input
            type="number"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400"
            placeholder="3"
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
            placeholder="50"
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
            placeholder="0"
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
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Service Details
        </label>
        <textarea
          name="serviceDescription"
          value={formData.serviceDescription}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400"
          placeholder="List services performed: vacuuming, mopping, bathroom cleaning, etc."
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
                  SERVICE TYPE
                </p>
                <p className="mt-1 text-sm text-slate-700 capitalize">
                  {getServiceRate()}
                </p>
              </div>
            </div>
          </div>

          {formData.serviceDescription && (
            <div className="border-b border-slate-100 bg-white px-5 py-3">
              <p className="text-xs font-medium text-slate-600">DETAILS</p>
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
              {formData.hours && (
                <tr>
                  <td className="px-5 py-2.5 text-slate-700">
                    {getServiceRate()} ({formData.hours} hrs @ $
                    {formData.hourlyRate}/hr)
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
              Due upon completion. Thank you for your business!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
