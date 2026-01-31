import { FastifyReply, FastifyRequest } from "fastify";
import { ShortUrlService } from "./shortUrl.service.js";
import { clickQueue } from "@repo/queue";

export class ShortUrlController {
  constructor(private readonly service: ShortUrlService) {}

  createShortUrl = async (
    req: FastifyRequest<{
      Body: { originalUrl: string; customAlias?: string };
    }>,
    reply: FastifyReply,
  ) => {
    const { originalUrl, customAlias } = req.body ?? {};
    if (!req.body?.originalUrl) {
      return reply.code(400).send({ message: "originalUrl not provided" });
    }

    const short = await this.service.createShortUrl(originalUrl, customAlias);

    return reply.code(201).send({
      code: short.shortCode,
      originalUrl: short.originalUrl,
      shortUrl: `${process.env.BASE_URL}/${short.shortCode}`,
      createdAt: short.createdAt,
    });
  };

  getShortUrl = async (
    req: FastifyRequest<{ Params: { code: string } }>,
    reply: FastifyReply,
  ) => {
    const { code } = req.params;

    const shortUrl = await this.service.getByCode(code);

    if (!shortUrl) {
      return reply.code(404).send({ message: "Short URL not found" });
    }

    return reply.send({
      code: shortUrl.shortCode,
      originalUrl: shortUrl.originalUrl,
      shortUrl: `${process.env.BASE_URL}/${shortUrl.shortCode}`,
      createdAt: shortUrl.createdAt,
    });
  };

  redirect = async (
    req: FastifyRequest<{ Params: { code: string } }>,
    reply: FastifyReply,
  ) => {
    const result = await this.service.resolve(req.params.code);

    if (!result) {
      return reply.code(404).send({ message: "Short URL not found" });
    }

    await clickQueue.add(`shortUrl:${result.id}`, {
      shortUrlId: result.id,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    return reply.redirect(result.originalUrl, 302);
  };
}
