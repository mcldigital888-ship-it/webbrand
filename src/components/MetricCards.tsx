import Reveal from "@/components/Reveal";

export type Metric = {
  label: string;
  value: string;
  note?: string;
};

export default function MetricCards({ metrics }: { metrics: Metric[] }) {
  return (
    <Reveal>
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="group relative overflow-hidden rounded-2xl border border-black/5 bg-[var(--color-surface)] p-5 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[var(--color-cyan)]/15 blur-2xl" />
              <div className="absolute -left-10 -bottom-10 h-24 w-24 rounded-full bg-[var(--color-blue)]/10 blur-2xl" />
            </div>
            <div className="relative space-y-2">
              <div className="font-[var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--color-navy)]">
                {m.value}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
                {m.label}
              </div>
              {m.note ? (
                <div className="text-xs leading-5 text-[var(--color-slate)]">{m.note}</div>
              ) : null}
            </div>
          </div>
        ))}
      </section>
    </Reveal>
  );
}
