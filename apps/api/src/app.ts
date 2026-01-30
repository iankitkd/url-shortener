import Fastify, { FastifyInstance } from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyCors from '@fastify/cors';
import { errorHandler } from './plugins/error-handler.js';
import { apiRoutes } from './routes.js';

export async function createServer(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
  });

  // Core plugins
  await app.register(fastifyHelmet);
  await app.register(fastifyCors, { origin: true });

  // error handler
  await app.register(errorHandler);

  // Health check
  app.get('/health', async () => ({ status: 'ok' }));

  // api routes
  await app.register(apiRoutes);

  return app;
}
