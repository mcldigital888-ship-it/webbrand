import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import CTASection from "@/components/CTASection";
import Bilingual from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "Digital Experience / Web",
  description:
    "High-performance websites and digital products designed to convert.",
  openGraph: {
    title: "Digital Experience / Web | Webrrand",
    description:
      "High-performance websites and digital products designed to convert.",
    type: "website",
  },
};

const whatWeDo = [
  { en: "UX and information architecture", it: "UX e architettura informativa" },
  { en: "UI design system", it: "Sistema UI" },
  { en: "Development and launch", it: "Sviluppo e lancio" },
  { en: "SEO-ready structure", it: "Struttura SEO-ready" },
];

export default function WebServicePage() {
  return (
    <PageShell
      kicker={<Bilingual en="Services" it="Servizi" />}
      title={<Bilingual en="Digital Experience / Web" it="Esperienza digitale / Web" />}
      subtitle={
        <Bilingual
          en="Outcome: A fast, scalable and premium digital presence."
          it="Risultato: una presenza digitale veloce, scalabile e premium."
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
              text={<Bilingual en="The website looks fine but doesn’t convert." it="Il sito sembra ok ma non converte." />}
            />
            <ImpactBlock
              title={<Bilingual en="Solution" it="Soluzione" />}
              text={<Bilingual en="We rebuild structure, messaging, and performance around action." it="Ricostruiamo struttura, messaggi e performance intorno all’azione." />}
            />
            <ImpactBlock
              title={<Bilingual en="Result" it="Risultato" />}
              text={<Bilingual en="Clearer paths, faster pages, measurable lift." it="Percorsi più chiari, pagine più veloci, lift misurabile." />}
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
              <Bilingual en="Ship faster with a productized website sprint." it="Spedisci più velocemente con uno sprint sito productized." />
            </p>
          </div>
          <Link
            href="/services#website-sprint"
            className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
          >
            <Bilingual en="Website Sprint →" it="Sprint sito web →" />
          </Link>
        </div>
      </section>

      <CTASection
        title={<Bilingual en="Ready to ship a better site?" it="Pronto a lanciare un sito migliore?" />}
        subtitle={<Bilingual en="We build the pages that turn attention into action." it="Costruiamo pagine che trasformano attenzione in azione." />}
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
