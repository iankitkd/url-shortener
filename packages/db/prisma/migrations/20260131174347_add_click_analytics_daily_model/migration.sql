/*
  Warnings:

  - You are about to drop the column `clicks` on the `ShortUrl` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ShortUrl" DROP COLUMN "clicks";

-- CreateTable
CREATE TABLE "ClickAnalyticsDaily" (
    "id" TEXT NOT NULL,
    "shortUrlId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalClicks" INTEGER NOT NULL DEFAULT 0,
    "uniqueVisitors" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ClickAnalyticsDaily_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ClickAnalyticsDaily_shortUrlId_idx" ON "ClickAnalyticsDaily"("shortUrlId");

-- CreateIndex
CREATE UNIQUE INDEX "ClickAnalyticsDaily_shortUrlId_date_key" ON "ClickAnalyticsDaily"("shortUrlId", "date");

-- AddForeignKey
ALTER TABLE "ClickAnalyticsDaily" ADD CONSTRAINT "ClickAnalyticsDaily_shortUrlId_fkey" FOREIGN KEY ("shortUrlId") REFERENCES "ShortUrl"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
