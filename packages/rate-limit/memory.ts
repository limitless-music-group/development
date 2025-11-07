type RateLimitEntry = {
  count: number
  resetAt: number
}

/**
 * In-memory cache for rate limiting
 * In production, replace this with Redis or another distributed cache
 */
class RateLimitCache {
  private cache: Map<string, RateLimitEntry> = new Map()
  private cleanupInterval: ReturnType<typeof setInterval> | null = null

  constructor() {
    // Start cleanup interval to remove expired entries every minute
    this.startCleanup()
  }

  private startCleanup() {
    this.cleanupInterval && clearInterval(this.cleanupInterval);
    // Run cleanup every 60 seconds
    const interval = setInterval(() => this.cleanup(), 60_000);
    this.cleanupInterval = interval;
    // Do not keep the event loop alive in Node.js
    // Use optional chaining with type assertion for cross-runtime compatibility
    interval?.unref?.()
  }

  private cleanup() {
    const now = Math.floor(Date.now() / 1000)

    for (const [key, entry] of this.cache.entries()) {
      if (entry.resetAt <= now) {this.cache.delete(key) }
    }
  }

  get(key: string) {
    const entry = this.cache.get(key)
    if (entry && entry.resetAt <= Math.floor(Date.now() / 1000)) {
      this.cache.delete(key)
      return undefined
    }
    return entry
  }

  set(key: string, entry: RateLimitEntry) {
    this.cache.set(key, entry)
  }

  delete(key: string) {
    this.cache.delete(key)
  }

  clear() {
    this.cache.clear()
  }

  // size(): number {
  //   return this.cache.size
  // }

  destroy(): void {
    if (this.cleanupInterval) { clearInterval(this.cleanupInterval) }
    this.cache.clear()
  }
}

export const memoryRateLimitCache = new RateLimitCache();

export function generateKey(ip: string, identifier?: string) {
  return identifier ? `ratelimit:${identifier}:${ip}` : `ratelimit:${ip}`;
}