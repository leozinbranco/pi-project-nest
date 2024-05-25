import { Module } from '@nestjs/common';
import { PrismaModule } from '../../adapters/prisma/prisma.module';
import { SuportModule } from './suport.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload.module';
import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';
import { WorkOrderModule } from './work-order.module';
import { UpNextModule } from './up-next.module';

@Module({
  imports: [
    PrismaModule,
    SuportModule,
    ConfigModule.forRoot(),
    UploadModule,
    AuthModule,
    UsersModule,
    WorkOrderModule,
    UpNextModule,
  ],
  controllers: [],
})
export class AppModule {}
