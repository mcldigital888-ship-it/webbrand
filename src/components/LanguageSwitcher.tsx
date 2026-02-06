"use client";

import { usePathname, useRouter } from "next/navigation";

function getLocaleFromPathname(pathname: string) {
  const seg = pathname.split("/").filter(Boolean)[0];
  if (seg === "en" || seg === "it") return seg;
  return "it";
}

function swapLocale(pathname: string, nextLocale: "en" | "it") {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "en" || parts[0] === "it") {
    parts[0] = nextLocale;
    return "/" + parts.join("/");
  }
  return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
}

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPathname(pathname);

  function setLang(next: "en" | "it") {
    document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`;
    router.push(swapLocale(pathname, next));
    router.refresh();
  }

  return (
    <div className="flex items-center rounded-full border border-white/10 bg-white/[0.02] p-1 backdrop-blur">
      <button
        type="button"
        onClick={() => setLang("en")}
        className={[
          "rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-150",
          locale === "en"
            ? "bg-[var(--ds-text)] text-[var(--ds-bg)]"
            : "text-[var(--ds-muted)] hover:text-[var(--ds-text)]",
        ].join(" ")}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("it")}
        className={[
          "rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-150",
          locale === "it"
            ? "bg-[var(--ds-text)] text-[var(--ds-bg)]"
            : "text-[var(--ds-muted)] hover:text-[var(--ds-text)]",
        ].join(" ")}
      >
        IT
      </button>
    </div>
  );
}
