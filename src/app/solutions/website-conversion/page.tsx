import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";
import Bilingual from "@/components/Bilingual";

export default function WebsiteConversionPage() {
  return (
    <PageShell
      kicker={<Bilingual it="Conversione sito" en="Website conversion" />}
      title={<Bilingual it="Trasforma traffico in lead qualificati" en="Turn traffic into qualified leads" />}
      subtitle={
        <Bilingual
          it="Se hai già traffico ma la conversione è bassa, non serve un redesign: serve un sistema di conversione."
          en="If you already have traffic but conversion is weak, you don’t need a redesign—you need a conversion system."
        />
      }
      primaryCta={{
        href: "/contact",
        label: <Bilingual it="Richiedi Web Audit" en="Request Web Audit" />,
      }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          title={<Bilingual it="Casi d’uso" en="Use cases" />}
          bullets={[
            <Bilingual
              key="1"
              it="Homepage + pagina servizio che non converte"
              en="Homepage + service page that doesn’t convert"
            />,
            <Bilingual
              key="2"
              it="Traffico ads → sito ma pochi contatti"
              en="Ads traffic → website but low enquiries"
            />,
            <Bilingual
              key="3"
              it="Form e CTA presenti ma senza tracking e ownership"
              en="Forms and CTAs exist but no tracking or ownership"
            />,
          ]}
        />
        <Card
          title={<Bilingual it="Per chi è" en="Who it’s for" />}
          bullets={[
            <Bilingual
              key="1"
              it="Team B2B con traffico e bassa conversione"
              en="B2B teams with traffic and weak conversion"
            />,
            <Bilingual
              key="2"
              it="Aziende service con offerta poco chiara"
              en="Service businesses with an unclear offer"
            />,
            <Bilingual
              key="3"
              it="Team senza funnel, senza tracking, senza prossime azioni"
              en="Teams without funnel, tracking, or clear next actions"
            />,
          ]}
        />
        <Card
          title={<Bilingual it="Non è per" en="Not for" />}
          bullets={[
            <Bilingual
              key="1"
              it="Rebrand estetico senza obiettivi misurabili"
              en="Aesthetic rebrand with no measurable targets"
            />,
            <Bilingual
              key="2"
              it="Progetti senza ownership interna"
              en="Projects with no internal owner"
            />,
            <Bilingual
              key="3"
              it="Chi non vuole misurare (eventi, lead, pipeline)"
              en="Teams unwilling to measure (events, leads, pipeline)"
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
                it="Audit conversione + tracking (eventi, obiettivi, punti di drop)"
                en="Conversion + tracking audit (events, goals, drop-off points)"
              />,
              <Bilingual
                key="2"
                it="Struttura pagine: sezione per sezione (headline, proof, CTA, form)"
                en="Page structure: section-by-section (headline, proof, CTA, form)"
              />,
              <Bilingual
                key="3"
                it="Piano di implementazione: priorità, ownership, e next steps"
                en="Implementation plan: priorities, ownership, and next steps"
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
