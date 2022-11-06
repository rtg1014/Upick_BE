-- AlterTable
ALTER TABLE "AgeRange" ADD COLUMN     "customerPostingFilterId" INTEGER;

-- AlterTable
ALTER TABLE "Consider" ADD COLUMN     "customerPostingFilterId" INTEGER;

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "customerPostingFilterId" INTEGER;

-- CreateTable
CREATE TABLE "CustomerPostingFilter" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,
    "gender" "Gender",

    CONSTRAINT "CustomerPostingFilter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomerPostingFilter" ADD CONSTRAINT "CustomerPostingFilter_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consider" ADD CONSTRAINT "Consider_customerPostingFilterId_fkey" FOREIGN KEY ("customerPostingFilterId") REFERENCES "CustomerPostingFilter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_customerPostingFilterId_fkey" FOREIGN KEY ("customerPostingFilterId") REFERENCES "CustomerPostingFilter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgeRange" ADD CONSTRAINT "AgeRange_customerPostingFilterId_fkey" FOREIGN KEY ("customerPostingFilterId") REFERENCES "CustomerPostingFilter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
