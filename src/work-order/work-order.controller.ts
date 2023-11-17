import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { WorkOrderService } from './work-order.service';
import { AuthGuard } from '../auth/auth.guard';

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
  @Get()
  findOne(@Query('codOs') codOs: string, @Query('pass') pass: string) {
    return this.workOrderService.findOne({ codOs, pass });
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
