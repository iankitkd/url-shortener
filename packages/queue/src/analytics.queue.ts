import { Queue } from 'bullmq';
import { queueConnection } from './connection.js';

export const ANALYTICS_QUEUE_NAME = 'analytics-queue';
export const ANALYTICS_JOB_NAME = 'analytics-job';

export const analyticsQueue = new Queue(ANALYTICS_QUEUE_NAME, {
  connection: queueConnection,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
  },
});
