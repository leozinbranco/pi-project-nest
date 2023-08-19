import { Module } from '@nestjs/common';
import { BaseService } from 'src/Services/BaseService.service';
import { ClientService } from 'src/Services/ClientService.service';
import { BaseController } from 'src/Controllers/BaseController.controller';
import { ClientController } from 'src/Controllers/ClientController.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

const defaultOptions = {
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      username: 'remote',
      database: 'db_pi_project',
      password: '12345678',
      host: 'localhost',
      synchronize: true,
      entities: [],
    }),
  ],
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
