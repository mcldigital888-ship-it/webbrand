import { en } from "./en";
import { it } from "./it";
import type { Dictionary, Locale } from "./types";

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  it,
};
