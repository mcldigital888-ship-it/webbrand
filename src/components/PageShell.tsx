 import type { ReactNode } from "react";
 import CtaButton from "@/components/CtaButton";

export default function PageShell({
  kicker,
  title,
  subtitle,
  primaryCta,
  children,
}: {
  kicker?: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  primaryCta?: { href: string; label: ReactNode };
  children?: ReactNode;
}) {
  return (
    <div className="space-y-14">
      <header className="space-y-5">
        {kicker ? (
          <p className="text-sm font-semibold tracking-wide text-[var(--ds-accent2)]">
            {kicker}
          </p>
        ) : null}
        <h1 className="max-w-4xl font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--ds-text)] sm:text-5xl">
          {title}
        </h1>
        <div className="max-w-2xl text-lg leading-8 text-[var(--ds-muted)]">
          {subtitle}
        </div>
        {primaryCta ? (
          <CtaButton href={primaryCta.href}>{primaryCta.label}</CtaButton>
        ) : null}
      </header>
      {children}
    </div>
  );
}
