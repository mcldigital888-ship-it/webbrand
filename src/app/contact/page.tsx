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
    if (!form.fullName.trim()) next.fullName = "Name is required / Nome obbligatorio.";
    if (!form.email.trim()) next.email = "Email is required / Email obbligatoria.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email / Inserisci un’email valida.";
    }
    if (!form.preferredSolution)
      next.preferredSolution = "Select a solution / Seleziona una soluzione.";
    if (!form.message.trim()) next.message = "Message is required / Messaggio obbligatorio.";
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
          throw new Error(data?.error || "Failed to submit");
        }

        setSubmitted(true);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : "Failed to submit");
      } finally {
        setSubmitting(false);
      }
    })();
  }

  return (
    <PageShell
      kicker="Contact"
      title="Request a call or send a short brief / Richiedi una call o invia un brief"
      subtitle={
        <>
          Tell us your goal. We’ll respond with next steps and a simple plan.
          <br />
          Dicci il tuo obiettivo. Ti rispondiamo con i prossimi step e un piano semplice.
        </>
      }
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 md:col-span-2">
          {!submitted ? (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full name / Nome" required error={errors.fullName}>
                  <input
                    value={form.fullName}
                    onChange={(e) => setField("fullName", e.target.value)}
                    className={inputClassName(!!errors.fullName)}
                    placeholder="Your name / Il tuo nome"
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
                <Field label="Company (optional) / Azienda (opzionale)">
                  <input
                    value={form.company}
                    onChange={(e) => setField("company", e.target.value)}
                    className={inputClassName(false)}
                    placeholder="Company name / Nome azienda"
                  />
                </Field>
                <Field label="Website (optional) / Sito web (opzionale)">
                  <input
                    value={form.website}
                    onChange={(e) => setField("website", e.target.value)}
                    className={inputClassName(false)}
                    placeholder="https://..."
                  />
                </Field>
              </div>

              <Field
                label="Preferred solution / Soluzione preferita"
                required
                error={errors.preferredSolution}
              >
                <select
                  value={form.preferredSolution}
                  onChange={(e) => setField("preferredSolution", e.target.value)}
                  className={inputClassName(!!errors.preferredSolution)}
                >
                  <option value="">Select</option>
                  <option value="website-conversion">
                    Website Conversion / Conversione sito
                  </option>
                  <option value="landing-ads">Landing Page for Ads / Landing ads</option>
                  <option value="lead-generation">
                    Lead Generation / Growth Engine / Lead engine
                  </option>
                  <option value="crm-sales">CRM & Sales System / CRM vendite</option>
                  <option value="ai-automation">AI & Automations / AI & automazioni</option>
                  <option value="food-retail">
                    Food / Retail Smart Solutions / Soluzioni Food/Retail
                  </option>
                </select>
              </Field>

              <Field label="Message / Messaggio" required error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={(e) => setField("message", e.target.value)}
                  className={[inputClassName(!!errors.message), "h-28 py-3"].join(" ")}
                  placeholder="Goal, timeline, current setup... / Obiettivo, timeline, setup attuale..."
                />
              </Field>

              <div className="flex flex-col gap-2 text-xs text-[var(--color-slate)]">
                <div>Response time: within 24–48 hours. / Risposta: 24–48 ore.</div>
                <div>Privacy: we don’t spam. / Privacy: niente spam.</div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
              >
                {submitting ? "Submitting... / Invio..." : "Send / Invia"}
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
                Sent. / Inviato.
              </div>
              <div className="text-sm leading-6 text-[var(--color-slate)]">
                We received your message. Next step: we’ll reply with the fastest plan.
                <br />
                Abbiamo ricevuto il tuo messaggio. Prossimo step: ti rispondiamo con il piano più rapido.
              </div>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
              >
                Send another message / Invia un altro messaggio
              </button>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <div className="space-y-3">
            <div className="text-sm font-semibold text-[var(--color-navy)]">
              What happens after you submit / Cosa succede dopo l’invio
            </div>
            <ul className="space-y-2 text-sm text-[var(--color-slate)]">
              <li className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>
                  We receive your request / Riceviamo la tua richiesta
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>
                  We review within 24h / Revisioniamo entro 24 ore
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>
                  We propose next steps / Proponiamo i prossimi step
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
