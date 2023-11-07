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

  async treatFile(file: any[]) {
    const serviceOrder = [];
    file.forEach((row) => {
      if (row[0] === '') {
        throw new Error('O número da ordem de serviço é obrigatório!');
      }
      if (row[1] === '') {
        throw new Error('O tipo da ordem de serviço é obrigatório!');
      }
      if (row[2] === '') {
        throw new Error('O tipo de objeto da ordem de serviço é obrigatório!');
      }
      if (row[3] === '') {
        throw new Error('O status da ordem de serviço é obrigatório!');
      }
      if (row[4] === '') {
        throw new Error(
          'A data de cadastro da ordem de serviço é obrigatória!',
        );
      }
      if (row[5] === '') {
        throw new Error(
          'A data de atualização da ordem de serviço é obrigatória!',
        );
      }
      serviceOrder.push({
        numOs: row[0],
        tipoOs: row[1],
        tipoObjOs: row[2],
        statusOs: row[3],
        dataUltimaModOs: row[4],
        dataAberturaOs: row[5],
        descricaoAjustesOs: row[6],
        observacaoOs: row[7],
        nomeClienteOs: row[8],
        telContatoOs: row[9],
        emailContatoOs: row[10],
        atributoValidadorOs: '',
        EmpresaOs: {
          connect: {
            codEmpresa: 1,
          },
        },
      });
    });
    const te = [];
    serviceOrder.forEach((os) => {
      const teste = this.uploadFile(os);
      te.push(teste);
    });
  }
}
