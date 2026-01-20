import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";
import Bilingual from "@/components/Bilingual";

export default function OrderingKioskPage() {
  return (
    <PageShell
      kicker={<Bilingual it="Food / Retail" en="Food / retail" />}
      title={
        <Bilingual
          it="Kiosk ordini (totem) integrato con le operazioni"
          en="Ordering kiosk integrated with operations"
        />
      }
      subtitle={
        <Bilingual
          it="Un’esperienza kiosk pensata per ridurre le code e aumentare la capacità—integrata con le tue operazioni."
          en="A kiosk experience designed to reduce queues and increase throughput—integrated with your operations."
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
              it="Ridurre code e gestire picchi"
              en="Reduce queues and handle peak hours"
            />,
            <Bilingual
              key="2"
              it="Aumentare lo scontrino medio con upsell guidato"
              en="Increase AOV with guided upsell"
            />,
            <Bilingual
              key="3"
              it="Ridurre errori ordine e carico cassa"
              en="Reduce order errors and cashier load"
            />,
          ]}
        />
        <Card
          title={<Bilingual it="Per chi è" en="Who it’s for" />}
          bullets={[
            <Bilingual
              key="1"
              it="Punti vendita con alto volume e menu strutturato"
              en="Locations with volume and a structured menu"
            />,
            <Bilingual
              key="2"
              it="Team che vogliono integrazione con cassa/cucina/ritiro"
              en="Teams needing POS/kitchen/pickup integration"
            />,
            <Bilingual
              key="3"
              it="Operazioni che vogliono metriche e miglioramento continuo"
              en="Ops teams that want metrics and continuous improvement"
            />,
          ]}
        />
        <Card
          title={<Bilingual it="Non è per" en="Not for" />}
          bullets={[
            <Bilingual
              key="1"
              it="Progetti senza owner in store"
              en="Projects with no in-store owner"
            />,
            <Bilingual
              key="2"
              it="Menu/processi non definibili o non aggiornabili"
              en="Menus/processes that can’t be defined or maintained"
            />,
            <Bilingual
              key="3"
              it="Chi cerca solo una demo senza rollout"
              en="Teams wanting a demo without rollout"
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
                it="Flusso UI kiosk: categorie, varianti, upsell, pagamento"
                en="Kiosk UI flow: categories, variants, upsell, payment"
              />,
              <Bilingual
                key="2"
                it="Setup operativo: menu, stampanti, kitchen flow, ritiro"
                en="Operational setup: menu, printers, kitchen flow, pickup"
              />,
              <Bilingual
                key="3"
                it="Piano installazione + checklist rollout"
                en="Install plan + rollout checklist"
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
