"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type TrackSlug =
  | "sito-che-converte"
  | "landing-ads"
  | "social-contenuti"
  | "funnel-completo"
  | "crm-che-chiude"
  | "automazioni-ai"
  | "integrazioni-custom"
  | "food-retail";

type PrimaryGoal =
  | "sales-website"
  | "ads-landing"
  | "social"
  | "growth"
  | "crm"
  | "ai"
  | "integrations"
  | "kiosk";

function trackToGoal(track: TrackSlug | null): PrimaryGoal | "" {
  if (!track) return "";
  if (track === "sito-che-converte") return "sales-website";
  if (track === "landing-ads") return "ads-landing";
  if (track === "social-contenuti") return "social";
  if (track === "funnel-completo") return "growth";
  if (track === "crm-che-chiude") return "crm";
  if (track === "automazioni-ai") return "ai";
  if (track === "integrazioni-custom") return "integrations";
  if (track === "food-retail") return "kiosk";
  return "";
}

function getInitialTrack(): TrackSlug | null {
  if (typeof window === "undefined") return null;
  try {
    const url = new URL(window.location.href);
    const raw = url.searchParams.get("track");
    const allowed: TrackSlug[] = [
      "sito-che-converte",
      "landing-ads",
      "social-contenuti",
      "funnel-completo",
      "crm-che-chiude",
      "automazioni-ai",
      "integrazioni-custom",
      "food-retail",
    ];
    return allowed.includes(raw as TrackSlug) ? (raw as TrackSlug) : null;
  } catch {
    return null;
  }
}

