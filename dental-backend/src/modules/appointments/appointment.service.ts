import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from './appointment.repository';
import { Appointment } from '@prisma/client';
import { AppointmentRequestDto } from 'src/dtos';

@Injectable()
export class AppointmentService {
  constructor(private readonly repository: AppointmentRepository) {}

  async getAppointment(id: number): Promise<Appointment> {
    return this.repository.GetAppointmentById(id);
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return this.repository.GetAllAppointments();
  }

  async addAppointment(
    appointment: AppointmentRequestDto,
  ): Promise<Appointment> {
    return this.repository.AddAppointment(appointment);
  }

  async deleteAppointment(id: number): Promise<Appointment> {
    return this.repository.deleteAppointmentById(id);
  }
}
