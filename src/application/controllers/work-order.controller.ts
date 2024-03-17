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
import { WorkOrderService } from '../../services/work-order.service';
import { AuthGuard } from '../guards/auth/auth.guard';

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
  // remover metodo sem utilidade
  @Get('one/:codOs')
  findOne(@Param('codOs') codOs: string, @Param('pass') pass: string) {
    return this.workOrderService.findOne({ codOs, pass });
  }

  @Get('all/:codOs/:pass')
  findMany(@Param('codOs') codOs: string, @Param('pass') pass: string) {
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
