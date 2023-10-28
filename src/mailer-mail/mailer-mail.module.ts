import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailerMailService } from './mailer-mail.service';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'localhost',
                port: 1025,
                auth: {
                    user: 'orderFlow@gmail.com',
                    pass: '12345678'
                }
            }
        })
    ],
    providers: [MailerMailService],
    exports: [MailerMailService]
})
export class MailerMailModule {}
