-- AlterTable
ALTER TABLE "Merchandise" ALTER COLUMN "rating" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchandiseToIngredient" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quantity" TEXT,
    "mercahndiseId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "merchandiseId" INTEGER NOT NULL,

    CONSTRAINT "MerchandiseToIngredient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MerchandiseToIngredient" ADD CONSTRAINT "MerchandiseToIngredient_merchandiseId_fkey" FOREIGN KEY ("merchandiseId") REFERENCES "Merchandise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchandiseToIngredient" ADD CONSTRAINT "MerchandiseToIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
