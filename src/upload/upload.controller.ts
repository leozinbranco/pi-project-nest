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
              if (numberColumns > 9) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                  data: [],
                  message: 'O número de colunas deve ser igual a 9!',
                  status: false,
                });
              }
              rows.push(index.split(','));
            }
          });
        }
      })
      .on('end', async () => {
        rows.splice(0, 1);
        try {
          /* realiza a validação de cada linha do meu csv */
          const promises = rows.map((row) => {
            return this.uploadService.validateFile(row);
          });
          await Promise.all(promises);

          /* Trata cada linha do arquivo e realiza a inserção  */
          const enterprise = rows.map((row) => {
            return this.uploadService.treatFile(row);
          });
          await Promise.all(enterprise);
          fs.unlink(`./upload/${uploadFile.originalname}`, (err) => {
            if (err) {
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
