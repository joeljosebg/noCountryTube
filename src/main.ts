import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { configSwagger } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes( 
    new ValidationPipe({ 
    whitelist: true, 
    forbidNonWhitelisted: true, 
    }) 
  );

  const document = SwaggerModule.createDocument( app, configSwagger );
  SwaggerModule.setup( 'api', app, document );

  await app.listen(3000);
}
bootstrap();
