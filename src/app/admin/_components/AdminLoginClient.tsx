"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLangToggleClient, { type AdminLang } from "@/app/admin/_components/AdminLangToggleClient";

const t = {
  en: {
    top: "Webrrand Admin",
    title: "Admin Panel Login",
    fieldUser: "Email or Username",
    fieldPass: "Password",
    button: "Sign in",
    note: "Authorized staff only.",
    errorGeneric: "Login failed.",
  },
  it: {
    top: "Webrrand Admin",
    title: "Accesso Pannello Admin",
    fieldUser: "Email o Username",
    fieldPass: "Password",
    button: "Accedi",
    note: "Solo personale autorizzato.",
    errorGeneric: "Accesso fallito.",
  },
} as const;

export default function AdminLoginClient({
  initialLang = "en",
}: {
  initialLang?: AdminLang;
}) {
  const router = useRouter();
  const [lang, setLang] = useState<AdminLang>(initialLang);
  const copy = t[lang];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.length > 0 && !submitting;
  }, [email, password, submitting]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: string }
        | null;

      if (!res.ok || !data || data.ok === false) {
        setError(data && "error" in data ? data.error : copy.errorGeneric);
        return;
      }

      router.refresh();
      router.push("/admin");
    } catch {
      setError(copy.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-background)] px-4 py-10">
      <div className="mx-auto w-full max-w-md">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-[var(--ds-text)]">{copy.top}</div>
          <AdminLangToggleClient value={lang} onChange={setLang} />
        </div>

        <div className="mt-4 rounded-2xl border border-[var(--ds-border)] bg-[var(--color-surface)] p-6 shadow-sm">
          <div className="space-y-2">
            <h1 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              {copy.title}
            </h1>
            <div className="text-sm text-[var(--ds-muted)]">{copy.note}</div>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block space-y-2">
              <div className="text-sm font-semibold text-[var(--ds-text)]">{copy.fieldUser}</div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface-2)] px-3 text-sm text-[var(--ds-text)] caret-[var(--ds-text)] outline-none placeholder:text-[var(--ds-muted)]"
                autoComplete="username"
              />
            </label>

            <label className="block space-y-2">
              <div className="text-sm font-semibold text-[var(--ds-text)]">{copy.fieldPass}</div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface-2)] px-3 text-sm text-[var(--ds-text)] caret-[var(--ds-text)] outline-none placeholder:text-[var(--ds-muted)]"
                type="password"
                autoComplete="current-password"
              />
            </label>

            {error ? (
              <div className="rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface-2)] px-4 py-3 text-sm text-[var(--ds-muted)]">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
            >
              {submitting ? "…" : copy.button}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
