import { Injectable } from '@nestjs/common';
// import { CreateWorkOrderDto } from './dto/create-work-order.dto';
// import { UpdateWorkOrderDto } from './dto/update-work-order.dto';
import { PrismaService } from 'src/adapters/prisma/prisma.service';
import { GetWorkOrderRequest } from 'src/application/controllers/work-order/work-order.controller';
@Injectable()
export class WorkOrderService {
  constructor(private readonly prismaService: PrismaService) {}
  // create(createWorkOrderDto: CreateWorkOrderDto) {
  //   return 'This action adds a new workOrder';
  // }

  async findAll(input: GetWorkOrderRequest) {
    const serviceOrders = await this.prismaService.ordemServico.findFirst({
      where: {
        numOs: input.codOs,
      },
      include: {
        EmpresaOs: {
          select: {
            telefoneEmpresa: true,
            emailEmpresa: true,
            razaoSocialEmpresa: true,
          },
        },
      },
    });

    let orders = [];
    if (serviceOrders.atributoValidadorOs === 'S') {
      orders = await this.prismaService.ordemServico.findMany({
        where: {
          documento: serviceOrders.documento,
        },
        include: {
          EmpresaOs: {
            select: {
              telefoneEmpresa: true,
              emailEmpresa: true,
              razaoSocialEmpresa: true,
            },
          },
        },
      });
    }

    return orders.length === 0 ? [serviceOrders] : orders.slice(0, 4);
  }

  async findOne(input: GetWorkOrderRequest) {
    const serviceOrders = await this.prismaService.ordemServico.findFirst({
      where: {
        numOs: input.codOs,
      },
      include: {
        EmpresaOs: {
          select: {
            telefoneEmpresa: true,
            emailEmpresa: true,
            razaoSocialEmpresa: true,
          },
        },
      },
    });
    return serviceOrders;
  }

  async filterDate(codOs: string, startDate: string, endDate: string) {
    const serviceOrders = await this.findAll({ codOs: codOs, pass: '' });

    let orders = [];
    orders = serviceOrders.filter((os) => {
      if (
        new Date(os.dataUltimoUpload) >=
          new Date(startDate + 'T00:00:00.000Z') &&
        new Date(os.dataUltimoUpload) <= new Date(endDate + 'T23:59:59.000Z')
      ) {
        return os;
      }
    });
    return orders;
  }

  // update(id: number, updateWorkOrderDto: UpdateWorkOrderDto) {
  //   return `This action updates a #${id} workOrder`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} workOrder`;
  // }
}
