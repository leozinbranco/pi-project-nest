import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/adapters/prisma/prisma.service';
import { UploadDto } from './dtos/upload.dto';
@Injectable()
export class UploadService {
  constructor(private readonly prismaService: PrismaService) {}
  /* realiza a criação da O.S com base nas informações do arquivo */
  async uploadFile(upload: UploadDto) {
    /* Busca uma Os dentro da base */
    const os = await this.prismaService.ordemServico.findFirst({
      where: {
        numOs: upload.numOs,
      },
    });
    /* Atualiza a OS caso encontre pelo número inserido no CSV */
    if (os) {
      return await this.prismaService.ordemServico.update({
        where: {
          codOs: os.codOs,
        },
        data: {
          ...upload,
          cnpjClienteOs: upload.cnpjClienteOs.replace(/.\/\-/g, ''),
          documento: upload.documento.replace(/.\/\-/g, ''),
          dataUltimaModOs:
            upload.dataUltimaModOs === '' ? new Date() : upload.dataUltimaModOs,
          dataUltimoUpload: new Date(),
        },
      });
    }
    return await this.prismaService.ordemServico.create({
      data: {
        ...upload,
        cnpjClienteOs: upload.cnpjClienteOs.replace(/.\/\-/g, ''),
        documento: upload.documento.replace(/.\/\-/g, ''),
        dataUltimaModOs:
          upload.dataUltimaModOs === '' ? null : upload.dataUltimaModOs,
        dataUltimoUpload: new Date(),
      },
    });
  }
  /* realiza a busca da informação da empresa pelo CNPJ */
  async findEnterprise(cnpj: string) {
    const enterprise = await this.prismaService.empresaClientes.findFirst({
      where: { cnpjEmpresa: cnpj },
    });
    if (enterprise === null) {
      throw new InternalServerErrorException(
        `A empresa que possui o CNPJ ${cnpj} não está cadastrada no sistema`,
      );
    }
    return enterprise;
  }

  /* realiza a busca de uma empresa para saber se ela é diferente da logada no sistema */
  async findEnterpriseById(cod: number, cnpj: string) {
    const enterprise = await this.prismaService.empresaClientes.findFirst({
      where: { codEmpresa: Number(cod) },
    });

    if (enterprise.cnpjEmpresa !== cnpj) {
      return cnpj;
    }
    return null;
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
    try {
      const enterprise = await this.findEnterprise(row.cnpjClienteOs);
      /* alterar a forma que está chamando o dado, ao invés de array ser objeto */
      const os: UploadDto = {
        ...row,
        emailContatoOs: enterprise.emailEmpresa,
        EmpresaOs: {
          connect: {
            codEmpresa: enterprise.codEmpresa,
          },
        },
      };
      await this.uploadFile(os);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
