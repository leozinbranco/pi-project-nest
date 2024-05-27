import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { EmpresaClientes, UsuariosAdm } from '@prisma/client';
import { Response } from 'express';
import { UpNextService } from 'src/adapters/services/up-next.service';
import { ValidationDocumentService } from 'src/adapters/services/validation-document.service';

@Controller('up-next')
export class UpNextController {
  constructor(
    private readonly upNextService: UpNextService,
    private readonly validateDocument: ValidationDocumentService,
  ) {}

  /* Empresas */

  @Get('empresas')
  async findAllEnterprise(@Res() res: Response) {
    try {
      const enterprises = (await this.upNextService.findAllEnterprises()).map(
        (enterprise) => {
          return {
            cod: enterprise.codEmpresa,
            nome: enterprise.razaoSocialEmpresa,
            email: enterprise.emailEmpresa,
            document: enterprise.cnpjEmpresa.replace(
              /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
              '$1.$2.$3/$4-$5',
            ),
            telefone:
              enterprise.telefoneEmpresa.length === 11
                ? enterprise.telefoneEmpresa.replace(
                    /(\d{2})(\d{5})(\d{4})/,
                    '($1) $2-$3',
                  )
                : enterprise.telefoneEmpresa.replace(
                    /(\d{2})(\d{4})(\d{4})/,
                    '($1) $2-$3',
                  ),
          };
        },
      );
      return res.status(HttpStatus.OK).json({
        data: [{ data: enterprises }],
        message: 'Empresas encontradas com sucesso',
        status: true,
      });
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({
        data: [],
        message: 'Nenhuma empresa foi encontrada',
        status: false,
      });
    }
  }

  @Get('empresa/:dataEnterprise')
  async findEnterprise(
    @Param() params: { dataEnterprise: string },
    @Res() res: Response,
  ) {
    try {
      const enterprise = parseInt(params.dataEnterprise)
        ? await this.upNextService.findEnterpriseDoc(params.dataEnterprise)
        : await this.upNextService.findEnterpriseEmail(params.dataEnterprise);
      return res.status(HttpStatus.OK).json({
        data: [
          {
            data: [
              {
                cod: enterprise.codEmpresa,
                nome: enterprise.razaoSocialEmpresa,
                fancyName: enterprise.nomeFantasiaEmpresa,
                area: enterprise.areaAtuacaoEmpresa,
                enderecoComp: enterprise.enderecoEmpresa,
                email: enterprise.emailEmpresa,
                document: enterprise.cnpjEmpresa.replace(
                  /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                  '$1.$2.$3/$4-$5',
                ),
                telefone:
                  enterprise.telefoneEmpresa.length === 11
                    ? enterprise.telefoneEmpresa.replace(
                        /(\d{2})(\d{5})(\d{4})/,
                        '($1) $2-$3',
                      )
                    : enterprise.telefoneEmpresa.replace(
                        /(\d{2})(\d{4})(\d{4})/,
                        '($1) $2-$3',
                      ),
              },
            ],
          },
        ],
        message: 'Empresa encontrada com sucesso',
        status: true,
      });
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({
        data: [],
        message: 'Nenhuma empresa foi encontrada',
        status: false,
      });
    }
  }

  @Get('empresaUn/:dataEnterprise')
  async findEnterpriseUnique(
    @Param() params: { dataEnterprise: number },
    @Res() res: Response,
  ) {
    try {
      const enterprise = await this.upNextService.findEnterpriseUnique(
        Number(params.dataEnterprise),
      );
      return res.status(HttpStatus.OK).json({
        data: [
          {
            data: [
              {
                cod: enterprise.codEmpresa,
                nome: enterprise.razaoSocialEmpresa,
                fancyName: enterprise.nomeFantasiaEmpresa,
                area: enterprise.areaAtuacaoEmpresa,
                enderecoComp: enterprise.enderecoEmpresa,
                email: enterprise.emailEmpresa,
                document: enterprise.cnpjEmpresa.replace(
                  /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                  '$1.$2.$3/$4-$5',
                ),
                telefone:
                  enterprise.telefoneEmpresa.length === 11
                    ? enterprise.telefoneEmpresa.replace(
                        /(\d{2})(\d{5})(\d{4})/,
                        '($1) $2-$3',
                      )
                    : enterprise.telefoneEmpresa.replace(
                        /(\d{2})(\d{4})(\d{4})/,
                        '($1) $2-$3',
                      ),
              },
            ],
          },
        ],
        message: 'Empresa encontrada com sucesso',
        status: true,
      });
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({
        data: [],
        message: 'Nenhuma empresa foi encontrada',
        status: false,
      });
    }
  }

