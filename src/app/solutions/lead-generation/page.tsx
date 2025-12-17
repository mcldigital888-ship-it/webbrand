import PageShell from "@/components/PageShell";

export default function LeadGenerationPage() {
  return (
    <PageShell
      kicker="Lead Generation / Growth Engine"
      title="Funnel + CRM + nurture"
      subtitle={
        <>
          If you want predictable leads, you need a system—not random campaigns.
          <br />
          Se vuoi lead prevedibili, ti serve un sistema—non campagne casuali.
        </>
      }
      primaryCta={{ href: "/contact", label: "Request Lead System / Richiedi sistema lead" }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card title="Who it’s for" bullets={["B2B lead gen", "Service businesses", "Teams needing consistency"]} />
        <Card title="What you receive / Cosa ricevi" bullets={["Funnel map", "CRM pipeline", "Nurture automation"]} />
        <Card title="Outcome" bullets={["More qualified leads", "Faster follow-up", "Better close rate"]} />
      </section>

      <FinalCta
        title="Want a lead system recommendation? / Vuoi una raccomandazione?"
        desc="Share your offer and current funnel. We’ll propose the shortest delivery path. / Condividi offerta e funnel attuale. Ti proponiamo il percorso più rapido."
        href="/contact"
        label="Request Lead System / Richiedi sistema lead"
      />
    </PageShell>
  );
}

function Card({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
      <div className="space-y-3">
        <div className="text-sm font-semibold text-[var(--color-navy)]">{title}</div>
        <ul className="space-y-2 text-sm text-[var(--color-slate)]">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FinalCta({
  title,
  desc,
  href,
  label,
}: {
  title: string;
  desc: string;
  href: string;
  label: string;
}) {
  return (
    <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-[var(--color-navy)]">{title}</div>
          <div className="text-sm leading-6 text-[var(--color-slate)]">{desc}</div>
        </div>
        <a
          href={href}
          className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
        >
          {label}
        </a>
      </div>
    </section>
  );
}
