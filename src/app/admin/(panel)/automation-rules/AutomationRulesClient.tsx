"use client";

import { useMemo, useState } from "react";

type Rule = {
  id: string;
  eventName: string;
  active: boolean;
  description: string | null;
  conditionJson: unknown;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  initialRules: Rule[];
};

function safeStringify(v: unknown) {
  try {
    return JSON.stringify(v ?? {}, null, 2);
  } catch {
    return "{}";
  }
}

export default function AutomationRulesClient({ initialRules }: Props) {
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Rule | null>(null);

  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);
  const [conditionText, setConditionText] = useState("{}");

  const sorted = useMemo(() => {
    return [...rules].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [rules]);

  function openCreate() {
    setEditing(null);
    setEventName("");
    setDescription("");
    setActive(true);
    setConditionText("{}");
    setError(null);
    setModalOpen(true);
  }

  function openEdit(r: Rule) {
    setEditing(r);
    setEventName(r.eventName);
    setDescription(r.description || "");
    setActive(r.active);
    setConditionText(safeStringify(r.conditionJson));
    setError(null);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function parseJsonOrError(text: string): { ok: true; value: unknown } | { ok: false; error: string } {
    try {
      const v = JSON.parse(text);
      return { ok: true, value: v };
    } catch {
      return { ok: false, error: "condition_json must be valid JSON" };
    }
  }

  async function refresh() {
    const res = await fetch("/admin/api/automation-rules", { cache: "no-store" });
    const data = (await res.json().catch(() => null)) as any;
    if (!res.ok || !data?.ok) {
      throw new Error((data && data.error) || "Failed");
    }
    setRules(data.rules);
  }

  async function save() {
    setError(null);
    if (!eventName.trim()) {
      setError("event_name is required");
      return;
    }

    const parsed = parseJsonOrError(conditionText);
    if (!parsed.ok) {
      setError(parsed.error);
      return;
    }

    setBusyId(editing ? editing.id : "__new__");
    try {
      if (!editing) {
        const res = await fetch("/admin/api/automation-rules", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventName: eventName.trim(),
            conditionJson: parsed.value,
            description: description.trim() ? description.trim() : undefined,
            active,
          }),
        });
        const data = (await res.json().catch(() => null)) as any;
        if (!res.ok || !data?.ok) {
          setError((data && data.error) || "Save failed");
          return;
        }
      } else {
        const res = await fetch(`/admin/api/automation-rules/${editing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventName: eventName.trim(),
            conditionJson: parsed.value,
            description: description.trim() ? description.trim() : null,
            active,
          }),
        });
        const data = (await res.json().catch(() => null)) as any;
        if (!res.ok || !data?.ok) {
          setError((data && data.error) || "Save failed");
          return;
        }
      }

      await refresh();
      setModalOpen(false);
    } catch {
      setError("Save failed");
    } finally {
      setBusyId(null);
    }
  }

  async function toggle(r: Rule) {
    setError(null);
    setBusyId(r.id);
    try {
      const res = await fetch(`/admin/api/automation-rules/${r.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !r.active }),
      });
      const data = (await res.json().catch(() => null)) as any;
      if (!res.ok || !data?.ok) {
        setError((data && data.error) || "Toggle failed");
        return;
      }
      await refresh();
    } catch {
      setError("Toggle failed");
    } finally {
      setBusyId(null);
    }
  }

  async function del(r: Rule) {
    const ok = window.confirm(`Delete rule "${r.eventName}"?`);
    if (!ok) return;

    setError(null);
    setBusyId(r.id);
    try {
      const res = await fetch(`/admin/api/automation-rules/${r.id}`, { method: "DELETE" });
      const data = (await res.json().catch(() => null)) as any;
      if (!res.ok || !data?.ok) {
        setError((data && data.error) || "Delete failed");
        return;
      }
      await refresh();
    } catch {
      setError("Delete failed");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-[var(--color-navy)]">Automation Rules</div>
          <div className="text-sm text-[var(--color-slate)]">Rules that react to internal events.</div>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
        >
          New rule
        </button>
      </div>

      {error ? <div className="text-sm text-[var(--color-slate)]">{error}</div> : null}

      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--color-background)] text-xs font-semibold text-[var(--color-slate)]">
            <tr>
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => (
              <tr key={r.id} className="border-t border-black/5">
                <td className="px-4 py-3 font-semibold text-[var(--color-navy)]">{r.eventName}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    disabled={busyId === r.id}
                    onClick={() => toggle(r)}
                    className={
                      r.active
                        ? "rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-emerald-700"
                        : "rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-[var(--color-slate)]"
                    }
                  >
                    {r.active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-4 py-3 text-[var(--color-slate)]">{r.description || ""}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(r)}
                      className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-[var(--color-navy)]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      disabled={busyId === r.id}
                      onClick={() => del(r)}
                      className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-[var(--color-navy)]"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-xl rounded-2xl border border-black/10 bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-[var(--color-navy)]">
                  {editing ? "Edit rule" : "Create rule"}
                </div>
                <div className="text-sm text-[var(--color-slate)]">JSON condition is stored as-is.</div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-[var(--color-navy)]"
              >
                Close
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4">
              <label className="block space-y-2">
                <div className="text-sm font-semibold text-[var(--color-navy)]">event_name</div>
                <input
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
                />
              </label>

              <label className="block space-y-2">
                <div className="text-sm font-semibold text-[var(--color-navy)]">description</div>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
                />
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="h-4 w-4"
                />
                <div className="text-sm font-semibold text-[var(--color-navy)]">active</div>
              </label>

              <label className="block space-y-2">
                <div className="text-sm font-semibold text-[var(--color-navy)]">condition_json</div>
                <textarea
                  value={conditionText}
                  onChange={(e) => setConditionText(e.target.value)}
                  rows={10}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 font-mono text-xs text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
                />
              </label>

              {busyId ? <div className="text-sm text-[var(--color-slate)]">Saving...</div> : null}

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-[var(--color-navy)]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={save}
                  disabled={!!busyId}
                  className="rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
