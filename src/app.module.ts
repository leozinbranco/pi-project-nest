import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BaseService } from './base.service';
import { PersonService } from './EnterpriseClient/enterpriseClient.service';
import { PersonController } from './EnterpriseClient/enterpriseClient.controller';
import { RequestMiddleware } from './middleware/request.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { SuportModule } from './suport/suport.module';

@Module({
  imports: [PrismaModule, SuportModule],
  controllers: [
    PersonController
  ],
  providers: [
    BaseService,
    PersonService
  ],
})
export class AppModule{}
