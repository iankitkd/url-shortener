import { FastifyInstance } from "fastify";
import { registerShortUrlModule } from "./modules/short-url/shortUrl.module.js";
import { registerAnalyticsModule } from "./modules/analytics/analytics.module.js";

export async function apiRoutes(app: FastifyInstance) {
  await registerShortUrlModule(app);
  await registerAnalyticsModule(app);
}
