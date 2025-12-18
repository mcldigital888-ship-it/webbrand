import Link from "next/link";
import Bilingual from "@/components/Bilingual";

export default function CaseStudiesPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="text-sm font-semibold tracking-wide text-[var(--color-cyan)]">
          Case studies
          <span className="text-[var(--color-slate)]"> / </span>
          Risultati
        </div>
        <h1 className="max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-6xl">
          <Bilingual it="Risultati reali. Non case study inventati." en="Real results. Not invented case studies." />
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
          <Bilingual
            it="Ogni case include numeri, problema, soluzione e risultati misurati. Zero fuffa: solo dati verificabili."
            en="Each case includes numbers, the problem, what we built, and measured outcomes. Zero fluff: only verifiable data."
          />
        </p>
      </header>

      <section className="rounded-3xl border border-black/5 bg-[var(--color-surface)] p-6 sm:p-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Metric value="127%" it="Aumento lead qualificati" en="More qualified leads" />
          <Metric value="43%" it="Riduzione ciclo vendita" en="Sales cycle reduction" />
          <Metric value="+18%" it="Scontrino medio" en="Average order value" />
          <Metric value="64%" it="Riduzione no-show" en="No-show reduction" />
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-[var(--color-background)] p-6 sm:p-8">
        <div className="space-y-6">
          <div className="text-sm font-semibold text-[var(--color-navy)]">
            <Bilingual it="Case selezionati per settore" en="Selected cases by sector" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <CaseCard
              sectorIt="Food"
              sectorEn="Food"
              titleIt="Catena Fast Casual (8 sedi)"
              titleEn="Fast casual chain (8 locations)"
              problemIt="Code lunghe, errori ordine, nessun dato cliente, marketing generico."
              problemEn="Long queues, order errors, no customer data, generic marketing."
              solutionIt="Totem ordinazione + menu dinamico + CRM loyalty + segmentazione clienti + automation coupon."
              solutionEn="Ordering kiosk + dynamic menu + CRM loyalty + segmentation + automated coupons."
              resultIt="6 mesi: tempo ordine -35%, errori -78%, ritorno clienti 30gg +41%, email open rate 34% (vs 18%)."
              resultEn="6 months: order time -35%, errors -78%, 30-day return +41%, email open rate 34% (vs 18%)."
            />

            <CaseCard
              sectorIt="B2B"
              sectorEn="B2B"
              titleIt="Software House (12 persone)"
              titleEn="Software house (12 people)"
              problemIt="Lead dispersi tra canali, follow-up inconsistente, forecast vendite imprecise."
              problemEn="Leads scattered across channels, inconsistent follow-up, inaccurate sales forecast."
              solutionIt="HubSpot CRM custom + pipeline 8 stadi + scoring automatico + 15 workflow automazioni + dashboard forecast."
              solutionEn="Custom HubSpot CRM + 8-stage pipeline + automatic scoring + 15 automation workflows + forecast dashboard."
              resultIt="90 giorni: lead persi -83%, demo show rate +29%, close rate +22%, forecast accuracy 91%."
              resultEn="90 days: lost leads -83%, demo show rate +29%, close rate +22%, forecast accuracy 91%."
            />

            <CaseCard
              sectorIt="Retail"
              sectorEn="Retail"
              titleIt="Concept Store Fashion"
              titleEn="Fashion concept store"
              problemIt="Traffico alto ma conversione bassa, carrelli abbandonati, nessun retargeting."
              problemEn="High traffic but low conversion, abandoned carts, no retargeting."
              solutionIt="Redesign sito conversion-first + checkout ottimizzato + retargeting Facebook + email automation."
              solutionEn="Conversion-first redesign + optimized checkout + Facebook retargeting + email automation."
              resultIt="4 mesi: conversion rate +58%, abandonment -31%, revenue da retargeting +23%."
              resultEn="4 months: conversion rate +58%, abandonment -31%, retargeting revenue +23%."
            />

            <CaseCard
              sectorIt="Servizi"
              sectorEn="Services"
              titleIt="Studio Commercialista"
              titleEn="Accounting firm"
              problemIt="Acquisizione clienti solo passaparola, nessuna presenza online, booking caotico."
              problemEn="Client acquisition only via referrals, no online presence, chaotic booking."
              solutionIt="Sito professionale + blog + CRM con pipeline + automazione referral + sistema booking."
              solutionEn="Professional website + blog + CRM pipeline + referral automation + booking system."
              resultIt="12 mesi: nuovi clienti +89%, 34% da organic search, referral rate +56%, utilizzo agenda +41%."
              resultEn="12 months: new clients +89%, 34% from organic search, referral rate +56%, calendar usage +41%."
            />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-[var(--color-surface)] p-6 sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-[var(--color-navy)]">
              <Bilingual it="Vuoi un case per il tuo caso?" en="Want a case study for your exact situation?" />
            </div>
            <div className="text-sm leading-6 text-[var(--color-slate)]">
              <Bilingual
                it="Dimmi obiettivo e contesto. Ti rispondiamo con un esempio rilevante."
                en="Share your goal and context. We’ll reply with a relevant example."
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/oracolo"
              className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
            >
              <Bilingual it="Richiedi demo sul tuo caso" en="Request a demo for your case" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
            >
              <Bilingual it="Vedi soluzione correlata" en="See the related solution" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({
  value,
  it,
  en,
}: {
  value: string;
  it: string;
  en: string;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <div className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
        {value}
      </div>
      <div className="mt-1 text-sm font-medium text-[var(--color-slate)]">
        <Bilingual it={it} en={en} />
      </div>
    </div>
  );
}

function CaseCard({
  sectorIt,
  sectorEn,
  titleIt,
  titleEn,
  problemIt,
  problemEn,
  solutionIt,
  solutionEn,
  resultIt,
  resultEn,
}: {
  sectorIt: string;
  sectorEn: string;
  titleIt: string;
  titleEn: string;
  problemIt: string;
  problemEn: string;
  solutionIt: string;
  solutionEn: string;
  resultIt: string;
  resultEn: string;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <div className="space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
          {sectorIt}
          <span className="text-[var(--color-slate)]"> / </span>
          {sectorEn}
        </div>
        <div className="text-base font-semibold text-[var(--color-navy)]">
          {titleIt}
          <span className="text-[var(--color-slate)]"> / </span>
          {titleEn}
        </div>

        <div className="space-y-3 text-sm leading-6 text-[var(--color-slate)]">
          <div>
            <span className="font-semibold text-[var(--color-navy)]">Problem:</span> {problemIt}
            <span className="text-[var(--color-slate)]"> / </span>
            {problemEn}
          </div>
          <div>
            <span className="font-semibold text-[var(--color-navy)]">Solution:</span> {solutionIt}
            <span className="text-[var(--color-slate)]"> / </span>
            {solutionEn}
          </div>
          <div>
            <span className="font-semibold text-[var(--color-navy)]">Result:</span> {resultIt}
            <span className="text-[var(--color-slate)]"> / </span>
            {resultEn}
          </div>
        </div>
      </div>
    </div>
  );
}
