import Link from "next/link";
import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";
import Bilingual from "@/components/Bilingual";

export default function FoodRetailPage() {
  return (
    <PageShell
      kicker={<Bilingual it="Soluzioni Food / Retail" en="Food / retail solutions" />}
      title={<Bilingual it="Meno code, meno errori, più throughput" en="Shorter queues, fewer mistakes, higher throughput" />}
      subtitle={
        <Bilingual
          it="Flussi intelligenti che riducono le code, aumentano lo scontrino medio e migliorano l’efficienza in store."
          en="Smart flows that reduce queues, increase average order value, and improve in-store efficiency."
        />
      }
      primaryCta={{
        href: "/contact",
        label: <Bilingual it="Richiedi demo kiosk" en="Request kiosk demo" />,
      }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          title={<Bilingual it="Casi d’uso" en="Use cases" />}
          bullets={[
            <Bilingual
              key="1"
              it="Ordering in-store (kiosk/totem) con integrazione operativa"
              en="In-store ordering (kiosk) integrated with operations"
            />,
            <Bilingual
              key="2"
              it="Riduzione code e gestione picchi (rush hour)"
              en="Queue reduction and peak-hour handling"
            />,
            <Bilingual
              key="3"
              it="Upsell guidato e riduzione errori in cassa"
              en="Guided upsell and fewer cashier/order errors"
            />,
          ]}
        />
        <Card
          title={<Bilingual it="Per chi è" en="Who it’s for" />}
          bullets={[
            <Bilingual
              key="1"
              it="Ristoranti e fast food con volumi e code"
              en="Restaurants and fast food with volume and queues"
            />,
            <Bilingual
              key="2"
              it="Retail con catalogo e processi ripetibili"
              en="Retail with catalog and repeatable flows"
            />,
            <Bilingual
              key="3"
              it="Team che vogliono efficienza operativa misurabile"
              en="Teams that want measurable operational efficiency"
            />,
          ]}
        />
        <Card
          title={<Bilingual it="Non è per" en="Not for" />}
          bullets={[
            <Bilingual
              key="1"
              it="Solo “UI bella” senza integrazione con operazioni"
              en="“Pretty UI” without operational integration"
            />,
            <Bilingual
              key="2"
              it="Progetti senza owner in store (operazioni)"
              en="Projects with no in-store operations owner"
            />,
            <Bilingual
              key="3"
              it="Flussi non standardizzabili o menu/dati non disponibili"
              en="Non-standardizable flows or missing menu/data"
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
                it="Mappa flussi ordering: step, varianti, eccezioni"
                en="Ordering flow map: steps, variants, exceptions"
              />,
              <Bilingual
                key="2"
                it="Setup kiosk/totem + handoff operativo (cassa, cucina, ritiro)"
                en="Kiosk setup + operational handoff (POS, kitchen, pickup)"
              />,
              <Bilingual
                key="3"
                it="Report essenziale: tempi, errori, AOV, adozione"
                en="Essential reporting: time, errors, AOV, adoption"
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

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link
          href="/solutions/food-retail/ordering-kiosk"
          className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 text-sm font-semibold text-[var(--color-navy)] hover:border-black/10"
        >
          <Bilingual it="Kiosk ordini →" en="Ordering kiosk →" />
        </Link>
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
