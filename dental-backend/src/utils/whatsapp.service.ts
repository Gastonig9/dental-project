/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';

@Injectable()
export class WhatsappService {
    private client: Twilio.Twilio;

    constructor() {
        const accountSid = process.env.accountSid;
        const authToken = process.env.authTokenTwilio;
        this.client = Twilio(accountSid, authToken);
    }

    async sendWhatsAppMessage(to: string, message: string) {
        try {
            await this.client.messages.create({
                body: message,
                from: 'whatsapp:+14155238886',
                to: `whatsapp:${to}`,
            });
            console.log('Mensaje de WhatsApp enviado exitosamente');
        } catch (error) {
            console.error('Error al enviar mensaje de WhatsApp:', error);
        }
    }

}
