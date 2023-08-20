import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BaseService } from './base.service';
import { PersonService } from './Users/Services/person.service';
import { PersonController } from './Users/Controllers/person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestMiddleware } from './middleware/request.middleware';
import { Person } from './Users/Entities/person.entity';
import * as dotenv from 'dotenv';

dotenv.config(); // carregando as variáveis de ambiente para a conexão com o banco de dados

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      synchronize: true,
      entities: [Person],
    }),
    TypeOrmModule.forFeature([Person])
  ],
  controllers: [
    PersonController
  ],
  providers: [
    BaseService,
    PersonService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes('persons');
  }
}
