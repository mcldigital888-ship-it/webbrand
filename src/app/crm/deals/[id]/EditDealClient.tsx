"use client";

import { useState } from "react";

export default function EditDealClient({
  dealId,
  initialValue,
  initialProbability,
  probabilityManual,
}: {
  dealId: string;
  initialValue: number;
  initialProbability: number;
  probabilityManual: boolean;
}) {
  const [value, setValue] = useState(String(initialValue));
  const [probability, setProbability] = useState(String(initialProbability));
  const [manual, setManual] = useState(probabilityManual);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setError(null);

    const payload: Record<string, unknown> = {
      value: Number(value || 0),
    };

    if (manual) {
      payload.probability = Number(probability || 0);
    }

    try {
      const res = await fetch(`/crm/api/deals/${dealId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: string }
        | null;

      if (!res.ok || !data || ("ok" in data && data.ok === false)) {
        setError(data && "error" in data ? data.error : "Failed");
        return;
      }

      window.location.reload();
    } catch {
      setError("Failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <div className="text-sm font-semibold text-[var(--color-navy)]">Value</div>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
            inputMode="numeric"
          />
        </label>

        <label className="block space-y-2">
          <div className="text-sm font-semibold text-[var(--color-navy)]">Probability</div>
          <input
            value={probability}
            onChange={(e) => setProbability(e.target.value)}
            className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
            inputMode="numeric"
            disabled={!manual}
          />
          <label className="flex items-center gap-2 text-xs text-[var(--color-slate)]">
            <input
              type="checkbox"
              checked={manual}
              onChange={(e) => setManual(e.target.checked)}
            />
            Manual override
          </label>
        </label>
      </div>

      {error ? <div className="text-sm text-[var(--color-slate)]">{error}</div> : null}

      <button
        type="button"
        onClick={() => void save()}
        disabled={saving}
        className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
