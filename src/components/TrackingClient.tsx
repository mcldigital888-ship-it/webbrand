"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/tracking";

const SCROLL_THRESHOLDS = [25, 50, 75, 90] as const;

type Threshold = (typeof SCROLL_THRESHOLDS)[number];

function thresholdToEvent(t: Threshold) {
  if (t === 25) return "scroll_25" as const;
  if (t === 50) return "scroll_50" as const;
  if (t === 75) return "scroll_75" as const;
  return "scroll_90" as const;
}

export default function TrackingClient() {
  const fired = useRef<Set<Threshold>>(new Set());

  useEffect(() => {
    trackEvent("page_view");

    function onScroll() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      if (max <= 0) return;
      const pct = Math.round((doc.scrollTop / max) * 100);

      for (const t of SCROLL_THRESHOLDS) {
        if (pct >= t && !fired.current.has(t)) {
          fired.current.add(t);
          trackEvent(thresholdToEvent(t));
        }
      }
    }

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const el = target.closest("a,button") as HTMLElement | null;
      if (!el) return;

      const cta = el.getAttribute("data-cta");
      if (cta) {
        trackEvent("cta_click", { cta });
      }

      if (el.tagName.toLowerCase() === "a") {
        const href = (el as HTMLAnchorElement).href;
        if (!href) return;
        try {
          const url = new URL(href);
          if (url.origin !== window.location.origin) {
            trackEvent("outbound_click", { href });
          }
        } catch {
          return;
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
