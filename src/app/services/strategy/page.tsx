import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import CTASection from "@/components/CTASection";
import Bilingual from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "Strategy & Consulting",
  description:
    "Brand, growth and go-to-market strategies built on data and insight.",
  openGraph: {
    title: "Strategy & Consulting | Webrrand",
    description:
      "Brand, growth and go-to-market strategies built on data and insight.",
    type: "website",
  },
};

const whatWeDo = [
  {
    en: "Brand and go-to-market strategy",
    it: "Strategia di brand e go-to-market",
  },
  { en: "Positioning and messaging map", it: "Posizionamento e mappa messaggi" },
  { en: "Channel focus and prioritization", it: "Priorità canali e focus" },
  { en: "Experiment roadmap", it: "Roadmap esperimenti" },
  { en: "KPI scorecard", it: "Scorecard KPI" },
];

export default function StrategyServicePage() {
  return (
    <PageShell
      kicker={<Bilingual en="Services" it="Servizi" />}
      title={<Bilingual en="Strategy & Consulting" it="Strategia & consulenza" />}
      subtitle={
        <Bilingual
          en="Outcome: What to build, where to compete, and how to grow."
          it="Risultato: cosa costruire, dove competere e come crescere."
        />
      }
      primaryCta={{ href: "/contact", label: <Bilingual en="Book a Call" it="Prenota una call" /> }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
            <Bilingual en="What we do" it="Cosa facciamo" />
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-slate)]">
            {whatWeDo.map((b) => (
              <li key={b.en} className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>
                  <Bilingual en={b.en} it={b.it} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
            <Bilingual en="How it creates impact" it="Come crea impatto" />
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3">
            <ImpactBlock
              title={<Bilingual en="Problem" it="Problema" />}
              text={
                <Bilingual
                  en="Growth efforts feel scattered and hard to measure."
                  it="Gli sforzi di crescita sono frammentati e difficili da misurare."
                />
              }
            />
            <ImpactBlock
              title={<Bilingual en="Solution" it="Soluzione" />}
              text={
                <Bilingual
                  en="We define the signal: positioning, channels, and a clear execution plan."
                  it="Definiamo il segnale: posizionamento, canali e un piano di esecuzione chiaro."
                />
              }
            />
            <ImpactBlock
              title={<Bilingual en="Result" it="Risultato" />}
              text={
                <Bilingual
                  en="Faster decisions, cleaner priorities, measurable progress."
                  it="Decisioni più rapide, priorità più chiare, progresso misurabile."
                />
              }
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
              <Bilingual en="Related products" it="Prodotti correlati" />
            </h2>
            <p className="text-sm leading-6 text-[var(--color-slate)]">
              <Bilingual
                en="Start with a productized sprint for faster results."
                it="Inizia con uno sprint productized per risultati più rapidi."
              />
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/services#brand-launch"
              className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
            >
              <Bilingual en="Brand Launch →" it="Lancio brand →" />
            </Link>
            <Link
              href="/services#growth-sprint"
              className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
            >
              <Bilingual en="Growth Sprint →" it="Sprint di crescita →" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title={<Bilingual en="Ready to build a strategy that ships?" it="Pronto a costruire una strategia che funziona?" />}
        subtitle={<Bilingual en="We’ll turn your goals into a clear plan and measurable next steps." it="Trasformiamo i tuoi obiettivi in un piano chiaro e step misurabili." />}
        primary={{ href: "/contact", label: <Bilingual en="Book a Call" it="Prenota una call" /> }}
      />
    </PageShell>
  );
}

function ImpactBlock({
  title,
  text,
}: {
  title: React.ReactNode;
  text: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5">
      <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
        {title}
      </div>
      <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">{text}</div>
    </div>
  );
}
