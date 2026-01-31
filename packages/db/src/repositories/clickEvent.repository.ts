import { PrismaClient } from "@prisma/client/extension";

export class ClickEventRepository {
  constructor (private readonly prisma: PrismaClient) {}

  create(data: { shortUrlId: string; ip?: string; userAgent?: string }) {
    return this.prisma.clickEvent.create({
      data,
    });
  }

  groupClicksByShortUrl(start: Date, end: Date) {
    return this.prisma.clickEvent.groupBy({
      by: ['shortUrlId'],
      where: {
        createdAt: {
          gte: start,
          lt: end,
        },
      },
      _count: {
        _all: true,
      },
    });
  }

  async countUniqueVisitors(
    shortUrlId: string,
    start: Date,
    end: Date,
  ) {
    const result = await this.prisma.clickEvent.groupBy({
      by: ['ip'],
      where: {
        shortUrlId,
        createdAt: {
          gte: start,
          lt: end,
        },
      },
    });

    return result.length;
  }
}
