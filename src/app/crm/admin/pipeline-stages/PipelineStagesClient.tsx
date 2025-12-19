"use client";

import { useMemo, useState } from "react";

type Stage = {
  id: string;
  name: string;
  order: number;
  probabilityDefault: number;
  isWon: boolean;
  isLost: boolean;
};

type ApiResult = { ok: true } | { ok: false; error: string };

export default function PipelineStagesClient({
  initialStages,
}: {
  initialStages: Stage[];
}) {
  const [stages, setStages] = useState<Stage[]>(initialStages);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sorted = useMemo(
    () => stages.slice().sort((a, b) => a.order - b.order),
    [stages]
  );

  async function api(path: string, init: RequestInit) {
    const res = await fetch(path, init);
    const data = (await res.json().catch(() => null)) as ApiResult | null;
    if (!res.ok || !data || data.ok === false) {
      throw new Error(data && "error" in data ? data.error : "Request failed");
    }
  }

  async function refresh() {
    const res = await fetch("/crm/api/admin/pipeline-stages", { cache: "no-store" });
    const data = (await res.json().catch(() => null)) as
      | { ok: true; stages: Stage[] }
      | { ok: false; error: string }
      | null;

    if (!res.ok || !data || data.ok === false) {
      throw new Error(data && "error" in data ? data.error : "Failed");
    }

    setStages(data.stages);
  }

  async function onCreate() {
    setCreating(true);
    setError(null);

    try {
      await api("/crm/api/admin/pipeline-stages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "New stage",
          probabilityDefault: 0,
          isWon: false,
          isLost: false,
        }),
      });
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setCreating(false);
    }
  }

  async function onUpdate(id: string, patch: Partial<Stage>) {
    setError(null);
    const prev = stages;

    setStages((cur) => cur.map((s) => (s.id === id ? { ...s, ...patch } : s)));

    try {
      await api(`/crm/api/admin/pipeline-stages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      await refresh();
    } catch (e) {
      setStages(prev);
      setError(e instanceof Error ? e.message : "Failed");
    }
  }

  async function onDelete(id: string) {
    setError(null);

    if (!confirm("Delete this stage?")) return;

    try {
      await api(`/crm/api/admin/pipeline-stages/${id}`, {
        method: "DELETE",
      });
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    }
  }

  async function move(id: string, direction: "up" | "down") {
    setError(null);
    try {
      await api(`/crm/api/admin/pipeline-stages/${id}/move`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction }),
      });
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-[var(--color-navy)]">Pipeline stages</div>
          <div className="text-xs text-[var(--color-slate)]">Create, edit, delete, reorder</div>
        </div>
        <button
          type="button"
          onClick={() => void onCreate()}
          disabled={creating}
          className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
        >
          {creating ? "Creating..." : "Add stage"}
        </button>
      </div>

      {error ? <div className="text-sm text-[var(--color-slate)]">{error}</div> : null}

      <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/5 text-xs text-[var(--color-slate)]">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Probability default</th>
              <th className="px-4 py-3">Won</th>
              <th className="px-4 py-3">Lost</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s, idx) => (
              <tr key={s.id} className="border-b border-black/5 last:border-b-0">
                <td className="px-4 py-3 text-[var(--color-slate)]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{s.order}</span>
                    <button
                      type="button"
                      onClick={() => void move(s.id, "up")}
                      disabled={idx === 0}
                      className="rounded-lg border border-black/10 bg-white px-2 py-1 text-xs hover:bg-[var(--color-background)] disabled:opacity-40"
                    >
                      Up
                    </button>
                    <button
                      type="button"
                      onClick={() => void move(s.id, "down")}
                      disabled={idx === sorted.length - 1}
                      className="rounded-lg border border-black/10 bg-white px-2 py-1 text-xs hover:bg-[var(--color-background)] disabled:opacity-40"
                    >
                      Down
                    </button>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <input
                    value={s.name}
                    onChange={(e) =>
                      setStages((cur) =>
                        cur.map((x) => (x.id === s.id ? { ...x, name: e.target.value } : x))
                      )
                    }
                    onBlur={() => void onUpdate(s.id, { name: s.name })}
                    className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
                  />
                </td>

                <td className="px-4 py-3">
                  <input
                    value={String(s.probabilityDefault)}
                    onChange={(e) => {
                      const n = Number(e.target.value);
                      setStages((cur) =>
                        cur.map((x) =>
                          x.id === s.id
                            ? { ...x, probabilityDefault: Number.isFinite(n) ? n : 0 }
                            : x
                        )
                      );
                    }}
                    onBlur={() =>
                      void onUpdate(s.id, {
                        probabilityDefault: Math.max(0, Math.min(100, s.probabilityDefault)),
                      })
                    }
                    className="h-10 w-28 rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
                    inputMode="numeric"
                  />
                </td>

                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={s.isWon}
                    onChange={(e) => void onUpdate(s.id, { isWon: e.target.checked })}
                  />
                </td>

                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={s.isLost}
                    onChange={(e) => void onUpdate(s.id, { isLost: e.target.checked })}
                  />
                </td>

                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => void onDelete(s.id)}
                    className="rounded-lg border border-black/10 bg-white px-2 py-1 text-xs text-[var(--color-navy)] hover:bg-[var(--color-background)]"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
