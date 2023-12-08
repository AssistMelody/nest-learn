import { Global, Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { ShareModule } from './share/shared.module';
import { HttpModule } from './http/http.module';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { VisitGuard } from '../guards/visit.guard';

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
  providers: [
    {
      provide: APP_GUARD,
      useClass: VisitGuard,
    },
  ],
  exports: [],
})
export class CoreModule {}
