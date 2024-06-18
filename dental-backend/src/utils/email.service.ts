/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Appointment, Dentist, Patient } from '@prisma/client';

@Injectable()
export class EmailService {

constructor(private readonly mailerService: MailerService) { }


async sendConfirmEmail(patient: Patient, appointmentInfo: Appointment, dentist: Dentist) {
    this.mailerService.sendMail({
        from: 'DataJob',
        to: patient.pEmail,
        subject: "Se ha confirmado tu turno",
        html: `<h1>¡Hola, ${patient.name}!</h1>
               <br></br/>
               <p>El turno ha sido confirmado</p>
               <br></br/>
               <p><b>Informacion del turno:<b></p>
               <br></br/>
               <ul>
                 <li>Dentista: Dr. ${dentist.fullname}</li/>
                 <li>Razon: ${appointmentInfo.reason}</li/>
                 <li>Fecha del turno: ${appointmentInfo.date.toDateString()}</li/>
               </ul/>
               <h3>¡Muchas gracias por elegirnos !</h3>`,
    });
}

}
