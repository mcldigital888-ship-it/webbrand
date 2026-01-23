import Link from "next/link";

export default function PackageCard({
  title,
  items,
  duration,
  ctaLabel,
  href,
}: {
  title: React.ReactNode;
  items: React.ReactNode[];
  duration: React.ReactNode;
  ctaLabel: React.ReactNode;
  href: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--color-surface)] p-6">
      <div className="space-y-4">
        <div className="font-[var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--color-navy)]">
          {title}
        </div>
        <ul className="space-y-2 text-sm text-[var(--color-slate)]">
          {items.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
          Duration
        </div>
        <div className="text-sm font-semibold text-[var(--color-navy)]">{duration}</div>
        <Link
          href={href}
          className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
