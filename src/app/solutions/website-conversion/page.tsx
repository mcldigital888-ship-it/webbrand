import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";

export default function WebsiteConversionPage() {
  return (
    <PageShell
      kicker={
        <>
          Conversione sito
          <br />
          Website conversion
        </>
      }
      title={
        <>
          Trasforma traffico in lead qualificati
          <br />
          Turn traffic into qualified leads
        </>
      }
      subtitle={
        <>
          Se hai già traffico ma la conversione è bassa, non serve un redesign: serve un
          sistema di conversione.
          <br />
          If you already have traffic but conversion is weak, you don’t need a redesign—you
          need a conversion system.
        </>
      }
      primaryCta={{
        href: "/contact",
        label: (
          <>
            Richiedi Web Audit
            <br />
            Request Web Audit
          </>
        ),
      }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          title="Casi d’uso / Use cases"
          bullets={[
            <>
              Homepage + pagina servizio che non converte
              <br />
              Homepage + service page that doesn’t convert
            </>,
            <>
              Traffico ads → sito ma pochi contatti
              <br />
              Ads traffic → website but low enquiries
            </>,
            <>
              Form e CTA presenti ma senza tracking e ownership
              <br />
              Forms and CTAs exist but no tracking or ownership
            </>,
          ]}
        />
        <Card
          title="Per chi è / Who it’s for"
          bullets={[
            <>
              Team B2B con traffico e bassa conversione
              <br />
              B2B teams with traffic and weak conversion
            </>,
            <>
              Aziende service con offerta poco chiara
              <br />
              Service businesses with an unclear offer
            </>,
            <>
              Team senza funnel, senza tracking, senza prossime azioni
              <br />
              Teams without funnel, tracking, or clear next actions
            </>,
          ]}
        />
        <Card
          title="Non è per / Not for"
          bullets={[
            <>
              Rebrand estetico senza obiettivi misurabili
              <br />
              Aesthetic rebrand with no measurable targets
            </>,
            <>
              Progetti senza ownership interna
              <br />
              Projects with no internal owner
            </>,
            <>
              Chi non vuole misurare (eventi, lead, pipeline)
              <br />
              Teams unwilling to measure (events, leads, pipeline)
            </>,
          ]}
        />
      </section>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8">
        <div className="space-y-3">
          <div className="text-sm font-semibold text-[var(--color-navy)]">
            Cosa ricevi
            <span className="text-[var(--color-slate)]"> / </span>
            What you receive
          </div>
          <ul className="space-y-2 text-sm text-[var(--color-slate)]">
            {[
              <>
                Audit conversione + tracking (eventi, obiettivi, punti di drop)
                <br />
                Conversion + tracking audit (events, goals, drop-off points)
              </>,
              <>
                Struttura pagine: sezione per sezione (headline, proof, CTA, form)
                <br />
                Page structure: section-by-section (headline, proof, CTA, form)
              </>,
              <>
                Piano di implementazione: priorità, ownership, e next steps
                <br />
                Implementation plan: priorities, ownership, and next steps
              </>,
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

function Card({ title, bullets }: { title: string; bullets: ReactNode[] }) {
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
