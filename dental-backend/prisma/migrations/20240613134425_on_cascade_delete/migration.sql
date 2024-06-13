-- DropForeignKey
ALTER TABLE "Dentist" DROP CONSTRAINT "Dentist_userId_fkey";

-- DropForeignKey
ALTER TABLE "Secretary" DROP CONSTRAINT "Secretary_userId_fkey";

-- AddForeignKey
ALTER TABLE "Dentist" ADD CONSTRAINT "Dentist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Secretary" ADD CONSTRAINT "Secretary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
