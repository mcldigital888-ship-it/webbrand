import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";
import Bilingual from "@/components/Bilingual";

export default function LandingAdsPage() {
  return (
    <PageShell
      kicker={<Bilingual it="Landing per ads" en="Ads landing page" />}
      title={<Bilingual it="Una pagina, un obiettivo: lead" en="One page, one goal: leads" />}
      subtitle={
        <Bilingual
          it="Una landing non è un mini-sito. È una macchina di conversione costruita per un’unica azione."
          en="A landing page is not a mini-website. It’s a conversion machine built for one action."
        />
      }
      primaryCta={{
        href: "/contact",
        label: <Bilingual it="Richiedi Landing" en="Request Landing" />,
      }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          title={<Bilingual it="Casi d’uso" en="Use cases" />}
          bullets={[
            <Bilingual
              key="1"
              it="Campagne a pagamento (Meta/Google) con message match"
              en="Paid campaigns (Meta/Google) with message match"
            />,
            <Bilingual
              key="2"
              it="Validazione offerta con un’unica CTA"
              en="Offer validation with a single CTA"
            />,
            <Bilingual
              key="3"
              it="Lead capture con follow-up immediato"
              en="Lead capture with immediate follow-up"
            />,
          ]}
        />
        <Card
          title={<Bilingual it="Per chi è" en="Who it’s for" />}
          bullets={[
            <Bilingual
              key="1"
              it="Team con traffico paid e CPL alto"
              en="Teams with paid traffic and high CPL"
            />,
            <Bilingual
              key="2"
              it="Offerta chiara ma pagina dispersiva"
              en="Clear offer, but a scattered page"
            />,
            <Bilingual
              key="3"
              it="Bisogno di tracking e routing nel CRM"
              en="Need tracking and CRM routing"
            />,
          ]}
        />
        <Card
          title={<Bilingual it="Non è per" en="Not for" />}
          bullets={[
            <Bilingual
              key="1"
              it="Siti multi-sezione con molti obiettivi"
              en="Multi-section websites with many goals"
            />,
            <Bilingual
              key="2"
              it="Progetti senza un’offerta definita"
              en="Projects without a defined offer"
            />,
            <Bilingual
              key="3"
              it="Chi non vuole iterare su dati e conversioni"
              en="Teams unwilling to iterate on data and conversion"
            />,
          ]}
        />
      </section>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8">
        <div className="space-y-3">
          <div className="text-sm font-semibold text-[var(--color-navy)]">
            <Bilingual it="Cosa ricevi" en="What you receive" />
          </div>
          <ul className="space-y-2 text-sm text-[var(--color-slate)]">
            {[
              <Bilingual
                key="1"
                it="Wireframe + struttura sezioni (headline, proof, CTA, form)"
                en="Wireframe + section structure (headline, proof, CTA, form)"
              />,
              <Bilingual
                key="2"
                it="Copy conversion-first (message match e obiezioni)"
                en="Conversion-first copy (message match + objections)"
              />,
              <Bilingual
                key="3"
                it="Form + routing verso CRM e follow-up (specifica operativa)"
                en="Form + routing into CRM + follow-up (operational spec)"
              />,
            ].map((b, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}

function Card({ title, bullets }: { title: ReactNode; bullets: ReactNode[] }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
      <div className="space-y-3">
        <div className="text-sm font-semibold text-[var(--color-navy)]">{title}</div>
        <ul className="space-y-2 text-sm text-[var(--color-slate)]">
          {bullets.map((b) => (
            <li key={String(b)} className="flex gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
