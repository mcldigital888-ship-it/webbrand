import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["it", "en"] as const;
type Locale = (typeof LOCALES)[number];

function getLocaleFromCookie(req: NextRequest): Locale | null {
  const lang = req.cookies.get("lang")?.value;
  if (lang === "en" || lang === "it") return lang;
  return null;
}

function isPublicFile(pathname: string) {
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/crm") ||
    pathname.startsWith("/favicon") ||
    isPublicFile(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first === "en" || first === "it") {
    return NextResponse.next();
  }

  const preferred = getLocaleFromCookie(req) ?? "it";
  const url = req.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/:path*"],
};
