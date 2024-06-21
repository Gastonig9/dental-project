/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Appointment, Dentist, Patient } from '@prisma/client';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmEmail(
    patient: Patient,
    appointmentInfo: Appointment,
    dentist: Dentist,
  ) {
    const sumHoursToDate = new Date(appointmentInfo.date);
    sumHoursToDate.setHours(sumHoursToDate.getHours() + 3);
    this.mailerService.sendMail({
      from: 'DataJob',
      to: patient.pEmail,
      subject: 'Se ha confirmado tu turno',
      html: `<h1>¡Hola, ${patient.name}!</h1>
               <br></br/>
               <p>El turno ha sido confirmado</p>
               <br></br/>
               <p><b>Informacion del turno:<b></p>
               <br></br/>
               <ul>
                 <li>Dentista: Dr. ${dentist.fullname}</li/>
                 <li>Razon: ${appointmentInfo.reason}</li/>
                 <li>Fecha del turno: ${sumHoursToDate.toDateString()}</li/>
               </ul/>
               <small><b>No responder a este correo</b></small>
               <h3>¡Muchas gracias por elegirnos !</h3>`,
    });
  }

  async sendReminderEmail(patient: Patient, appointment: Appointment) {
    const sumHoursToDate = new Date(appointment.date);
    sumHoursToDate.setHours(sumHoursToDate.getHours() + 3);
    this.mailerService.sendMail({
      from: 'DataJob',
      to: patient.pEmail,
      subject: 'Recordatorio de turno',
      html: `<h1>¡Hola, ${patient.name}!</h1>
           <p>Este es un recordatorio para tu turno programado.</p>
           <p><b>Información del turno:</b></p>
           <ul>
             <li>Fecha: ${sumHoursToDate.toLocaleString()}</li>
             <li>Razón: ${appointment.reason}</li>
           </ul>
           <small><b>No responder a este correo</b></small>
           <p>¡Gracias por elegirnos!</p>`,
    });
  }
}
