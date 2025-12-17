import PageShell from "@/components/PageShell";
import type { ReactNode } from "react";

const steps: {
  title: string;
  desc: ReactNode;
  bullets: ReactNode[];
}[] = [
  {
    title: "Audit",
    desc: (
      <>
        Analizziamo il contesto, gli obiettivi e i colli di bottiglia per definire cosa costruire e perché.
        <br />
        We analyze context, goals, and bottlenecks to define what to build and why.
      </>
    ),
    bullets: [
      <>
        Analisi del sistema attuale
        <br />
        Current system analysis
      </>,
      <>
        Priorità chiare
        <br />
        Clear priorities
      </>,
      <>
        Raccomandazioni operative
        <br />
        Actionable recommendations
      </>,
    ],
  },
  {
    title: "Build",
    desc: (
      <>
        Progettiamo e implementiamo il sistema concordato: sito, landing, CRM, automazioni o AI.
        <br />
        We design and implement the agreed system: website, landing pages, CRM, automations, or AI.
      </>
    ),
    bullets: [
      <>
        Sistema funzionante
        <br />
        Working system
      </>,
      <>
        Setup tecnico completo
        <br />
        Full technical setup
      </>,
      <>
        Flussi testati
        <br />
        Tested flows
      </>,
    ],
  },
  {
    title: "Scale",
    desc: (
      <>
        Ottimizziamo, misuriamo e miglioriamo nel tempo in base ai dati reali.
        <br />
        We optimize, measure, and improve over time based on real data.
      </>
    ),
    bullets: [
      <>
        KPI chiari
        <br />
        Clear KPIs
      </>,
      <>
        Miglioramenti continui
        <br />
        Continuous improvements
      </>,
      <>
        Supporto strategico
        <br />
        Strategic support
      </>,
    ],
  },
];

export default function PlansPage() {
  return (
    <PageShell
      kicker={
        <>
          Modello di ingaggio
          <br />
          Engagement model
        </>
      }
      title={
        <>
          Come lavoriamo
          <br />
          How we work
        </>
      }
      subtitle={
        <>
          Un modello semplice e trasparente per costruire sistemi che funzionano davvero.
          <br />
          A clear and practical engagement model to build systems that actually work.
        </>
      }
      primaryCta={{
        href: "/contact",
        label: (
          <>
            Richiedi una call
            <br />
            Request a call
          </>
        ),
      }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {steps.map((t) => (
          <div
            key={t.title}
            className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6"
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-sm font-semibold text-[var(--color-navy)]">
                  {t.title}
                </div>
                <div className="text-sm leading-6 text-[var(--color-slate)]">
                  {t.desc}
                </div>
              </div>
              <ul className="space-y-2 text-sm text-[var(--color-slate)]">
                {t.bullets.map((b, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8">
        <div className="space-y-2 text-sm leading-6 text-[var(--color-slate)]">
          <p>
            Ogni progetto è diverso. Il percorso viene definito dopo una prima call,
            in base agli obiettivi e alla complessità reale.
          </p>
          <p>
            Every project is different. The engagement is defined after an initial call,
            based on goals and real complexity.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
