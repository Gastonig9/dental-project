import { Module } from '@nestjs/common';
import { AppointmentModule } from './modules/appointments/appointment.module';
import { PatientModule } from './modules/patients/patients.module';
import { DentistModule } from './modules/dentists/dentist.module';
import { UserModule } from './modules/user/user.module';
import { SecretaryModule } from './modules/secretary/secretary.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PatientModule,
    DentistModule,
    SecretaryModule,
    AppointmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
