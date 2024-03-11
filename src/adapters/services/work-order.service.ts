import { Injectable } from '@nestjs/common';
// import { CreateWorkOrderDto } from './dto/create-work-order.dto';
// import { UpdateWorkOrderDto } from './dto/update-work-order.dto';
import { PrismaService } from 'src/adapters/prisma/prisma.service';
import { GetWorkOrderRequest } from '../../application/controllers/work-order.controller';
@Injectable()
export class WorkOrderService {
  constructor(private readonly prismaService: PrismaService) {}
  // create(createWorkOrderDto: CreateWorkOrderDto) {
  //   return 'This action adds a new workOrder';
  // }

  async findAll(input: GetWorkOrderRequest) {
    return await this.prismaService.ordemServico.findMany({
      where: {
        numOs: input.codOs,
      },
    });
  }

  async findOne(input: GetWorkOrderRequest) {
    return await this.prismaService.ordemServico.findFirst({
      where: {
        numOs: input.codOs,
        telContatoOs: input.pass,
      },
    });
  }

  // update(id: number, updateWorkOrderDto: UpdateWorkOrderDto) {
  //   return `This action updates a #${id} workOrder`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} workOrder`;
  // }
}
