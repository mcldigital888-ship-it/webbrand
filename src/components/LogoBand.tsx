import Reveal from "@/components/Reveal";

export default function LogoBand({
  title = "Trusted by",
}: {
  title?: string;
}) {
  const logos = Array.from({ length: 8 }).map((_, i) => `Logo ${i + 1}`);

  return (
    <Reveal>
      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
        <div className="flex flex-col gap-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
            {title}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {logos.map((label) => (
              <div
                key={label}
                className="flex h-10 items-center justify-center rounded-xl border border-black/5 bg-white text-xs font-semibold text-[var(--color-navy)]/70"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
