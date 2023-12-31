import { DynamicModule, Global, Module } from '@nestjs/common';
import { HttpService } from './http.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({})
export class HttpModule {
  static forRoot(options: any): DynamicModule {
    return {
      module: HttpModule,
      imports: [ConfigModule],
      exports: [HttpService],
      providers: [
        {
          provide: 'HTTP_CONFIG',
          useFactory: options.factory,
          inject: options.inject,
        },
        HttpService,
      ],
    };
  }
}
