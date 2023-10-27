import { Module } from '@nestjs/common';
import { SuportService } from './suport.service';
import { SuportController } from './suport.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SuportService],
  controllers: [SuportController]
})
export class SuportModule {}
