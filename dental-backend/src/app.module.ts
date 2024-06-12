import { Module } from '@nestjs/common';
import { AppointmentModule } from './modules/appointments/appointment.module';
import { PatientModule } from './modules/patients/patients.module';
import { DentistModule } from './modules/dentists/dentist.module';

@Module({
  imports: [AppointmentModule, PatientModule, DentistModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
