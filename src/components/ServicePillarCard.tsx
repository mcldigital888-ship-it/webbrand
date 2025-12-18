import Link from "next/link";

export default function ServicePillarCard({
  title,
  text,
  outcome,
  outcomeLabel,
  href,
}: {
  title: React.ReactNode;
  text: React.ReactNode;
  outcome: React.ReactNode;
  outcomeLabel?: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-black/10"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--color-cyan)]/15 blur-2xl" />
      </div>
      <div className="relative space-y-3">
        <div className="font-[var(--font-display)] text-xl font-semibold tracking-tight text-[var(--color-navy)]">
          {title}
        </div>
        <div className="text-sm leading-6 text-[var(--color-slate)]">{text}</div>
        <div className="rounded-xl border border-black/5 bg-white p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
            {outcomeLabel ?? "Outcome"}
          </div>
          <div className="mt-2 text-sm font-semibold text-[var(--color-navy)]">{outcome}</div>
        </div>
        <div className="pt-1 text-sm font-semibold text-[var(--color-navy)]">
          Explore service <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </div>
      </div>
    </Link>
  );
}
