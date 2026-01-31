import { AnalyticsRepository } from "./analytics.repository.js";
import { ClickEventRepository } from './clickEvent.repository.js';
import { ShortUrlRepository } from "./shortUrl.repository.js";
import { prisma } from "../client.js";

export const shortUrlRepository = new ShortUrlRepository(prisma);
export const clickEventRepository = new ClickEventRepository(prisma);
export const analyticsRepository = new AnalyticsRepository(prisma);

export { ShortUrlRepository, AnalyticsRepository, ClickEventRepository, };
