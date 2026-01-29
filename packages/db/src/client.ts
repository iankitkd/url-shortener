import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@Prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing at runtime");
}

const adapter = new PrismaPg({ connectionString });

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
