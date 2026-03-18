"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ApproveButton({ quoteId }: { quoteId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);

  async function handleApprove() {
    setLoading(true);
    try {
      const res = await fetch(`/api/quotes/${quoteId}/approve`, {
        method: "PUT",
      });

      if (res.ok) {
        setApproved(true);
        router.refresh();
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  if (approved) {
    return (
      <div className="rounded-md bg-green-50 p-4 text-center">
        <p className="text-lg font-semibold text-green-700">
          Quote Approved &#10003;
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <button
        onClick={handleApprove}
        disabled={loading}
        className="rounded-md bg-green-600 px-8 py-3 text-base font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? "Approving..." : "Approve Quote"}
      </button>
    </div>
  );
}
