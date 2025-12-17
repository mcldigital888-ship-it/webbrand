import PageShell from "@/components/PageShell";

export default function CrmSalesPage() {
  return (
    <PageShell
      kicker="CRM & Sales System"
      title="Stop using Excel. Start closing."
      subtitle={
        <>
          A CRM is not software. It’s a sales process with automation, visibility, and
          next actions.
          <br />
          Un CRM non è un software. È un processo di vendita con automazione,
          visibilità e prossime azioni.
        </>
      }
      primaryCta={{ href: "/contact", label: "Request CRM Audit / Richiedi audit CRM" }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card title="Who it’s for" bullets={["Teams losing leads", "No pipeline clarity", "Manual follow-up chaos"]} />
        <Card title="What you receive / Cosa ricevi" bullets={["Pipeline design", "Automation", "Reporting + handoff"]} />
        <Card title="Outcome" bullets={["Faster response", "Higher close rate", "Visibility on deals"]} />
      </section>

      <FinalCta
        title="Want a CRM audit? / Vuoi un audit CRM?"
        desc="We’ll identify the highest-leverage fixes in your pipeline and follow-up flow. / Identifichiamo le azioni a più alto impatto in pipeline e follow-up."
        href="/contact"
        label="Request CRM Audit"
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
