import type { ReactNode } from "react";

export default function SectionBand({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "muted" | "accent";
  className?: string;
}) {
  const base = "rounded-3xl border border-black/5 px-6 py-10 sm:px-10";
  const tones: Record<typeof tone, string> = {
    light: "bg-[var(--color-surface)]",
    muted: "bg-[var(--color-background)]",
    accent:
      "bg-gradient-to-br from-[rgba(88,101,242,0.10)] via-[rgba(41,208,227,0.08)] to-[rgba(88,101,242,0.06)]",
  };

  return <section className={[base, tones[tone], className].join(" ")}>{children}</section>;
}
