import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";
import Bilingual from "@/components/Bilingual";

export default function LeadGenerationPage() {
  return (
    <PageShell
      kicker={<Bilingual it="Sistema lead" en="Lead system" />}
      title={<Bilingual it="Funnel + CRM + follow-up automatico" en="Funnel + CRM + automated follow-up" />}
      subtitle={
        <Bilingual
          it="Se vuoi lead prevedibili, ti serve un sistema—non campagne casuali."
          en="If you want predictable leads, you need a system—not random campaigns."
        />
      }
      primaryCta={{
        href: "/contact",
        label: <Bilingual it="Richiedi sistema lead" en="Request lead system" />,
      }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          title={<Bilingual it="Casi d’uso" en="Use cases" />}
          bullets={[
            <Bilingual
              key="1"
              it="Lead da ads o outbound senza follow-up"
              en="Leads from ads or outbound with no follow-up"
            />,
            <Bilingual
              key="2"
              it="Pipeline non chiara e nessun next step"
              en="Unclear pipeline and no next steps"
            />,
            <Bilingual
              key="3"
              it="Nurture manuale e tempi di risposta lenti"
              en="Manual nurture and slow response times"
            />,
          ]}
        />
        <Card
          title={<Bilingual it="Per chi è" en="Who it’s for" />}
          bullets={[
            <Bilingual
              key="1"
              it="B2B con ciclo di vendita e lead da qualificare"
              en="B2B with a sales cycle and leads to qualify"
            />,
            <Bilingual
              key="2"
              it="Service business con richieste da gestire"
              en="Service businesses managing inbound requests"
            />,
            <Bilingual
              key="3"
              it="Team che vogliono consistenza (non campagne random)"
              en="Teams that want consistency (not random campaigns)"
            />,
          ]}
        />
        <Card
          title={<Bilingual it="Non è per" en="Not for" />}
          bullets={[
            <Bilingual
              key="1"
              it="Chi vuole solo “più lead” senza definire qualità"
              en="Teams wanting “more leads” without defining quality"
            />,
            <Bilingual
              key="2"
              it="Team senza un minimo processo commerciale"
              en="Teams without a basic sales process"
            />,
            <Bilingual
              key="3"
              it="Progetti senza owner per CRM e follow-up"
              en="Projects with no owner for CRM and follow-up"
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
                it="Mappa funnel (touchpoint → next action)"
                en="Funnel map (touchpoint → next action)"
              />,
              <Bilingual
                key="2"
                it="Pipeline CRM con stage, regole, e ownership"
                en="CRM pipeline with stages, rules, and ownership"
              />,
              <Bilingual
                key="3"
                it="Workflow follow-up (email/task) con tempi e trigger"
                en="Follow-up workflows (email/tasks) with timings and triggers"
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
