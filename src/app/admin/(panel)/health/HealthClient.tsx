"use client";

import { useState } from "react";

type CheckResult = { ok: true; data?: unknown } | { ok: false; error: string };

export default function HealthClient() {
  const [ping, setPing] = useState<CheckResult | null>(null);
  const [db, setDb] = useState<CheckResult | null>(null);

  async function run(url: string, setter: (v: CheckResult) => void) {
    setter({ ok: true, data: "Running..." });
    try {
      const res = await fetch(url, { method: "POST" });
      const data = (await res.json().catch(() => null)) as any;
      if (!res.ok) {
        setter({ ok: false, error: (data && data.error) || "Request failed" });
        return;
      }
      setter({ ok: true, data });
    } catch {
      setter({ ok: false, error: "Request failed" });
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => run("/admin/api/health/ping", setPing)}
          className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-[var(--color-navy)]"
        >
          Test API ping
        </button>
        <button
          type="button"
          onClick={() => run("/admin/api/health/db", setDb)}
          className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-[var(--color-navy)]"
        >
          Test DB connection
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white p-4">
          <div className="text-xs font-semibold text-[var(--color-slate)]">Ping result</div>
          <pre className="mt-2 overflow-auto rounded-xl bg-[var(--color-background)] p-3 text-xs text-[var(--color-navy)]">
            {ping ? JSON.stringify(ping, null, 2) : "(not run)"}
          </pre>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-4">
          <div className="text-xs font-semibold text-[var(--color-slate)]">DB result</div>
          <pre className="mt-2 overflow-auto rounded-xl bg-[var(--color-background)] p-3 text-xs text-[var(--color-navy)]">
            {db ? JSON.stringify(db, null, 2) : "(not run)"}
          </pre>
        </div>
      </div>
    </div>
  );
}
