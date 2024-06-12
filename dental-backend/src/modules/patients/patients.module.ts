import { Module } from '@nestjs/common';
import { AppContextModule } from 'src/prisma/prisma.module';
import { PatientController } from './patients.controller';
import { PatientRepository } from './patients.repository';
import { PatientService } from './patients.service';

@Module({
  imports: [AppContextModule],
  controllers: [PatientController],
  providers: [PatientRepository, PatientService],
})
export class PatientModule {}
