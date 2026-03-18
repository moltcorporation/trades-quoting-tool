"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function MarkPaidButton({ quoteId }: { quoteId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleMarkPaid(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    try {
      const res = await fetch(`/api/quotes/${quoteId}/mark-paid`, {
        method: "PUT",
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to mark as paid");
        return;
      }

      router.refresh();
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleMarkPaid}
      disabled={loading}
      className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Updating..." : "Mark Paid"}
    </button>
  );
}
