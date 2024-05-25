import { Module } from '@nestjs/common';
import { SuportService } from '../../adapters/services/suport.service';
import { SuportController } from '../controllers/support/suport.controller';
import { PrismaModule } from 'src/adapters/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SuportService],
  controllers: [SuportController],
})
export class SuportModule {}
