import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BaseService } from './base.service';
import { PersonService } from './users/person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestMiddleware } from './middleware/request.middleware';
import { Person } from './users/entities/person.entity';
import { ServiceOrderModule } from './service-order/service-order.module';
import { PersonModule } from './users/person.module';
import { DatabaseModule } from './db/database.module';

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
    TypeOrmModule.forFeature([Person]),
    ServiceOrderModule,
    PersonModule,
    DatabaseModule,
  ],
  providers: [BaseService, PersonService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes('persons');
  }
}
