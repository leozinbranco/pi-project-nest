import {
  Controller,
  FileTypeValidator,
  HttpStatus,
  InternalServerErrorException,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { UploadService } from 'src/adapters/services/upload.service';
import multerConfig from 'src/application/utils/multer-config';
import { UploadDto } from 'src/adapters/services/dtos/upload.dto';
import { AuthGuard } from 'src/application/guards/auth/auth.guard';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @UseGuards(AuthGuard)
  @Post(':cod/:user')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(
    @Param('cod') codCompany: number,
    @Param('user') user: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'csv' })],
      }),
    )
    uploadFile: Express.Multer.File,
    @Res() res: Response,
  ) {
    let rows = [];
    const read = fs.createReadStream(`./upload/${uploadFile.originalname}`, {
      encoding: 'utf8',
    });
    read
      .on('data', (row) => {
        if (typeof row === 'string') {
          const rowFile = row.split('\n');
          rowFile.forEach((index) => {
            if (index.length > 0) {
              const numberColumns = index.split(',').length;
              const indexArray = index.split(',');
              if (
                numberColumns > 12 &&
                index.split(';')[indexArray.length - 1] !== ''
              ) {
                rows.push([]);
              } else {
                rows.push(index.split(';'));
              }
            }
          });
        }
      })
      .on('end', async () => {
        try {
          rows = rows.slice(1);
          if (!rows) {
            throw new InternalServerErrorException(
              'O delimitador do arquivo está diferente de ponto e vírgula! (;)',
            );
          }
          /* Trata cada linha do arquivo e realiza a inserção  */
          const enterprise = rows.map(async (row) => {
            if (row.length === 0) {
              throw new InternalServerErrorException(
                'Nenhum dado identificado para realizar o upload ou o CSV contém mais que 12 colunas!',
              );
            }
            /* transformar a row e array para objeto */
            let diffEnterprise;
            if (codCompany !== null) {
              diffEnterprise = await this.uploadService.findEnterpriseById(
                codCompany,
                row[8],
              );
            }
            if (diffEnterprise) {
              throw new InternalServerErrorException(
                `Não é possível realizar o upload de O.S de empresa distintas. CNPJ: ${row[8]}`,
              );
            }
            return this.uploadService.treatFile(this.isValidRow(row));
          });
          await Promise.all(enterprise);

          fs.unlink(`./upload/${uploadFile.originalname}`, (error) => {
            if (error) {
              return res.status(HttpStatus.NOT_FOUND).json({
                data: [],
                message: 'Nenhum arquivo foi encontrado',
                status: false,
              });
            }
          });
          return res.status(HttpStatus.CREATED).json({
            data: [],
            message: 'Upload realizado com sucesso',
            status: false,
          });
        } catch (error) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            data: [],
            message: error.message,
            status: false,
          });
        }
      });
  }

  private formatRow(row): UploadDto {
    const currentDate = new Date();
    row[5] = this.validateDate(row[5]);
    row[4] = this.validateDate(row[4]);
    const newOs = {
      numOs: row[0],
      statusOs: row[1],
      tipoOs: row[2],
      tipoObjOs: row[3],
      dataAberturaOs: new Date(
        `${
          row[4]
        } ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
      ),
      dataUltimaModOs:
        row[5].length > 0
          ? new Date(
              `${this.validateDate(
                row[5],
              )} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
            )
          : '',
      descricaoAjustesOs: row[6],
      observacaoOs: row[7],
      cnpjClienteOs: row[8],
      telContatoOs: row[9],
      emailContatoOs: '',
      atributoValidadorOs: row[10],
      documento: row[11].replace(/\r$/, ''),
      EmpresaOs: {
        connect: {
          codEmpresa: 0,
        },
      },
    };
    return newOs;
  }

  private validateDate(date): string {
    const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (pattern.test(date)) {
      const fullDate = date.split('/');
      const newDate = fullDate[2] + '-' + fullDate[1] + '-' + fullDate[0];
      return newDate;
    }
    return date;
  }

  private isValidRow(row: UploadDto): UploadDto {
    const newOs = this.formatRow(row);
    if (newOs.numOs.length === 0) {
      throw new InternalServerErrorException(
        'Necessário inserir um número para a ordem de serviço!',
      );
    }
    if (newOs.statusOs.length === 0) {
      throw new InternalServerErrorException(
        'Necessário inserir o status para a ordem de serviço!',
      );
    }

    if (newOs.tipoOs.length === 0) {
      throw new InternalServerErrorException(
        'Necessário inserir o tipo para a ordem de serviço!',
      );
    }

    if (newOs.tipoObjOs.length === 0) {
      throw new InternalServerErrorException(
        'Necessário inserir a descrição do tipo para a ordem de serviço!',
      );
    }
    if (newOs.cnpjClienteOs.length >= 0 && newOs.cnpjClienteOs.length <= 13) {
      throw new InternalServerErrorException(
        'Necessário inserir o CNPJ da empresa para a ordem de serviço!',
      );
    }
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    if (
      pattern.test(newOs.dataAberturaOs.toString()) ||
      newOs.dataAberturaOs.toString().length === 0
    ) {
      throw new InternalServerErrorException(
        'Data vazia ou formato incorreto. Informe no formato AAAA-MM-DD!',
      );
    }
    if (pattern.test(newOs.dataUltimaModOs.toString())) {
      throw new InternalServerErrorException(
        'Data vazia ou formato incorreto. Informe no formato AAAA-MM-DD!',
      );
    }
    if (
      !newOs.atributoValidadorOs.includes('S') &&
      !newOs.atributoValidadorOs.includes('N')
    ) {
      throw new InternalServerErrorException(
        'Necessário inserir o atributo validador para compartilhar as O.S, sendo: S (SIM), N (Não)!',
      );
    }
    if (
      !newOs.documento ||
      (newOs.documento.length >= 0 && newOs.documento.length <= 10)
    ) {
      throw new InternalServerErrorException('Insira um CPF válido!');
    }
    return newOs;
  }

  /* Realiza o cálculo para descobrir os dígitos do CPF/CNPJ */
  private calcCpfCnpj(cpfCnpj) {
    const cpfCnpjCalc = 0;

    /* Realizando o cálculo para obter o valor total a fim de conseguir descobrir os dígitos do CPF/CNPJ */
    if (cpfCnpj.length <= 10) {
      const cpfCnpjCalc = cpfCnpj
        .map(function (number, index) {
          return Number(number) * (index + 2);
        })
        .reduce((accumulator, number) => accumulator + number, 0);
    } else {
      const cpfCnpjCalc = cpfCnpj
        .map(function (number, index) {
          return (
            Number(number) *
            (index <= 7 ? index + 2 : index >= 9 ? index - 7 + 1 : 2)
          );
        })
        .reduce((accumulator, number) => accumulator + number, 0);
    }

    /* Obtendo o resto(inteiro) da minha divisão */
    const rest = cpfCnpjCalc % 11;

    /* Concatenando o dígito no CPF */
    cpfCnpj = cpfCnpj.reverse().join('');
    if (rest < 2) {
      cpfCnpj += '0';
    } else {
      cpfCnpj += 11 - rest;
    }
    return cpfCnpj;
  }

  /* Realiza a validação do CPF */
  private isCpfValid(rawValue) {
    let cpf = rawValue.split('').reverse();

    /* Lista de CPF inválidos */
    const cpfInvalids = [
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
    ];

    if (cpfInvalids.includes(rawValue)) {
      return false;
    }

    /* Removendo os dígitos do cpf */
    cpf.splice(0, 2);

    /* Descobrindo o primeiro dígito */
    cpf = this.calcCpfCnpj(cpf).split('').reverse();

    /* Descobrindo o segundo dígito */
    cpf = this.calcCpfCnpj(cpf);

    if (rawValue !== cpf) {
      //swal('Oops', 'O CPF inserido não é válido!', 'error');
      return false;
    }
    return true;
  }

  /* Realiza a validação do CNPJ */
  private isCnpjValid(rawValue) {
    let cnpj = rawValue.split('').reverse();

    /* Lista de CNPJ inválidos */
    const cnpjInvalids = [
      '00000000000000',
      '11111111111111',
      '22222222222222',
      '33333333333333',
      '44444444444444',
      '55555555555555',
      '66666666666666',
      '77777777777777',
      '88888888888888',
      '99999999999999',
    ];

    if (cnpjInvalids.includes(rawValue)) {
      return false;
    }

    /* Removendo os dígitos do cnpj */
    cnpj.splice(0, 2);

    /* Descobrindo o primeiro dígito */
    cnpj = this.calcCpfCnpj(cnpj).split('').reverse();

    /* Descobrindo o segundo dígito */
    cnpj = this.calcCpfCnpj(cnpj);

    if (rawValue !== cnpj) {
      //swal('Oops', 'O CNPJ inserido não é válido!', 'error');
      return false;
    }
    return true;
  }
}
