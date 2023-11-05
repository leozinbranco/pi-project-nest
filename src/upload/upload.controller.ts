import {
  Controller,
  FileTypeValidator,
  HttpStatus,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer-config';
import * as fs from 'fs';

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
    const rows = [];
    const read = fs.createReadStream(`./upload/${uploadFile.originalname}`, {
      encoding: 'utf8',
    });
    read
      .on('data', (row) => {
        if (typeof row === 'string') {
          const rowFile = row.split('\n');
          rowFile.forEach((index) => {
            if (index.length > 0) {
              rows.push(index);
            }
          });
        }
      })
      .on('end', () => {
        rows.splice(0, 1);
        /* limitando quantidade de orderns de serviço que podem ser enviadas  */
        if (rows.length >= 10) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            data: [],
            message:
              'O número de Ordens de Serviço deve ser menor ou igual a 10!',
            status: false,
          });
        }
        /* chamar o service de upload para realizar a inserção dentro do banco de dados  */
        console.log(rows);
        fs.unlink(`./upload/${uploadFile.originalname}`, (err) => {
          if (err) {
            return res.status(HttpStatus.NOT_FOUND).json({
              data: [],
              message: 'Nenhum arquivo foi encontrado',
              status: false,
            });
          }
        });
      });

    return res.status(HttpStatus.OK).json({
      data: [],
      message: 'Upload feito com sucesso',
      status: false,
    });
  }
}
