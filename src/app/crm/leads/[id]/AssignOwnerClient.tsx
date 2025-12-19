"use client";

import { useState } from "react";

type UserOption = { id: string; email: string };

export default function AssignOwnerClient({
  leadId,
  currentOwnerId,
  salesUsers,
}: {
  leadId: string;
  currentOwnerId: string | null;
  salesUsers: UserOption[];
}) {
  const [ownerId, setOwnerId] = useState(currentOwnerId || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(nextOwnerId: string) {
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/crm/api/leads/${leadId}/assign`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerId: nextOwnerId || null }),
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
    <div className="space-y-2">
      <div className="text-xs font-semibold text-[var(--color-slate)]">Assign owner (admin)</div>
      <div className="flex items-center gap-2">
        <select
          value={ownerId}
          onChange={(e) => setOwnerId(e.target.value)}
          className="h-10 rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
          disabled={saving}
        >
          <option value="">Unassigned</option>
          {salesUsers.map((u) => (
            <option key={u.id} value={u.id}>
              {u.email}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => void save(ownerId)}
          disabled={saving}
          className="inline-flex h-10 items-center rounded-full bg-[var(--color-blue)] px-4 text-sm font-semibold text-white hover:opacity-95"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {error ? <div className="text-xs text-[var(--color-slate)]">{error}</div> : null}
    </div>
  );
}
