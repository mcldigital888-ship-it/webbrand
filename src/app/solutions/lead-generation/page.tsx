import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";

export default function LeadGenerationPage() {
  return (
    <PageShell
      kicker={
        <>
          Sistema lead
          <br />
          Lead system
        </>
      }
      title={
        <>
          Funnel + CRM + follow-up automatico
          <br />
          Funnel + CRM + automated follow-up
        </>
      }
      subtitle={
        <>
          Se vuoi lead prevedibili, ti serve un sistema—non campagne casuali.
          <br />
          If you want predictable leads, you need a system—not random campaigns.
        </>
      }
      primaryCta={{
        href: "/contact",
        label: (
          <>
            Richiedi sistema lead
            <br />
            Request lead system
          </>
        ),
      }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          title="Casi d’uso / Use cases"
          bullets={[
            <>
              Lead da ads o outbound senza follow-up
              <br />
              Leads from ads or outbound with no follow-up
            </>,
            <>
              Pipeline non chiara e nessun next step
              <br />
              Unclear pipeline and no next steps
            </>,
            <>
              Nurture manuale e tempi di risposta lenti
              <br />
              Manual nurture and slow response times
            </>,
          ]}
        />
        <Card
          title="Per chi è / Who it’s for"
          bullets={[
            <>
              B2B con ciclo di vendita e lead da qualificare
              <br />
              B2B with a sales cycle and leads to qualify
            </>,
            <>
              Service business con richieste da gestire
              <br />
              Service businesses managing inbound requests
            </>,
            <>
              Team che vogliono consistenza (non campagne random)
              <br />
              Teams that want consistency (not random campaigns)
            </>,
          ]}
        />
        <Card
          title="Non è per / Not for"
          bullets={[
            <>
              Chi vuole solo “più lead” senza definire qualità
              <br />
              Teams wanting “more leads” without defining quality
            </>,
            <>
              Team senza un minimo processo commerciale
              <br />
              Teams without a basic sales process
            </>,
            <>
              Progetti senza owner per CRM e follow-up
              <br />
              Projects with no owner for CRM and follow-up
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
                Mappa funnel (touchpoint → next action)
                <br />
                Funnel map (touchpoint → next action)
              </>,
              <>
                Pipeline CRM con stage, regole, e ownership
                <br />
                CRM pipeline with stages, rules, and ownership
              </>,
              <>
                Workflow follow-up (email/task) con tempi e trigger
                <br />
                Follow-up workflows (email/tasks) with timings and triggers
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
