import { ANALYTICS_QUEUE_NAME, queueConnection } from "@repo/queue";
import { Worker } from "bullmq";
import { aggregateDailyClicks } from "./analytics.aggregater";

export const statsWorker = new Worker(
  ANALYTICS_QUEUE_NAME,
  async () => {
    await aggregateDailyClicks();
  },
  { connection: queueConnection },
);


statsWorker.on("completed", (job) => {
  console.log(`Analytics aggregate completed: ${job.id}`)
})

statsWorker.on("failed", (job, err) => {
  console.error(`Analytics aggregate failed: ${job?.id}`, err)
})