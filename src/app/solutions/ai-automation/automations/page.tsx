import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";

export default function AiAutomationsPage() {
  return (
    <PageShell
      kicker={
        <>
          AI & automazione
          <br />
          AI & automation
        </>
      }
      title={
        <>
          Automazioni che riducono ritardi e lead persi
          <br />
          Automations that reduce delays and lost leads
        </>
      }
      subtitle={
        <>
          Automazioni che riducono ritardi e impediscono ai lead di perdersi.
          <br />
          Automations that reduce delays and keep leads from slipping.
        </>
      }
      primaryCta={{
        href: "/contact",
        label: (
          <>
            Richiedi demo AI
            <br />
            Request AI demo
          </>
        ),
      }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          title="Casi d’uso / Use cases"
          bullets={[
            <>
              Routing lead immediato (form → owner)
              <br />
              Instant lead routing (form → owner)
            </>,
            <>
              Follow-up in pochi minuti (task/email)
              <br />
              Follow-up within minutes (tasks/email)
            </>,
            <>
              Aggiornamenti stato lead e reminder
              <br />
              Lead status updates and reminders
            </>,
            <>
              Promemoria operativi (SLA, checklist, handoff)
              <br />
              Ops reminders (SLA, checklists, handoffs)
            </>,
          ]}
        />
        <Card
          title="Per chi è / Who it’s for"
          bullets={[
            <>
              Team con tempi di risposta lenti
              <br />
              Teams with slow response times
            </>,
            <>
              Sales team con follow-up manuale
              <br />
              Sales teams doing manual follow-up
            </>,
            <>
              Aziende che vogliono esecuzione consistente
              <br />
              Businesses needing consistent execution
            </>,
          ]}
        />
        <Card
          title="Non è per / Not for"
          bullets={[
            <>
              Team senza processo minimo
              <br />
              Teams without a basic process
            </>,
            <>
              Progetti complessi senza owner
              <br />
              Complex projects with no owner
            </>,
            <>
              Automazione senza outcome misurabile
              <br />
              Automation without measurable outcome
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
                Mappa automazioni: trigger → azione → output
                <br />
                Automation map: trigger → action → output
              </>,
              <>
                Routing e regole: owner, SLA, escalation
                <br />
                Routing and rules: owner, SLA, escalation
              </>,
              <>
                Logging e controlli minimi per affidabilità
                <br />
                Basic logging and checks for reliability
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
