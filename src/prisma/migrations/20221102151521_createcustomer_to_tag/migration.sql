-- CreateTable
CREATE TABLE "CustomerToTag" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tagId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "CustomerToTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomerToTag" ADD CONSTRAINT "CustomerToTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerToTag" ADD CONSTRAINT "CustomerToTag_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
