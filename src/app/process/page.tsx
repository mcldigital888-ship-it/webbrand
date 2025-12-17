import PageShell from "@/components/PageShell";
import CtaButton from "@/components/CtaButton";

const steps = [
  {
    title: "Diagnose (7 days)",
    desc: "We audit conversion, tracking, messaging, and your current funnel/CRM reality.",
  },
  {
    title: "Delivery (14–30 days)",
    desc: "We deliver the pages, CRM workflows, follow-ups, and automation needed to hit the goal.",
  },
  {
    title: "Scale (monthly)",
    desc: "We optimize, run experiments, improve lead quality, and automate bottlenecks.",
  },
];

export default function ProcessPage() {
  return (
    <PageShell
      kicker="Process"
      title="A simple process designed for speed"
      subtitle={
        <>
          No endless workshops. One clear goal, a short delivery cycle, and continuous
          scaling.
          <br />
          Niente workshop infiniti. Un obiettivo chiaro, un ciclo di delivery breve e
          ottimizzazione continua.
        </>
      }
      primaryCta={{ href: "/contact", label: "Request a Call / Richiedi una call" }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6"
          >
            <div className="space-y-2">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                {s.title}
              </div>
              <div className="text-sm leading-6 text-[var(--color-slate)]">
                {s.desc}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-[var(--color-navy)]">
              Want the fastest recommendation?
            </div>
            <div className="text-sm leading-6 text-[var(--color-slate)]">
              Use Oracolo to generate a 2-minute auto brief.
            </div>
          </div>
          <CtaButton href="/oracolo">Start Oracolo</CtaButton>
        </div>
      </section>
    </PageShell>
  );
}
