import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BrowserPoolService } from './browser-pool.service';

@Global()
@Module({})
export class BrowserPoolModule {
  static forRoot(options: any): DynamicModule {
    return {
      module: BrowserPoolModule,
      imports: [ConfigModule],
      exports: [BrowserPoolService],
      providers: [
        {
          provide: 'config',
          useFactory: options.factory,
          inject: options.inject,
        },
        BrowserPoolService,
      ],
    };
  }
}
