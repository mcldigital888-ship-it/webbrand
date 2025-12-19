import { CONFIG } from "@/lib/integrations";

const CONSENT_KEY = "integration_consent";

export function getConsent(): boolean {
  if (typeof window === "undefined") return false;
  if (!CONFIG.CONSENT_REQUIRED) return true;
  try {
    return window.localStorage.getItem(CONSENT_KEY) === "true";
  } catch {
    return false;
  }
}

export function setConsent(value: boolean) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_KEY, value ? "true" : "false");
  } catch {
    return;
  }
}

export function hasConsentChoice(): boolean {
  if (typeof window === "undefined") return false;
  if (!CONFIG.CONSENT_REQUIRED) return true;
  try {
    return window.localStorage.getItem(CONSENT_KEY) !== null;
  } catch {
    return false;
  }
}
