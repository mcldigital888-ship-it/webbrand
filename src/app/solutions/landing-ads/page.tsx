import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";

export default function LandingAdsPage() {
  return (
    <PageShell
      kicker={
        <>
          Landing per ads
          <br />
          Ads landing page
        </>
      }
      title={
        <>
          Una pagina, un obiettivo: lead
          <br />
          One page, one goal: leads
        </>
      }
      subtitle={
        <>
          Una landing non è un mini-sito. È una macchina di conversione costruita per
          un’unica azione.
          <br />
          A landing page is not a mini-website. It’s a conversion machine built for one action.
        </>
      }
      primaryCta={{
        href: "/contact",
        label: (
          <>
            Richiedi Landing
            <br />
            Request Landing
          </>
        ),
      }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          title="Casi d’uso / Use cases"
          bullets={[
            <>
              Campagne a pagamento (Meta/Google) con message match
              <br />
              Paid campaigns (Meta/Google) with message match
            </>,
            <>
              Validazione offerta con un’unica CTA
              <br />
              Offer validation with a single CTA
            </>,
            <>
              Lead capture con follow-up immediato
              <br />
              Lead capture with immediate follow-up
            </>,
          ]}
        />
        <Card
          title="Per chi è / Who it’s for"
          bullets={[
            <>
              Team con traffico paid e CPL alto
              <br />
              Teams with paid traffic and high CPL
            </>,
            <>
              Offerta chiara ma pagina dispersiva
              <br />
              Clear offer, but a scattered page
            </>,
            <>
              Bisogno di tracking e routing nel CRM
              <br />
              Need tracking and CRM routing
            </>,
          ]}
        />
        <Card
          title="Non è per / Not for"
          bullets={[
            <>
              Siti multi-sezione con molti obiettivi
              <br />
              Multi-section websites with many goals
            </>,
            <>
              Progetti senza un’offerta definita
              <br />
              Projects without a defined offer
            </>,
            <>
              Chi non vuole iterare su dati e conversioni
              <br />
              Teams unwilling to iterate on data and conversion
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
                Wireframe + struttura sezioni (headline, proof, CTA, form)
                <br />
                Wireframe + section structure (headline, proof, CTA, form)
              </>,
              <>
                Copy conversion-first (message match e obiezioni)
                <br />
                Conversion-first copy (message match + objections)
              </>,
              <>
                Form + routing verso CRM e follow-up (specifica operativa)
                <br />
                Form + routing into CRM + follow-up (operational spec)
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
