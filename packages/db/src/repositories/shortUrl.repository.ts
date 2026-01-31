import { prisma } from "../client.js";

export class ShortUrlRepository {
  findByCode(shortCode: string) {
    return prisma.shortUrl.findUnique({ where: { shortCode } });
  }

  create(data: {
    shortCode: string;
    originalUrl: string;
    expiresAt?: Date | null;
  }) {
    return prisma.shortUrl.create({ data });
  }

  increaseClicksCount(shortUrlId: string) {
    return prisma.shortUrl.update({
      where: { id: shortUrlId },
      data: { clicks: { increment: 1 } },
    });
  }
}

// export class ShortUrlRepository {
//   constructor(private readonly prisma: PrismaClient) {}

//   async findByCode(code: string): Promise<ShortUrlCreateInput | null> {
//     return this.prisma.shortUrl.findUnique({ where: { shortCode: code } });
//   }

//   async create(data: ShortUrlCreateInput): Promise<ShortUrlCreateInput> {
//     return this.prisma.shortUrl.create({ data });
//   }
// }
