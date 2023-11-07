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
              const numberColumns = index.split(',').length;
              if (numberColumns > 11) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                  data: [],
                  message: 'O número de colunas deve ser igual a 11!',
                  status: false,
                });
              }
              rows.push(index.split(','));
            }
          });
        }
      })
      .on('end', () => {
        rows.splice(0, 1);
        try {
          const serviceOrder = this.uploadService.treatFile(rows);
          fs.unlink(`./upload/${uploadFile.originalname}`, (err) => {
            if (err) {
              return res.status(HttpStatus.NOT_FOUND).json({
                data: [],
                message: 'Nenhum arquivo foi encontrado',
                status: false,
              });
            }
          });

          return res.status(HttpStatus.OK).json({
            data: serviceOrder,
            message: 'Upload feito com sucesso',
            status: false,
          });
        } catch (err) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            data: [],
            message: err.message,
            status: false,
          });
        }
      });
  }
}
