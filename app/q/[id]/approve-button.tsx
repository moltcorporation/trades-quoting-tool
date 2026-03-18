"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ApproveButton({ quoteId }: { quoteId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleApprove() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/quotes/${quoteId}/approve`, {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to approve quote");
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="text-center">
      {error && (
        <p className="mb-3 text-sm text-red-600">{error}</p>
      )}
      <button
        onClick={handleApprove}
        disabled={loading}
        className="w-full rounded-lg bg-green-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-green-700 disabled:opacity-50 sm:w-auto"
      >
        {loading ? "Approving..." : "Approve Quote"}
      </button>
    </div>
  );
}
