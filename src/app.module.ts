import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BaseService } from './base.service';
import { PersonService } from './EnterpriseClient/enterpriseClient.service';
import { PersonController } from './EnterpriseClient/enterpriseClient.controller';
import { RequestMiddleware } from './middleware/request.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { SuportModule } from './suport/suport.module';
import { MailerMailModule } from './mailer-mail/mailer-mail.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, SuportModule, MailerMailModule, ConfigModule.forRoot(), UploadModule, AuthModule, UsersModule],
  controllers: [
    PersonController
  ],
  providers: [
    BaseService,
    PersonService
  ],
})
export class AppModule{}
