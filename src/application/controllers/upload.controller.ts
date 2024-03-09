import {
  Controller,
  FileTypeValidator,
  HttpStatus,
  InternalServerErrorException,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from '../../services/upload.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from '../utils/multer-config';
import * as fs from 'fs';
import { UploadDto } from 'src/services/dtos/upload.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(
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
                numberColumns > 11 &&
                index.split(',')[indexArray.length - 1] !== ''
              ) {
                rows.push([]);
              } else {
                rows.push(index.split(','));
              }
            }
          });
        }
      })
      .on('end', async () => {
        try {
          rows = rows.slice(1);
          /* Trata cada linha do arquivo e realiza a inserção  */
          const enterprise = rows.map((row) => {
            if (row.length > 0) {
              /* transformar a row e array para objeto */
              return this.uploadService.treatFile(this.isValidRow(row));
            }
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
              `${
                row[5]
              } ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
            )
          : '',
      descricaoAjustesOs: row[6],
      observacaoOs: row[7],
      cnpjClienteOs: row[8],
      telContatoOs: row[9],
      emailContatoOs: '',
      atributoValidadorOs: row[10],
      EmpresaOs: {
        connect: {
          codEmpresa: 0,
        },
      },
    };
    return newOs;
  }

  private isValidRow(row): UploadDto {
    const newOs = this.formatRow(row);
    if (newOs.numOs.length === 0) {
      throw new InternalServerErrorException(
        'Necessário inserir um número para a ordem de serviço',
      );
    }
    if (newOs.statusOs.length === 0) {
      throw new InternalServerErrorException(
        'Necessário inserir o status para a ordem de serviço',
      );
    }

    if (newOs.tipoOs.length === 0) {
      throw new InternalServerErrorException(
        'Necessário inserir o tipo para a ordem de serviço',
      );
    }

    if (newOs.tipoObjOs.length === 0) {
      throw new InternalServerErrorException(
        'Necessário inserir a descrição do tipo para a ordem de serviço',
      );
    }
    if (newOs.cnpjClienteOs.length >= 0 && newOs.cnpjClienteOs.length <= 13) {
      console.log(newOs.cnpjClienteOs);
      throw new InternalServerErrorException(
        'Necessário inserir o CNPJ da empresa para a ordem de serviço',
      );
    }
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    if (
      newOs.dataAberturaOs.toString().length === 0 ||
      pattern.test(newOs.dataAberturaOs.toString())
    ) {
      throw new InternalServerErrorException(
        'Data vazia ou formato incorreto. Informe no formato AAAA-MM-DD',
      );
    }
    if (pattern.test(newOs.dataUltimaModOs.toString())) {
      throw new InternalServerErrorException(
        'Data vazia ou formato incorreto. Informe no formato AAAA-MM-DD',
      );
    }
    return newOs;
  }
}
