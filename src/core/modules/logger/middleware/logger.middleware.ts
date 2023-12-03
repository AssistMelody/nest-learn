import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  use(req: Request, res: any, next: () => void) {
    this.logger.info('route', {
      req: {
        method: req.method,
        url: req.url,
        ip: req.ip,
        query: req.query,
        body: req.body,
      },
    });
    next();
  }
}
