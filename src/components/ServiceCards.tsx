import Link from "next/link";
import Reveal from "@/components/Reveal";

export type ServiceCardItem = {
  title: string;
  description: string;
  href: string;
};

export default function ServiceCards({ items }: { items: ServiceCardItem[] }) {
  return (
    <Reveal>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group relative overflow-hidden rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-black/10"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--color-cyan)]/15 blur-2xl" />
            </div>
            <div className="relative space-y-3">
              <div className="font-[var(--font-display)] text-xl font-semibold tracking-tight text-[var(--color-navy)]">
                {s.title}
              </div>
              <div className="text-sm leading-6 text-[var(--color-slate)]">
                {s.description}
              </div>
              <div className="pt-2 text-sm font-semibold text-[var(--color-navy)]">
                Learn more
              </div>
            </div>
          </Link>
        ))}
      </section>
    </Reveal>
  );
}
