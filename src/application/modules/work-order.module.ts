import { Module } from '@nestjs/common';
import { WorkOrderService } from '../../adapters/services/work-order.service';
import { WorkOrderController } from '../controllers/work-order/work-order.controller';
import { PrismaModule } from 'src/adapters/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WorkOrderController],
  providers: [WorkOrderService],
})
export class WorkOrderModule {}
