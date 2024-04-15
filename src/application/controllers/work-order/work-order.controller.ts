import { Controller, Get, Param } from '@nestjs/common';
import { WorkOrderService } from '../../../adapters/services/work-order.service';

export interface GetWorkOrderRequest {
  codOs: string;
  pass: string;
}

@Controller('work-order')
export class WorkOrderController {
  constructor(private readonly workOrderService: WorkOrderService) {}

  @Get('one/:codOs')
  findOne(@Param('codOs') codOs: string, @Param('pass') pass: string) {
    return this.workOrderService.findOne({ codOs, pass });
  }

  @Get('all/:codOs/:pass')
  findMany(@Param('codOs') codOs: string, @Param('pass') pass: string) {
    return this.workOrderService.findAll({ codOs, pass });
  }

  @Get('filterDate/:startDate/:endDate/:codOs')
  filterDate(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
    @Param('codOs') codOs: string,
  ) {
    return this.workOrderService.filterDate(codOs, startDate, endDate);
  }

  @Get('filterCodOs/:numberOs')
  filterCodOs(@Param('numberOs') codOs: string) {
    return this.workOrderService.findOne({ codOs, pass: '' });
  }
}
