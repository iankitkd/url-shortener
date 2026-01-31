import { FastifyInstance } from 'fastify';
import { AnalyticsController } from './analytics.controller.js';

export async function analyticsRoutes(app: FastifyInstance, controller: AnalyticsController) {
  app.get('/analytics/:shortUrlId', controller.getAnalytics);
}
