"use client";

import { useState } from "react";

export default function NewLeadPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/crm/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, source }),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok: true; id: string }
        | { ok: false; error: string }
        | null;

      if (!res.ok || !data || data.ok === false) {
        setError(data && "error" in data ? data.error : "Failed");
        return;
      }

      window.location.href = `/crm/leads/${data.id}`;
    } catch {
      setError("Failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm font-semibold text-[var(--color-navy)]">New lead</div>
        <div className="text-xs text-[var(--color-slate)]">Manual creation</div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block space-y-2">
          <div className="text-sm font-semibold text-[var(--color-navy)]">Name</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
          />
        </label>
        <label className="block space-y-2">
          <div className="text-sm font-semibold text-[var(--color-navy)]">Email</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
            inputMode="email"
          />
        </label>
        <label className="block space-y-2">
          <div className="text-sm font-semibold text-[var(--color-navy)]">Phone</div>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
          />
        </label>
        <label className="block space-y-2">
          <div className="text-sm font-semibold text-[var(--color-navy)]">Source</div>
          <input
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
          />
        </label>

        {error ? <div className="text-sm text-[var(--color-slate)]">{error}</div> : null}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
        >
          {submitting ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
