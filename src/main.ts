import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appEnv } from './shared/app-env';

async function bootstrap() {
  console.log('PORTA SELECIONADA: ', appEnv.node.port);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // const isProduction = process.env.NODE_ENV === 'production';
  const corsOptions = {
    origin: '*', // PROVISORIO -> isProduction ? 'https://order-flow-frontend.vercel.app' : '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  app.enableCors(corsOptions);
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
