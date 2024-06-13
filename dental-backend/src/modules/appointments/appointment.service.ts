/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentRepository } from './appointment.repository';
import { Appointment } from '@prisma/client';
import { AppointmentRequestDto } from 'src/dtos';
import { DentistService } from '../dentists/dentist.service';

@Injectable()
export class AppointmentService {
  constructor(private readonly repository: AppointmentRepository, private dentistService: DentistService) { }

  async getAppointment(id: number): Promise<Appointment> {
    return this.repository.GetAppointmentById(id);
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return this.repository.GetAllAppointments();
  }

  async addAppointment(data: AppointmentRequestDto): Promise<Appointment> {
    try {
      const { dentistId, date } = data;
      const dentistAvailability = await this.repository.checkDentistAvailability(dentistId, date);
      if (!dentistAvailability) {
        throw new Error('El dentista no esta disponible en el horario solicitado');
      }
      const appointment = await this.repository.AddAppointment(data);
      return appointment;
    } catch (error) {
      return error
    }

  }

  async checkAvailability(dentistId: number, date: Date): Promise<boolean> {
    const findAppointments = await this.repository.checkDentistAvailability(dentistId, date)
    return findAppointments.length === 0;
  }

  async deleteAppointment(id: number): Promise<Appointment> {
    return this.repository.deleteAppointmentById(id);
  }
}
