import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmpresaClientes, UsuariosAdm } from '@prisma/client';

@Injectable()
export class UpNextService {
  constructor(private readonly prismaService: PrismaService) {}

  /* Empresas */

  async findEnterprise(cnpj: string) {
    const enterprise = await this.prismaService.empresaClientes.findFirst({
      where: { cnpjEmpresa: cnpj },
    });
    if (enterprise === null) {
      throw new Error(
        `A empresa que possui o CNPJ ${cnpj} não está cadastrada no sistema`,
      );
    }
    return enterprise;
  }

  async createEnterprise(enterprise: EmpresaClientes) {
    return await this.prismaService.empresaClientes.create({
      data: {
        ...enterprise,
        cnpjEmpresa: enterprise.cnpjEmpresa.replace(/\D/g, ''),
        telefoneEmpresa: enterprise.telefoneEmpresa.replace(/\D/g, ''),
      },
    });
  }

  async updateEnterprise(enterprise: EmpresaClientes) {
    const cod = enterprise.codEmpresa;
    delete enterprise.codEmpresa;
    return await this.prismaService.empresaClientes.update({
      where: {
        codEmpresa: cod,
      },
      data: {
        ...enterprise,
        cnpjEmpresa: enterprise.cnpjEmpresa.replace(/\D/g, ''),
        telefoneEmpresa: enterprise.telefoneEmpresa.replace(/\D/g, ''),
      },
    });
  }

  async findAllEnterprises() {
    return await this.prismaService.empresaClientes.findMany();
  }

  async findEnterpriseEmail(email: string) {
    return await this.prismaService.empresaClientes.findFirstOrThrow({
      where: {
        emailEmpresa: {
          contains: email,
        },
      },
    });
  }

  async findEnterpriseDoc(doc: string) {
    return await this.prismaService.empresaClientes.findFirstOrThrow({
      where: {
        cnpjEmpresa: {
          contains: doc,
        },
      },
    });
  }

  async findEnterpriseUnique(doc: number) {
    return await this.prismaService.empresaClientes.findUnique({
      where: {
        codEmpresa: doc,
      },
    });
  }

  async deleteEnterprise(cod: number) {
    return await this.prismaService.empresaClientes.delete({
      where: {
        codEmpresa: cod,
      },
    });
  }

  /* Funcionários  */

  async createEmployee(employee: UsuariosAdm, cnpj: string) {
    await this.findEnterprise(cnpj);
    const otherEmployeeCpf = await this.prismaService.usuariosAdm.findFirst({
      where: {
        cpfUsuario: employee.cpfUsuario,
      },
    });

    if (otherEmployeeCpf !== null) {
      throw new Error(
        `O CPF ${employee.cpfUsuario} já está sendo utilizado por outro funcionário`,
      );
    }

    const otherEmployeeEmail = await this.prismaService.usuariosAdm.findFirst({
      where: {
        emailUsuario: employee.emailUsuario,
      },
    });

    if (otherEmployeeEmail !== null) {
      throw new Error(
        `O E-mail ${employee.emailUsuario} já está sendo utilizado por outro funcionário`,
      );
    }
    return await this.prismaService.usuariosAdm.create({
      data: {
        ...employee,
        cpfUsuario: employee.cpfUsuario.replace(/\D/g, ''),
        telefoneUsuario: employee.telefoneUsuario.replace(/\D/g, ''),
        adm: false,
      },
    });
  }

  async updateEmployee(employeee: UsuariosAdm, cnpj: string) {
    await this.findEnterprise(cnpj);
    const cod = employeee.codUsuario;
    delete employeee.codUsuario;
    return await this.prismaService.usuariosAdm.update({
      where: {
        codUsuario: cod,
      },
      data: {
        ...employeee,
        cpfUsuario: employeee.cpfUsuario.replace(/\D/g, ''),
        telefoneUsuario: employeee.telefoneUsuario.replace(/\D/g, ''),
        adm: false,
      },
    });
  }

  async findAllEmployees() {
    return await this.prismaService.usuariosAdm.findMany();
  }

  async findEmployeeEmail(email: string) {
    return await this.prismaService.usuariosAdm.findFirstOrThrow({
      where: {
        emailUsuario: {
          contains: email,
        },
      },
    });
  }

  async findEmployeeDoc(doc: string) {
    return await this.prismaService.usuariosAdm.findFirstOrThrow({
      where: {
        cpfUsuario: {
          contains: doc,
        },
      },
    });
  }

  async findEmployeeUnique(doc: number) {
    return await this.prismaService.usuariosAdm.findUnique({
      where: {
        codUsuario: doc,
      },
    });
  }

  async deleteEmployee(cod: number) {
    return await this.prismaService.usuariosAdm.delete({
      where: {
        codUsuario: cod,
      },
    });
  }
}
