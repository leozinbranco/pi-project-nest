import {
  IsDateString,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UploadDto {
  @IsString()
  @IsNotEmpty()
  numOs: string;

  @IsString()
  @IsNotEmpty()
  statusOs: string;

  @IsNotEmpty()
  @IsString()
  tipoOs: string;

  @IsString()
  tipoObjOs: string;

  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/, {
    message: 'O campo de data e hora deve estar no formato AAAA-MM-DD HH:mm',
  })
  dataUltimaModOs: Date | string;

  @IsNotEmpty()
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/, {
    message: 'O campo de data e hora deve estar no formato AAAA-MM-DD HH:mm',
  })
  dataAberturaOs: Date;

  @IsString()
  descricaoAjustesOs: string;

  @IsString()
  observacaoOs: string;

  @IsNotEmpty()
  @IsString()
  @Length(14, 14, { message: 'O CNPJ deve conter 14 caracteres' })
  cnpjClienteOs: string;

  @IsString()
  telContatoOs: string;

  @IsString()
  emailContatoOs: string;

  @IsString()
  @Length(1)
  atributoValidadorOs: string;

  @IsString()
  @Length(14)
  documento: string;
  EmpresaOs: {
    connect: {
      codEmpresa: number;
    };
  };
}
