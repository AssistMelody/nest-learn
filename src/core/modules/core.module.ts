import { Global, Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { ShareModule } from './share/shared.module';

@Global()
@Module({
  imports: [LoggerModule, ShareModule],
  providers: [],
  exports: [],
})
export class CoreModule {}