export default function OracoloPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState(() => {
    const track = getInitialTrack();
    const goal = trackToGoal(track);
    const businessType = track === "food-retail" ? "food-retail" : "";
    return {
      businessType,
      primaryGoal: goal,
      currentSituation: "",
      adBudgetRange: "",
      timeline: "",
      fullName: "",
      email: "",
      company: "",
      website: "",
    };
  });

  const primaryGoalOptions = useMemo(() => {
    const base = [
      {
        value: "sales-website",
        label: "Sito Web che converte / Conversion-first website",
      },
      { value: "ads-landing", label: "Landing Page per ADS / Ads landing page" },
      { value: "social", label: "Gestione Social + Contenuti / Social + content" },
      {
        value: "growth",
        label: "Growth Engine (lead + nurture) / Growth engine (lead + nurture)",
      },
      { value: "crm", label: "CRM & vendite / CRM & sales" },
      { value: "ai", label: "AI & automazione / AI & automation" },
      { value: "integrations", label: "Software / Integrazioni / Software & integrations" },
      {
        value: "kiosk",
        label: "Food/Retail smart (totem) / Food & retail smart (kiosk)",
      },
    ];

    if (form.businessType === "food-retail") {
      return base.filter((o) => o.value !== "crm");
    }

    return base;
  }, [form.businessType]);

  const recommendation = useMemo(() => {
    const goal = form.primaryGoal;
    const businessType = form.businessType;

    if (goal === "sales-website") {
      return {
        modules: ["Conversione sito / Website conversion", "CRM & vendite / CRM & sales"],
        timeline: "30–60 days",
        kpi: "Aumento conversione stimato: 25–40% / Expected conversion uplift: 25–40%",
      };
    }

    if (goal === "ads-landing") {
      return {
        modules: ["Landing per ads / Ads landing page", "Sistema lead / Lead system"],
        timeline: "14–30 days",
        kpi: "Miglioramento CPL stimato: 15–35% / Expected CPL improvement: 15–35%",
      };
    }

    if (goal === "social") {
      return {
        modules: ["Social + contenuti / Social + content", "Landing per ads / Ads landing page"],
        timeline: "30 days",
        kpi: "Lead qualificati/mese: +20–40% / Qualified leads/month: +20–40%",
      };
    }

    if (goal === "growth") {
      return {
        modules: ["Sistema lead / Lead system", "CRM & vendite / CRM & sales"],
        timeline: "30–60 days",
        kpi: "Aumento lead→meeting stimato: 20–35% / Expected lead-to-meeting uplift: 20–35%",
      };
    }

    if (goal === "crm") {
      return {
        modules: ["CRM & vendite / CRM & sales", "Automazioni / Automations"],
        timeline: "14–30 days",
        kpi: "Riduzione tempi di risposta stimata: 30–60% / Expected response time reduction: 30–60%",
      };
    }

    if (goal === "ai") {
      return {
        modules: ["Assistenti AI / AI assistants", "Automazioni / Automations"],
        timeline: "30–60 days",
        kpi: "Riduzione lavoro manuale stimata: 15–30% / Expected manual work reduction: 15–30%",
      };
    }

    if (goal === "integrations") {
      return {
        modules: ["Integrazioni / Integrations", "Automazioni / Automations"],
        timeline: "14–30 days",
        kpi: "Tempo risparmiato: 10–25% / Time saved: 10–25%",
      };
    }

    if (goal === "kiosk" || businessType === "food-retail") {
      return {
        modules: ["Soluzioni Food / Retail / Food & retail solutions", "Kiosk ordini / Ordering kiosk"],
        timeline: "30–60 days",
        kpi: "Aumento throughput stimato: 10–25% / Expected throughput uplift: 10–25%",
      };
    }

    return {
      modules: ["Conversione sito / Website conversion"],
      timeline: "14–30 days",
      kpi: "Aumento KPI stimato: 10–20% / Expected KPI uplift: 10–20%",
    };
  }, [form.businessType, form.primaryGoal]);

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
    if (!form.businessType)
      next.businessType = "Seleziona un tipo di attività. / Select a business type.";
    if (!form.primaryGoal)
      next.primaryGoal = "Seleziona un obiettivo principale. / Select a primary goal.";
    if (!form.currentSituation)
      next.currentSituation = "Seleziona la situazione attuale. / Select your current situation.";
    if (!form.timeline) next.timeline = "Seleziona una timeline. / Select a timeline.";
    if (!form.fullName.trim()) next.fullName = "Nome obbligatorio. / Name is required.";
    if (!form.email.trim()) next.email = "Email obbligatoria. / Email is required.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Inserisci un’email valida. / Enter a valid email.";
    }
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
          source: "oracolo",
          businessType: form.businessType,
          goal: form.primaryGoal,
          email: form.email,
          answers: {
            businessType: form.businessType,
            primaryGoal: form.primaryGoal,
            currentSituation: form.currentSituation,
            adBudgetRange: form.adBudgetRange,
            timeline: form.timeline,
            fullName: form.fullName,
            email: form.email,
            company: form.company,
            website: form.website,
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
    <div className="space-y-10">
      <section className="rounded-3xl border border-black/5 bg-[#ff5a1f] px-6 py-10 text-black sm:px-10">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="font-[var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
              Oracolo webrrand™ — dimmi cosa vuoi costruire
              <br />
              <span className="text-black/70">Webrrand oracle™ — tell us what to build</span>
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-black/75">
              Compili 2 minuti. L&apos;Oracolo fa le domande giuste e genera: Brief completo + Roadmap implementazione + Stima
              tempi + KPI target + proposta modulare.
              <span className="text-black/60"> / </span>
              A 2-minute intake. We ask the right questions and generate: a full brief + implementation roadmap +
              timeline + KPI targets + modular quote.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-black/10 p-6">
            <div className="text-sm font-semibold text-black">
              Cosa ottieni
              <span className="text-black/60"> / </span>
              What you get
            </div>
            <div className="mt-2 text-sm leading-6 text-black/75">
              Project Brief (obiettivo, target, vincoli), Page/Flow Blueprint, Deliverables & Timeline, Stima ROI/KPI,
              Preventivo modulare.
              <span className="text-black/60"> / </span>
              Project brief (objective, target, constraints), page/flow blueprint, deliverables & timeline, ROI/KPI
              estimate, modular quote.
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-[var(--color-surface)] p-6 sm:p-8">
        {!submitted ? (
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="space-y-3">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                Scegli cosa vuoi realizzare
                <span className="text-[var(--color-slate)]"> / </span>
                Choose what to build
              </div>
              {errors.primaryGoal ? (
                <div className="text-xs font-medium text-[var(--color-slate)]">{errors.primaryGoal}</div>
              ) : null}
              <div className="grid grid-cols-1 gap-3">
                {primaryGoalOptions.map((o) => (
                  <label
                    key={o.value}
                    className="flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 bg-white p-4 hover:bg-[var(--color-background)]"
                  >
                    <input
                      type="radio"
                      name="primaryGoal"
                      value={o.value}
                      checked={form.primaryGoal === o.value}
                      onChange={(e) => setField("primaryGoal", e.target.value)}
                      className="mt-1 h-4 w-4"
                    />
                    <span className="text-sm font-semibold text-[var(--color-navy)]">{o.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Tipo di attività / Business type" error={errors.businessType} required>
                <select
                  value={form.businessType}
                  onChange={(e) => setField("businessType", e.target.value)}
                  className={inputClassName(!!errors.businessType)}
                >
                  <option value="">Seleziona / Select</option>
                  <option value="b2b">B2B</option>
                  <option value="food-retail">Food / Retail</option>
                  <option value="service">Servizi / Services</option>
                </select>
              </Field>

              <Field label="Timeline / Timeline" error={errors.timeline} required>
                <select
                  value={form.timeline}
                  onChange={(e) => setField("timeline", e.target.value)}
                  className={inputClassName(!!errors.timeline)}
                >
                  <option value="">Seleziona / Select</option>
                  <option value="urgent">Urgente / Urgent</option>
                  <option value="30">30 giorni / 30 days</option>
                  <option value="60+">60+ giorni / 60+ days</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Budget ads mensile (opzionale) / Monthly ad budget (optional)">
                <select
                  value={form.adBudgetRange}
                  onChange={(e) => setField("adBudgetRange", e.target.value)}
                  className={inputClassName(false)}
                >
                  <option value="">Seleziona / Select</option>
                  <option value="0">Niente ads / No ads</option>
                  <option value="1-2k">$1k–$2k</option>
                  <option value="2-5k">$2k–$5k</option>
                  <option value="5-10k">$5k–$10k</option>
                  <option value="10k+">$10k+</option>
                </select>
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Nome / Full name" error={errors.fullName} required>
                <input
                  value={form.fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                  className={inputClassName(!!errors.fullName)}
                  placeholder="Il tuo nome / Your name"
                />
              </Field>

              <Field label="Email" error={errors.email} required>
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

              <Field label="Situazione attuale (opzionale) / Current situation (optional)">
                <select
                  value={form.currentSituation}
                  onChange={(e) => setField("currentSituation", e.target.value)}
                  className={inputClassName(false)}
                >
                  <option value="">Seleziona / Select</option>
                  <option value="starting">Parto da zero / Starting from scratch</option>
                  <option value="have-traffic-no-leads">Ho traffico, pochi lead / Traffic exists, leads are weak</option>
                  <option value="have-leads-no-system">Ho lead, nessun follow-up / Leads exist, no follow-up system</option>
                  <option value="crm-mess">CRM presente ma caotico / CRM exists but messy</option>
                  <option value="ops-heavy">Molto lavoro manuale / Ops-heavy, lots of manual work</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-black/5 bg-[var(--color-background)] p-5">
                <div className="text-sm font-semibold text-[var(--color-navy)]">
                  Privacy garantita
                  <span className="text-[var(--color-slate)]"> / </span>
                  Privacy
                </div>
                <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                  Dati protetti, nessuna vendita a terzi.
                  <span className="text-[var(--color-slate)]"> / </span>
                  Data protected, never sold.
                </div>
              </div>
              <div className="rounded-2xl border border-black/5 bg-[var(--color-background)] p-5">
                <div className="text-sm font-semibold text-[var(--color-navy)]">
                  Zero spam
                  <span className="text-[var(--color-slate)]"> / </span>
                  Zero spam
                </div>
                <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                  Nessuna newsletter non richiesta.
                  <span className="text-[var(--color-slate)]"> / </span>
                  No unsolicited newsletters.
                </div>
              </div>
              <div className="rounded-2xl border border-black/5 bg-[var(--color-background)] p-5">
                <div className="text-sm font-semibold text-[var(--color-navy)]">
                  Cosa succede dopo
                  <span className="text-[var(--color-slate)]"> / </span>
                  What happens next
                </div>
                <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                  Ricevi brief + roadmap entro 24h.
                  <span className="text-[var(--color-slate)]"> / </span>
                  Get brief + roadmap within 24h.
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
              >
                {submitting ? "Invio... / Submitting..." : "Inizia ora (2 min) / Start now (2 min)"}
              </button>
              <Link
                href="/contact"
                className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
              >
                Preferisco parlare: Prenota una Call
                <span className="text-[var(--color-slate)]"> / </span>
                Prefer to talk: book a call
              </Link>
            </div>

            {submitError ? (
              <div className="text-sm text-[var(--color-slate)]">{submitError}</div>
            ) : null}
          </form>
        ) : (
          <div className="rounded-3xl border border-black/5 bg-[var(--color-surface)] p-6 sm:p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-[var(--color-navy)]">
                  Brief automatico
                  <span className="text-[var(--color-slate)]"> / </span>
                  Auto brief
                </div>
                <div className="text-sm leading-6 text-[var(--color-slate)]">
                  Copia questo brief nel tuo CRM, email o note della call.
                  <br />
                  Copy this brief into your CRM, email, or call notes.
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-[var(--color-slate)]">
                      Moduli consigliati
                      <span className="text-[var(--color-slate)]"> / </span>
                      Recommended modules
                    </div>
                    <ul className="space-y-2 text-sm text-[var(--color-navy)]">
                      {recommendation.modules.map((m) => (
                        <li key={m} className="flex gap-2">
                          <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                          <span className="font-semibold">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-[var(--color-slate)]">
                      Timeline stimata
                      <span className="text-[var(--color-slate)]"> / </span>
                      Estimated timeline
                    </div>
                    <div className="text-sm font-semibold text-[var(--color-navy)]">
                      {recommendation.timeline}
                    </div>
                    <div className="text-sm leading-6 text-[var(--color-slate)]">
                      In base a scope e integrazioni.
                      <br />
                      Based on scope and integrations.
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-[var(--color-slate)]">
                      Anteprima KPI
                      <span className="text-[var(--color-slate)]"> / </span>
                      KPI preview
                    </div>
                    <div className="text-sm font-semibold text-[var(--color-navy)]">
                      {recommendation.kpi}
                    </div>
                    <div className="text-sm leading-6 text-[var(--color-slate)]">
                      Validiamo con tracking e iteriamo settimanalmente.
                      <br />
                      We validate with tracking and iterate weekly.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-black/5 bg-[var(--color-background)] p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <BriefItem label="Tipo di attività / Business type" value={form.businessType} />
                  <BriefItem label="Obiettivo / Primary goal" value={form.primaryGoal} />
                  <BriefItem label="Situazione / Current situation" value={form.currentSituation} />
                  <BriefItem label="Timeline / Timeline" value={form.timeline} />
                  <BriefItem
                    label="Budget ads mensile / Monthly ad budget"
                    value={form.adBudgetRange || "Non specificato / Not specified"}
                  />
                  <BriefItem label="Sito web / Website" value={form.website || "Non specificato / Not specified"} />
                  <BriefItem label="Nome / Name" value={form.fullName} />
                  <BriefItem label="Email" value={form.email} />
                  <BriefItem label="Azienda / Company" value={form.company || "Non specificato / Not specified"} />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
                >
                  Richiedi una call
                  <br />
                  Request a call
                </Link>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
                >
                  Modifica risposte
                  <br />
                  Edit answers
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
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

function BriefItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-semibold text-[var(--color-slate)]">{label}</div>
      <div className="text-sm font-medium text-[var(--color-navy)]">{value}</div>
    </div>
  );
}
