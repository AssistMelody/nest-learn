import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { LoggerFilter } from './core/filters/logger/logger.filter';
// import { LoggerMiddleware } from './core/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug'],
  });
  // app.useGlobalFilters(new LoggerFilter());
  // app.use(LoggerMiddleware);
  await app.listen(3000);
}
bootstrap();
