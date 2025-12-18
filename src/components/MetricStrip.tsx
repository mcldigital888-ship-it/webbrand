import Bilingual from "@/components/Bilingual";

export default function MetricStrip({
  items,
}: {
  items: { value: { it: string; en: string }; label: { it: string; en: string } }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((m) => (
        <div key={m.label.en} className="rounded-2xl border border-black/5 bg-white p-6">
          <div className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
            <Bilingual it={m.value.it} en={m.value.en} />
          </div>
          <div className="mt-1 text-sm font-medium text-[var(--color-slate)]">
            <Bilingual it={m.label.it} en={m.label.en} />
          </div>
        </div>
      ))}
    </div>
  );
}
