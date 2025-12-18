import Link from "next/link";
import Bilingual from "@/components/Bilingual";

export default function ProcessPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="text-sm font-semibold tracking-wide text-[var(--color-cyan)]">
          Processo
          <span className="text-[var(--color-slate)]"> / </span>
          Process
        </div>
        <h1 className="max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-6xl">
          Il metodo: diagnosi, build, scale
          <br />
          The method: diagnose, build, scale
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
          Nessun framework complicato o consulenza astratta. Questo è il processo operativo reale che seguiamo: 7 giorni
          diagnosi, 14–30 giorni build, gestione mensile per scalare.
          <span className="text-[var(--color-slate)]"> / </span>
          No complicated frameworks or abstract consulting. A real operating process: 7-day audit, 14–30 day
          implementation, monthly optimization.
        </p>
      </header>

      <section className="rounded-3xl border border-black/5 bg-[var(--color-surface)] p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                Fase 1: System Audit (7 giorni)
                <span className="text-[var(--color-slate)]"> / </span>
                Phase 1: System audit (7 days)
              </div>
              <div className="text-sm leading-6 text-[var(--color-slate)]">
                Audit completo dello stato attuale: numeri reali (traffico, lead, conversion, revenue), strumenti in uso,
                funnel esistenti, colli di bottiglia.
                <span className="text-[var(--color-slate)]"> / </span>
                Full audit of current reality: real numbers (traffic, leads, conversion, revenue), tools, funnels, and
                bottlenecks.
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-[var(--color-background)] p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                Output audit
                <span className="text-[var(--color-slate)]"> / </span>
                Audit output
              </div>
              <ul className="mt-4 space-y-2 text-sm text-[var(--color-slate)]">
                {[
                  {
                    it: "Documento 15–20 pagine (situazione as-is + priorità)",
                    en: "15–20 page doc (as-is + priorities)",
                  },
                  { it: "Interventi ordinati per ROI", en: "ROI-ordered interventions" },
                  { it: "Timeline realistica per modulo", en: "Realistic timeline per module" },
                  { it: "Forecast KPI post-intervento", en: "Post-change KPI forecast" },
                ].map((b) => (
                  <li key={b.en} className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                    <span>
                      {b.it}
                      <span className="text-[var(--color-slate)]"> / </span>
                      {b.en}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-semibold text-[var(--color-navy)]">
              Cosa analizziamo
              <span className="text-[var(--color-slate)]"> / </span>
              What we analyze
            </div>
            <ul className="space-y-2 text-sm text-[var(--color-slate)]">
              {[
                { it: "Sorgenti traffico e qualità lead", en: "Traffic sources and lead quality" },
                { it: "Conversion rate per canale", en: "Conversion rate by channel" },
                { it: "Funnel sales esistente", en: "Existing sales funnel" },
                { it: "Stack tecnologico e gap", en: "Tech stack and gaps" },
                { it: "Processi operativi team", en: "Team operating processes" },
                { it: "Competitor benchmark", en: "Competitor benchmark" },
              ].map((b) => (
                <li key={b.en} className="flex gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                  <span>
                    {b.it}
                    <span className="text-[var(--color-slate)]"> / </span>
                    {b.en}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-[var(--color-background)] p-6 sm:p-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-[var(--color-navy)]">
              Fase 2: Implementation (14–30 giorni)
              <span className="text-[var(--color-slate)]"> / </span>
              Phase 2: Implementation (14–30 days)
            </div>
            <div className="text-sm leading-6 text-[var(--color-slate)]">
              Setup guidato con milestone. Lavoriamo insieme al tuo team per implementazione operativa: tracking, CRM,
              pagine/landing, integrazioni e test end-to-end.
              <span className="text-[var(--color-slate)]"> / </span>
              Guided setup with milestones: tracking, CRM, pages/landing, integrations and end-to-end testing.
            </div>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <WeekCard
                titleIt="Week 1: Foundations"
                titleEn="Week 1: Foundations"
                descIt="Setup accessi, tracking, integrazioni critiche"
                descEn="Access, tracking and critical integrations"
              />
              <WeekCard
                titleIt="Week 2: Build"
                titleEn="Week 2: Build"
                descIt="Sviluppo pagine/CRM/automazioni, prime bozze"
                descEn="Build pages/CRM/automations, first drafts"
              />
              <WeekCard
                titleIt="Week 3: Test"
                titleEn="Week 3: Test"
                descIt="QA completo, fix bug, test flussi end-to-end"
                descEn="Full QA, bug fixes, end-to-end flow tests"
              />
              <WeekCard
                titleIt="Week 4: Launch"
                titleEn="Week 4: Launch"
                descIt="Go-live controllato, monitoring, training team"
                descEn="Controlled go-live, monitoring, team training"
              />
            </div>
          </div>

          <div className="text-sm leading-6 text-[var(--color-slate)]">
            Training incluso: sessioni operative per usare gli strumenti implementati + documentazione per onboarding.
            <span className="text-[var(--color-slate)]"> / </span>
            Training included: operating sessions + documentation for onboarding.
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-[var(--color-surface)] p-6 sm:p-8">
        <div className="space-y-4">
          <div className="text-sm font-semibold text-[var(--color-navy)]">
            Fase 3: Scale & Optimize (mensile)
            <span className="text-[var(--color-slate)]"> / </span>
            Phase 3: Scale & optimize (monthly)
          </div>
          <div className="text-sm leading-6 text-[var(--color-slate)]">
            Gestione continuativa basata su dati reali: A/B test, ottimizzazione budget, automazioni, espansione
            funzionalità.
            <span className="text-[var(--color-slate)]"> / </span>
            Ongoing management based on real data: A/B tests, budget optimization, automations, feature expansion.
          </div>
          <div className="rounded-2xl border border-black/5 bg-[var(--color-background)] p-6 text-sm leading-6 text-[var(--color-slate)]">
            Review mensili con dashboard aggiornata + raccomandazioni concrete per il mese successivo.
            <span className="text-[var(--color-slate)]"> / </span>
            Monthly reviews with updated dashboards + concrete recommendations for next month.
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/oracolo"
              className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
            >
              <Bilingual it="Richiedi System Audit" en="Request a system audit" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
            >
              <Bilingual it="Vedi soluzioni" en="See solutions" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function WeekCard({
  titleIt,
  titleEn,
  descIt,
  descEn,
}: {
  titleIt: string;
  titleEn: string;
  descIt: string;
  descEn: string;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5">
      <div className="space-y-2">
        <div className="text-sm font-semibold text-[var(--color-navy)]">
          {titleIt}
          <span className="text-[var(--color-slate)]"> / </span>
          {titleEn}
        </div>
        <div className="text-sm leading-6 text-[var(--color-slate)]">
          {descIt}
          <span className="text-[var(--color-slate)]"> / </span>
          {descEn}
        </div>
      </div>
    </div>
  );
}
