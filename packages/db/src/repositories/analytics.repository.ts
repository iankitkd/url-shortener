import { PrismaClient } from "../generated/prisma/client.js";

export class AnalyticsRepository {
  constructor (private readonly prisma: PrismaClient) {}
  
  findDailyByShortUrl(shortUrlId: string) {
    return this.prisma.clickAnalyticsDaily.findMany({
      where: { shortUrlId },
      orderBy: { date: "asc" },
    });
  }

  upsertDailyAnalytics(params: {
    shortUrlId: string;
    date: Date;
    totalClicks: number;
    uniqueVisitors: number;
  }) {
    const { shortUrlId, date, totalClicks, uniqueVisitors } = params;

    return this.prisma.clickAnalyticsDaily.upsert({
      where: {
        shortUrlId_date: {
          shortUrlId,
          date,
        },
      },
      update: {
        totalClicks,
        uniqueVisitors,
      },
      create: {
        shortUrlId,
        date,
        totalClicks,
        uniqueVisitors,
      },
    });
  }
}
