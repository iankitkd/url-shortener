import { FastifyInstance } from "fastify";
import { ShortUrlController } from "./shortUrl.controller.js";

export async function shortUrlRoutes(
  app: FastifyInstance,
  controller: ShortUrlController,
) {
  app.post("/api/urls", controller.createShortUrl);
  app.get("/api/urls/:code", controller.getShortUrl);
  app.get("/:code", controller.redirect);
}
