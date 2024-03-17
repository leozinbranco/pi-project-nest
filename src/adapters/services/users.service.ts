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
