import { ShortUrl, ShortUrlRepository } from "@repo/db";
import { shortUrlCache } from "@repo/cache";
import { nanoid } from "nanoid";

const ALIAS_REGEX = /^[a-zA-Z0-9_-]{3,30}$/;

export class ShortUrlService {
  constructor(private readonly repo: ShortUrlRepository) {}

  private validateAlias(alias: string): string {
    const normalized = alias.trim().toLowerCase();

    if (!ALIAS_REGEX.test(normalized)) {
      throw new Error(
        'Alias must be 3-30 characters and contain only letters, numbers, "-" or "_"',
      );
    }
    return normalized;
  }

  async resolve(code: string): Promise<string | null> {
    const cached = await shortUrlCache.get(code);
    if (cached) return cached;

    const record = await this.repo.findByCode(code);
    if (!record) return null;

    await shortUrlCache.set({ code, url: record.originalUrl });
    return record.originalUrl;
  }
  
  async getByCode(code: string): Promise<ShortUrl | null> {
    return this.repo.findByCode(code);
  }

  async createShortUrl(originalUrl: string, customAlias?: string): Promise<ShortUrl> {
    const shortCode = nanoid(7);
    // const shortCode = customAlias ? this.validateAlias(customAlias) : nanoid(8); // will do later

    try {
      return await this.repo.create({
        shortCode,
        originalUrl,
      });
    } catch (err: any) {
      // Prisma unique constraint error
      if (err.code === "P2002") {
        if (customAlias) {
          throw new Error("Custom alias already in use");
        }

        // retry for nanoid collision (very rare)
        return this.createShortUrl(originalUrl);
      }
      throw err;
    }
  }
}
