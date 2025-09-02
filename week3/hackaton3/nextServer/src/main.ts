import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties not in DTO
      forbidNonWhitelisted: true, // throws error if unknown props
      transform: true, // auto-transform payloads to DTO instances
    }),
  );
  app.enableCors()
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
