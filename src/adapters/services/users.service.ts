import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/adapters/prisma/prisma.service';
import { UsuariosAdm } from '@prisma/client';
export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  // private readonly users = [
  //   {
  //     userId: 1,
  //     username: '50560442882',
  //     password: 'teste123',
  //   },
  //   {
  //     userId: 2,
  //     username: 'outroUsuario',
  //     password: 'outraSenha',
  //   },
  // ];

  async findOne(cpf: string): Promise<UsuariosAdm | undefined> {
    return await this.prismaService.usuariosAdm.findFirst({
      where: {
        cpfUsuario: cpf,
      },
      include: {
        empresaUsuario: {
          select: { codEmpresa: true, emailEmpresa: true, cnpjEmpresa: true },
        },
      },
    });
  }
}
