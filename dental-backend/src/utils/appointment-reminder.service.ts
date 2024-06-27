/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import * as cron from 'node-cron';
import { EmailService } from './email.service';
import { AppointmentService } from 'src/modules/appointments/appointment.service';
import { PatientService } from 'src/modules/patients/patients.service';
import { WhatsappService } from './whatsapp.service';

@Injectable()
export class AppointmentReminderService {
  private readonly logger = new Logger(AppointmentReminderService.name);

  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly patientService: PatientService,
    private readonly emailService: EmailService,
  ) {
    cron.schedule('* * * * *', () => {
      this.logger.debug(
        'Ejecutando tarea de recordatorio de citas cada minuto',
      );
      this.sendAppointmentReminders();
    });
  }

  async sendAppointmentReminders() {
    try {
      const minutesBeforeReminder = 3;
      const now = new Date();
      const appointments = await this.appointmentService.getAllAppointments();

      if (appointments.length > 0) {
        for (const appointment of appointments) {
          //En las dos lineas siguientes, parece estar habiendo un error al obtener el horario de la date: se le restan 3 horas al horario original
          // Por lo cual, momentaneamente se le agregan 3 horas
          const adjustedAppointmentDate = new Date(appointment.date);
          adjustedAppointmentDate.setHours(
            adjustedAppointmentDate.getHours() + 3,
          );

          const nowHours = now.getHours();
          const nowMinutes = now.getMinutes();
          const appointmentHours = adjustedAppointmentDate.getHours();
          const appointmentMinutes = adjustedAppointmentDate.getMinutes();

          const timeDifference =
            appointmentHours * 60 +
            appointmentMinutes -
            (nowHours * 60 + nowMinutes);

          this.logger.debug(
            `Comprobando cita: ${adjustedAppointmentDate.toLocaleString()}`,
          );
          this.logger.debug(`Diferencia en minutos: ${timeDifference}`);

          if (
            timeDifference === minutesBeforeReminder &&
            timeDifference > 0 &&
            this.isSameDay(now, adjustedAppointmentDate)
          ) {
            const patient = await this.patientService.getPatient(
              appointment.patientId,
            );
            await this.emailService.sendReminderEmail(patient, appointment);
            this.logger.debug(`Recordatorio enviado a: ${patient.pEmail}`);
          } else {
            this.logger.debug(
              `Cita no cumple la condición para recordatorio: ${appointment.date}`,
            );
          }
        }
      } else {
        return;
      }
    } catch (error) {
      this.logger.error('Error al enviar recordatorios de citas', error.stack);
    }
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
