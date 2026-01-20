import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";
import Bilingual from "@/components/Bilingual";

export default function AiAppsPage() {
  return (
    <PageShell
      kicker={<Bilingual it="AI & automazione" en="AI & automation" />}
      title={
        <Bilingual
          it="Micro-app AI costruite su un workflow"
          en="Small AI apps built around one workflow"
        />
      }
      subtitle={
        <Bilingual
          it="Funzionalità AI che le persone usano davvero—costruite attorno a un obiettivo."
          en="AI features users actually adopt—built around one job to be done."
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
              it="Ricerca AI su documenti interni"
              en="AI search for internal docs"
            />,
            <Bilingual key="2" it="Generatore preventivi (quote)" en="Quote generator" />,
            <Bilingual
              key="3"
              it="Classificatore lead e suggerimenti next step"
              en="Lead classifier and next-step suggestions"
            />,
            <Bilingual key="4" it="UI di supporto operativo (ops helper)" en="Ops helper UI" />,
          ]}
        />
        <Card
          title={<Bilingual it="Per chi è" en="Who it’s for" />}
          bullets={[
            <Bilingual
              key="1"
              it="Team che vogliono velocità e consistenza"
              en="Teams needing speed + consistency"
            />,
            <Bilingual
              key="2"
              it="Aziende con decisioni ripetibili"
              en="Businesses with repeatable decisions"
            />,
            <Bilingual
              key="3"
              it="Aziende con dati strutturati (o facilmente strutturabili)"
              en="Companies collecting structured (or structurable) data"
            />,
          ]}
        />
        <Card
          title={<Bilingual it="Non è per" en="Not for" />}
          bullets={[
            <Bilingual key="1" it="Ownership non chiara" en="Unclear ownership" />,
            <Bilingual key="2" it="Nessun dato o nessun processo" en="No data or no process" />,
            <Bilingual key="3" it="AI come gimmick (senza adozione)" en="AI as a gimmick (no adoption)" />,
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
                it="Specifica del workflow: input, output, regole"
                en="Workflow spec: inputs, outputs, rules"
              />,
              <Bilingual
                key="2"
                it="UI minima per uso reale (non solo API)"
                en="Minimal UI for real usage (not just an API)"
              />,
              <Bilingual
                key="3"
                it="Logging e metriche di adozione/qualità"
                en="Logging and adoption/quality metrics"
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
