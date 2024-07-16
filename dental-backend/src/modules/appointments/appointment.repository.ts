/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { $Enums, Appointment } from '@prisma/client';
import { AppointmentRequestDto } from 'src/dtos';
import { UpdateAppointmentDto } from 'src/dtos/update-appointment.to';
import { Context } from 'src/prisma/prisma.context';

@Injectable()
export class AppointmentRepository {
  constructor(private readonly context: Context) {}

  async GetAllAppointments(): Promise<Appointment[]> {
    return this.context.appointment.findMany({
      orderBy: {
        date: 'asc',
      },
      include: {
        patient: true,
        dentist: true,
      },
    });
  }

  async AddAppointment(data: AppointmentRequestDto): Promise<Appointment> {
    return this.context.appointment.create({ data });
  }

  async GetAppointmentById(id: number): Promise<Appointment> {
    return this.context.appointment.findFirst({ where: { id } });
  }

  async checkDentistAvailability(dentistId: number, date: Date) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setMinutes(endDate.getMinutes() + 1);

    const appointments = await this.context.appointment.findMany({
      where: {
        dentistId,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
    });
    return appointments;
  }

  async updateAppointment(id: number, data: UpdateAppointmentDto) {
    return this.context.appointment.update({
      where: { id },
      data
    });
  }

  async updateAppointmentState(
    id: number,
    state: $Enums.AppointmentState,
  ): Promise<Appointment> {
    return this.context.appointment.update({
      where: { id },
      data: { state },
    });
  }

  async deleteAppointmentById(id: number): Promise<Appointment> {
    return this.context.appointment.delete({ where: { id } });
  }
}
