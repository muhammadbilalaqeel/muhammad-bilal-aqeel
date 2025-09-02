import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          
      forbidNonWhitelisted: true, 
      transform: true,          
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.map(err => {
          return {
            field: err.property,
            errors: Object.values(err.constraints || {}),
          };
        });
        return new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Validation failed',
          data: formattedErrors,
        });
      },
    }),
  );

  app.enableCors()
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
