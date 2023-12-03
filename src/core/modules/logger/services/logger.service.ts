import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  info(label: string, message: any) {
    this.logger.info(label, message);
  }

  error(label: string, message: any) {
    this.logger.error(label, message);
  }
}
