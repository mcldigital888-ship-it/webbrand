import Link from "next/link";
import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";
import Bilingual from "@/components/Bilingual";

const sub = [
  {
    href: "/solutions/ai-automation/assistants",
    label: <Bilingual it="Assistenti" en="Assistants" />,
  },
  {
    href: "/solutions/ai-automation/automations",
    label: <Bilingual it="Automazioni" en="Automations" />,
  },
  {
    href: "/solutions/ai-automation/ai-apps",
    label: <Bilingual it="App AI" en="AI apps" />,
  },
];

export default function AiAutomationPage() {
  return (
    <PageShell
      kicker={<Bilingual it="AI & automazione" en="AI & automation" />}
      title={
        <Bilingual
          it="Meno lavoro manuale. Più output operativo."
          en="Less manual work. More operational output."
        />
      }
      subtitle={
        <Bilingual
          it="L’AI è utile solo quando si collega ai tuoi workflow. Forniamo assistant, automazioni e app AI con risultati misurabili."
          en="AI is only useful when it connects to your workflows. We deliver assistants, automations, and AI apps that drive measurable outcomes."
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
              it="Qualifica lead e routing automatico (CRM)"
              en="Lead qualification and automatic routing (CRM)"
            />,
            <Bilingual
              key="2"
              it="Supporto e operations: risposte più rapide, meno backlog"
              en="Support and ops: faster responses, less backlog"
            />,
            <Bilingual
              key="3"
              it="Task ripetitivi: raccolta dati, report, e aggiornamenti"
              en="Repetitive tasks: data capture, reporting, and updates"
            />,
          ]}
        />
        <Card
          title={<Bilingual it="Per chi è" en="Who it’s for" />}
          bullets={[
            <Bilingual
              key="1"
              it="Team operativi con colli di bottiglia ricorrenti"
              en="Ops-heavy teams with recurring bottlenecks"
            />,
            <Bilingual
              key="2"
              it="Aziende con processi ripetibili e dati minimi disponibili"
              en="Businesses with repeatable processes and at least basic data"
            />,
            <Bilingual
              key="3"
              it="Team che vogliono output misurabile (tempo, qualità, costi)"
              en="Teams that want measurable output (time, quality, cost)"
            />,
          ]}
        />
        <Card
          title={<Bilingual it="Non è per" en="Not for" />}
          bullets={[
            <Bilingual
              key="1"
              it="“AI per marketing”: demo senza utilizzo reale"
              en="“AI for marketing”: demos with no real adoption"
            />,
            <Bilingual
              key="2"
              it="Progetti senza owner e senza workflow da seguire"
              en="Projects with no owner and no workflow discipline"
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
                it="Mappa automazioni: trigger → azione → output (con ownership)"
                en="Automation map: trigger → action → output (with ownership)"
              />,
              <Bilingual
                key="2"
                it="Specifica tecnica: tool, permessi, dati, log e fallback"
                en="Technical spec: tools, permissions, data, logs, and fallback"
              />,
              <Bilingual
                key="3"
                it="Setup di base per misurare output (tempo risparmiato, SLA, qualità)"
                en="Baseline setup to measure output (time saved, SLA, quality)"
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
