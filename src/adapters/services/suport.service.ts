import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/adapters/prisma/prisma.service';
import { Tickets } from '@prisma/client';

@Injectable()
export class SuportService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(suportData: Tickets): Promise<Tickets> {
    return await this.prismaService.tickets.create({
      data: suportData,
    });
  }

  async find(numTicket: number) {
    return await this.prismaService.tickets.findFirst({
      where: {
        numTicket: Number(numTicket),
      },
    });
  }

  async findAll() {
    return await this.prismaService.tickets.findMany();
  }

  async findEnterprise(codEnterprise: number) {
    return await this.prismaService.empresaClientes.findFirst({
      where: { codEmpresa: codEnterprise },
      include: {
        EmpresaTicket: {
          select: { numTicket: true },
          orderBy: { dataAberturaTicket: 'desc' },
          take: 1,
        },
      },
    });
  }

  async update(
    numTicket: number,
    updateData: Partial<Tickets>,
  ): Promise<Tickets> {
    return await this.prismaService.tickets.update({
      where: { numTicket: numTicket },
      data: updateData,
    });
  }
}
