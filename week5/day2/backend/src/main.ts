import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      forbidUnknownValues: true,
      transform: true,
    }),
  );

  app.enableCors()
  const PORT = process.env.PORT ?? 3001;
await app.listen(PORT, '0.0.0.0');

}
bootstrap();
