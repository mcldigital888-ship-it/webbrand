import { CONFIG as RAW_CONFIG } from "../../config/integrations";

export type IntegrationConfig = {
  WEBHOOK_URL: string;
  GA4_ID: string;
  META_PIXEL_ID: string;
  CONSENT_REQUIRED: boolean;
  DEBUG_MODE: boolean;
};

export const CONFIG: IntegrationConfig = RAW_CONFIG as IntegrationConfig;

export function isDebugEnabled() {
  if (typeof window === "undefined") return CONFIG.DEBUG_MODE;
  try {
    const url = new URL(window.location.href);
    return CONFIG.DEBUG_MODE || url.searchParams.get("debug") === "1";
  } catch {
    return CONFIG.DEBUG_MODE;
  }
}
