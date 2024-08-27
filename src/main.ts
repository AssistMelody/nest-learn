import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// import { LoggerFilter } from './core/filters/logger/logger.filter';
// import { LoggerMiddleware } from './core/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['debug', 'log'],
    cors: true,
  });
  app.useStaticAssets(join(__dirname, '../../', 'public'), {
    prefix: '/static/',
  });
  // app.useGlobalFilters(new LoggerFilter());
  // app.use(LoggerMiddleware);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //   }),
  // );
  await app.listen(3000);
}
bootstrap();
