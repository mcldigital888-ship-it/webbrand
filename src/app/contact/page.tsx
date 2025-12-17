"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    website: "",
    preferredSolution: "",
    message: "",
  });

  function setField(name: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next.fullName = "Nome obbligatorio. / Name is required.";
    if (!form.email.trim()) next.email = "Email obbligatoria. / Email is required.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Inserisci un’email valida. / Enter a valid email.";
    }
    if (!form.preferredSolution)
      next.preferredSolution = "Seleziona una soluzione. / Select a solution.";
    if (!form.message.trim()) next.message = "Messaggio obbligatorio. / Message is required.";
    return next;
  }

  function onSubmit(e: React.FormEvent) {
    void (async () => {
      e.preventDefault();
      setSubmitError(null);
      const next = validate();
      setErrors(next);
      if (Object.keys(next).length > 0) return;

      const leadsEndpointEnabled =
        process.env.NEXT_PUBLIC_LEADS_ENDPOINT_ENABLED === "true";

      if (!leadsEndpointEnabled) {
        setSubmitted(true);
        return;
      }

      setSubmitting(true);
      try {
        const payload = {
          source: "contact",
          businessType: "",
          goal: form.preferredSolution,
          email: form.email,
          answers: {
            fullName: form.fullName,
            email: form.email,
            company: form.company,
            website: form.website,
            preferredSolution: form.preferredSolution,
            message: form.message,
          },
          timestamp: new Date().toISOString(),
        };

        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as
            | { error?: string }
            | null;
          throw new Error(data?.error || "Invio non riuscito. / Failed to submit.");
        }

        setSubmitted(true);
      } catch (err) {
        setSubmitError(
          err instanceof Error ? err.message : "Invio non riuscito. / Failed to submit."
        );
      } finally {
        setSubmitting(false);
      }
    })();
  }

  return (
    <PageShell
      kicker={
        <>
          Contatto
          <br />
          Contact
        </>
      }
      title={
        <>
          Richiedi una call o invia un brief
          <br />
          Request a call or send a brief
        </>
      }
      subtitle={
        <>
          Dicci il tuo obiettivo. Ti rispondiamo con i prossimi step e un piano semplice.
          <br />
          Tell us your goal. We’ll respond with next steps and a simple plan.
        </>
      }
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 md:col-span-2">
          {!submitted ? (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Nome / Full name" required error={errors.fullName}>
                  <input
                    value={form.fullName}
                    onChange={(e) => setField("fullName", e.target.value)}
                    className={inputClassName(!!errors.fullName)}
                    placeholder="Il tuo nome / Your name"
                  />
                </Field>
                <Field label="Email" required error={errors.email}>
                  <input
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className={inputClassName(!!errors.email)}
                    placeholder="you@company.com"
                    inputMode="email"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Azienda (opzionale) / Company (optional)">
                  <input
                    value={form.company}
                    onChange={(e) => setField("company", e.target.value)}
                    className={inputClassName(false)}
                    placeholder="Nome azienda / Company name"
                  />
                </Field>
                <Field label="Sito web (opzionale) / Website (optional)">
                  <input
                    value={form.website}
                    onChange={(e) => setField("website", e.target.value)}
                    className={inputClassName(false)}
                    placeholder="https://..."
                  />
                </Field>
              </div>

              <Field
                label="Soluzione preferita / Preferred solution"
                required
                error={errors.preferredSolution}
              >
                <select
                  value={form.preferredSolution}
                  onChange={(e) => setField("preferredSolution", e.target.value)}
                  className={inputClassName(!!errors.preferredSolution)}
                >
                  <option value="">Seleziona / Select</option>
                  <option value="website-conversion">
                    Conversione sito / Website conversion
                  </option>
                  <option value="landing-ads">Landing per ads / Ads landing page</option>
                  <option value="lead-generation">
                    Sistema lead / Lead system
                  </option>
                  <option value="crm-sales">CRM & vendite / CRM & sales</option>
                  <option value="ai-automation">AI & automazione / AI & automation</option>
                  <option value="food-retail">
                    Soluzioni Food / Retail / Food & retail solutions
                  </option>
                </select>
              </Field>

              <Field label="Messaggio / Message" required error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={(e) => setField("message", e.target.value)}
                  className={[inputClassName(!!errors.message), "h-28 py-3"].join(" ")}
                  placeholder="Obiettivo, timeline, setup attuale... / Goal, timeline, current setup..."
                />
              </Field>

              <div className="flex flex-col gap-2 text-xs text-[var(--color-slate)]">
                <div>Risposta: 24–48 ore. / Response time: 24–48 hours.</div>
                <div>Privacy: niente spam. / Privacy: we don’t spam.</div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
              >
                {submitting ? "Invio... / Submitting..." : "Richiedi / Request"}
              </button>

              {submitError ? (
                <div className="text-sm text-[var(--color-slate)]">
                  {submitError}
                </div>
              ) : null}
            </form>
          ) : (
            <div className="space-y-4">
              <div className="text-sm font-semibold text-[var(--color-success)]">
                Inviato. / Sent.
              </div>
              <div className="text-sm leading-6 text-[var(--color-slate)]">
                Abbiamo ricevuto il tuo messaggio. Prossimo step: ti rispondiamo con il piano più rapido.
                <br />
                We received your message. Next step: we’ll reply with the fastest plan.
              </div>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
              >
                Invia un altro messaggio
                <br />
                Send another message
              </button>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <div className="space-y-3">
            <div className="text-sm font-semibold text-[var(--color-navy)]">
              Cosa succede dopo l’invio
              <br />
              What happens after you submit
            </div>
            <ul className="space-y-2 text-sm text-[var(--color-slate)]">
              <li className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>
                  Riceviamo la tua richiesta
                  <br />
                  We receive your request
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>
                  Revisioniamo entro 24 ore
                  <br />
                  We review within 24h
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>
                  Proponiamo i prossimi step
                  <br />
                  We propose next steps
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[var(--color-navy)]">
          {label}
          {required ? <span className="text-[var(--color-slate)]"> *</span> : null}
        </span>
        {error ? (
          <span className="text-xs font-medium text-[var(--color-slate)]">
            {error}
          </span>
        ) : null}
      </div>
      {children}
    </label>
  );
}

function inputClassName(isError: boolean) {
  return [
    "h-11 w-full rounded-xl border bg-white px-3 text-sm text-[var(--color-navy)] outline-none",
    isError ? "border-[var(--color-cyan)]" : "border-black/10",
    "focus:border-[var(--color-blue)]",
  ].join(" ");
}
