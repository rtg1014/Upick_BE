-- CreateTable
CREATE TABLE "Disease" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TakingMedicine" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "merchandiseId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TakingMedicine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TakingMedicine_merchandiseId_customerId_key" ON "TakingMedicine"("merchandiseId", "customerId");

-- AddForeignKey
ALTER TABLE "Disease" ADD CONSTRAINT "Disease_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TakingMedicine" ADD CONSTRAINT "TakingMedicine_merchandiseId_fkey" FOREIGN KEY ("merchandiseId") REFERENCES "Merchandise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TakingMedicine" ADD CONSTRAINT "TakingMedicine_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
