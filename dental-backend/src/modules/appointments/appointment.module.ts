import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentRepository } from './appointment.repository';
import { AppointmentService } from './appointment.service';
import { AppContextModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AppContextModule],
  controllers: [AppointmentController],
  providers: [AppointmentRepository, AppointmentService],
})
export class AppointmentModule {}
