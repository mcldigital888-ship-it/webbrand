"use client";

import { useState } from "react";

export default function CrmLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/crm/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: string }
        | null;

      if (!res.ok || !data || data.ok === false) {
        setError(data && "error" in data ? data.error : "Login failed");
        return;
      }

      window.location.href = "/crm";
    } catch {
      setError("Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-16">
      <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
        <div className="space-y-2">
          <div className="text-sm font-semibold tracking-wide text-[var(--color-cyan)]">
            CRM Login
          </div>
          <h1 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-navy)]">
            Sign in
          </h1>
          <p className="text-sm text-[var(--color-slate)]">
            Admin and Sales accounts.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
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
            <div className="text-sm font-semibold text-[var(--color-navy)]">Password</div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
              type="password"
            />
          </label>

          {error ? (
            <div className="text-sm text-[var(--color-slate)]">{error}</div>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
