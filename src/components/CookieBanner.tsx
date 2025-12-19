"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONFIG } from "@/lib/integrations";
import { hasConsentChoice, setConsent } from "@/lib/consent";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!CONFIG.CONSENT_REQUIRED) return;
    setOpen(!hasConsentChoice());
  }, []);

  if (!CONFIG.CONSENT_REQUIRED || !open) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-4xl rounded-2xl border border-black/10 bg-[var(--color-surface)] p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-[var(--color-slate)]">
          This site uses cookies/analytics only after consent. See{" "}
          <Link href="/privacy" className="font-semibold text-[var(--color-navy)]">
            Privacy
          </Link>
          .
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-4 py-2 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
            onClick={() => {
              setConsent(false);
              setOpen(false);
            }}
          >
            Decline
          </button>
          <button
            type="button"
            className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
            onClick={() => {
              setConsent(true);
              setOpen(false);
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
