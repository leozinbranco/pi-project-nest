import { Injectable } from '@nestjs/common';
import { UploadDto } from './dtos/upload.dto';
import { PrismaService } from 'src/adapters/prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private readonly prismaService: PrismaService) {}

  /* realiza a criação da O.S com base nas informações do arquivo */
  async uploadFile(upload: UploadDto) {
    const enterprise = await this.findEnterprise(upload.cnpjClienteOs);
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
      dataAberturaOs: new Date(upload.dataAberturaOs),
      dataUltimaModOs: new Date(upload.dataUltimaModOs),
      atributoValidadorOs: upload.atributoValidadorOs,
      EmpresaOs: {
        connect: {
          codEmpresa: enterprise.codEmpresa,
        },
      },
    };

    /* ao invés de dar sempre um create, realizar um upsert onde a premissa é 
      realizar um where e com base no where ele vai realizar uma atualização ou uma criação
    */
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

    /* alterar a forma que está chamando o dado, ao invés de array ser objeto */
    const os: UploadDto = {
      numOs: row[0],
      statusOs: row[1],
      tipoOs: row[2],
      tipoObjOs: row[3],
      dataUltimaModOs: new Date(row[4]),
      dataAberturaOs: new Date(row[5]),
      descricaoAjustesOs: row[6],
      observacaoOs: row[7],
      cnpjClienteOs: row[8],
      telContatoOs: row[9],
      emailContatoOs: enterprise.emailEmpresa,
      atributoValidadorOs: row[10],
      EmpresaOs: {
        connect: {
          codEmpresa: enterprise.codEmpresa,
        },
      },
    };
    await this.uploadFile(os);
  }

  /* realiza a validação do arquivo que conter as informações da O.S */
  /* remover metodo */
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
