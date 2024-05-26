import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/adapters/prisma/prisma.module';
import { UpNextController } from '../controllers/up-next/up-next.controller';
import { UpNextService } from 'src/adapters/services/up-next.service';
import { ValidationDocumentService } from 'src/adapters/services/validation-document.service';

@Module({
  imports: [PrismaModule],
  controllers: [UpNextController],
  providers: [UpNextService, ValidationDocumentService],
})
export class UpNextModule {}
