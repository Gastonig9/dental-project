-- CreateEnum
CREATE TYPE "EnumInfoBoolean" AS ENUM ('SI', 'NO', 'SIN_INFORMACION');

-- CreateTable
CREATE TABLE "MedicalHistory" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "someDisease" TEXT NOT NULL,
    "someTreatment" TEXT NOT NULL,
    "consumeMedicaments" TEXT NOT NULL,
    "allergyMedicament" TEXT NOT NULL,
    "operations" TEXT NOT NULL,
    "smokes" "EnumInfoBoolean" NOT NULL,
    "pregnant" "EnumInfoBoolean" NOT NULL,
    "attendance" TEXT NOT NULL,
    "pains" "EnumInfoBoolean" NOT NULL,
    "dentalMobility" "EnumInfoBoolean" NOT NULL,
    "swollenFace" "EnumInfoBoolean" NOT NULL,
    "injuries" "EnumInfoBoolean" NOT NULL,
    "observations" TEXT NOT NULL,

    CONSTRAINT "MedicalHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MedicalHistory" ADD CONSTRAINT "MedicalHistory_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
