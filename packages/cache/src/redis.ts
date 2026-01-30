import { Redis } from "ioredis";

const redisUrl = process.env.REDIS_URL!;
const prefix = process.env.REDIS_PREFIX ?? "app";

export const redis = new Redis(redisUrl, {
  keyPrefix: `${prefix}:`,
  maxRetriesPerRequest: 3,
  enableOfflineQueue: false,
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});
