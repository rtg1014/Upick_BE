/*
  Warnings:

  - You are about to drop the `MerchandiseComment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `key` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MerchandiseComment" DROP CONSTRAINT "MerchandiseComment_merchandiseId_fkey";

-- DropForeignKey
ALTER TABLE "MerchandiseComment" DROP CONSTRAINT "MerchandiseComment_pharmacistId_fkey";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "key" TEXT NOT NULL;

-- DropTable
DROP TABLE "MerchandiseComment";

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "positive" TEXT NOT NULL,
    "negative" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "pharmacistId" INTEGER NOT NULL,
    "merchandiseId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_merchandiseId_fkey" FOREIGN KEY ("merchandiseId") REFERENCES "Merchandise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_pharmacistId_fkey" FOREIGN KEY ("pharmacistId") REFERENCES "Pharmacist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
