import Link from "next/link";

export type ModuleChooserItem = {
  title: string;
  who: string;
  bullets: string[];
  href: string;
  cta: string;
};

export default function ModuleChooser({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: ModuleChooserItem[];
}) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
          {title}
        </h2>
        {subtitle ? (
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-slate)]">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.href}
            className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-slate)]">{item.who}</p>
              </div>

              <ul className="space-y-2 text-sm text-[var(--color-slate)]">
                {item.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={item.href}
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
              >
                {item.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
