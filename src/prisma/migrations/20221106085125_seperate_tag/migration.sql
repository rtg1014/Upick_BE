/*
  Warnings:

  - You are about to drop the `PostingToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostingToTag" DROP CONSTRAINT "PostingToTag_postingId_fkey";

-- DropForeignKey
ALTER TABLE "PostingToTag" DROP CONSTRAINT "PostingToTag_tagId_fkey";

-- AlterTable
ALTER TABLE "Posting" ADD COLUMN     "gender" "Gender";

-- DropTable
DROP TABLE "PostingToTag";

-- CreateTable
CREATE TABLE "PostingToConsider" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postingId" INTEGER NOT NULL,
    "considerId" INTEGER NOT NULL,

    CONSTRAINT "PostingToConsider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostingToIngredient" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postingId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "PostingToIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostingToAgeRange" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postingId" INTEGER NOT NULL,
    "ageRangeId" INTEGER NOT NULL,

    CONSTRAINT "PostingToAgeRange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgeRange" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AgeRange_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostingToConsider" ADD CONSTRAINT "PostingToConsider_postingId_fkey" FOREIGN KEY ("postingId") REFERENCES "Posting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostingToConsider" ADD CONSTRAINT "PostingToConsider_considerId_fkey" FOREIGN KEY ("considerId") REFERENCES "Consider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostingToIngredient" ADD CONSTRAINT "PostingToIngredient_postingId_fkey" FOREIGN KEY ("postingId") REFERENCES "Posting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostingToIngredient" ADD CONSTRAINT "PostingToIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostingToAgeRange" ADD CONSTRAINT "PostingToAgeRange_postingId_fkey" FOREIGN KEY ("postingId") REFERENCES "Posting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostingToAgeRange" ADD CONSTRAINT "PostingToAgeRange_ageRangeId_fkey" FOREIGN KEY ("ageRangeId") REFERENCES "AgeRange"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
