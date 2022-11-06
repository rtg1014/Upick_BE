/*
  Warnings:

  - You are about to drop the column `tagId` on the `MerchandiseEffect` table. All the data in the column will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `effectId` to the `MerchandiseEffect` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MerchandiseEffect" DROP CONSTRAINT "MerchandiseEffect_tagId_fkey";

-- AlterTable
ALTER TABLE "MerchandiseEffect" DROP COLUMN "tagId",
ADD COLUMN     "effectId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "Effect" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Effect_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MerchandiseEffect" ADD CONSTRAINT "MerchandiseEffect_effectId_fkey" FOREIGN KEY ("effectId") REFERENCES "Effect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
