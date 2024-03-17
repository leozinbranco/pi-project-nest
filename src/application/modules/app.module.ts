import { Module } from '@nestjs/common';
import { BaseService } from '../../adapters/services/base.service';
import { PersonService } from '../../adapters/services/enterprise-client.service';
import { PrismaModule } from '../../adapters/prisma/prisma.module';
import { SuportModule } from './suport.module';
import { MailerMailModule } from '../../adapters/mailer-mail/mailer-mail.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload.module';
import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';
import { WorkOrderModule } from './work-order.module';

@Module({
  imports: [
    PrismaModule,
    SuportModule,
    MailerMailModule,
    ConfigModule.forRoot(),
    UploadModule,
    AuthModule,
    UsersModule,
    WorkOrderModule,
  ],
  controllers: [],
  providers: [BaseService, PersonService],
})
export class AppModule {}
