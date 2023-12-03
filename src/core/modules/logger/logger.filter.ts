import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Exception } from 'src/utils/exception';
import { Logger } from 'winston';

@Catch(HttpException)
export class LoggerFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  catch(exception: Exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    console.debug(exception.getResponse());
    const errorCode =
      exception.getStatus() === HttpStatus.OK
        ? exception.getResponse().statusCode
        : status;
    const errorBody = {
      errorCode: errorCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.message,
    };
    this.logger.error('http error', errorBody);
    response.status(status).json(errorBody);
  }
}
