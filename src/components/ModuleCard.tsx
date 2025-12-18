import Bilingual from "@/components/Bilingual";

export default function ModuleCard({
  title,
  desc,
  bullets,
}: {
  title: { it: string; en: string };
  desc: { it: string; en: string };
  bullets: { it: string; en: string }[];
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-[var(--color-navy)]">
            <Bilingual it={title.it} en={title.en} />
          </div>
          <div className="text-sm leading-6 text-[var(--color-slate)]">
            <Bilingual it={desc.it} en={desc.en} />
          </div>
        </div>
        <ul className="space-y-2 text-sm text-[var(--color-slate)]">
          {bullets.map((b) => (
            <li key={b.en} className="flex gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
              <span>
                <Bilingual it={b.it} en={b.en} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
