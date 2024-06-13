import { Module } from '@nestjs/common';
import { AppointmentModule } from './modules/appointments/appointment.module';
import { PatientModule } from './modules/patients/patients.module';
import { DentistModule } from './modules/dentists/dentist.module';
import { UserModule } from './modules/user/user.module';
import { SecretaryModule } from './modules/secretary/secretary.module';

@Module({
  imports: [
    AppointmentModule,
    PatientModule,
    DentistModule,
    UserModule,
    SecretaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
