type RateLimitEntry = {
  lastAt: number
  count: number
  windowStart: number
}

const store = new Map<string, RateLimitEntry>()

/** 同一 IP の最短送信間隔（秒） */
const MIN_INTERVAL_SEC = 30
/** 1 時間あたりの最大送信数（IP 単位） */
const MAX_PER_HOUR = 5
const WINDOW_MS = 60 * 60 * 1000

const prune = (now: number) => {
  if (store.size <= 500) return
  store.forEach((entry, key) => {
    if (now - entry.windowStart > WINDOW_MS) store.delete(key)
  })
}

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSec: number; reason: 'too_fast' | 'hourly_limit' }

export const checkContactRateLimit = (ip: string, now = Date.now()): RateLimitResult => {
  prune(now)

  const key = ip || 'unknown'
  const entry = store.get(key)

  if (!entry) {
    store.set(key, { lastAt: now, count: 1, windowStart: now })
    return { allowed: true }
  }

  const elapsedSec = (now - entry.lastAt) / 1000
  if (elapsedSec < MIN_INTERVAL_SEC) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil(MIN_INTERVAL_SEC - elapsedSec),
      reason: 'too_fast',
    }
  }

  if (now - entry.windowStart > WINDOW_MS) {
    store.set(key, { lastAt: now, count: 1, windowStart: now })
    return { allowed: true }
  }

  if (entry.count >= MAX_PER_HOUR) {
    const retryAfterSec = Math.ceil((entry.windowStart + WINDOW_MS - now) / 1000)
    return { allowed: false, retryAfterSec: Math.max(retryAfterSec, 1), reason: 'hourly_limit' }
  }

  entry.lastAt = now
  entry.count += 1
  store.set(key, entry)
  return { allowed: true }
}

export const getClientIp = (forwardedFor: string | string[] | undefined): string => {
  const raw = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor
  if (!raw) return 'unknown'
  return raw.split(',')[0]?.trim() || 'unknown'
}
