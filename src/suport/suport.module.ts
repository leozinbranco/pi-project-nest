import { Module } from '@nestjs/common';
import { SuportService } from './suport.service';
import { SuportController } from './suport.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailerMailModule } from 'src/mailer-mail/mailer-mail.module';

@Module({
  imports: [PrismaModule, MailerMailModule],
  providers: [SuportService],
  controllers: [SuportController]
})
export class SuportModule {}
