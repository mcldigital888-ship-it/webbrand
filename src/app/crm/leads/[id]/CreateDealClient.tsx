"use client";

import { useState } from "react";

export default function CreateDealClient({
  leadId,
}: {
  leadId: string;
}) {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createDeal() {
    setCreating(true);
    setError(null);

    try {
      const res = await fetch("/crm/api/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId }),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok: true; id: string }
        | { ok: false; error: string }
        | null;

      if (!res.ok || !data || data.ok === false) {
        setError(data && "error" in data ? data.error : "Failed");
        return;
      }

      window.location.href = `/crm/deals/${data.id}`;
    } catch {
      setError("Failed");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="space-y-2">
      {error ? <div className="text-xs text-[var(--color-slate)]">{error}</div> : null}
      <button
        type="button"
        onClick={() => void createDeal()}
        disabled={creating}
        className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
      >
        {creating ? "Creating..." : "Create deal"}
      </button>
    </div>
  );
}