  @Post('cadastroEmp')
  async createEnt(@Body() enterprise: EmpresaClientes, @Res() res: Response) {
    try {
      if (!parseInt(enterprise.cnpjEmpresa)) {
        throw new InternalServerErrorException(
          'Erro: Necessário apenas números no CNPJ de cadastro da empresa!',
        );
      }
      if (enterprise.telefoneEmpresa.length <= 9) {
        throw new InternalServerErrorException(
          'Erro: Necessário inserir o DD no número de cadastro da empresa!',
        );
      }

      if (
        !this.validateDocument.isCnpjValid(
          enterprise.cnpjEmpresa.replace(/.\/\-/g, ''),
        )
      ) {
        throw new InternalServerErrorException(
          'O CNPJ: ' + enterprise.cnpjEmpresa + ' é inválido!',
        );
      }

      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(enterprise.emailEmpresa)) {
        throw new InternalServerErrorException(
          'O email: ' + enterprise.emailEmpresa + ' é inválido!',
        );
      }
      await this.upNextService.createEnterprise(enterprise);
      return res.status(HttpStatus.CREATED).json({
        data: [{ data: enterprise }],
        message: 'Empresa cadastrada com sucesso!',
        status: true,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: [],
        message: e.message,
        status: false,
      });
    }
  }

  @Post('EditaEmp')
  async uploadEnt(@Body() enterprise: EmpresaClientes, @Res() res: Response) {
    try {
      if (!parseInt(enterprise.cnpjEmpresa)) {
        throw new InternalServerErrorException(
          'Erro: Necessário apenas números no CNPJ de cadastro da empresa!',
        );
      }
      if (enterprise.telefoneEmpresa.length <= 9) {
        throw new InternalServerErrorException(
          'Erro: Necessário inserir o DD no número de cadastro da empresa!',
        );
      }

      if (
        !this.validateDocument.isCnpjValid(
          enterprise.cnpjEmpresa.replace(/.\/\-/g, ''),
        )
      ) {
        throw new InternalServerErrorException(
          'O CNPJ: ' + enterprise.cnpjEmpresa + ' é inválido!',
        );
      }

      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      console.log(enterprise.emailEmpresa);
      if (!regexEmail.test(enterprise.emailEmpresa)) {
        throw new InternalServerErrorException(
          'O email: ' + enterprise.emailEmpresa + ' é inválido!',
        );
      }

      await this.upNextService.updateEnterprise(enterprise);
      return res.status(HttpStatus.CREATED).json({
        data: [{ data: enterprise }],
        message: 'Empresa cadastrada com sucesso!',
        status: true,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: [],
        message: e.message,
        status: false,
      });
    }
  }

  @Post('removeEmp/:codEmp')
  async deleteEmp(@Param() params: { codEmp: number }, @Res() res: Response) {
    try {
      await this.upNextService.deleteEnterprise(Number(params.codEmp));
      return res.status(HttpStatus.OK).json({
        data: [],
        message: 'Empresa removida com sucesso',
        status: true,
      });
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({
        data: [],
        message: 'Nenhuma empresa foi encontrada para ser removida',
        status: false,
      });
    }
  }

  /* Funcionários */

  @Get('funcionarios')
  async findAllEmployees(@Res() res: Response) {
    try {
      const employees = (await this.upNextService.findAllEmployees()).map(
        (employee) => {
          return {
            cod: employee.codUsuario,
            nome: employee.nomeUsuario,
            email: employee.emailUsuario,
            document: employee.cpfUsuario.replace(
              /(\d{3})(\d{3})(\d{3})(\d{2})/,
              '$1.$2.$3-$4',
            ),
            telefone:
              employee.telefoneUsuario.length === 11
                ? employee.telefoneUsuario.replace(
                    /(\d{2})(\d{5})(\d{4})/,
                    '($1) $2-$3',
                  )
                : employee.telefoneUsuario.replace(
                    /(\d{2})(\d{4})(\d{4})/,
                    '($1) $2-$3',
                  ),
          };
        },
      );

      return res.status(HttpStatus.OK).json({
        data: [{ data: employees }],
        message: 'Funcionários encontrados com sucesso',
        status: true,
      });
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({
        data: [],
        message: 'Nenhum funcionário foi encontrada',
        status: false,
      });
    }
  }

  @Get('funcionario/:dataEmployee')
  async findEmployee(
    @Param() params: { dataEmployee: string },
    @Res() res: Response,
  ) {
    try {
      const employee = parseInt(params.dataEmployee)
        ? await this.upNextService.findEmployeeDoc(params.dataEmployee)
        : await this.upNextService.findEmployeeEmail(params.dataEmployee);
      return res.status(HttpStatus.OK).json({
        data: [
          {
            data: [
              {
                cod: employee.codUsuario,
                nome: employee.nomeUsuario,
                email: employee.emailUsuario,
                document: employee.cpfUsuario.replace(
                  /(\d{3})(\d{3})(\d{3})(\d{2})/,
                  '$1.$2.$3-$4',
                ),
                telefone:
                  employee.telefoneUsuario.length === 11
                    ? employee.telefoneUsuario.replace(
                        /(\d{2})(\d{5})(\d{4})/,
                        '($1) $2-$3',
                      )
                    : employee.telefoneUsuario.replace(
                        /(\d{2})(\d{4})(\d{4})/,
                        '($1) $2-$3',
                      ),
              },
            ],
          },
        ],
        message: 'Funcionário encontrado com sucesso',
        status: true,
      });
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({
        data: [],
        message: 'Nenhum funcionário foi encontrada',
        status: false,
      });
    }
  }

  @Get('funcionarioUn/:dataEmployee')
  async findEmployeeUnique(
    @Param() params: { dataEmployee: number },
    @Res() res: Response,
  ) {
    try {
      const employee = await this.upNextService.findEmployeeUnique(
        Number(params.dataEmployee),
      );
      return res.status(HttpStatus.OK).json({
        data: [
          {
            data: [
              {
                cod: employee.codUsuario,
                nome: employee.nomeUsuario,
                email: employee.emailUsuario,
                cnpjEmpresa: employee.empresaClientesDocumentUsuario,
                document: employee.cpfUsuario.replace(
                  /(\d{3})(\d{3})(\d{3})(\d{2})/,
                  '$1.$2.$3-$4',
                ),
                telefone:
                  employee.telefoneUsuario.length === 11
                    ? employee.telefoneUsuario.replace(
                        /(\d{2})(\d{5})(\d{4})/,
                        '($1) $2-$3',
                      )
                    : employee.telefoneUsuario.replace(
                        /(\d{2})(\d{4})(\d{4})/,
                        '($1) $2-$3',
                      ),
              },
            ],
          },
        ],
        message: 'Funcionário encontrado com sucesso',
        status: true,
      });
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({
        data: [],
        message: 'Nenhum funcionário foi encontrada',
        status: false,
      });
    }
  }

  @Post('cadastroFunc/:cnpjEnterprise')
  async createEmpl(
    @Body() employee: UsuariosAdm,
    @Param() params: { cnpjEnterprise: string },
    @Res() res: Response,
  ) {
    try {
      if (!parseInt(employee.cpfUsuario)) {
        throw new InternalServerErrorException(
          'Erro: Necessário apenas números no CPF de cadastro da empresa!',
        );
      }
      if (employee.telefoneUsuario.length <= 9) {
        throw new InternalServerErrorException(
          'Erro: Necessário inserir o DD no número de cadastro da empresa!',
        );
      }

      if (!this.validateDocument.isCpfValid(employee.cpfUsuario)) {
        throw new InternalServerErrorException(
          'O CPF: ' + employee.cpfUsuario + ' é inválido!',
        );
      }

      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(employee.emailUsuario)) {
        throw new InternalServerErrorException(
          'O email: ' + employee.emailUsuario + ' é inválido!',
        );
      }

      await this.upNextService.createEmployee(employee, params.cnpjEnterprise);
      return res.status(HttpStatus.CREATED).json({
        data: [{ data: employee }],
        message: 'Funcionário cadastrado com sucesso!',
        status: true,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: [],
        message: e.message,
        status: false,
      });
    }
  }

  @Post('editaFunc/:cnpjEnterprise')
  async updateEmpl(
    @Body() employee: UsuariosAdm,
    @Param() params: { cnpjEnterprise: string },
    @Res() res: Response,
  ) {
    try {
      if (!parseInt(employee.cpfUsuario)) {
        throw new InternalServerErrorException(
          'Erro: Necessário apenas números no CPF de cadastro da empresa!',
        );
      }
      if (employee.telefoneUsuario.length <= 9) {
        throw new InternalServerErrorException(
          'Erro: Necessário inserir o DD no número de cadastro da empresa!',
        );
      }

      if (!this.validateDocument.isCpfValid(employee.cpfUsuario)) {
        throw new InternalServerErrorException(
          'O CPF: ' + employee.cpfUsuario + ' é inválido!',
        );
      }

      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(employee.emailUsuario)) {
        throw new InternalServerErrorException(
          'O email: ' + employee.emailUsuario + ' é inválido!',
        );
      }
      await this.upNextService.updateEmployee(employee, params.cnpjEnterprise);
      return res.status(HttpStatus.CREATED).json({
        data: [{ data: employee }],
        message: 'Funcionário cadastrado com sucesso!',
        status: true,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: [],
        message: e.message,
        status: false,
      });
    }
  }

  @Post('removeFunc/:codFunc')
  async deleteFunc(@Param() params: { codFunc: number }, @Res() res: Response) {
    try {
      await this.upNextService.deleteEmployee(Number(params.codFunc));
      return res.status(HttpStatus.OK).json({
        data: [],
        message: 'Funcionário removido com sucesso',
        status: true,
      });
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({
        data: [],
        message: 'Nenhum funcionário foi encontrado para ser removido',
        status: false,
      });
    }
  }
}
