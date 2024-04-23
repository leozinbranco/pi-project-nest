import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appEnv } from './shared/app-env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST',
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Order Flow API')
    .setDescription('API para controle de ordens de serviço.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(appEnv.node.port);
}
bootstrap();
