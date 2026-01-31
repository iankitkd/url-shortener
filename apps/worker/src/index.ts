import "dotenv/config";

import "./click.worker.js";
import "./analytics.worker.js";
import { bootstrapAnalyticsScheduler } from "./analytics.scheduler.js";

async function start() {
  try {
    await bootstrapAnalyticsScheduler();
    console.log("Worker started and listening for jobs...");
  } catch (error) {
    console.error("Worker failed to start", error);
    process.exit(1);
  }
}

start();