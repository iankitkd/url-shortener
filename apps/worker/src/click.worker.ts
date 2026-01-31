import { Worker } from "bullmq";
import { CLICK_QUEUE_NAME, ClickJobData, queueConnection } from "@repo/queue";
import { clickEventRepository } from "@repo/db";

export const clickWorker = new Worker<ClickJobData>(
  CLICK_QUEUE_NAME,
  async (job) => {
    const { shortUrlId, ip, userAgent } = job.data;

    await clickEventRepository.create({
      shortUrlId,
      ip,
      userAgent,
    });
  },
  {
    connection: queueConnection,
  },
);

clickWorker.on("completed", (job) => {
  console.log(`Click processed: ${job.id}`);
});

clickWorker.on("failed", (job, err) => {
  console.error(`Click failed: ${job?.id}`, err);
});
