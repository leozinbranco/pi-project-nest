export class UploadDto {
  numOs: string;
  tipoOs: string;
  tipoObjOs: string;
  statusOs: string;
  dataUltimaModOs: Date;
  dataAberturaOs: Date;
  descricaoAjustesOs: string;
  observacaoOs: string;
  cnpjClienteOs: string;
  telContatoOs: string;
  emailContatoOs: string;
  atributoValidadorOs: '';
  EmpresaOs: {
    connect: {
      codEmpresa: number;
    };
  };
}
