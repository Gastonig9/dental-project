/*
  Warnings:

  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_patientId_fkey";

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "odontograma" TEXT;

-- DropTable
DROP TABLE "Service";
