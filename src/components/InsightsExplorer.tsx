"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { InsightCategory, InsightPost } from "@/lib/content";
import Reveal from "@/components/Reveal";

const categories: (InsightCategory | "All")[] = [
  "All",
  "Strategy",
  "Brand",
  "Web",
  "Performance",
  "Content",
];

export default function InsightsExplorer({ items }: { items: InsightPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<InsightCategory | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((p) => (category === "All" ? true : p.category === category))
      .filter((p) =>
        q
          ? p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
          : true
      );
  }, [items, query, category]);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur">
        <div className="text-sm font-semibold text-[var(--ds-text)]">No posts yet</div>
        <div className="mt-1 text-sm text-[var(--ds-muted)]">
          New blog posts will appear here as soon as they’re published.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="md:col-span-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
            placeholder="Search insights"
          />
        </div>
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as InsightCategory | "All")}
            className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Reveal>
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/insights/${p.slug}`}
              className="group rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
                    {p.category}
                  </div>
                  <div className="text-xs font-semibold text-[var(--color-slate)]">
                    {p.date}
                  </div>
                </div>
                <div className="font-[var(--font-display)] text-xl font-semibold tracking-tight text-[var(--color-navy)]">
                  {p.title}
                </div>
                <div className="text-sm leading-6 text-[var(--color-slate)]">{p.excerpt}</div>
                <div className="pt-2 text-sm font-semibold text-[var(--color-navy)]">
                  Read
                </div>
              </div>
            </Link>
          ))}
        </section>
      </Reveal>
    </div>
  );
}
