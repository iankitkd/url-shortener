import { FastifyInstance } from "fastify";
import { shortUrlRoutes } from "./modules/short-url/shortUrl.routes.js";

export function registerRoutes(app: FastifyInstance) {
  app.register(shortUrlRoutes);
}
