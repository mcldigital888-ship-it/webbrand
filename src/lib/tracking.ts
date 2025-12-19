import { CONFIG, isDebugEnabled } from "@/lib/integrations";
import { getConsent } from "@/lib/consent";

type EventName =
  | "page_view"
  | "scroll_25"
  | "scroll_50"
  | "scroll_75"
  | "scroll_90"
  | "cta_click"
  | "form_start"
  | "form_submit"
  | "form_error"
  | "outbound_click";

export type TrackEventPayload = {
  name: EventName;
  timestamp: string;
  page_url: string;
  props?: Record<string, unknown>;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: EventName, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const payload: TrackEventPayload = {
    name,
    timestamp: new Date().toISOString(),
    page_url: window.location.href,
    props,
  };

  const debug = isDebugEnabled();
  if (debug) {
    // eslint-disable-next-line no-console
    console.log("[event]", payload);
  }

  if (CONFIG.CONSENT_REQUIRED && !getConsent()) {
    return;
  }

  if (CONFIG.GA4_ID) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: payload.name, ...payload.props });
  }

  if (CONFIG.META_PIXEL_ID) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: payload.name, ...payload.props });
  }
}
