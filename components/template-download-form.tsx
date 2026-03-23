"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

export interface TemplateLineItem {
  description: string;
  qty?: string;
  unit?: string;
  unitPrice?: string;
  amount: string;
}

export interface TemplateDownloadConfig {
  slug: string;
  title: string;
  companyName: string;
  companyTagline: string;
  documentNumber: string;
  clientName: string;
  clientAddress: string;
  jobDescription: string;
  lineItems: TemplateLineItem[];
  subtotal: string;
  tax: string;
  total: string;
  notes: string;
  validityDays?: number;
}

function generatePdf(config: TemplateDownloadConfig) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Header bar
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 35, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(config.companyName, 15, 15);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(config.companyTagline, 15, 22);

  // Document title on right
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(config.title, pageWidth - 15, 15, { align: "right" });
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(config.documentNumber, pageWidth - 15, 22, { align: "right" });
  doc.text(`Date: ${new Date().toLocaleDateString("en-US")}`, pageWidth - 15, 28, { align: "right" });

  y = 45;

  // Client info
  doc.setTextColor(100, 116, 139); // slate-500
  doc.setFontSize(9);
  doc.text("PREPARED FOR", 15, y);
  y += 6;
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(config.clientName, 15, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(config.clientAddress, 15, y);
  y += 5;
  doc.text(config.jobDescription, 15, y);
  y += 12;

  // Table header
  doc.setFillColor(248, 250, 252); // slate-50
  doc.rect(15, y - 4, pageWidth - 30, 8, "F");
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("DESCRIPTION", 17, y);
  doc.text("AMOUNT", pageWidth - 17, y, { align: "right" });
  y += 8;

  // Line items
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  for (const item of config.lineItems) {
    doc.setTextColor(15, 23, 42);
    doc.text(item.description, 17, y);
    doc.setFont("helvetica", "bold");
    doc.text(item.amount, pageWidth - 17, y, { align: "right" });
    doc.setFont("helvetica", "normal");
    y += 7;

    // Draw separator
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.2);
    doc.line(15, y - 3, pageWidth - 15, y - 3);
  }

  y += 4;

  // Totals
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(9);
  doc.text("Subtotal:", pageWidth - 60, y);
  doc.setTextColor(15, 23, 42);
  doc.text(config.subtotal, pageWidth - 17, y, { align: "right" });
  y += 6;

  doc.setTextColor(100, 116, 139);
  doc.text("Tax:", pageWidth - 60, y);
  doc.setTextColor(15, 23, 42);
  doc.text(config.tax, pageWidth - 17, y, { align: "right" });
  y += 2;

  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.5);
  doc.line(pageWidth - 70, y, pageWidth - 15, y);
  y += 6;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Total:", pageWidth - 60, y);
  doc.text(config.total, pageWidth - 17, y, { align: "right" });
  y += 12;

  // Notes
  if (config.notes) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("NOTES & TERMS", 15, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105); // slate-600
    doc.setFontSize(8);
    const lines = doc.splitTextToSize(config.notes, pageWidth - 30);
    doc.text(lines, 15, y);
    y += lines.length * 4 + 6;
  }

  // Validity
  if (config.validityDays) {
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`This estimate is valid for ${config.validityDays} days from the date above.`, 15, y);
    y += 10;
  }

  // Signature lines
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(15, y + 10, 85, y + 10);
  doc.line(pageWidth - 85, y + 10, pageWidth - 15, y + 10);
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Contractor Signature", 15, y + 15);
  doc.text("Client Signature", pageWidth - 85, y + 15);

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setFillColor(248, 250, 252);
  doc.rect(0, footerY - 5, pageWidth, 20, "F");
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("Powered by TradeQuote — tradequote.com", pageWidth / 2, footerY, { align: "center" });
  doc.text("Create, send, and get paid on professional estimates in minutes", pageWidth / 2, footerY + 4, { align: "center" });

  return doc;
}

export function TemplateDownloadForm({ config }: { config: TemplateDownloadConfig }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/templates/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, templateSlug: config.slug }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to process request");
      }

      // Generate and download PDF
      const doc = generatePdf(config);
      doc.save(`${config.slug}-template.pdf`);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <div className="text-2xl">&#10003;</div>
        <p className="mt-2 font-semibold text-green-900">Template downloaded!</p>
        <p className="mt-1 text-sm text-green-700">
          Check your downloads folder. Want to create estimates even faster?
        </p>
        <a
          href="/register"
          className="mt-4 inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          Try TradeQuote free
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-lg">
          &#128196;
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Download free PDF template</h3>
          <p className="mt-1 text-sm text-slate-500">
            Get a professional, ready-to-use {config.title.toLowerCase()} with realistic line items and TradeQuote branding. Enter your email to download instantly.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-900 hover:bg-amber-400 disabled:opacity-50"
        >
          {status === "loading" ? "Generating..." : "Download PDF"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">{errorMsg}</p>
      )}
      <p className="mt-2 text-xs text-slate-400">
        No spam, ever. We may send you tips on winning more jobs.
      </p>
    </div>
  );
}
