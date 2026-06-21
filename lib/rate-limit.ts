type RateLimitResult = {
  allowed: boolean;
  retryAfter?: number;
};

type Bucket = {
  tokens: number;
  lastRefill: number;
};

const buckets = new Map<string, Bucket>();

// Simple token bucket per identifier (IP+UA)
export function checkRateLimit(
  identifier: string,
  limit = 60,          // max requests
  windowMs = 60_000    // per 60s
): RateLimitResult {
  const now = Date.now();
  const refillRate = limit / windowMs; // tokens per ms

  let bucket = buckets.get(identifier);
  if (!bucket) {
    bucket = { tokens: limit, lastRefill: now };
    buckets.set(identifier, bucket);
  }

  const elapsed = now - bucket.lastRefill;
  const refill = elapsed * refillRate;
  bucket.tokens = Math.min(limit, bucket.tokens + refill);
  bucket.lastRefill = now;

  if (bucket.tokens < 1) {
    const msUntilNext = (1 - bucket.tokens) / refillRate;
    return {
      allowed: false,
      retryAfter: Math.ceil(msUntilNext / 1000),
    };
  }

  bucket.tokens -= 1;
  return { allowed: true };
}

export function getClientIdentifier(req: Request): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown-ip";

  const ua = req.headers.get("user-agent") || "unknown-ua";

  return `${ip}:${ua}`;
}