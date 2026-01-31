import { AnalyticsRepository } from "@repo/db";

export class AnalyticsService {
  constructor(private readonly repo: AnalyticsRepository) {}

  async getAnalytics(shortUrlId: string) {
    const daily = await this.repo.findDailyByShortUrl(shortUrlId);

    const totalClicks = daily.reduce((sum, d) => sum + d.totalClicks, 0);
    const totalUniqueVisitors = daily.reduce((sum, d) => sum + d.uniqueVisitors, 0);

    return {
      totalClicks,
      totalUniqueVisitors,
      perDay: daily.map((d) => ({
        date: d.date,
        clicks: d.totalClicks,
        uniqueVisitors: d.uniqueVisitors,
      })),
    };
  }
}
