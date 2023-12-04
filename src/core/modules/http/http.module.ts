import { DynamicModule, Global, Module } from '@nestjs/common';
import { ServiceNameService } from './test.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({})
export class HttpModule {
  static forRoot(options: any): DynamicModule {
    return {
      module: HttpModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'HTTP_OPTIONS',
          useFactory: options.test,
          inject: options.inject,
        },
        ServiceNameService,
      ],
    };
  }
}
