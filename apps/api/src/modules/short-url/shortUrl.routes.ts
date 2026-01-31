import { FastifyInstance } from "fastify";
import { ShortUrlController } from "./shortUrl.controller.js";

export async function shortUrlRoutes(
  app: FastifyInstance,
  controller: ShortUrlController,
) {
  app.post(
    "/api/urls",
    {
      config: {
        rateLimit: {
          max: 10,
          timeWindow: "1 minute",
        },
      },
    },
    controller.createShortUrl,
  );
  
  app.get(
    "/api/urls/:code",
    {
      config: {
        rateLimit: {
          max: 1000,
          timeWindow: "1 minute",
        },
      },
    },
    controller.getShortUrl,
  );
  
  app.get(
    "/:code",
    {
      config: {
        rateLimit: {
          max: 1000,
          timeWindow: "1 minute",
        },
      },
    },
    controller.redirect,
  );
}
