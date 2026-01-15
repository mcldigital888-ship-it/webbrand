// Simple in-memory rate limiting (per-process). Suitable as a basic guard.

const RATE_WINDOW_MS = 60_000;

type Bucket = { resetAt: number; count: number };

const buckets = new Map<string, Bucket>();

export function getClientIp(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return ip || "unknown";
}

export function allowRateLimit({
  key,
  max,
}: {
  key: string;
  max: number;
}) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || now > current.resetAt) {
    buckets.set(key, { resetAt: now + RATE_WINDOW_MS, count: 1 });
    return true;
  }
  if (current.count >= max) return false;
  current.count += 1;
  return true;
}
