/* eslint-disable prettier/prettier */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message =
      exception instanceof Error ? exception.message : 'Internal Server Error';
    let name = '';

    if (exception instanceof PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = `Ocurrio un error de validacion. Detalle del error: ${exception.message}`;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      name = exception.name;
    }

    response.status(status).json({
      statusCode: status,
      name,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
