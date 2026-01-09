"use client";

export type AdminLang = "en" | "it";

export default function AdminLangToggleClient({
  value,
  onChange,
}: {
  value: AdminLang;
  onChange: (next: AdminLang) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-black/10 bg-white/60 p-1 text-xs font-semibold text-[var(--color-navy)]">
      <button
        type="button"
        onClick={() => onChange("en")}
        className={[
          "rounded-full px-3 py-1 transition-colors",
          value === "en" ? "bg-[var(--color-navy)] text-white" : "hover:bg-black/[0.03]",
        ].join(" ")}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onChange("it")}
        className={[
          "rounded-full px-3 py-1 transition-colors",
          value === "it" ? "bg-[var(--color-navy)] text-white" : "hover:bg-black/[0.03]",
        ].join(" ")}
      >
        IT
      </button>
    </div>
  );
}
