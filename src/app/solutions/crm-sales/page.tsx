import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";

export default function CrmSalesPage() {
  return (
    <PageShell
      kicker={
        <>
          CRM & vendite
          <br />
          CRM & sales
        </>
      }
      title={
        <>
          Pipeline chiara, follow-up automatico, deal tracciati
          <br />
          Clear pipeline, automated follow-up, tracked deals
        </>
      }
      subtitle={
        <>
          Un CRM non è un software. È un processo di vendita con automazione,
          visibilità e prossime azioni.
          <br />
          A CRM is not software. It’s a sales process with automation, visibility, and next actions.
        </>
      }
      primaryCta={{
        href: "/contact",
        label: (
          <>
            Richiedi audit CRM
            <br />
            Request CRM audit
          </>
        ),
      }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          title="Casi d’uso / Use cases"
          bullets={[
            <>
              Lead che si perdono tra inbox, WhatsApp e fogli Excel
              <br />
              Leads getting lost across inbox, WhatsApp, and spreadsheets
            </>,
            <>
              Nessuna pipeline reale: nessuno sa lo stato dei deal
              <br />
              No real pipeline: nobody knows deal status
            </>,
            <>
              Follow-up manuale e lento (ore/giorni)
              <br />
              Manual, slow follow-up (hours/days)
            </>,
          ]}
        />
        <Card
          title="Per chi è / Who it’s for"
          bullets={[
            <>
              Team commerciali che vogliono stage e next action
              <br />
              Sales teams that need stages and next actions
            </>,
            <>
              Aziende che qualificano lead e gestiscono trattative
              <br />
              Businesses qualifying leads and running a deal cycle
            </>,
            <>
              Team che vogliono report e ownership per canale
              <br />
              Teams needing reporting and channel ownership
            </>,
          ]}
        />
        <Card
          title="Non è per / Not for"
          bullets={[
            <>
              Tool “installato” ma senza processo e disciplina
              <br />
              Installing a tool without process and discipline
            </>,
            <>
              Progetti senza owner interno (vendite/ops)
              <br />
              Projects with no internal owner (sales/ops)
            </>,
            <>
              Chi non vuole standardizzare stage e criteri
              <br />
              Teams unwilling to standardize stages and criteria
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
                Disegno pipeline: stage, criteri, SLA e next action
                <br />
                Pipeline design: stages, criteria, SLAs, and next actions
              </>,
              <>
                Routing lead → owner + task + reminder
                <br />
                Lead routing → owner + task + reminder
              </>,
              <>
                Dashboard essenziale: lead, meeting, deal e conversioni per canale
                <br />
                Essential dashboard: leads, meetings, deals, and channel conversion
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
