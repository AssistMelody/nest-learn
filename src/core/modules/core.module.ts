import { Global, Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { ShareModule } from './share/shared.module';
import { HttpModule } from './http/http.module';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    LoggerModule,
    ShareModule,
    HttpModule.forRoot({
      inject: [ConfigService],
      test: (config: ConfigService) => {
        console.log(config);
        return config.get('DATABASE_PORT');
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class CoreModule {}
