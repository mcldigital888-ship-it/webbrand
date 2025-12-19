"use client";

import { useMemo, useState } from "react";

type EventRow = {
  id: string;
  eventName: string;
  entityType: string;
  entityId: string;
  status: string;
  payload: unknown;
  createdAt: string;
};

type Props = {
  initialEvents: EventRow[];
  initialEventNames: string[];
};

function toDateValue(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function safeStringify(v: unknown) {
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return "{}";
  }
}

export default function AutomationEventsClient({
  initialEvents,
  initialEventNames,
}: Props) {
  const [rows, setRows] = useState<EventRow[]>(initialEvents);
  const [eventNames, setEventNames] = useState<string[]>(initialEventNames);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [filterEventName, setFilterEventName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [selected, setSelected] = useState<EventRow | null>(null);

  const statusOptions = useMemo(() => {
    const base = ["pending", "processed", "failed"];
    const existing = new Set<string>(base);
    for (const r of rows) existing.add(r.status);
    return Array.from(existing);
  }, [rows]);

  async function refresh() {
    setError(null);
    setLoading(true);

    try {
      const url = new URL(window.location.origin + "/admin/api/automation-events");
      if (filterEventName) url.searchParams.set("event_name", filterEventName);
      if (filterStatus) url.searchParams.set("status", filterStatus);
      if (from) url.searchParams.set("from", new Date(from + "T00:00:00").toISOString());
      if (to) url.searchParams.set("to", new Date(to + "T23:59:59").toISOString());
      url.searchParams.set("take", "100");

      const res = await fetch(url.toString(), { cache: "no-store" });
      const data = (await res.json().catch(() => null)) as any;
      if (!res.ok || !data?.ok) {
        setError((data && data.error) || "Failed");
        return;
      }

      setRows(data.events);
      setEventNames(data.eventNames);
    } catch {
      setError("Failed");
    } finally {
      setLoading(false);
    }
  }

  function clearFilters() {
    setFilterEventName("");
    setFilterStatus("");
    setFrom("");
    setTo("");
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-[var(--color-navy)]">Automation Events</div>
          <div className="text-sm text-[var(--color-slate)]">
            The system heartbeat. Filter and inspect event payloads.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 rounded-2xl border border-black/5 bg-white p-4 sm:grid-cols-2 lg:grid-cols-5">
        <label className="block space-y-1 lg:col-span-2">
          <div className="text-xs font-semibold text-[var(--color-slate)]">event_name</div>
          <select
            value={filterEventName}
            onChange={(e) => setFilterEventName(e.target.value)}
            className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)]"
          >
            <option value="">All</option>
            {eventNames.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1">
          <div className="text-xs font-semibold text-[var(--color-slate)]">status</div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)]"
          >
            <option value="">All</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1">
          <div className="text-xs font-semibold text-[var(--color-slate)]">from</div>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)]"
          />
        </label>

        <label className="block space-y-1">
          <div className="text-xs font-semibold text-[var(--color-slate)]">to</div>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)]"
          />
        </label>

        <div className="flex items-end gap-2 lg:col-span-5">
          <button
            type="button"
            onClick={refresh}
            disabled={loading}
            className="rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
          >
            {loading ? "Loading..." : "Apply"}
          </button>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-[var(--color-navy)]"
          >
            Clear
          </button>
          <div className="ml-auto text-xs text-[var(--color-slate)]">
            Showing {rows.length}
          </div>
        </div>
      </div>

      {error ? <div className="text-sm text-[var(--color-slate)]">{error}</div> : null}

      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--color-background)] text-xs font-semibold text-[var(--color-slate)]">
            <tr>
              <th className="px-4 py-3">event_name</th>
              <th className="px-4 py-3">entity_type</th>
              <th className="px-4 py-3">entity_id</th>
              <th className="px-4 py-3">status</th>
              <th className="px-4 py-3">created_at</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="cursor-pointer border-t border-black/5 hover:bg-[var(--color-background)]"
                onClick={() => setSelected(r)}
              >
                <td className="px-4 py-3 font-semibold text-[var(--color-navy)]">{r.eventName}</td>
                <td className="px-4 py-3 text-[var(--color-slate)]">{r.entityType}</td>
                <td className="px-4 py-3 text-[var(--color-slate)]">{r.entityId}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      r.status === "pending"
                        ? "rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700"
                        : r.status === "processed"
                          ? "rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-emerald-700"
                          : "rounded-full bg-rose-600/10 px-3 py-1 text-xs font-semibold text-rose-700"
                    }
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--color-slate)]">
                  {new Date(r.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-3xl rounded-2xl border border-black/10 bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-[var(--color-navy)]">{selected.eventName}</div>
                <div className="mt-1 text-sm text-[var(--color-slate)]">
                  {selected.entityType}:{selected.entityId} · {selected.status} · {new Date(selected.createdAt).toLocaleString()}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-[var(--color-navy)]"
              >
                Close
              </button>
            </div>

            <div className="mt-4">
              <div className="text-xs font-semibold text-[var(--color-slate)]">payload</div>
              <pre className="mt-2 max-h-[60vh] overflow-auto rounded-xl bg-[var(--color-background)] p-4 text-xs text-[var(--color-navy)]">
                {safeStringify(selected.payload)}
              </pre>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
