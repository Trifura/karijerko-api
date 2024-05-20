// mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Account } from '../account/entities/account.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerifyEmail(account: Account, token: string) {
    const url = `karijerko.com/verify-email?token=${token}`;

    await this.mailerService.sendMail({
      to: account.email,
      subject: 'Dobrodošli u Karijerka! Potvrdite svoju email adresu.',
      template: './verify-email', // `.hbs` extension is appended automatically
      context: {
        // Data to be sent to template engine
        url,
      },
    });
  }
}
