import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomError extends HttpException {
  constructor(code: string, message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
