import rateLimit from '@fastify/rate-limit';
import { FastifyInstance } from 'fastify';
import { redis } from '@repo/cache';

export async function rateLimitPlugin(app: FastifyInstance) {
  await app.register(rateLimit, {
    redis,
    global: false,
    keyGenerator: (req) => {
      return req.ip;
    },
    errorResponseBuilder: (_req, context) => ({
      statusCode: 429,
      error: 'Too Many Requests',
      message: `Rate limit exceeded, retry in ${context.ttl} seconds`,
    }),
  });
}
