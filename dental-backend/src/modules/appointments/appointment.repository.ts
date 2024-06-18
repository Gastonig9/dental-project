/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { $Enums, Appointment } from '@prisma/client';
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

  async CheckDentistAvailability(dentistId: number, date: Date) {
    const appointments = await this.context.appointment.findMany({
      where: {
        dentistId,
        date,
      },
    });
    return appointments;
  }

  async updateAppointmentState(id: number, state: $Enums.AppointmentState): Promise<Appointment> {
    return this.context.appointment.update({
      where: { id },
      data: { state },
    });
  }

  async deleteAppointmentById(id: number): Promise<Appointment> {
    return this.context.appointment.delete({ where: { id } });
  }
}
