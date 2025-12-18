"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CaseStudy, WorkTag } from "@/lib/content";
import Reveal from "@/components/Reveal";

const allTags: WorkTag[] = ["Web", "Brand", "Performance", "Content"];

export default function WorkGrid({ items }: { items: CaseStudy[] }) {
  const [active, setActive] = useState<WorkTag | "All">("All");

  const filtered = useMemo(() => {
    if (active === "All") return items;
    return items.filter((c) => c.tags.includes(active));
  }, [active, items]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <FilterChip active={active === "All"} onClick={() => setActive("All")}>
          All
        </FilterChip>
        {allTags.map((t) => (
          <FilterChip key={t} active={active === t} onClick={() => setActive(t)}>
            {t}
          </FilterChip>
        ))}
      </div>

      <Reveal>
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-black/10"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--color-cyan)]/15 blur-2xl" />
              </div>
              <div className="relative space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
                    {c.client}
                  </div>
                  <div className="text-xs font-semibold text-[var(--color-navy)]">
                    {c.outcome}
                  </div>
                </div>
                <div className="font-[var(--font-display)] text-xl font-semibold tracking-tight text-[var(--color-navy)]">
                  {c.oneLiner}
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-[var(--color-slate)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </section>
      </Reveal>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-xs font-semibold transition-colors",
        active
          ? "bg-[var(--color-navy)] text-white"
          : "border border-[var(--color-navy)]/15 text-[var(--color-navy)] hover:bg-[var(--color-navy)]/[0.03]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
