import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationDocumentService {
  private calcCpfCnpj(cpfCnpj: string[]): string[] {
    let cpfCnpjCalc: number = 0;

    /* Realizando o cálculo para obter o valor total a fim de conseguir descobrir os dígitos do CPF/CNPJ */
    if (cpfCnpj.length <= 10) {
      cpfCnpjCalc = cpfCnpj
        .map((number: string, index: number) => {
          return parseInt(number) * (index + 2);
        })
        .reduce(
          (accumulator: number, current: number) => accumulator + current,
          0,
        );
    } else {
      cpfCnpjCalc = cpfCnpj
        .map((number: string, index: number) => {
          const num = parseInt(number);
          return (
            num * (index <= 7 ? index + 2 : index >= 9 ? index - 7 + 1 : 2)
          );
        })
        .reduce(
          (accumulator: number, current: number) => accumulator + current,
          0,
        );
    }

    /* Obtendo o resto(inteiro) da minha divisão */
    const rest = cpfCnpjCalc % 11;

    /* Concatenando o dígito no CPF */
    let cpfCnpjStr = cpfCnpj.slice().reverse().join('');
    if (rest < 2) {
      cpfCnpjStr += '0';
    } else {
      cpfCnpjStr += (11 - rest).toString();
    }
    return cpfCnpjStr.split('');
  }

  /* Realiza a validação do CPF */
  public isCpfValid(rawValue: string) {
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
    cpf = this.calcCpfCnpj(cpf).reverse();

    /* Descobrindo o segundo dígito */
    cpf = this.calcCpfCnpj(cpf);

    if (rawValue !== cpf.join('')) {
      return false;
    }
    return true;
  }

  /* Realiza a validação do CNPJ */
  public isCnpjValid(rawValue: string) {
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
    cnpj = this.calcCpfCnpj(cnpj).reverse();

    /* Descobrindo o segundo dígito */
    cnpj = this.calcCpfCnpj(cnpj);

    if (rawValue !== cnpj.join('')) {
      return false;
    }
    return true;
  }
}
