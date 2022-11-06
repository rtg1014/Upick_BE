/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `CustomerPostingFilter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CustomerPostingFilter_customerId_key" ON "CustomerPostingFilter"("customerId");
