import { Module } from '@nestjs/common';
import { SuportService } from '../../adapters/services/suport.service';
import { SuportController } from '../controllers/support/suport.controller';
import { PrismaModule } from 'src/adapters/prisma/prisma.module';
import { MailerMailModule } from 'src/adapters/mailer-mail/mailer-mail.module';

@Module({
  imports: [PrismaModule, MailerMailModule],
  providers: [SuportService],
  controllers: [SuportController],
})
export class SuportModule {}
