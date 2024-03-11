import {
  Controller,
  FileTypeValidator,
  HttpStatus,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from '../../adapters/services/upload.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
// import multerConfig from './multer-config';
import * as fs from 'fs';
import multerConfig from '../utils/multer-config';
import { AuthGuard } from '../guards/auth/auth.guard';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /* diminuir a quantidade de if dentro do arquivo */

  // @UseGuards(AuthGuard)
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
      .on('end', async () => {
        rows.splice(0, 1);
        try {
          /* realiza a validação de cada linha do meu csv */
          const promises = rows.map((row) => {
            /* transformar o array em objeto para que a validação ocorra através da tipagem do typescript */
            /* não chamar o validateFile. excluir arquivo */
            return this.uploadService.validateFile(row);
          });
          await Promise.all(promises);

          /* Trata cada linha do arquivo e realiza a inserção  */
          const enterprise = rows.map((row) => {
            /* transformar a row e array para objeto */
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
