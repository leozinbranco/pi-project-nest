import { Module } from '@nestjs/common';
import { BaseService } from './base.service';
import { PersonService } from './Users/Services/person.service';
import { BaseController } from './base.controller';
import { PersonController } from './Users/Controllers/person.controller';
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
    PersonController
  ],
  providers: [
    BaseService,
    PersonService
  ],
})
export class AppModule {}
