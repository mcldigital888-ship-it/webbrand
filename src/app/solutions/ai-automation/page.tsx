import Link from "next/link";
import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";

const sub = [
  {
    href: "/solutions/ai-automation/assistants",
    label: (
      <>
        Assistenti
        <br />
        Assistants
      </>
    ),
  },
  {
    href: "/solutions/ai-automation/automations",
    label: (
      <>
        Automazioni
        <br />
        Automations
      </>
    ),
  },
  {
    href: "/solutions/ai-automation/ai-apps",
    label: (
      <>
        App AI
        <br />
        AI apps
      </>
    ),
  },
];

export default function AiAutomationPage() {
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
          Meno lavoro manuale. Più output operativo.
          <br />
          Less manual work. More operational output.
        </>
      }
      subtitle={
        <>
          L’AI è utile solo quando si collega ai tuoi workflow. Forniamo assistant,
          automazioni e app AI con risultati misurabili.
          <br />
          AI is only useful when it connects to your workflows. We deliver assistants, automations,
          and AI apps that drive measurable outcomes.
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
              Qualifica lead e routing automatico (CRM)
              <br />
              Lead qualification and automatic routing (CRM)
            </>,
            <>
              Supporto e operations: risposte più rapide, meno backlog
              <br />
              Support and ops: faster responses, less backlog
            </>,
            <>
              Task ripetitivi: raccolta dati, report, e aggiornamenti
              <br />
              Repetitive tasks: data capture, reporting, and updates
            </>,
          ]}
        />
        <Card
          title="Per chi è / Who it’s for"
          bullets={[
            <>
              Team operativi con colli di bottiglia ricorrenti
              <br />
              Ops-heavy teams with recurring bottlenecks
            </>,
            <>
              Aziende con processi ripetibili e dati minimi disponibili
              <br />
              Businesses with repeatable processes and at least basic data
            </>,
            <>
              Team che vogliono output misurabile (tempo, qualità, costi)
              <br />
              Teams that want measurable output (time, quality, cost)
            </>,
          ]}
        />
        <Card
          title="Non è per / Not for"
          bullets={[
            <>
              “AI per marketing”: demo senza utilizzo reale
              <br />
              “AI for marketing”: demos with no real adoption
            </>,
            <>
              Progetti senza owner e senza workflow da seguire
              <br />
              Projects with no owner and no workflow discipline
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
                Mappa automazioni: trigger → azione → output (con ownership)
                <br />
                Automation map: trigger → action → output (with ownership)
              </>,
              <>
                Specifica tecnica: tool, permessi, dati, log e fallback
                <br />
                Technical spec: tools, permissions, data, logs, and fallback
              </>,
              <>
                Setup di base per misurare output (tempo risparmiato, SLA, qualità)
                <br />
                Baseline setup to measure output (time saved, SLA, quality)
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

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {sub.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 text-sm font-semibold text-[var(--color-navy)] hover:border-black/10"
          >
            {s.label}
          </Link>
        ))}
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
