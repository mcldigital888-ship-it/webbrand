import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";

export default function AiAppsPage() {
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
          Micro-app AI costruite su un workflow
          <br />
          Small AI apps built around one workflow
        </>
      }
      subtitle={
        <>
          Funzionalità AI che le persone usano davvero—costruite attorno a un obiettivo.
          <br />
          AI features users actually adopt—built around one job to be done.
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
              Ricerca AI su documenti interni
              <br />
              AI search for internal docs
            </>,
            <>
              Generatore preventivi (quote)
              <br />
              Quote generator
            </>,
            <>
              Classificatore lead e suggerimenti next step
              <br />
              Lead classifier and next-step suggestions
            </>,
            <>
              UI di supporto operativo (ops helper)
              <br />
              Ops helper UI
            </>,
          ]}
        />
        <Card
          title="Per chi è / Who it’s for"
          bullets={[
            <>
              Team che vogliono velocità e consistenza
              <br />
              Teams needing speed + consistency
            </>,
            <>
              Aziende con decisioni ripetibili
              <br />
              Businesses with repeatable decisions
            </>,
            <>
              Aziende con dati strutturati (o facilmente strutturabili)
              <br />
              Companies collecting structured (or structurable) data
            </>,
          ]}
        />
        <Card
          title="Non è per / Not for"
          bullets={[
            <>
              Ownership non chiara
              <br />
              Unclear ownership
            </>,
            <>
              Nessun dato o nessun processo
              <br />
              No data or no process
            </>,
            <>
              AI come gimmick (senza adozione)
              <br />
              AI as a gimmick (no adoption)
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
                Specifica del workflow: input, output, regole
                <br />
                Workflow spec: inputs, outputs, rules
              </>,
              <>
                UI minima per uso reale (non solo API)
                <br />
                Minimal UI for real usage (not just an API)
              </>,
              <>
                Logging e metriche di adozione/qualità
                <br />
                Logging and adoption/quality metrics
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
