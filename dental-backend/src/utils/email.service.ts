/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Appointment, Dentist, Patient } from '@prisma/client';
import { AppointmentRequestDto } from 'src/dtos';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmEmail(
    patient: Patient,
    appointmentInfo: AppointmentRequestDto,
    dentist: Dentist,
  ) {
    const appointmentDate = new Date(appointmentInfo.date)
    this.mailerService.sendMail({
      from: 'Consultorio Grinpol',
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
                 <li>Fecha del turno: ${appointmentDate.toLocaleString()}</li/>
               </ul/>
               <small><b>No responder a este correo</b></small>
               <h3>¡Muchas gracias por elegirnos !</h3>`,
    });
  }

  async sendCancelEmail(patient: Patient,appointmentInfo: AppointmentRequestDto) {
    const appointmentDate = new Date(appointmentInfo.date)
    this.mailerService.sendMail({
      from: 'Consultorio Grinpol',
      to: patient.pEmail,
      subject: 'Se ha cancelado tu turno',
      html: `<h1>¡Hola, ${patient.name}!</h1>
               <br></br/>
               <p>Te informamos que tu turno ha sido cancelado</p>
               <br></br/>
               <p><b>Informacion del turno cancelado:<b></p>
               <br></br/>
               <ul>
                 <li>Razon: ${appointmentInfo.reason}</li/>
                 <li>Fecha del turno: ${appointmentDate.toLocaleString()}</li/>
               </ul/>
               <small><b>No responder a este correo</b></small>
               <h3>¡Muchas gracias por elegirnos !</h3>`,
    });
  }

  async sendReminderEmail(patient: Patient, appointment: Appointment) {
    this.mailerService.sendMail({
      from: 'Consultorio Grinpol',
      to: patient.pEmail,
      subject: 'Recordatorio de turno',
      html: `<h1>¡Hola, ${patient.name}!</h1>
           <p>Este es un recordatorio para tu turno programado.</p>
           <p><b>Información del turno:</b></p>
           <ul>
             <li>Fecha: ${appointment.date.toLocaleString()}</li>
             <li>Razón: ${appointment.reason}</li>
           </ul>
           <small><b>No responder a este correo</b></small>
           <p>¡Gracias por elegirnos!</p>`,
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
      subject: 'Recordatorio de turno',
      html: `<h2>!Restauracion de Contraseña!</h2>
        
         <p><a href='${process.env.FRONT_DEPLOY}/user/reset-password?token=${resetPasswordToken}' target='_blank'>Restaurar Contraseña</a></p>
           
           <small><b>No responder a este correo</b></small>`,
    });
  }
}
