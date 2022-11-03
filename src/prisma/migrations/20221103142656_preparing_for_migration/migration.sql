/*
  Warnings:

  - The `gender` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender";
