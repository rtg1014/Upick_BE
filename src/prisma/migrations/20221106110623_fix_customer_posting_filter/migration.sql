-- CreateTable
CREATE TABLE "filterToConsider" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerPostingFilterId" INTEGER NOT NULL,
    "considerId" INTEGER NOT NULL,

    CONSTRAINT "filterToConsider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filterToAgeRange" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerPostingFilterId" INTEGER NOT NULL,
    "ageRangeId" INTEGER NOT NULL,

    CONSTRAINT "filterToAgeRange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filterToIngredient" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerPostingFilterId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "filterToIngredient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "filterToConsider" ADD CONSTRAINT "filterToConsider_customerPostingFilterId_fkey" FOREIGN KEY ("customerPostingFilterId") REFERENCES "CustomerPostingFilter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filterToConsider" ADD CONSTRAINT "filterToConsider_considerId_fkey" FOREIGN KEY ("considerId") REFERENCES "Consider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filterToAgeRange" ADD CONSTRAINT "filterToAgeRange_customerPostingFilterId_fkey" FOREIGN KEY ("customerPostingFilterId") REFERENCES "CustomerPostingFilter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filterToAgeRange" ADD CONSTRAINT "filterToAgeRange_ageRangeId_fkey" FOREIGN KEY ("ageRangeId") REFERENCES "AgeRange"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filterToIngredient" ADD CONSTRAINT "filterToIngredient_customerPostingFilterId_fkey" FOREIGN KEY ("customerPostingFilterId") REFERENCES "CustomerPostingFilter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filterToIngredient" ADD CONSTRAINT "filterToIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
