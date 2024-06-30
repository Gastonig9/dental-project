/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppointmentModule } from './modules/appointments/appointment.module';
import { PatientModule } from './modules/patients/patients.module';
import { DentistModule } from './modules/dentists/dentist.module';
import { UserModule } from './modules/user/user.module';
import { SecretaryModule } from './modules/secretary/secretary.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { RecordModule } from './modules/record/record.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PatientModule,
    DentistModule,
    SecretaryModule,
    AppointmentModule,
    RecordModule,
    MailerModule.forRoot({
      transport: {
        service: process.env.service,
        port: process.env.mailPort,
        secure: false,
        auth: {
          user: process.env.userMail,
          pass: process.env.passMail,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
