// mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Company } from '../company/entities/company.entity';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendVerifyEmail(email: string, name: string, token: string) {
    const url = `${this.configService.get('CLIENT_URL')}/verify-email?token=${token}`;

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

  async sendWelcomeUserEmail(name: string, email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Dobrodošao/la u Karijerka!',
      template: './welcome-user-email',
      context: {
        name: name,
      },
    });
  }

  async sendWelcomeCompanyEmail(companyName: string, email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Dobrodošli u Karijerka!',
      template: './welcome-company-email',
      context: {
        companyName,
      },
    });
  }

  async sendSubscriberEmails(
    emails: string[],
    company: Company,
    subject: string,
    content: string,
  ) {
    await Promise.all(
      emails.map((email) => {
        return this.mailerService.sendMail({
          to: email,
          subject: subject,
          template: './subscriber-email',
          context: {
            companyName: company.name,
            logoUrl: company.profilePicture,
            content,
            subject,
          },
        });
      }),
    );
  }
}
