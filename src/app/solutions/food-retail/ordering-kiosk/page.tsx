import PageShell from "@/components/PageShell";

export default function OrderingKioskPage() {
  return (
    <PageShell
      kicker="Food / Retail"
      title="Ordering Kiosk (Totem)"
      subtitle={
        <>
          A kiosk experience designed to reduce queues and increase throughput—integrated
          with your operations.
          <br />
          Un’esperienza kiosk pensata per ridurre le code e aumentare la capacità—integrata
          con le tue operazioni.
        </>
      }
      primaryCta={{ href: "/contact", label: "Request Kiosk Demo / Richiedi demo kiosk" }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card title="Benefits" bullets={["Shorter queues", "Higher AOV", "Fewer mistakes"]} />
        <Card title="Included" bullets={["Kiosk UI flow", "Menu setup", "Operational handoff"]} />
        <Card title="Next" bullets={["Demo", "Install plan", "Scale rollout"]} />
      </section>
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
