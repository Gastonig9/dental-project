/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Appointment, Dentist, Patient } from '@prisma/client';
import { AppointmentRequestDto } from 'src/dtos';
import { UpdateAppointmentDto } from 'src/dtos/update-appointment.to';
import { format, toZonedTime } from 'date-fns-tz';
import { es } from 'date-fns/locale';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) { }

  async sendConfirmEmail(
    patient: Patient,
    appointmentInfo: AppointmentRequestDto,
    dentist: Dentist,
  ) {
    const appointmentDate = new Date(appointmentInfo.date);
    const timeZone = 'America/Argentina/Buenos_Aires';
    const zonedDate = toZonedTime(appointmentDate, timeZone);
    const formattedDate = format(zonedDate, "d 'de' MMMM 'de' yyyy 'a las' HH:mm'h'", { timeZone, locale: es });
    this.mailerService.sendMail({
      from: 'Consultorio Grinpol',
      to: patient.pEmail,
      subject: 'Se ha confirmado tu turno',
      html: `
      <div style="width: 100%; text-align: center;">
           <div style="width: 100%;">
             <img src="https://i.ibb.co/2knF9Wc/grinpol.jpg" style="width: 25%;" />
           </div>
           <h1 style="font-size: 2rem; text-align: center; margin-top: 1rem;">¡Hola, ${patient.name}!</h1>
           <p style="font-size: 1rem; margin: 1rem 0;">Te informamos que tu turno ha sido confirmado.</p>
           <p style="font-size: 1rem; margin: 1rem 0;"><b>Información del turno:</b></p>
           <ul style="list-style-type: none; padding: 0; font-size: 1rem; text-align: left; display: inline-block; margin: 0 auto;">
             <li style="margin-bottom: 0.5rem;">Fecha: ${formattedDate}</li>
             <li style="margin-bottom: 0.5rem;">Razón: ${appointmentInfo.reason}</li>
             <li style="margin-bottom: 0.5rem;">Asignado: Dr. ${dentist.fullname}</li>
           </ul>
           <p style="font-size: 0.8rem; margin: 1rem 0;"><b>No responder a este correo</b></p>
            <p style="font-size: 1rem; margin: 1rem 0;">¡Gracias por elegirnos!</p>
      </div>
      `,
    });
  }

  async sendCancelEmail(
    patient: Patient,
    appointmentInfo: AppointmentRequestDto,
  ) {
    const appointmentDate = new Date(appointmentInfo.date);
    const timeZone = 'America/Argentina/Buenos_Aires';
    const zonedDate = toZonedTime(appointmentDate, timeZone);
    const formattedDate = format(zonedDate, "d 'de' MMMM 'de' yyyy 'a las' HH:mm'h'", { timeZone, locale: es });
  
    this.mailerService.sendMail({
      from: 'Consultorio Grinpol',
      to: patient.pEmail,
      subject: 'Se ha cancelado tu turno',
      html: `
        <div style="width: 100%; text-align: center;">
          <div style="width: 100%;">
            <img src="https://i.ibb.co/2knF9Wc/grinpol.jpg" style="width: 25%;" />
          </div>
          <h1 style="font-size: 2rem; text-align: center; margin-top: 1rem;">¡Hola, ${patient.name}!</h1>
          <p style="font-size: 1rem; margin: 1rem 0;">Te informamos que tu turno ha sido cancelado.</p>
          <p style="font-size: 1rem; margin: 1rem 0;"><b>Información del turno:</b></p>
          <ul style="list-style-type: none; padding: 0; font-size: 1rem; text-align: left; display: inline-block; margin: 0 auto;">
            <li style="margin-bottom: 0.5rem;">Fecha: ${formattedDate}</li>
            <li style="margin-bottom: 0.5rem;">Razón: ${appointmentInfo.reason}</li>
          </ul>
          <p style="font-size: 0.8rem; margin: 1rem 0;"><b>No responder a este correo</b></p>
          <p style="font-size: 1rem; margin: 1rem 0;">¡Gracias por elegirnos!</p>
        </div>
      `,
    });
  }

  async sendReminderEmail(patient: Patient, appointment: Appointment) {
    const appointmentDate = new Date(appointment.date);
    const timeZone = 'America/Argentina/Buenos_Aires';
    const zonedDate = toZonedTime(appointmentDate, timeZone);
    const formattedDate = format(zonedDate, "d 'de' MMMM 'de' yyyy 'a las' HH:mm'h'", { timeZone, locale: es });
    this.mailerService.sendMail({
      from: 'Consultorio Grinpol',
      to: patient.pEmail,
      subject: 'Recordatorio de turno',
      html: `
        <div style="width: 100%; text-align: center;">
          <div style="width: 100%;">
            <img src="https://i.ibb.co/2knF9Wc/grinpol.jpg" style="width: 25%;" />
          </div>
          <h1 style="font-size: 2rem; text-align: center; margin-top: 1rem;">¡Hola, ${patient.name}!</h1>
          <p style="font-size: 1rem; margin: 1rem 0;">Este es un recordatorio para tu turno programado.</p>
          <p style="font-size: 1rem; margin: 1rem 0;"><b>Información del turno:</b></p>
          <ul style="list-style-type: none; padding: 0; font-size: 1rem; text-align: left; display: inline-block; margin: 0 auto;">
            <li style="margin-bottom: 0.5rem;">Fecha: ${formattedDate}</li>
            <li style="margin-bottom: 0.5rem;">Razón: ${appointment.reason}</li>
          </ul>
          <p style="font-size: 0.8rem; margin: 1rem 0;"><b>No responder a este correo</b></p>
          <p style="font-size: 1rem; margin: 1rem 0;">¡Gracias por elegirnos!</p>
        </div>
      `,
    });
  }

  async sendUpdateEmail(lastAppointment: Appointment, updateAppointment: UpdateAppointmentDto, patient: Patient, lastDentist: Dentist, newDentist: Dentist) {
    const lastAappointmentDate = new Date(lastAppointment.date);
    const newAppointmentDate = new Date(updateAppointment.date)
    const timeZone = 'America/Argentina/Buenos_Aires';

    const zonedDateLast = toZonedTime(lastAappointmentDate, timeZone);
    const zonedDateNew = toZonedTime(newAppointmentDate, timeZone);
    const formattedDateLast = format(zonedDateLast, "d 'de' MMMM 'de' yyyy 'a las' HH:mm'h'", { timeZone, locale: es });
    const formattedDateNew = format(zonedDateNew, "d 'de' MMMM 'de' yyyy 'a las' HH:mm'h'", { timeZone, locale: es });
    this.mailerService.sendMail({
      from: 'Consultorio Grinpol',
      to: patient.pEmail,
      subject: 'Se ha confirmado tu turno',
      html: `
      <div style="width: 100%; text-align: center;">
           <div style="width: 100%;">
             <img src="https://i.ibb.co/2knF9Wc/grinpol.jpg" style="width: 25%;" />
           </div>
           <h1 style="font-size: 2rem; text-align: center; margin-top: 1rem;">¡Hola, ${patient.name}!</h1>
           <p style="font-size: 1rem; margin: 1rem 0;">Hemos actualizado el turno que tenias en la fecha ${formattedDateLast} con el Dr. ${lastDentist.fullname}.</p>
           <p style="font-size: 1rem; margin: 1rem 0;"><b>Esta es la nueva información del turno:</b></p>
           <ul style="list-style-type: none; padding: 0; font-size: 1rem; text-align: left; display: inline-block; margin: 0 auto;">
             <li style="margin-bottom: 0.5rem;">Nueva fecha: ${formattedDateNew}</li>
             <li style="margin-bottom: 0.5rem;">Razón: ${lastAppointment.reason}</li>
             <li style="margin-bottom: 0.5rem;">Asignado: Dr. ${newDentist.fullname}</li>
           </ul>
           <p style="font-size: 0.8rem; margin: 1rem 0;"><b>No responder a este correo</b></p>
            <p style="font-size: 1rem; margin: 1rem 0;">¡Gracias por elegirnos!</p>
      </div>
      `,
    });
  }

  async sendResetPasswordEmail({
    email,
    resetPasswordToken,
  }: {
    email: string;
    resetPasswordToken: string;
  }) {
    this.mailerService.sendMail({
      from: 'foofakesender@outlook.com',
      to: email,
      subject: 'Restauracion de Contraseña',
      html: `<h2>!Restauracion de Contraseña!</h2>
        
         <p><a href='${process.env.FRONT_DEPLOY}/user/reset-password?token=${resetPasswordToken}' target='_blank'>Restaurar Contraseña</a></p>
           
           <small><b>No responder a este correo</b></small>`,
    });
  }
}
