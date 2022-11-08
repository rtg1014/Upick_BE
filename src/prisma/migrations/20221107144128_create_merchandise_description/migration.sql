/*
  Warnings:

  - Added the required column `description` to the `Merchandise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Merchandise" ADD COLUMN     "description" TEXT NOT NULL;
