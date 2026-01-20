import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import CTASection from "@/components/CTASection";
import Bilingual from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "Performance & Growth",
  description:
    "Data-driven marketing systems focused on measurable growth.",
  openGraph: {
    title: "Performance & Growth | Webrrand",
    description:
      "Data-driven marketing systems focused on measurable growth.",
    type: "website",
  },
};

const whatWeDo = [
  { en: "Tracking plan and instrumentation", it: "Piano tracking e strumentazione" },
  { en: "Dashboard and reporting", it: "Dashboard e report" },
  { en: "Experiment design", it: "Design esperimenti" },
  { en: "Growth system optimization", it: "Ottimizzazione sistema di crescita" },
];

export default function PerformanceServicePage() {
  return (
    <PageShell
      kicker={<Bilingual en="Services" it="Servizi" />}
      title={<Bilingual en="Performance & Growth" it="Performance & crescita" />}
      subtitle={
        <Bilingual
          en="Outcome: Traffic, conversions and revenue growth."
          it="Risultato: traffico, conversioni e crescita del fatturato."
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
            {whatWeDo.map((d) => (
              <li key={d.en} className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>
                  <Bilingual en={d.en} it={d.it} />
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
              text={<Bilingual en="You can’t trust the numbers, so growth stalls." it="Non puoi fidarti dei numeri, quindi la crescita si blocca." />}
            />
            <ImpactBlock
              title={<Bilingual en="Solution" it="Soluzione" />}
              text={<Bilingual en="We fix tracking, build dashboards, and run experiments." it="Sistemiamo il tracking, costruiamo dashboard e facciamo esperimenti." />}
            />
            <ImpactBlock
              title={<Bilingual en="Result" it="Risultato" />}
              text={<Bilingual en="Clear reporting, faster learning, measurable lift." it="Report chiari, apprendimento più rapido, lift misurabile." />}
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
              <Bilingual en="Start with a growth sprint to move metrics fast." it="Inizia con uno sprint di crescita per muovere le metriche velocemente." />
            </p>
          </div>
          <Link
            href="/services#growth-sprint"
            className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
          >
            <Bilingual en="Growth Sprint →" it="Sprint di crescita →" />
          </Link>
        </div>
      </section>

      <CTASection
        title={<Bilingual en="Ready to optimize performance?" it="Pronto a ottimizzare le performance?" />}
        subtitle={<Bilingual en="We build the system behind measurable growth." it="Costruiamo il sistema dietro la crescita misurabile." />}
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
