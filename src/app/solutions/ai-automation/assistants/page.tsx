import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";

export default function AiAssistantsPage() {
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
          Assistenti AI per task ripetitivi
          <br />
          AI assistants for repetitive tasks
        </>
      }
      subtitle={
        <>
          Assistenti che riducono i tempi di risposta e tolgono lavoro ripetitivo.
          <br />
          Assistants that reduce response time and remove repetitive work.
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
              Qualifica lead e routing
              <br />
              Lead qualification and routing
            </>,
            <>
              FAQ e supporto (riduzione tempi risposta)
              <br />
              FAQ and support (faster response)
            </>,
            <>
              Knowledge interno (ricerca e sintesi)
              <br />
              Internal knowledge (search and synthesis)
            </>,
            <>
              Supporto follow-up vendite
              <br />
              Sales follow-up support
            </>,
          ]}
        />
        <Card
          title="Per chi è / Who it’s for"
          bullets={[
            <>
              Team con domande ricorrenti e backlog
              <br />
              Teams with recurring questions and backlog
            </>,
            <>
              Aziende che vogliono tempi di risposta più rapidi
              <br />
              Businesses needing faster replies
            </>,
            <>
              Workflow operativi con passaggi ripetitivi
              <br />
              Ops-heavy workflows with repetitive steps
            </>,
          ]}
        />
        <Card
          title="Non è per / Not for"
          bullets={[
            <>
              Esperimenti one-off senza ownership
              <br />
              One-off experiments without ownership
            </>,
            <>
              Team che non vogliono seguire un processo minimo
              <br />
              Teams unwilling to follow a simple process
            </>,
            <>
              Casi che richiedono zero supervisione umana
              <br />
              Use cases requiring zero human oversight
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
                Definizione input/output e criteri di qualità
                <br />
                Input/output definition and quality criteria
              </>,
              <>
                Setup workflow + handoff (quando escalare a umano)
                <br />
                Workflow setup + handoff (when to escalate to a human)
              </>,
              <>
                Logging minimo e misurazione (tempo risparmiato, SLA)
                <br />
                Basic logging and measurement (time saved, SLA)
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
