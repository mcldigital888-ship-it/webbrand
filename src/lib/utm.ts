export type UtmPayload = Record<string, string>;

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "ttclid",
];

export function getUtmFromUrl(urlString: string): UtmPayload {
  try {
    const url = new URL(urlString);
    const out: UtmPayload = {};
    for (const key of UTM_KEYS) {
      const v = url.searchParams.get(key);
      if (v) out[key] = v;
    }
    return out;
  } catch {
    return {};
  }
}

export function getCurrentUtm(): UtmPayload {
  if (typeof window === "undefined") return {};
  return getUtmFromUrl(window.location.href);
}
