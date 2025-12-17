import PageShell from "@/components/PageShell";

export default function AiAutomationsPage() {
  return (
    <PageShell
      kicker="AI & Automations"
      title="Automations"
      subtitle={
        <>
          Automations that reduce delays and keep leads from slipping.
          <br />
          Automazioni che riducono ritardi e impediscono ai lead di perdersi.
        </>
      }
      primaryCta={{ href: "/contact", label: "Request AI Demo" }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          title="Use cases / Casi d’uso"
          bullets={[
            "Instant lead routing / Routing lead immediato",
            "Follow-up within minutes / Follow-up in pochi minuti",
            "Lead status updates / Aggiornamento stato lead",
            "Ops reminders / Promemoria operativi",
          ]}
        />
        <Card
          title="Who this is for / Per chi è"
          bullets={[
            "Teams with slow response times",
            "Sales teams doing manual follow-up",
            "Businesses needing consistent execution",
          ]}
        />
        <Card
          title="Not for / Non è per"
          bullets={[
            "Teams without a basic process",
            "Complex projects with no owner",
            "Automation without measurable outcome",
          ]}
        />
      </section>

      <FinalCta
        title="Request an automation demo / Richiedi una demo automazioni"
        desc="Tell us your bottleneck and timeline. We’ll propose the fastest automation map. / Dicci il collo di bottiglia e la timeline. Ti proponiamo la mappa più rapida."
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
