import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";
import Bilingual from "@/components/Bilingual";

export default function AiAutomationsPage() {
  return (
    <PageShell
      kicker={<Bilingual it="AI & automazione" en="AI & automation" />}
      title={
        <Bilingual
          it="Automazioni che riducono ritardi e lead persi"
          en="Automations that reduce delays and lost leads"
        />
      }
      subtitle={
        <Bilingual
          it="Automazioni che riducono ritardi e impediscono ai lead di perdersi."
          en="Automations that reduce delays and keep leads from slipping."
        />
      }
      primaryCta={{
        href: "/contact",
        label: <Bilingual it="Richiedi demo AI" en="Request AI demo" />,
      }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          title={<Bilingual it="Casi d’uso" en="Use cases" />}
          bullets={[
            <Bilingual
              key="1"
              it="Routing lead immediato (form → owner)"
              en="Instant lead routing (form → owner)"
            />,
            <Bilingual
              key="2"
              it="Follow-up in pochi minuti (task/email)"
              en="Follow-up within minutes (tasks/email)"
            />,
            <Bilingual
              key="3"
              it="Aggiornamenti stato lead e reminder"
              en="Lead status updates and reminders"
            />,
            <Bilingual
              key="4"
              it="Promemoria operativi (SLA, checklist, handoff)"
              en="Ops reminders (SLA, checklists, handoffs)"
            />,
          ]}
        />
        <Card
          title={<Bilingual it="Per chi è" en="Who it’s for" />}
          bullets={[
            <Bilingual
              key="1"
              it="Team con tempi di risposta lenti"
              en="Teams with slow response times"
            />,
            <Bilingual
              key="2"
              it="Sales team con follow-up manuale"
              en="Sales teams doing manual follow-up"
            />,
            <Bilingual
              key="3"
              it="Aziende che vogliono esecuzione consistente"
              en="Businesses needing consistent execution"
            />,
          ]}
        />
        <Card
          title={<Bilingual it="Non è per" en="Not for" />}
          bullets={[
            <Bilingual
              key="1"
              it="Team senza processo minimo"
              en="Teams without a basic process"
            />,
            <Bilingual
              key="2"
              it="Progetti complessi senza owner"
              en="Complex projects with no owner"
            />,
            <Bilingual
              key="3"
              it="Automazione senza outcome misurabile"
              en="Automation without measurable outcome"
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
                it="Mappa automazioni: trigger → azione → output"
                en="Automation map: trigger → action → output"
              />,
              <Bilingual
                key="2"
                it="Routing e regole: owner, SLA, escalation"
                en="Routing and rules: owner, SLA, escalation"
              />,
              <Bilingual
                key="3"
                it="Logging e controlli minimi per affidabilità"
                en="Basic logging and checks for reliability"
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
