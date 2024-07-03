-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "observation" TEXT,
    "code" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "teeth" JSONB NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
