import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import CTASection from "@/components/CTASection";
import Bilingual from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "Brand & Identity",
  description:
    "Visual identity and messaging systems that define how brands look and speak.",
  openGraph: {
    title: "Brand & Identity | Webbrand",
    description:
      "Visual identity and messaging systems that define how brands look and speak.",
    type: "website",
  },
};

const whatWeDo = [
  { en: "Visual identity system", it: "Sistema di identità visiva" },
  { en: "Messaging and voice", it: "Messaggi e tone of voice" },
  { en: "Design tokens and guidelines", it: "Design token e linee guida" },
  { en: "Templates for teams", it: "Template per i team" },
];

export default function BrandServicePage() {
  return (
    <PageShell
      kicker="Services"
      title={<Bilingual en="Brand & Identity" it="Brand & identità" />}
      subtitle={
        <Bilingual
          en="Outcome: A clear, consistent and recognizable brand."
          it="Risultato: un brand chiaro, coerente e riconoscibile."
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
              text={<Bilingual en="The brand looks inconsistent and reads unclear." it="Il brand è incoerente e comunica in modo poco chiaro." />}
            />
            <ImpactBlock
              title={<Bilingual en="Solution" it="Soluzione" />}
              text={<Bilingual en="We build an identity + messaging system that stays consistent everywhere." it="Costruiamo un sistema di identità + messaggi coerente su tutti i touchpoint." />}
            />
            <ImpactBlock
              title={<Bilingual en="Result" it="Risultato" />}
              text={<Bilingual en="Clear recognition, faster content, premium perception." it="Riconoscibilità, contenuti più rapidi, percezione premium." />}
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
              <Bilingual en="Launch the new identity with a productized package." it="Lancia la nuova identità con un pacchetto productized." />
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
        title={<Bilingual en="Ready to build a sharper brand?" it="Pronto a costruire un brand più forte?" />}
        subtitle={<Bilingual en="We’ll define the system, then ship it across touchpoints." it="Definiamo il sistema e lo applichiamo su tutti i touchpoint." />}
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
