import Link from "next/link";
import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";

export default function FoodRetailPage() {
  return (
    <PageShell
      kicker={
        <>
          Soluzioni Food / Retail
          <br />
          Food / retail solutions
        </>
      }
      title={
        <>
          Meno code, meno errori, più throughput
          <br />
          Shorter queues, fewer mistakes, higher throughput
        </>
      }
      subtitle={
        <>
          Flussi intelligenti che riducono le code, aumentano lo scontrino medio e
          migliorano l’efficienza in store.
          <br />
          Smart flows that reduce queues, increase average order value, and improve in-store efficiency.
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
              Ordering in-store (kiosk/totem) con integrazione operativa
              <br />
              In-store ordering (kiosk) integrated with operations
            </>,
            <>
              Riduzione code e gestione picchi (rush hour)
              <br />
              Queue reduction and peak-hour handling
            </>,
            <>
              Upsell guidato e riduzione errori in cassa
              <br />
              Guided upsell and fewer cashier/order errors
            </>,
          ]}
        />
        <Card
          title="Per chi è / Who it’s for"
          bullets={[
            <>
              Ristoranti e fast food con volumi e code
              <br />
              Restaurants and fast food with volume and queues
            </>,
            <>
              Retail con catalogo e processi ripetibili
              <br />
              Retail with catalog and repeatable flows
            </>,
            <>
              Team che vogliono efficienza operativa misurabile
              <br />
              Teams that want measurable operational efficiency
            </>,
          ]}
        />
        <Card
          title="Non è per / Not for"
          bullets={[
            <>
              Solo “UI bella” senza integrazione con operazioni
              <br />
              “Pretty UI” without operational integration
            </>,
            <>
              Progetti senza owner in store (operazioni)
              <br />
              Projects with no in-store operations owner
            </>,
            <>
              Flussi non standardizzabili o menu/dati non disponibili
              <br />
              Non-standardizable flows or missing menu/data
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
                Mappa flussi ordering: step, varianti, eccezioni
                <br />
                Ordering flow map: steps, variants, exceptions
              </>,
              <>
                Setup kiosk/totem + handoff operativo (cassa, cucina, ritiro)
                <br />
                Kiosk setup + operational handoff (POS, kitchen, pickup)
              </>,
              <>
                Report essenziale: tempi, errori, AOV, adozione
                <br />
                Essential reporting: time, errors, AOV, adoption
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

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link
          href="/solutions/food-retail/ordering-kiosk"
          className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 text-sm font-semibold text-[var(--color-navy)] hover:border-black/10"
        >
          Kiosk ordini →
          <br />
          Ordering kiosk →
        </Link>
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
