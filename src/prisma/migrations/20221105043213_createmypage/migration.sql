/*
  Warnings:

  - You are about to drop the column `nickname` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the `Disease` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TakingExcerciseTimePerAWeek" AS ENUM ('none', 'one', 'twoOrThree', 'fourOrFive', 'every');

-- DropForeignKey
ALTER TABLE "Disease" DROP CONSTRAINT "Disease_customerId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "nickname",
ADD COLUMN     "isBreastFeed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPregnant" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT;

-- DropTable
DROP TABLE "Disease";

-- CreateTable
CREATE TABLE "CustomerDetails" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "takingExcerciseTimePerAWeek" "TakingExcerciseTimePerAWeek",
    "stroke" BOOLEAN NOT NULL DEFAULT false,
    "heartDisease" BOOLEAN NOT NULL DEFAULT false,
    "highBloodPressure" BOOLEAN NOT NULL DEFAULT false,
    "diabetes" BOOLEAN NOT NULL DEFAULT false,
    "etc" BOOLEAN NOT NULL DEFAULT false,
    "memo" TEXT,

    CONSTRAINT "CustomerDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomerDetails" ADD CONSTRAINT "CustomerDetails_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
