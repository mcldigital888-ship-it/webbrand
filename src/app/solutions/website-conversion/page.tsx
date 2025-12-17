import PageShell from "@/components/PageShell";

export default function WebsiteConversionPage() {
  return (
    <PageShell
      kicker="Website Conversion"
      title="Not a pretty site. A selling site."
      subtitle={
        <>
          If you already have traffic but conversion is weak, you don’t need a
          redesign—you need a conversion system.
          <br />
          Se hai già traffico ma la conversione è bassa, non serve un redesign: serve
          un sistema di conversione.
        </>
      }
      primaryCta={{ href: "/contact", label: "Request Web Audit / Richiedi Web Audit" }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card title="Who it’s for" bullets={["B2B sites with traffic but low leads", "Service businesses with unclear offer", "Teams without tracking + funnel clarity"]} />
        <Card title="What you receive / Cosa ricevi" bullets={["Audit + prioritized fixes", "Conversion copy structure", "CTA + form routing plan"]} />
        <Card title="How it works" bullets={["Diagnose", "Delivery", "Scale"]} />
      </section>

      <FinalCta
        title="Want a fast audit? / Vuoi un audit rapido?"
        desc="Share your URL and goal. We’ll reply with the highest-leverage fixes. / Condividi URL e obiettivo. Ti rispondiamo con le azioni a più alto impatto."
        href="/contact"
        label="Request Web Audit"
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
