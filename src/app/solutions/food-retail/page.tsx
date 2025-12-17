import Link from "next/link";
import PageShell from "@/components/PageShell";

export default function FoodRetailPage() {
  return (
    <PageShell
      kicker="Food / Retail Smart Solutions"
      title="Ordering + kiosk + operational speed"
      subtitle={
        <>
          Smart flows that reduce queues, increase average order value, and improve
          in-store efficiency.
          <br />
          Flussi intelligenti che riducono le code, aumentano lo scontrino medio e
          migliorano l’efficienza in store.
        </>
      }
      primaryCta={{ href: "/contact", label: "Request Kiosk Demo / Richiedi demo kiosk" }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card title="Who it’s for" bullets={["Restaurants", "Fast food", "Retail stores"]} />
        <Card title="What you receive / Cosa ricevi" bullets={["Ordering flows", "Kiosk/totem setup", "Operational reporting"]} />
        <Link
          href="/solutions/food-retail/ordering-kiosk"
          className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 text-sm font-semibold text-[var(--color-navy)] hover:border-black/10"
        >
          Ordering Kiosk →
        </Link>
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
