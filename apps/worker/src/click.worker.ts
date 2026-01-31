import { Worker } from "bullmq";
import { CLICK_QUEUE_NAME, ClickJobData, queueConnection } from "@repo/queue";
import { ClickEventRepository, ShortUrlRepository } from "@repo/db";

const clickEventrepository = new ClickEventRepository();
const shortUrlrepository = new ShortUrlRepository();

export const clickWorker = new Worker<ClickJobData>(
  CLICK_QUEUE_NAME,
  async (job) => {
    const { shortUrlId, ip, userAgent } = job.data;

    await clickEventrepository.create({
      shortUrlId,
      ip,
      userAgent,
    });

    await shortUrlrepository.increaseClicksCount(shortUrlId);
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
