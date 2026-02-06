import type { Dictionary } from "./types";

export function t(dict: Dictionary, key: string, vars?: Record<string, string | number>) {
  const parts = key.split(".");
  let cur: any = dict;
  for (const p of parts) {
    cur = cur?.[p];
  }
  const raw = typeof cur === "string" ? cur : "";
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}
