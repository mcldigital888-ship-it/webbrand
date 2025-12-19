"use client";

import { useMemo, useState } from "react";

type Rule = {
  id: string;
  active: boolean;
  name: string;
  field: string;
  operator: string;
  value: string;
  weight: number;
  createdAt: string | Date;
  updatedAt: string | Date;
};

type ApiResult<T> = { ok: true } & T;

type ApiError = { ok: false; error: string };

export default function ScoringRulesClient({
  initialRules,
}: {
  initialRules: Rule[];
}) {
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const sorted = useMemo(
    () => rules.slice().sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1)),
    [rules]
  );

  async function refresh() {
    const res = await fetch("/crm/api/admin/scoring-rules", { cache: "no-store" });
    const data = (await res.json().catch(() => null)) as
      | (ApiResult<{ rules: Rule[] }> | ApiError)
      | null;

    if (!res.ok || !data || data.ok === false) {
      throw new Error(data && "error" in data ? data.error : "Failed");
    }

    setRules(data.rules);
  }

  async function createRule() {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/crm/api/admin/scoring-rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "New rule",
          field: "source",
          operator: "eq",
          value: "",
          weight: 10,
          active: true,
        }),
      });
      const data = (await res.json().catch(() => null)) as ApiResult<{}> | ApiError | null;
      if (!res.ok || !data || data.ok === false) {
        throw new Error(data && "error" in data ? data.error : "Failed");
      }
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function patchRule(id: string, patch: Partial<Rule>) {
    setError(null);

    const prev = rules;
    setRules((cur) => cur.map((r) => (r.id === id ? { ...r, ...patch } : r)));

    try {
      const res = await fetch(`/crm/api/admin/scoring-rules/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = (await res.json().catch(() => null)) as ApiResult<{}> | ApiError | null;
      if (!res.ok || !data || data.ok === false) {
        throw new Error(data && "error" in data ? data.error : "Failed");
      }
      await refresh();
    } catch (e) {
      setRules(prev);
      setError(e instanceof Error ? e.message : "Failed");
    }
  }

  async function deleteRule(id: string) {
    setError(null);
    if (!confirm("Delete this scoring rule?")) return;

    try {
      const res = await fetch(`/crm/api/admin/scoring-rules/${id}`, {
        method: "DELETE",
      });
      const data = (await res.json().catch(() => null)) as ApiResult<{}> | ApiError | null;
      if (!res.ok || !data || data.ok === false) {
        throw new Error(data && "error" in data ? data.error : "Failed");
      }
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    }
  }

  async function recalcAll() {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/crm/api/admin/scoring-rules/recalculate", {
        method: "POST",
      });
      const data = (await res.json().catch(() => null)) as
        | (ApiResult<{ updatedCount: number; leadCount: number }> | ApiError)
        | null;

      if (!res.ok || !data || data.ok === false) {
        throw new Error(data && "error" in data ? data.error : "Failed");
      }

      await refresh();
      alert(`Recalculated. Updated ${data.updatedCount}/${data.leadCount} leads.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-semibold text-[var(--color-navy)]">Scoring rules</div>
          <div className="text-xs text-[var(--color-slate)]">
            Field: source/status/manual. Operator: eq/contains/exists.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void recalcAll()}
            disabled={busy}
            className="inline-flex h-10 items-center rounded-full border border-[var(--color-navy)]/15 bg-white px-4 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
          >
            {busy ? "Working..." : "Recalculate scores"}
          </button>
          <button
            type="button"
            onClick={() => void createRule()}
            disabled={busy}
            className="inline-flex h-10 items-center rounded-full bg-[var(--color-blue)] px-4 text-sm font-semibold text-white hover:opacity-95"
          >
            Add rule
          </button>
        </div>
      </div>

      {error ? <div className="text-sm text-[var(--color-slate)]">{error}</div> : null}

      <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/5 text-xs text-[var(--color-slate)]">
            <tr>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Field</th>
              <th className="px-4 py-3">Operator</th>
              <th className="px-4 py-3">Value</th>
              <th className="px-4 py-3">Weight</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => (
              <tr key={r.id} className="border-b border-black/5 last:border-b-0">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={r.active}
                    onChange={(e) => void patchRule(r.id, { active: e.target.checked })}
                  />
                </td>

                <td className="px-4 py-3">
                  <input
                    value={r.name}
                    onChange={(e) =>
                      setRules((cur) =>
                        cur.map((x) => (x.id === r.id ? { ...x, name: e.target.value } : x))
                      )
                    }
                    onBlur={() => void patchRule(r.id, { name: r.name })}
                    className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
                  />
                </td>

                <td className="px-4 py-3">
                  <select
                    value={r.field}
                    onChange={(e) => void patchRule(r.id, { field: e.target.value })}
                    className="h-10 rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
                  >
                    <option value="source">source</option>
                    <option value="status">status</option>
                    <option value="manual">manual</option>
                  </select>
                </td>

                <td className="px-4 py-3">
                  <select
                    value={r.operator}
                    onChange={(e) => void patchRule(r.id, { operator: e.target.value })}
                    className="h-10 rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
                  >
                    <option value="eq">eq</option>
                    <option value="contains">contains</option>
                    <option value="exists">exists</option>
                  </select>
                </td>

                <td className="px-4 py-3">
                  <input
                    value={r.value}
                    onChange={(e) =>
                      setRules((cur) =>
                        cur.map((x) => (x.id === r.id ? { ...x, value: e.target.value } : x))
                      )
                    }
                    onBlur={() => void patchRule(r.id, { value: r.value })}
                    className="h-10 w-56 rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
                    disabled={r.operator === "exists"}
                  />
                </td>

                <td className="px-4 py-3">
                  <input
                    value={String(r.weight)}
                    onChange={(e) => {
                      const n = Number(e.target.value);
                      setRules((cur) =>
                        cur.map((x) =>
                          x.id === r.id
                            ? { ...x, weight: Number.isFinite(n) ? n : 0 }
                            : x
                        )
                      );
                    }}
                    onBlur={() => void patchRule(r.id, { weight: r.weight })}
                    className="h-10 w-24 rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
                    inputMode="numeric"
                  />
                </td>

                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => void deleteRule(r.id)}
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
