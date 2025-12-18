import type { Metadata } from "next";
import Link from "next/link";
import Bilingual from "@/components/Bilingual";
import SectionBand from "@/components/SectionBand";
import GoalCard from "@/components/GoalCard";
import ModuleCard from "@/components/ModuleCard";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Metti ordine. Automatizza. Converti. Sistemi modulari, zero fuffa.",
  openGraph: {
    title: "Webbrand",
    description:
      "Metti ordine. Automatizza. Converti. Sistemi modulari, zero fuffa.",
    type: "website",
  },
};

const goalsPreview = [
  {
    number: "1",
    href: "/solutions#sito-che-converte",
    title: { it: "Mi serve un sito che converta", en: "I need a website that converts" },
    desc: {
      it: "Architettura UX, copy strategico, tracking eventi e integrazione CRM.",
      en: "Conversion UX, strategic copy, event tracking, and CRM integration.",
    },
  },
  {
    number: "2",
    href: "/solutions#landing-ads",
    title: { it: "Mi serve una landing per ads", en: "I need a landing page for ads" },
    desc: {
      it: "Pagina singola ottimizzata per campagne: anti-frizione e tracciamento completo.",
      en: "Single-page built for campaigns: zero friction and full tracking.",
    },
  },
  {
    number: "3",
    href: "/solutions#social-contenuti",
    title: { it: "Mi serve gestione social + contenuti", en: "I need social + content" },
    desc: {
      it: "Calendario editoriale, produzione, format ricorrenti e collegamento a funnel/CRM.",
      en: "Editorial calendar, production, repeatable formats, connected to funnel/CRM.",
    },
  },
  {
    number: "4",
    href: "/solutions#crm-che-chiude",
    title: { it: "Voglio un CRM che chiuda", en: "I want a CRM that closes" },
    desc: {
      it: "Pipeline strutturata, scoring, follow-up intelligente e reporting vendite.",
      en: "Structured pipeline, lead scoring, smart follow-ups, and sales reporting.",
    },
  },
];

const modules = [
  {
    title: { it: "WEB (Siti + Landing)", en: "WEB (Sites + Landing)" },
    desc: {
      it: "Progettazione UX, copy strategico, sviluppo conversion-first.",
      en: "Conversion-first UX, strategic copy, and development.",
    },
    bullets: [
      { it: "Architettura pagine", en: "Information architecture" },
      { it: "SEO tecnico + tracking", en: "Technical SEO + tracking" },
      { it: "Integrazione CRM", en: "CRM integration" },
    ],
  },
  {
    title: { it: "MARKETING (Social + Contenuti + Campagne)", en: "MARKETING (Social + Content + Campaigns)" },
    desc: {
      it: "Gestione e produzione con un sistema, non post isolati.",
      en: "A system for content + campaigns, not random posts.",
    },
    bullets: [
      { it: "Piano editoriale", en: "Content plan" },
      { it: "ADV & retargeting", en: "Ads & retargeting" },
      { it: "Messaggi che convertono", en: "Conversion messaging" },
    ],
  },
  {
    title: { it: "SALES SYSTEM (CRM + Pipeline + Follow-up)", en: "SALES SYSTEM (CRM + Pipeline + Follow-up)" },
    desc: {
      it: "CRM strutturato per gestire lead, timing e closing.",
      en: "A CRM setup designed for speed, follow-up, and closing.",
    },
    bullets: [
      { it: "Pipeline + automazioni", en: "Pipeline + automation" },
      { it: "Follow-up multi-canale", en: "Multi-channel follow-up" },
      { it: "Reporting vendite", en: "Sales reporting" },
    ],
  },
  {
    title: { it: "AI (Assistenti + Automazioni + AI Apps)", en: "AI (Assistants + Automations + AI Apps)" },
    desc: {
      it: "AI applicata ai processi: meno lavoro manuale, più velocità.",
      en: "Applied AI: less manual work, more speed.",
    },
    bullets: [
      { it: "Assistenti conversazionali", en: "AI assistants" },
      { it: "Workflow automation", en: "Workflow automation" },
      { it: "App verticali", en: "Vertical apps" },
    ],
  },
  {
    title: { it: "SOFTWARE & INTEGRAZIONI", en: "SOFTWARE & INTEGRATIONS" },
    desc: {
      it: "Colleghiamo strumenti esistenti e riduciamo passaggi manuali.",
      en: "Connect tools and eliminate manual steps.",
    },
    bullets: [
      { it: "Integrazioni con stack", en: "Stack integrations" },
      { it: "Automazioni operative", en: "Operational automations" },
      { it: "Custom quando serve", en: "Custom when needed" },
    ],
  },
];

