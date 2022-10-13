import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse();
    const code = typeof error === 'string' ? error : '';
    const message = exception.message;
    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    console.error(`[Error] ${code}: ${message}`);

    response.status(status).json({
      success: false,
      code,
      data: null,
      message,
    });
  }
}
