import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/adapters/prisma/prisma.module';
import { UpNextController } from '../controllers/up-next/up-next.controller';
import { UpNextService } from 'src/adapters/services/up-next.service';

@Module({
  imports: [PrismaModule],
  controllers: [UpNextController],
  providers: [UpNextService],
})
export class UpNextModule {}
