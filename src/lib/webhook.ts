import { CONFIG, isDebugEnabled } from "@/lib/integrations";
import { getCurrentUtm } from "@/lib/utm";
import { trackEvent } from "@/lib/tracking";

export type IntegrationFormPayload = {
  form_name: string;
  timestamp: string;
  page_url: string;
  utm: Record<string, string>;
  fields: Record<string, unknown>;
  consent: boolean;
};

const FAILED_QUEUE_KEY = "failed_form_queue";

export function buildPayload({
  formName,
  fields,
  consent,
}: {
  formName: string;
  fields: Record<string, unknown>;
  consent: boolean;
}): IntegrationFormPayload {
  return {
    form_name: formName,
    timestamp: new Date().toISOString(),
    page_url: typeof window === "undefined" ? "" : window.location.href,
    utm: getCurrentUtm(),
    fields,
    consent,
  };
}

function saveFailedPayload(payload: IntegrationFormPayload) {
  if (typeof window === "undefined") return;
  try {
    const existing = window.localStorage.getItem(FAILED_QUEUE_KEY);
    const parsed = (existing ? JSON.parse(existing) : []) as IntegrationFormPayload[];
    parsed.push(payload);
    window.localStorage.setItem(FAILED_QUEUE_KEY, JSON.stringify(parsed));
  } catch {
    return;
  }
}

export async function postToWebhook(payload: IntegrationFormPayload) {
  const debug = isDebugEnabled();

  if (!CONFIG.WEBHOOK_URL) {
    if (debug) {
      // eslint-disable-next-line no-console
      console.warn("[webhook] Missing CONFIG.WEBHOOK_URL. Payload queued locally.");
    }
    saveFailedPayload(payload);
    return;
  }

  try {
    const res = await fetch(CONFIG.WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      saveFailedPayload(payload);
      if (debug) {
        // eslint-disable-next-line no-console
        console.warn("[webhook] Non-OK response", res.status);
      }
    }
  } catch {
    saveFailedPayload(payload);
  }
}

export async function submitIntegrationForm({
  formName,
  fields,
  consent,
}: {
  formName: string;
  fields: Record<string, unknown>;
  consent: boolean;
}) {
  const payload = buildPayload({ formName, fields, consent });
  trackEvent("form_submit", { form_name: formName });
  await postToWebhook(payload);
}
