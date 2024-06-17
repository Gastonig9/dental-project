/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { AppointmentRepository } from './appointment.repository';
import { $Enums, Appointment } from '@prisma/client';
import { AppointmentRequestDto } from 'src/dtos';
import { PatientService } from '../patients/patients.service';

@Injectable()
export class AppointmentService {
  constructor(private readonly repository: AppointmentRepository, private patientService: PatientService) { }

  async getAppointment(id: number): Promise<Appointment> {
    return this.repository.GetAppointmentById(id);
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return this.repository.GetAllAppointments();
  }

  async addAppointment(data: AppointmentRequestDto): Promise<Appointment> {
    try {
      const { reason, dentistId, date, patientName, patientSurname, patientEmail, patientGender, patientPhone, patientDni, patientAdress } = data;
      const state = $Enums.AppointmentState.PENDING;

      // Verificar si el paciente ya existe por DNI
      let patient = await this.patientService.getPatientByDni(patientDni);

      if (!patient) {
        // Si el paciente no existe, se agrega a la tabla de Pacientes
        const newPatient = {
          name: patientName,
          surname: patientSurname,
          gender: patientGender,
          dni: patientDni,
          adress: patientAdress,
          phone: patientPhone,
          pEmail: patientEmail
        };

        patient = await this.patientService.addPatient(newPatient);
      }

      // Verificar si ya existe una cita para la misma fecha y dentista
      const verifyDate = await this.repository.checkDentistAvailability(dentistId, new Date(date));
      if (verifyDate.length > 0) {
        throw new ConflictException('Ya hay un turno asignado a esta fecha y dentista');
      }

      // Crear nueva cita
      const newAppointment = {
        state: state,
        results: '',
        reason,
        date,
        dentistId,
        patientId: patient.id,
      };

      return await this.repository.AddAppointment(newAppointment);
    } catch (error) {
      throw error;
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
