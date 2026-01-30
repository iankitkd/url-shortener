import { cacheKeys } from './keys.js';
import { redis } from './redis.js';

export const shortUrlCache = {
  get(code: string) {
    const key = cacheKeys.shortUrl(code);
    return redis.get(key);
  },

  set({code, url, ttlSeconds=86400} : {code: string, url: string, ttlSeconds?: number}) {
    const key = cacheKeys.shortUrl(code);
    return redis.set(key, url, 'EX', ttlSeconds);
  },
};
