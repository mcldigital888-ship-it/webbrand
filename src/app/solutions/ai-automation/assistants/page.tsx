import PageShell from "@/components/PageShell";

export default function AiAssistantsPage() {
  return (
    <PageShell
      kicker="AI & Automations"
      title="AI Assistants"
      subtitle={
        <>
          Assistants that reduce response time and remove repetitive work.
          <br />
          Assistenti che riducono i tempi di risposta e tolgono lavoro ripetitivo.
        </>
      }
      primaryCta={{ href: "/contact", label: "Request AI Demo" }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          title="Use cases / Casi d’uso"
          bullets={[
            "Lead qualification assistant / Assistente per qualificare lead",
            "FAQ + support assistant / Assistente FAQ e supporto",
            "Internal knowledge assistant / Assistente per knowledge interno",
            "Sales follow-up helper / Aiuto follow-up vendite",
          ]}
        />
        <Card
          title="Who this is for / Per chi è"
          bullets={[
            "Teams with recurring questions",
            "Businesses needing faster replies",
            "Ops-heavy workflows",
          ]}
        />
        <Card
          title="Not for / Non è per"
          bullets={[
            "One-off experiments without ownership",
            "Teams unwilling to follow a simple process",
            "Use cases requiring zero human oversight",
          ]}
        />
      </section>

      <FinalCta
        title="Request an AI demo / Richiedi una demo AI"
        desc="Tell us the team and the repetitive task. We’ll propose the fastest assistant setup. / Dicci team e attività ripetitiva. Ti proponiamo la configurazione più rapida."
        href="/contact"
        label="Request AI Demo / Richiedi Demo AI"
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
