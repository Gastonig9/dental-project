import { Injectable } from '@nestjs/common';
import { DentistRepository } from './dentist.repository';
import { Appointment, Dentist } from '@prisma/client';
import { DentistDto } from 'src/dtos';

@Injectable()
export class DentistService {
  constructor(private readonly repository: DentistRepository) {}

  async addDentist(data: DentistDto): Promise<Dentist> {
    return this.repository.addDentist(data);
  }

  async assignAppointmentToDentist(
    appointmentId: number,
    dentistId: number,
  ): Promise<Dentist> {
    return this.repository.assignAppointmentToDentist(appointmentId, dentistId);
  }

  async findDentist(id: number): Promise<Dentist> {
    return this.repository.getDentistById(id);
  }

  async getAllDentist(): Promise<Dentist[]> {
    return this.repository.getAllDentist();
  }

  async getAppointmentsByDentistId({
    id,
  }: {
    id: number;
  }): Promise<Appointment[]> {
    return this.repository.getAppointmentsByDentistId({ id });
  }
}
