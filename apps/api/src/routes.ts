import { FastifyInstance } from "fastify";
import { registerShortUrlModule } from "./modules/short-url/shortUrl.module.js";

export async function apiRoutes(app: FastifyInstance) {
  await registerShortUrlModule(app);
}
