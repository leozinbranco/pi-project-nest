import { Module } from '@nestjs/common';
import { UploadService } from '../../adapters/services/upload.service';
import { UploadController } from '../controllers/upload/upload.controller';
import { PrismaModule } from 'src/adapters/prisma/prisma.module';
import { ValidationDocumentService } from 'src/adapters/services/validation-document.service';

@Module({
  imports: [PrismaModule],
  providers: [UploadService, ValidationDocumentService],
  controllers: [UploadController],
})
export class UploadModule {}
