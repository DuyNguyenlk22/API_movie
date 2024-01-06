import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(express.static("."))
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder().setTitle("API_Movie").addBearerAuth().setDescription('').setVersion('v1').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/swagger", app, document);

  await app.listen(8080);
}
bootstrap();
