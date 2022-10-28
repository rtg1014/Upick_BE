/*
  Warnings:

  - You are about to drop the column `merchandiseId` on the `MerchandiseHowToConsume` table. All the data in the column will be lost.
  - Added the required column `merchandiseHowToConsumeId` to the `Merchandise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MerchandiseHowToConsume" DROP CONSTRAINT "MerchandiseHowToConsume_merchandiseId_fkey";

-- DropIndex
DROP INDEX "MerchandiseHowToConsume_merchandiseId_key";

-- AlterTable
ALTER TABLE "Merchandise" ADD COLUMN     "merchandiseHowToConsumeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MerchandiseHowToConsume" DROP COLUMN "merchandiseId";

-- AddForeignKey
ALTER TABLE "Merchandise" ADD CONSTRAINT "Merchandise_merchandiseHowToConsumeId_fkey" FOREIGN KEY ("merchandiseHowToConsumeId") REFERENCES "MerchandiseHowToConsume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
