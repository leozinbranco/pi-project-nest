import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class MailerMailService {
  constructor(private readonly mailService: MailerService) {}

  async sendEmailTicket(
    to: string,
    subject: string,
    template: string,
    numTicket: number,
    description: string,
  ) {
    const fromBase = process.env.EMAILFROM;
    const image = process.cwd() + '/src/templates/images/slogan.png';
    const imageBase64 = fs.readFileSync(image).toString('base64');
    const date = new Date();

    return await this.mailService.sendMail({
      from: fromBase,
      to,
      subject,
      template,
      context: {
        numTicket,
        description,
        to,
        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        imageBase64,
      },
    });
  }
}
