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
          className="rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface)] px-4 py-3 text-sm font-semibold text-[var(--ds-text)]"
        >
          Test API ping
        </button>
        <button
          type="button"
          onClick={() => run("/admin/api/health/db", setDb)}
          className="rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface)] px-4 py-3 text-sm font-semibold text-[var(--ds-text)]"
        >
          Test DB connection
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--ds-border)] bg-[var(--ds-surface)] p-4">
          <div className="text-xs font-semibold text-[var(--ds-muted)]">Ping result</div>
          <pre className="mt-2 overflow-auto rounded-xl bg-[var(--ds-surface-2)] p-3 text-xs text-[var(--ds-text)]">
            {ping ? JSON.stringify(ping, null, 2) : "(not run)"}
          </pre>
        </div>
        <div className="rounded-2xl border border-[var(--ds-border)] bg-[var(--ds-surface)] p-4">
          <div className="text-xs font-semibold text-[var(--ds-muted)]">DB result</div>
          <pre className="mt-2 overflow-auto rounded-xl bg-[var(--ds-surface-2)] p-3 text-xs text-[var(--ds-text)]">
            {db ? JSON.stringify(db, null, 2) : "(not run)"}
          </pre>
        </div>
      </div>
    </div>
  );
}
