// mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerifyEmail(email: string, name: string, token: string) {
    const url = `https://karijerko.com/verify-email?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Dobrodošli u Karijerka! Potvrdite svoju email adresu.',
      template: './verify-email',
      context: {
        name,
        url,
      },
    });
  }

  async sendWelcomeEmail(name: string, email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Dobrodošao/la u Karijerka!',
      template: './welcome-email',
      context: {
        name: name,
      },
    });
  }
}
