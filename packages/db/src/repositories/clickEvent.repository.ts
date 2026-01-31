import { prisma } from "../client.js";

export class ClickEventRepository {
  create(data: { shortUrlId: string; ip?: string; userAgent?: string }) {
    return prisma.clickEvent.create({
      data,
    });
  }
}
