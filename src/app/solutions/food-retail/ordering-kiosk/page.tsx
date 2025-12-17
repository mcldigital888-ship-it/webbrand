import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";

export default function OrderingKioskPage() {
  return (
    <PageShell
      kicker={
        <>
          Food / Retail
          <br />
          Food / retail
        </>
      }
      title={
        <>
          Kiosk ordini (totem) integrato con le operazioni
          <br />
          Ordering kiosk integrated with operations
        </>
      }
      subtitle={
        <>
          Un’esperienza kiosk pensata per ridurre le code e aumentare la capacità—integrata
          con le tue operazioni.
          <br />
          A kiosk experience designed to reduce queues and increase throughput—integrated with your operations.
        </>
      }
      primaryCta={{
        href: "/contact",
        label: (
          <>
            Richiedi demo kiosk
            <br />
            Request kiosk demo
          </>
        ),
      }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          title="Casi d’uso / Use cases"
          bullets={[
            <>
              Ridurre code e gestire picchi
              <br />
              Reduce queues and handle peak hours
            </>,
            <>
              Aumentare lo scontrino medio con upsell guidato
              <br />
              Increase AOV with guided upsell
            </>,
            <>
              Ridurre errori ordine e carico cassa
              <br />
              Reduce order errors and cashier load
            </>,
          ]}
        />
        <Card
          title="Per chi è / Who it’s for"
          bullets={[
            <>
              Punti vendita con alto volume e menu strutturato
              <br />
              Locations with volume and a structured menu
            </>,
            <>
              Team che vogliono integrazione con cassa/cucina/ritiro
              <br />
              Teams needing POS/kitchen/pickup integration
            </>,
            <>
              Operazioni che vogliono metriche e miglioramento continuo
              <br />
              Ops teams that want metrics and continuous improvement
            </>,
          ]}
        />
        <Card
          title="Non è per / Not for"
          bullets={[
            <>
              Progetti senza owner in store
              <br />
              Projects with no in-store owner
            </>,
            <>
              Menu/processi non definibili o non aggiornabili
              <br />
              Menus/processes that can’t be defined or maintained
            </>,
            <>
              Chi cerca solo una demo senza rollout
              <br />
              Teams wanting a demo without rollout
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
                Flusso UI kiosk: categorie, varianti, upsell, pagamento
                <br />
                Kiosk UI flow: categories, variants, upsell, payment
              </>,
              <>
                Setup operativo: menu, stampanti, kitchen flow, ritiro
                <br />
                Operational setup: menu, printers, kitchen flow, pickup
              </>,
              <>
                Piano installazione + checklist rollout
                <br />
                Install plan + rollout checklist
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
