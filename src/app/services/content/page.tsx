import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import CTASection from "@/components/CTASection";
import Bilingual from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "Content & Media",
  description:
    "Content and campaigns designed to attract, engage and retain.",
  openGraph: {
    title: "Content & Media | Webrrand",
    description:
      "Content and campaigns designed to attract, engage and retain.",
    type: "website",
  },
};

const whatWeDo = [
  { en: "Content pillars and angles", it: "Pilastri e angoli contenuti" },
  { en: "Campaign concepts", it: "Concept campagne" },
  { en: "Production system", it: "Sistema di produzione" },
  { en: "Performance review", it: "Revisione performance" },
];

export default function ContentServicePage() {
  return (
    <PageShell
      kicker="Services"
      title={<Bilingual en="Content & Media" it="Contenuti & media" />}
      subtitle={
        <Bilingual
          en="Outcome: Visibility, engagement and brand relevance."
          it="Risultato: visibilità, engagement e rilevanza del brand."
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
              text={<Bilingual en="Content is inconsistent and doesn’t compound." it="I contenuti sono incoerenti e non accumulano valore." />}
            />
            <ImpactBlock
              title={<Bilingual en="Solution" it="Soluzione" />}
              text={<Bilingual en="We build a system: pillars, templates, cadence, and review." it="Costruiamo un sistema: pilastri, template, cadenza e review." />}
            />
            <ImpactBlock
              title={<Bilingual en="Result" it="Risultato" />}
              text={<Bilingual en="More visibility, better engagement, stronger relevance." it="Più visibilità, migliore engagement, maggiore rilevanza." />}
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
              <Bilingual en="Launch the system with a focused sprint." it="Lancia il sistema con uno sprint mirato." />
            </p>
          </div>
          <Link
            href="/services#brand-launch"
            className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
          >
            <Bilingual en="Brand Launch →" it="Lancio brand →" />
          </Link>
        </div>
      </section>

      <CTASection
        title={<Bilingual en="Ready to ship content that compounds?" it="Pronto a pubblicare contenuti che crescono nel tempo?" />}
        subtitle={<Bilingual en="We build the system, then keep it consistent." it="Costruiamo il sistema e lo rendiamo costante." />}
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
