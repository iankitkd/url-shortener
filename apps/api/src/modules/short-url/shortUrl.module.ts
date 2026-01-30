import { FastifyInstance } from 'fastify';

import { ShortUrlRepository } from '@repo/db';
import { ShortUrlService } from './shortUrl.service.js';
import { ShortUrlController } from './shortUrl.controller.js';
import { shortUrlRoutes } from './shortUrl.routes.js';

export async function registerShortUrlModule(app: FastifyInstance) {
  const repository = new ShortUrlRepository();
  const service = new ShortUrlService(repository);
  const controller = new ShortUrlController(service);

  await shortUrlRoutes(app, controller);
}
