import { Global, Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { ShareModule } from './share/shared.module';
import { HttpModule } from './http/http.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { VisitGuard } from '../guards/visit.guard';
import { BrowserPoolModule } from './browser/browser.module';
import { Options } from 'generic-pool';
import { Config } from './browser/browser.type';
import { BullModule } from '@nestjs/bull';

@Global()
@Module({
  imports: [
    LoggerModule,
    ShareModule,
    HttpModule.forRoot({
      inject: [ConfigService],
      import: [ConfigModule],
    }),
    BrowserPoolModule.forRoot({
      inject: [ConfigService],
      import: [ConfigModule],
      factory: (config: ConfigService): Config => {
        return {
          max: config.get<number>('POOL_MAX'),
          min: config.get<number>('POOL_MIN'),
          acquireTimeoutMillis: 1000,
          pageTables: config.get<number>('PUPPETEER_MAX_COUNT'),
          testOnBorrow: true,
        };
      },
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        redis: {
          host: config.get('CACHE_HOST'),
          port: config.get('CACHE_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: VisitGuard,
    },
  ],
  exports: [],
})
export class CoreModule {}
