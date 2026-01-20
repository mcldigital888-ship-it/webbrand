import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";
import Bilingual from "@/components/Bilingual";

export default function AiAssistantsPage() {
  return (
    <PageShell
      kicker={<Bilingual it="AI & automazione" en="AI & automation" />}
      title={
        <Bilingual
          it="Assistenti AI per task ripetitivi"
          en="AI assistants for repetitive tasks"
        />
      }
      subtitle={
        <Bilingual
          it="Assistenti che riducono i tempi di risposta e tolgono lavoro ripetitivo."
          en="Assistants that reduce response time and remove repetitive work."
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
            <Bilingual key="1" it="Qualifica lead e routing" en="Lead qualification and routing" />,
            <Bilingual
              key="2"
              it="FAQ e supporto (riduzione tempi risposta)"
              en="FAQ and support (faster response)"
            />,
            <Bilingual
              key="3"
              it="Knowledge interno (ricerca e sintesi)"
              en="Internal knowledge (search and synthesis)"
            />,
            <Bilingual key="4" it="Supporto follow-up vendite" en="Sales follow-up support" />,
          ]}
        />
        <Card
          title={<Bilingual it="Per chi è" en="Who it’s for" />}
          bullets={[
            <Bilingual
              key="1"
              it="Team con domande ricorrenti e backlog"
              en="Teams with recurring questions and backlog"
            />,
            <Bilingual
              key="2"
              it="Aziende che vogliono tempi di risposta più rapidi"
              en="Businesses needing faster replies"
            />,
            <Bilingual
              key="3"
              it="Workflow operativi con passaggi ripetitivi"
              en="Ops-heavy workflows with repetitive steps"
            />,
          ]}
        />
        <Card
          title={<Bilingual it="Non è per" en="Not for" />}
          bullets={[
            <Bilingual
              key="1"
              it="Esperimenti one-off senza ownership"
              en="One-off experiments without ownership"
            />,
            <Bilingual
              key="2"
              it="Team che non vogliono seguire un processo minimo"
              en="Teams unwilling to follow a simple process"
            />,
            <Bilingual
              key="3"
              it="Casi che richiedono zero supervisione umana"
              en="Use cases requiring zero human oversight"
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
                it="Definizione input/output e criteri di qualità"
                en="Input/output definition and quality criteria"
              />,
              <Bilingual
                key="2"
                it="Setup workflow + handoff (quando escalare a umano)"
                en="Workflow setup + handoff (when to escalate to a human)"
              />,
              <Bilingual
                key="3"
                it="Logging minimo e misurazione (tempo risparmiato, SLA)"
                en="Basic logging and measurement (time saved, SLA)"
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
