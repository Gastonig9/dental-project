-- CreateEnum
CREATE TYPE "EnumRoles" AS ENUM ('OWNER', 'ASSOCIATED', 'SECRETARY', 'CLIENT');

-- CreateEnum
CREATE TYPE "EnumInfoBoolean" AS ENUM ('SI', 'NO', 'SIN_INFORMACION');

-- CreateEnum
CREATE TYPE "AppointmentState" AS ENUM ('PENDING', 'CANCEL', 'REALIZED');

-- CreateEnum
CREATE TYPE "PrestationState" AS ENUM ('PENDING', 'REALIZED');

-- CreateEnum
CREATE TYPE "Parts" AS ENUM ('center', 'top', 'bottom', 'left', 'right');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dni" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "resetPasswordToken" TEXT,
    "role_name" "EnumRoles" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "name" "EnumRoles" NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dentist" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "notes" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Dentist_pkey" PRIMARY KEY ("id")
);

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
    "attendance" TEXT,
    "takeSomeMedication" TEXT,
    "pains" "EnumInfoBoolean" NOT NULL,
    "blowToTeeth" TEXT,
    "dentalMobility" "EnumInfoBoolean" NOT NULL,
    "swollenFace" "EnumInfoBoolean" NOT NULL,
    "injuries" "EnumInfoBoolean" NOT NULL,
    "observations" TEXT,

    CONSTRAINT "MedicalHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "pEmail" TEXT NOT NULL,
    "dni" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "age" INTEGER,
    "addressNumber" INTEGER,
    "floor" TEXT,
    "street" TEXT,
    "nationality" TEXT,
    "locality" TEXT,
    "establishment" TEXT,
    "socialWork" TEXT,
    "apartment" TEXT,
    "birthDate" TEXT,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prestations" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "state" "PrestationState" NOT NULL,
    "date" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "observations" TEXT,

    CONSTRAINT "Prestations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Odontogram" (
    "id" SERIAL NOT NULL,
    "prestationId" INTEGER NOT NULL,
    "toothNumber" INTEGER NOT NULL,
    "parts" "Parts"[],
    "ref" TEXT NOT NULL,

    CONSTRAINT "Odontogram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Secretary" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Secretary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dentistId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "state" "AppointmentState" NOT NULL,
    "results" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "odontograma" TEXT,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_dni_key" ON "User"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_name_key" ON "Roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Dentist_userId_key" ON "Dentist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Secretary_userId_key" ON "Secretary"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_userId_key" ON "Owner"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_name_fkey" FOREIGN KEY ("role_name") REFERENCES "Roles"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dentist" ADD CONSTRAINT "Dentist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalHistory" ADD CONSTRAINT "MedicalHistory_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prestations" ADD CONSTRAINT "Prestations_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Odontogram" ADD CONSTRAINT "Odontogram_prestationId_fkey" FOREIGN KEY ("prestationId") REFERENCES "Prestations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Secretary" ADD CONSTRAINT "Secretary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "Dentist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
