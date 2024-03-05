import { Module } from '@nestjs/common';
import { UploadService } from '../services/upload.service';
import { UploadController } from '../application/controllers/upload.controller';
import { PrismaModule } from 'src/adapters/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
