import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AppointmentRepository } from './appointment.repository';
import { $Enums, Appointment } from '@prisma/client';
import { AppointmentRequestDto } from 'src/dtos';
import { PatientService } from '../patients/patients.service';
import { DentistService } from '../dentists/dentist.service';
import { EmailService } from 'src/utils/email.service';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly repository: AppointmentRepository,
    private patientService: PatientService,
    private dentistService: DentistService,
    private mailService: EmailService,
  ) {}

  async getAppointment(id: number): Promise<Appointment> {
    return this.repository.GetAppointmentById(id);
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return this.repository.GetAllAppointments();
  }

  async addAppointment(data: AppointmentRequestDto): Promise<Appointment> {
    try {
      const { reason, dentistId, patientId, date } = data;
      const state = $Enums.AppointmentState.PENDING;

      // Verificar si ya existe una cita para la misma fecha y dentista
      const verifyDate = await this.checkAvailability(
        dentistId,
        new Date(date),
      );
      if (!verifyDate) {
        throw new ConflictException(
          'Ya hay un turno asignado para esta fecha y horario',
        );
      }

      // Crear nueva cita
      const newAppointment = {
        state: state,
        results: '',
        reason,
        date,
        dentistId,
        patientId: patientId,
      };

      return await this.repository.AddAppointment(newAppointment);
    } catch (error) {
      throw error;
    }
  }

  async ConfirmAppointment(appointmentId: number): Promise<Appointment> {
    try {
      const appointment = await this.getAppointment(appointmentId);
      if (!appointment) {
        throw new NotFoundException('Appointment not found');
      }

      const confirmState = $Enums.AppointmentState.REALIZED;
      const dentist = await this.dentistService.findDentist(
        appointment.dentistId,
      );
      const patient = await this.patientService.getPatient(
        appointment.patientId,
      );

      if (!patient || !dentist) {
        throw new NotFoundException(
          'No se pudo encontrar al paciente o al dentista',
        );
      }

      // Actualizar el estado del turno
      const updatedAppointment = await this.repository.updateAppointmentState(
        appointmentId,
        confirmState,
      );

      // Asignar el turno confirmado al dentista
      const addAppointmentToDentist =
        await this.dentistService.assignAppointmentToDentist(
          updatedAppointment.id,
          updatedAppointment.dentistId,
        );
      if (!addAppointmentToDentist)
        throw new ConflictException(
          'Ocurrio un error al intentar asignar el turno al dentista',
        );

      // Enviar correo de confirmación
      await this.mailService.sendConfirmEmail(
        patient,
        updatedAppointment,
        dentist,
      );

      return updatedAppointment;
    } catch (error) {
      throw error;
    }
  }

  async checkAvailability(dentistId: number, date: Date): Promise<boolean> {
    const findAppointments = await this.repository.CheckDentistAvailability(
      dentistId,
      date,
    );
    return findAppointments.length === 0;
  }

  async deleteAppointment(id: number): Promise<Appointment> {
    return this.repository.deleteAppointmentById(id);
  }
}

// async addAppointment(data: AppointmentRequestDto): Promise<Appointment> {
//   try {
//     const { reason, dentistId, date, patientName, patientSurname, patientEmail, patientGender, patientPhone, patientDni, patientAdress } = data;
//     const state = $Enums.AppointmentState.PENDING;

//     // Verificar si el paciente ya existe por DNI
//     let patient = await this.patientService.getPatientByDni(patientDni);

//     if (!patient) {
//       // Si el paciente no existe, se agrega a la tabla de Pacientes
//       const newPatient = {
//         name: patientName,
//         surname: patientSurname,
//         gender: patientGender,
//         dni: patientDni,
//         adress: patientAdress,
//         phone: patientPhone,
//         pEmail: patientEmail
//       };

//       patient = await this.patientService.addPatient(newPatient);
//     }

//     // Verificar si ya existe una cita para la misma fecha y dentista
//     // const verifyDate = await this.repository.CheckDentistAvailability(dentistId, new Date(date));
//     // if (verifyDate) {
//     //   throw new ConflictException('Ya hay un turno asignado a esta fecha y dentista');
//     // }

//     // Crear nueva cita
//     const newAppointment = {
//       state: state,
//       results: '',
//       reason,
//       date,
//       dentistId,
//       patientId: patient.id,
//     };

//     return await this.repository.AddAppointment(newAppointment);
//   } catch (error) {
//     throw error;
//   }
// }
