/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentRepository } from './appointment.repository';
import { AppointmentService } from './appointment.service';
import { AppContextModule } from 'src/prisma/prisma.module';
import { PatientService } from '../patients/patients.service';
import { PatientRepository } from '../patients/patients.repository';
import { DentistService } from '../dentists/dentist.service';
import { DentistRepository } from '../dentists/dentist.repository';
import { EmailService } from 'src/utils/email.service';

@Module({
  imports: [AppContextModule],
  controllers: [AppointmentController],
  providers: [AppointmentRepository, AppointmentService, PatientService, PatientRepository, DentistService, DentistRepository, EmailService],
})
export class AppointmentModule {}
