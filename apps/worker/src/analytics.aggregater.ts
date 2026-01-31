import { analyticsRepository, clickEventRepository } from "@repo/db";

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export async function aggregateDailyClicks() {
  const now = new Date();
  const day = startOfDay(now);

  const grouped = await clickEventRepository.groupClicksByShortUrl(day, now);

  for (const row of grouped) {
    const uniqueVisitors = await clickEventRepository.countUniqueVisitors(
      row.shortUrlId,
      day,
      now,
    );

    await analyticsRepository.upsertDailyAnalytics({
      shortUrlId: row.shortUrlId,
      date: day,
      totalClicks: row._count._all,
      uniqueVisitors,
    });
  }
}
