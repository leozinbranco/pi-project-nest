import { Module } from '@nestjs/common';
import { BaseService } from 'src/Services/BaseService.service';
import { ClientService } from 'src/Services/ClientService.service';
import { BaseController } from 'src/Controllers/BaseController.controller';
import { ClientController } from 'src/Controllers/ClientController.controller';

@Module({
  imports: [],
  controllers: [
    BaseController,
    ClientController
  ],
  providers: [
    BaseService,
    ClientService
  ],
})
export class AppModule {}
