/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentRepository } from './appointment.repository';
import { AppointmentService } from './appointment.service';
import { AppContextModule } from 'src/prisma/prisma.module';
import { PatientService } from '../patients/patients.service';
import { PatientRepository } from '../patients/patients.repository';

@Module({
  imports: [AppContextModule],
  controllers: [AppointmentController],
  providers: [AppointmentRepository, AppointmentService, PatientService, PatientRepository],
})
export class AppointmentModule {}
