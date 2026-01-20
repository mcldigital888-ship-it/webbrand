import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";
import Bilingual from "@/components/Bilingual";

export default function CrmSalesPage() {
  return (
    <PageShell
      kicker={<Bilingual it="CRM & vendite" en="CRM & sales" />}
      title={
        <Bilingual
          it="Pipeline chiara, follow-up automatico, deal tracciati"
          en="Clear pipeline, automated follow-up, tracked deals"
        />
      }
      subtitle={
        <Bilingual
          it="Un CRM non è un software. È un processo di vendita con automazione, visibilità e prossime azioni."
          en="A CRM is not software. It’s a sales process with automation, visibility, and next actions."
        />
      }
      primaryCta={{
        href: "/contact",
        label: <Bilingual it="Richiedi audit CRM" en="Request CRM audit" />,
      }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          title={<Bilingual it="Casi d’uso" en="Use cases" />}
          bullets={[
            <Bilingual
              key="1"
              it="Lead che si perdono tra inbox, WhatsApp e fogli Excel"
              en="Leads getting lost across inbox, WhatsApp, and spreadsheets"
            />,
            <Bilingual
              key="2"
              it="Nessuna pipeline reale: nessuno sa lo stato dei deal"
              en="No real pipeline: nobody knows deal status"
            />,
            <Bilingual
              key="3"
              it="Follow-up manuale e lento (ore/giorni)"
              en="Manual, slow follow-up (hours/days)"
            />,
          ]}
        />
        <Card
          title={<Bilingual it="Per chi è" en="Who it’s for" />}
          bullets={[
            <Bilingual
              key="1"
              it="Team commerciali che vogliono stage e next action"
              en="Sales teams that need stages and next actions"
            />,
            <Bilingual
              key="2"
              it="Aziende che qualificano lead e gestiscono trattative"
              en="Businesses qualifying leads and running a deal cycle"
            />,
            <Bilingual
              key="3"
              it="Team che vogliono report e ownership per canale"
              en="Teams needing reporting and channel ownership"
            />,
          ]}
        />
        <Card
          title={<Bilingual it="Non è per" en="Not for" />}
          bullets={[
            <Bilingual
              key="1"
              it="Tool “installato” ma senza processo e disciplina"
              en="Installing a tool without process and discipline"
            />,
            <Bilingual
              key="2"
              it="Progetti senza owner interno (vendite/ops)"
              en="Projects with no internal owner (sales/ops)"
            />,
            <Bilingual
              key="3"
              it="Chi non vuole standardizzare stage e criteri"
              en="Teams unwilling to standardize stages and criteria"
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
                it="Disegno pipeline: stage, criteri, SLA e next action"
                en="Pipeline design: stages, criteria, SLAs, and next actions"
              />,
              <Bilingual
                key="2"
                it="Routing lead → owner + task + reminder"
                en="Lead routing → owner + task + reminder"
              />,
              <Bilingual
                key="3"
                it="Dashboard essenziale: lead, meeting, deal e conversioni per canale"
                en="Essential dashboard: leads, meetings, deals, and channel conversion"
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
