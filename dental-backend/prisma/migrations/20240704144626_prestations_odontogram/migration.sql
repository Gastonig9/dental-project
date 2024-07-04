/*
  Warnings:

  - You are about to drop the column `odontograma` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "odontograma";

-- CreateTable
CREATE TABLE "Prestations" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "observations" TEXT,

    CONSTRAINT "Prestations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Odontogram" (
    "id" SERIAL NOT NULL,
    "prestationId" INTEGER NOT NULL,
    "toothNum" INTEGER NOT NULL,
    "part" TEXT NOT NULL,
    "ref" TEXT NOT NULL,

    CONSTRAINT "Odontogram_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prestations" ADD CONSTRAINT "Prestations_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Odontogram" ADD CONSTRAINT "Odontogram_prestationId_fkey" FOREIGN KEY ("prestationId") REFERENCES "Prestations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
