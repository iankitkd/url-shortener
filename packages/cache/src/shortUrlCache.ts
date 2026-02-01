import { cacheKeys } from './keys.js';
import { redis } from './connection.js';

export interface CachedShortUrl {
  id: string;
  originalUrl: string;
}

const DEFAULT_TTL_SECONDS = 60 * 60;

export const shortUrlCache = {
  async get(code: string): Promise<CachedShortUrl | null> {
    const key = cacheKeys.shortUrl(code);
    const value = await redis.get(key);

    if (!value) return null;

    return JSON.parse(value) as CachedShortUrl;
  },

  async set(
    code: string,
    value: CachedShortUrl,
    ttlSeconds: number = DEFAULT_TTL_SECONDS,
  ) {
    const key = cacheKeys.shortUrl(code);

    return redis.set(
      key,
      JSON.stringify(value),
      'EX',
      ttlSeconds,
    );
  },
};