export default function Home() {
  return (
    <div className="space-y-10">
      <SectionBand tone="accent" className="overflow-hidden">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="text-sm font-semibold tracking-wide text-[var(--color-navy)]/70">
              <Bilingual en="WEBRRAND AGENCY" it="WEBRRAND AGENCY" />
            </div>
            <h1 className="max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-6xl">
              <Bilingual
                it={
                  <>
                    Metti ordine. Automatizza.
                    <br />
                    Converti.
                  </>
                }
                en={
                  <>
                    Get organized. Automate.
                    <br />
                    Convert.
                  </>
                }
              />
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--color-slate)]">
              <Bilingual
                it="Costruiamo sistemi digitali e AI per aziende che vogliono smettere di rincorrere: siti e landing che convertono, social e campagne che generano lead, CRM che chiudono, software e integrazioni che eliminano caos."
                en="We build modular digital + AI systems for teams that want clarity and conversion: websites and landing pages that sell, campaigns that generate leads, CRMs that close, and integrations that remove chaos."
              />
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
              >
                <Bilingual en="Book a Call (15 min)" it="Prenota una call (15 min)" />
              </Link>
              <Link
                href="/solutions"
                className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 bg-white/60 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-white"
              >
                <Bilingual en="Choose your objective" it="Scegli il tuo obiettivo" />
              </Link>
            </div>
            <p className="text-sm font-medium text-[var(--color-slate)]">
              <Bilingual
                it="Risposta entro 24h · Call breve · Next step chiaro · Zero fuffa"
                en="Reply within 24h · Short call · Clear next step · Zero fluff"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-black/5 bg-white/70 p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Acquisition" it="Acquisizione" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  it="Landing + ads + social → lead tracciati"
                  en="Landing + ads + social → tracked leads"
                />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/70 p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Conversion" it="Conversione" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual it="CRM + follow-up + chatbot → demo/preventivi" en="CRM + follow-up + chatbot → demos/quotes" />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/70 p-6 md:col-span-3">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Control" it="Controllo" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual it="Dashboard KPI + automazioni → meno errori, più velocità" en="KPI dashboards + automations → fewer errors, more speed" />
              </div>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="muted">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
              <Bilingual
                it="Sei qui per una di queste cose. Clicca e vai dritto."
                en="You’re here for one of these. Click and go straight."
              />
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
              <Bilingual
                it="Non perdiamo tempo. Identifica il tuo obiettivo e accedi direttamente alla soluzione progettata per quello."
                en="No wasted time. Pick your goal and jump to the solution designed for it."
              />
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {goalsPreview.map((g) => (
              <GoalCard key={g.number} number={g.number} title={g.title} desc={g.desc} href={g.href} />
            ))}
          </div>
          <div>
            <Link
              href="/solutions"
              className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
            >
              <Bilingual en="See all objectives" it="Vedi tutti gli obiettivi" />
            </Link>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
              <Bilingual it='Vendiamo risultati, non "servizi separati"' en='We sell outcomes, not "separate services"' />
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
              <Bilingual
                it="Ogni modulo funziona da solo, ma è progettato per integrarsi con gli altri. Nessun lock-in: lo scopo è un sistema che sai usare."
                en="Each module works standalone, but it’s designed to integrate with the rest. No lock-in: the goal is a system your team can run."
              />
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {modules.map((m) => (
              <ModuleCard key={m.title.en} title={m.title} desc={m.desc} bullets={m.bullets} />
            ))}
          </div>
          <div>
            <Link
              href="/solutions"
              className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
            >
              <Bilingual en="Pick the right module" it="Scegli il modulo giusto" />
            </Link>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="muted">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
              <Bilingual it="Da confusione a sistema in 3 step" en="From chaos to a system in 3 steps" />
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
              <Bilingual
                it="Questo è il processo reale: tempi concreti e deliverable tangibili."
                en="A real process: concrete timelines and tangible deliverables."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual it="Diagnosi (7 giorni)" en="Diagnose (7 days)" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  it="Analisi di funnel, tracking, messaggi e colli di bottiglia. Output: audit + azioni."
                  en="Audit funnel, tracking, messaging, bottlenecks. Output: audit + actions."
                />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual it="Build (14–30 giorni)" en="Build (14–30 days)" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  it="Implementazione: sito/landing, CRM, automazioni, AI. Tutto tracciato."
                  en="Implementation: site/landing, CRM, automations, AI. Fully tracked."
                />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual it="Scale (mensile)" en="Scale (monthly)" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  it="Ottimizzazione, A/B test, automazioni e miglioramenti guidati dai KPI."
                  en="Optimization, A/B tests, automation, KPI-driven improvements."
                />
              </div>
            </div>
          </div>

          <div>
            <Link
              href="/process"
              className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
            >
              <Bilingual en="See the full process" it="Vedi il processo" />
            </Link>
          </div>
        </div>
      </SectionBand>
    </div>
  );
}
