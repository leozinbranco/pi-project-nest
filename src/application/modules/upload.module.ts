import { Module } from '@nestjs/common';
import { UploadService } from '../../adapters/services/upload.service';
import { UploadController } from '../controllers/upload/upload.controller';
import { PrismaModule } from 'src/adapters/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
