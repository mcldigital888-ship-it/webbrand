import Link from "next/link";
import Bilingual from "@/components/Bilingual";

export default function GoalCard({
  number,
  title,
  desc,
  href,
}: {
  number: string;
  title: { it: string; en: string };
  desc: { it: string; en: string };
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group grid grid-cols-[44px_1fr] gap-4 rounded-2xl border border-[rgba(7,22,51,0.12)] bg-white p-5 transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(88,101,242,0.10)] text-sm font-semibold text-[var(--color-navy)]">
        {number}
      </div>
      <div className="space-y-1">
        <div className="text-sm font-semibold text-[var(--color-navy)]">
          <Bilingual it={title.it} en={title.en} />
        </div>
        <div className="text-sm leading-6 text-[var(--color-slate)]">
          <Bilingual it={desc.it} en={desc.en} />
        </div>
      </div>
    </Link>
  );
}
