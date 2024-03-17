import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailerMailService } from './mailer-mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 1025,
        auth: {
          user: 'orderFlow@gmail.com',
          pass: '12345678',
        },
      },
      template: {
        dir: process.cwd() + '/src/templates/mail/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailerMailService],
  exports: [MailerMailService],
})
export class MailerMailModule {}
