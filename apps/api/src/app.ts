import Fastify from "fastify";
import { registerRoutes } from "./routes.js";

export function buildApp() {
  const app = Fastify({ logger: true });
  registerRoutes(app);
  return app;
}
