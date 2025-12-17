import PageShell from "@/components/PageShell";
import CtaButton from "@/components/CtaButton";

const tiers = [
  {
    title: "Audit",
    desc: "Fast diagnosis + action plan.",
    bullets: ["Conversion + tracking audit", "Prioritized roadmap", "Quick wins"],
  },
  {
    title: "Delivery",
    desc: "Landing / website / CRM system delivered with clear ownership.",
    bullets: ["Pages + copy structure", "Form + CRM routing", "Automation basics"],
  },
  {
    title: "Scale",
    desc: "Monthly optimization + growth experiments.",
    bullets: ["Iteration", "Reporting", "Automation expansion"],
  },
];

export default function PlansPage() {
  return (
    <PageShell
      kicker="Plans"
      title="Transparent structure. Custom scope."
      subtitle={
        <>
          You’ll always know what’s included. Final pricing depends on scope,
          integrations, and speed.
          <br />
          Saprai sempre cosa è incluso. Il prezzo finale dipende da scope,
          integrazioni e velocità.
        </>
      }
      primaryCta={{ href: "/contact", label: "Request a Call / Richiedi una call" }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {tiers.map((t) => (
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
                {t.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
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
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-[var(--color-navy)]">
              Not sure what you need?
            </div>
            <div className="text-sm leading-6 text-[var(--color-slate)]">
              Oracolo generates an auto brief in 2 minutes.
            </div>
          </div>
          <CtaButton href="/oracolo">Start Oracolo</CtaButton>
        </div>
      </section>
    </PageShell>
  );
}
