import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { WorkOrderService } from '../../../adapters/services/work-order.service';
import { AuthGuard } from '../../guards/auth/auth.guard';

export interface GetWorkOrderRequest {
  codOs: string;
  pass: string;
}

@Controller('work-order')
export class WorkOrderController {
  constructor(private readonly workOrderService: WorkOrderService) {}

  // @Post()
  // create(@Body() createWorkOrderDto: CreateWorkOrderDto) {
  //   return this.workOrderService.create(createWorkOrderDto);
  // }

  // @Get()
  // findAll() {
  //   return this.workOrderService.findAll();
  // }
  // @UseGuards(AuthGuard)

  // ## TODO: Passar query param para body param.
  // @UseGuards(AuthGuard)
  @Get()
  findOne(@Query('codOs') codOs: string, @Query('pass') pass: string) {
    return this.workOrderService.findOne({ codOs, pass });
  }

  // @UseGuards(AuthGuard)
  @Get('all')
  findMany(@Query('codOs') codOs: string, @Query('pass') pass: string) {
    return this.workOrderService.findAll({ codOs, pass });
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateWorkOrderDto: UpdateWorkOrderDto,
  // ) {
  //   return this.workOrderService.update(+id, updateWorkOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.workOrderService.remove(+id);
  // }
}
