import { ANALYTICS_JOB_NAME, analyticsQueue } from "@repo/queue";

export async function bootstrapAnalyticsScheduler() {
  const ANALYTICS_JOB_ID = "analytics-scheduler";

  await analyticsQueue.upsertJobScheduler(
    ANALYTICS_JOB_ID,
    {
      every: 5 * 60 * 1000,
    },
    {
      name: ANALYTICS_JOB_NAME
    }
  );
}
