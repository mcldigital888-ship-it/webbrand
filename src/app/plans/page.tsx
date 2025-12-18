import Link from "next/link";
import Bilingual from "@/components/Bilingual";

export default function PlansPage() {
  return (
    <section className="rounded-3xl border border-black/5 bg-[#ff5bd6] px-6 py-10 text-[var(--color-navy)] sm:px-10">
      <div className="space-y-8">
        <header className="space-y-3">
          <h1 className="font-[var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
            <Bilingual
              it="Piani trasparenti. Nessun costo nascosto."
              en="Transparent plans. No hidden costs."
            />
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-[var(--color-navy)]/80">
            <Bilingual
              it="Prezzi fissi per scope definito. Nessuna sorpresa, nessun extra non comunicato. Ogni piano include deliverable specifici, timeline chiara e supporto post-lancio. Puoi iniziare con un modulo singolo e aggiungere componenti quando serve. Scalabilità senza lock-in."
              en="Fixed scope, transparent delivery. No surprises, no uncommunicated extras. Every plan includes clear deliverables, timeline and post-launch support. Start with one module and add what you need. Scalable without lock-in."
            />
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <PlanCard
            titleIt="Piano Web"
            titleEn="Web plan"
            itemsIt={[
              "Sito completo 5–8 pagine oppure landing singola ottimizzata",
              "Wireframe + copy + design + sviluppo",
              "SEO tecnico base + tracking eventi",
              "Responsive + performance ottimizzata",
              "30 giorni supporto post-lancio",
            ]}
            itemsEn={[
              "Full site (5–8 pages) or one optimized landing",
              "Wireframe + copy + design + development",
              "Technical SEO base + event tracking",
              "Responsive + performance optimized",
              "30 days post-launch support",
            ]}
            noteIt="Tempi: 3–4 settimane. Ideale per: aziende che partono da zero o refactoring completo."
            noteEn="Timeline: 3–4 weeks. Best for: teams starting from scratch or full refactor."
          />

          <PlanCard
            titleIt="Piano Landing"
            titleEn="Landing plan"
            itemsIt={[
              "Landing page per campagna ads specifica",
              "Copy + design + tracking completo",
              "Form ottimizzato + thank you page",
              "Integrazione CRM + automazioni follow-up base",
              "Setup retargeting audiences",
            ]}
            itemsEn={[
              "Ad-specific landing page",
              "Copy + design + full tracking",
              "Optimized form + thank you page",
              "CRM integration + basic follow-up automations",
              "Retargeting audiences setup",
            ]}
            noteIt="Tempi: 1–2 settimane. Ideale per: lancio prodotto, lead gen, test offerta."
            noteEn="Timeline: 1–2 weeks. Best for: product launch, lead gen, offer testing."
          />

          <PlanCard
            titleIt="Piano Social"
            titleEn="Social plan"
            itemsIt={[
              "Gestione 2–3 profili social",
              "15–20 contenuti/mese (mix reel, post, stories)",
              "Calendario + produzione + posting + community management",
              "Collegamento funnel (link in bio + landing)",
              "Report mensile performance",
            ]}
            itemsEn={[
              "Manage 2–3 social profiles",
              "15–20 assets/month (reels, posts, stories)",
              "Calendar + production + posting + community management",
              "Funnel connection (link-in-bio + landing)",
              "Monthly performance report",
            ]}
            noteIt="Ricorrenza mensile. Ideale per: presenza social professionale costante."
            noteEn="Monthly retainer. Best for: consistent professional social presence."
          />

          <PlanCard
            titleIt="Piano CRM"
            titleEn="CRM plan"
            itemsIt={[
              "Setup CRM completo (HubSpot, GoHighLevel o altro)",
              "Pipeline personalizzata + scoring + campi custom",
              "10 automazioni chiave (follow-up, nurture, alert)",
              "Dashboard vendite + report",
              "Training team + documentazione operativa",
            ]}
            itemsEn={[
              "Full CRM setup (HubSpot, GoHighLevel or other)",
              "Custom pipeline + scoring + fields",
              "10 key automations (follow-up, nurture, alerts)",
              "Sales dashboard + reporting",
              "Team training + operational docs",
            ]}
            noteIt="Tempi: 2–3 settimane. Ideale per: team vendite che lavora su Excel e vuole processo."
            noteEn="Timeline: 2–3 weeks. Best for: sales teams moving from spreadsheets to a real process."
          />

          <PlanCard
            titleIt="Piano AI"
            titleEn="AI plan"
            itemsIt={[
              "1–3 AI apps verticali (preventivi, support, recensioni, prenotazioni, etc)",
              "Workflow automation + assistente conversazionale",
              "Integrazione CRM + sistemi esistenti",
              "Governance + log + monitoring",
              "Training + documentazione",
            ]}
            itemsEn={[
              "1–3 vertical AI apps (quotes, support, reviews, bookings, etc)",
              "Workflow automation + conversational assistant",
              "CRM + existing systems integration",
              "Governance + logging + monitoring",
              "Training + documentation",
            ]}
            noteIt="Tempi: 3–5 settimane. Ideale per: processi ripetitivi da automatizzare."
            noteEn="Timeline: 3–5 weeks. Best for: repetitive processes you want to automate."
          />

          <PlanCard
            titleIt="Piano Full System"
            titleEn="Full system plan"
            itemsIt={[
              "Bundle completo: Sito/Landing + Social + CRM + AI/Automazioni",
              "Sistema integrato end-to-end",
              "Dashboard unica multi-strumento",
              "Growth plan trimestrale con ottimizzazioni continue",
              "Supporto prioritario + consulenza strategica mensile",
            ]}
            itemsEn={[
              "Full bundle: Site/Landing + Social + CRM + AI/Automation",
              "End-to-end integrated system",
              "Single dashboard across tools",
              "Quarterly growth plan with ongoing optimization",
              "Priority support + monthly strategic advisory",
            ]}
            noteIt="Tempi: 6–8 settimane setup iniziale, poi gestione continuativa. Ideale per: aziende che vogliono sistema completo subito."
            noteEn="Timeline: 6–8 weeks initial setup, then ongoing management. Best for: teams that want the full system now."
          />
        </div>

        <div className="text-sm leading-6 text-[var(--color-navy)]/80">
          <Bilingual
            it="Tutti i piani sono personalizzabili. Prezzi su richiesta dopo brief iniziale (gratuito, 20 minuti). Pagamenti: 50% anticipo, 50% a completamento milestone. Contratti chiari senza clausole nascoste."
            en="All plans are customizable. Pricing after an initial brief (free, 20 minutes). Payments: 50% upfront, 50% at milestone completion. Clear contracts, no hidden clauses."
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex w-fit rounded-full bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
          >
            <Bilingual it="Parla con un consulente" en="Talk to a consultant" />
          </Link>
          <Link
            href="/solutions"
            className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/25 bg-white/20 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:bg-white/30"
          >
            <Bilingual it="Confronta piani" en="Compare plans" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  titleIt,
  titleEn,
  itemsIt,
  itemsEn,
  noteIt,
  noteEn,
}: {
  titleIt: string;
  titleEn: string;
  itemsIt: string[];
  itemsEn: string[];
  noteIt: string;
  noteEn: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-navy)]/15 bg-white/20 p-6">
      <div className="space-y-4">
        <div className="text-base font-semibold text-[var(--color-navy)]">
          {titleIt}
          <span className="text-[var(--color-navy)]/70"> / </span>
          {titleEn}
        </div>
        <ul className="space-y-2 text-sm text-[var(--color-navy)]/85">
          {itemsIt.map((it, idx) => (
            <li key={it} className="flex gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-navy)]/60" />
              <span>
                {it}
                <span className="text-[var(--color-navy)]/60"> / </span>
                {itemsEn[idx]}
              </span>
            </li>
          ))}
        </ul>
        <div className="text-sm font-medium text-[var(--color-navy)]/85">
          {noteIt}
          <span className="text-[var(--color-navy)]/60"> / </span>
          {noteEn}
        </div>
      </div>
    </div>
  );
}
