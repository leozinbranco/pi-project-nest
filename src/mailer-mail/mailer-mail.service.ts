import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';


@Injectable()
export class MailerMailService {
    constructor(private readonly mailService: MailerService) {}

    async sendEmail(to: string, subject: string, text: string){
        let fromBase = process.env.EMAILFROM
        return await this.mailService.sendMail({
            from: fromBase,
            to,
            subject,
            text
        });
    }
}
