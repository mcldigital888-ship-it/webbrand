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
  const base = "rounded-3xl border border-white/10 px-6 py-10 backdrop-blur sm:px-10";
  const tones: Record<typeof tone, string> = {
    light: "bg-[var(--ds-surface)]",
    muted: "bg-white/[0.02]",
    accent:
      "bg-gradient-to-br from-[rgba(124,124,255,0.16)] via-[rgba(63,208,201,0.10)] to-[rgba(124,124,255,0.08)]",
  };

  return <section className={[base, tones[tone], className].join(" ")}>{children}</section>;
}
