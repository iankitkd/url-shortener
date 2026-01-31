import "dotenv/config";

import "./click.worker.js";

async function start() {
  console.log("Worker started and listening for jobs...");
}

start();