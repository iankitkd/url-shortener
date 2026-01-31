import { FastifyInstance } from "fastify";
import { analyticsRepository } from "@repo/db";
import { AnalyticsService } from "./analytics.service.js";
import { AnalyticsController } from "./analytics.controller.js";
import { analyticsRoutes } from "./analytics.routes.js";

export async function registerAnalyticsModule(app: FastifyInstance) {
  const repository = analyticsRepository;
  const service = new AnalyticsService(repository);
  const controller = new AnalyticsController(service);

  await analyticsRoutes(app, controller);
}
