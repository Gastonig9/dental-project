import { Injectable } from '@nestjs/common';
import { Appointment } from '@prisma/client';
import { AppointmentRequestDto } from 'src/dtos';
import { Context } from 'src/prisma/prisma.context';

@Injectable()
export class AppointmentRepository {
  constructor(private readonly context: Context) {}

  async GetAllAppointments(): Promise<Appointment[]> {
    return this.context.appointment.findMany();
  }

  async AddAppointment(data: AppointmentRequestDto): Promise<Appointment> {
    return this.context.appointment.create({ data });
  }

  async GetAppointmentById(id: number): Promise<Appointment> {
    return this.context.appointment.findFirst({ where: { id } });
  }

  async deleteAppointmentById(id: number): Promise<Appointment> {
    return this.context.appointment.delete({ where: { id } });
  }
}
