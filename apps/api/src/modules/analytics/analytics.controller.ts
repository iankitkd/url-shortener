import { FastifyRequest, FastifyReply } from "fastify";
import { AnalyticsService } from "./analytics.service.js";

export class AnalyticsController {
  constructor(private readonly service: AnalyticsService) {}

  getAnalytics = async (
    req: FastifyRequest<{ Params: { shortUrlId: string } }>,
    reply: FastifyReply,
  ) => {
    const shortUrlId = req.params.shortUrlId;
    
    const data = await this.service.getAnalytics(shortUrlId);
    return reply.send(data);
  };
}
