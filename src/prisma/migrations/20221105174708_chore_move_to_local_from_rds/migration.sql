/*
  Warnings:

  - You are about to drop the column `merchandiseId` on the `Posting` table. All the data in the column will be lost.
  - You are about to drop the `CustomerToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CustomerToTag" DROP CONSTRAINT "CustomerToTag_customerId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerToTag" DROP CONSTRAINT "CustomerToTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "Posting" DROP CONSTRAINT "Posting_merchandiseId_fkey";

-- AlterTable
ALTER TABLE "Posting" DROP COLUMN "merchandiseId";

-- DropTable
DROP TABLE "CustomerToTag";

-- CreateTable
CREATE TABLE "CustomerPickUps" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,
    "merchandiseId" INTEGER NOT NULL,
    "pharmacyName" TEXT NOT NULL,
    "pharmacyAdress" TEXT NOT NULL,
    "pickableAt" TIMESTAMP(3) NOT NULL,
    "isPicked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CustomerPickUps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerToConsider" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,
    "considerId" INTEGER NOT NULL,

    CONSTRAINT "CustomerToConsider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consider" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchandiseToPosting" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "merchandiseId" INTEGER NOT NULL,
    "postingId" INTEGER NOT NULL,

    CONSTRAINT "MerchandiseToPosting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomerPickUps" ADD CONSTRAINT "CustomerPickUps_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerPickUps" ADD CONSTRAINT "CustomerPickUps_merchandiseId_fkey" FOREIGN KEY ("merchandiseId") REFERENCES "Merchandise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerToConsider" ADD CONSTRAINT "CustomerToConsider_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerToConsider" ADD CONSTRAINT "CustomerToConsider_considerId_fkey" FOREIGN KEY ("considerId") REFERENCES "Consider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchandiseToPosting" ADD CONSTRAINT "MerchandiseToPosting_merchandiseId_fkey" FOREIGN KEY ("merchandiseId") REFERENCES "Merchandise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchandiseToPosting" ADD CONSTRAINT "MerchandiseToPosting_postingId_fkey" FOREIGN KEY ("postingId") REFERENCES "Posting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
