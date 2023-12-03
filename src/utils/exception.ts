import { HttpException, HttpStatus } from '@nestjs/common';

export class Exception extends HttpException {
  constructor(code: number, message: string) {
    super({ statusCode: code, message }, HttpStatus.OK);
  }
  getResponse(): { statusCode: number; message: string } {
    return super.getResponse() as { statusCode: number; message: string };
  }
}
