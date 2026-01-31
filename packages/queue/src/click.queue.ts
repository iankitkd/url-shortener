import { Queue } from 'bullmq';
import { queueConnection } from './connection.js';

export const CLICK_QUEUE_NAME = 'click-events';

export interface ClickJobData {
  shortUrlId: string;
  ip?: string;
  userAgent?: string;
}

export const clickQueue = new Queue<ClickJobData>(CLICK_QUEUE_NAME, {
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
