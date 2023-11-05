import { Injectable } from '@nestjs/common';
import { OrdemServico } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private readonly prismaService: PrismaService) {}

  async uploadFile(upload: OrdemServico) {
    return await this.prismaService.ordemServico.create({
      data: upload,
    });
  }
}
