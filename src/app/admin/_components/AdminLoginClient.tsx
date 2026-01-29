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
          <div className="text-sm font-semibold text-[var(--color-navy)]">{copy.top}</div>
          <AdminLangToggleClient value={lang} onChange={setLang} />
        </div>

        <div className="mt-4 rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 shadow-sm">
          <div className="space-y-2">
            <h1 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
              {copy.title}
            </h1>
            <div className="text-sm text-[var(--color-slate)]">{copy.note}</div>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block space-y-2">
              <div className="text-sm font-semibold text-[var(--color-navy)]">{copy.fieldUser}</div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] caret-[var(--ds-text)] outline-none placeholder:text-[var(--ds-muted)] focus:border-[var(--color-blue)]"
                autoComplete="username"
              />
            </label>

            <label className="block space-y-2">
              <div className="text-sm font-semibold text-[var(--color-navy)]">{copy.fieldPass}</div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] caret-[var(--ds-text)] outline-none placeholder:text-[var(--ds-muted)] focus:border-[var(--color-blue)]"
                type="password"
                autoComplete="current-password"
              />
            </label>

            {error ? (
              <div className="rounded-xl border border-black/5 bg-[var(--color-background)] px-4 py-3 text-sm text-[var(--color-slate)]">
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
