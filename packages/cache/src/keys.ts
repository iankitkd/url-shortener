export const cacheKeys = {
  shortUrl: (code: string) => `short-url:${code}`,
  clickCount: (code: string) => `clicks:${code}`,
};
