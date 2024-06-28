-- AlterTable
ALTER TABLE "MedicalHistory" ADD COLUMN     "blowToTeeth" TEXT,
ADD COLUMN     "takeSomeMedication" TEXT,
ALTER COLUMN "attendance" DROP NOT NULL,
ALTER COLUMN "observations" DROP NOT NULL;
