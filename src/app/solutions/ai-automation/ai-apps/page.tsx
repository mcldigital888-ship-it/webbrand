import PageShell from "@/components/PageShell";

export default function AiAppsPage() {
  return (
    <PageShell
      kicker="AI & Automations"
      title="AI Apps"
      subtitle={
        <>
          AI features users actually adopt—built around one job to be done.
          <br />
          Funzionalità AI che le persone usano davvero—costruite attorno a un obiettivo.
        </>
      }
      primaryCta={{ href: "/contact", label: "Request AI Demo" }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          title="Use cases / Casi d’uso"
          bullets={[
            "AI search for internal docs / Ricerca AI su documenti",
            "Quote generator / Generatore preventivi",
            "Lead classifier / Classificatore lead",
            "Ops helper UI / UI di supporto operativo",
          ]}
        />
        <Card
          title="Who this is for / Per chi è"
          bullets={[
            "Teams needing speed + consistency",
            "Businesses with repeatable decisions",
            "Companies collecting structured data",
          ]}
        />
        <Card
          title="Not for / Non è per"
          bullets={[
            "Unclear ownership",
            "No data or no process",
            "AI as a gimmick",
          ]}
        />
      </section>

      <FinalCta
        title="Request an AI app demo / Richiedi una demo app AI"
        desc="Tell us the one workflow you want faster. We’ll propose the smallest useful AI app. / Dicci quale workflow vuoi accelerare. Ti proponiamo la più piccola app utile."
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
