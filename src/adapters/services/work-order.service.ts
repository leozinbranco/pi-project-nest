import { Injectable } from '@nestjs/common';
// import { CreateWorkOrderDto } from './dto/create-work-order.dto';
// import { UpdateWorkOrderDto } from './dto/update-work-order.dto';
import { PrismaService } from 'src/adapters/prisma/prisma.service';
import { GetWorkOrderRequest } from '../../application/controllers/work-order/work-order.controller';
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
    });

    let orders = [];
    if (serviceOrders.atributoValidadorOs === 'S') {
      orders = await this.prismaService.ordemServico.findMany({
        where: {
          cpfUsuario: serviceOrders.cpfUsuario,
        },
      });
    }

    return orders.length === 0 ? [serviceOrders] : orders;
  }

  async findOne(input: GetWorkOrderRequest) {
    const serviceOrders = await this.prismaService.ordemServico.findFirst({
      where: {
        numOs: input.codOs,
        telContatoOs: input.pass,
      },
    });
    return serviceOrders;
  }

  // update(id: number, updateWorkOrderDto: UpdateWorkOrderDto) {
  //   return `This action updates a #${id} workOrder`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} workOrder`;
  // }
}
