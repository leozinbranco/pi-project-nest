import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadDto } from './dto/upload.dto';

@Injectable()
export class UploadService {
  constructor(private readonly prismaService: PrismaService) {}

  /* realiza a criação da O.S com base nas informações do arquivo */
  async uploadFile(upload: UploadDto) {
    const enterprise = await this.findEnterprise(upload.cnpjClienteOs);
    const data = new Date();
    const newOs = {
      numOs: upload.numOs,
      statusOs: upload.statusOs,
      tipoOs: upload.tipoOs,
      tipoObjOs: upload.tipoObjOs,
      descricaoAjustesOs: upload.descricaoAjustesOs,
      observacaoOs: upload.observacaoOs,
      telContatoOs: upload.telContatoOs,
      emailContatoOs: upload.emailContatoOs,
      cnpjClienteOs: upload.cnpjClienteOs,
      dataAberturaOs: data,
      dataUltimaModOs: data,
      atributoValidadorOs: 'teste',
      codEmpresaOs: enterprise.codEmpresa,
    };
    return await this.prismaService.ordemServico.create({
      data: newOs,
    });
  }

  /* realiza a busca da informação da empresa pelo CNPJ */
  async findEnterprise(cnpj: string) {
    return await this.prismaService.empresaClientes.findFirstOrThrow({
      where: { cnpjEmpresa: cnpj },
    });
  }

  /* realiza a busca de todas as O.S com o codigo da empresa */
  async findServiceOrders(codEnterprise: number) {
    return await this.prismaService.ordemServico.findMany({
      where: { codEmpresaOs: codEnterprise },
      orderBy: { dataAberturaOs: 'desc' },
    });
  }

  /* formata os dados do arquivo para ser inserido dentro do banco  */
  async treatFile(row: UploadDto) {
    const enterprise = await this.findEnterprise(row[8]);
    const os: UploadDto = {
      numOs: row[0],
      tipoOs: row[1],
      tipoObjOs: row[2],
      statusOs: row[3],
      dataUltimaModOs: row[4],
      dataAberturaOs: row[5],
      descricaoAjustesOs: row[6],
      observacaoOs: row[7],
      cnpjClienteOs: row[8],
      telContatoOs: row[9],
      emailContatoOs: enterprise.emailEmpresa,
      atributoValidadorOs: '',
      EmpresaOs: {
        connect: {
          codEmpresa: enterprise.codEmpresa,
        },
      },
    };
    await this.uploadFile(os);
  }

  /* realiza a validação do arquivo que conter as informações da O.S */
  validateFile(row: UploadDto) {
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
      throw new Error('A data de cadastro da ordem de serviço é obrigatória!');
    }
    if (row[5] === '') {
      throw new Error(
        'A data de atualização da ordem de serviço é obrigatória!',
      );
    }
    if (row[8] === '') {
      throw new Error(
        'O CNPJ da empresa cliente da ordem de serviço é obrigatório!',
      );
    }
    if (row[8].length !== 14) {
      throw new Error('O campo CNPJ deve conter 14 caracteres!');
    }
    if (row[9] === '') {
      throw new Error(
        'O Telefone do cliente da ordem de serviço é obrigatório!',
      );
    }
    return row;
  }
}
