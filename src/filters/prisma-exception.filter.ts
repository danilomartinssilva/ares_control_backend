import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError, PrismaClientValidationError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  override catch(
    exception: PrismaClientKnownRequestError | PrismaClientValidationError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          response.status(status).json({
            statusCode: status,
            message: `The field ${(exception.meta as any).target} must be unique. Value already exists.`,
          });
          return;

        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          response.status(status).json({
            statusCode: status,
            message: 'The requested resource was not found.',
          });
          return;

        default:
          super.catch(exception, host);
          return;
      }
    } else if (exception instanceof PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      response.status(status).json({
        statusCode: status,
        message: 'Invalid or incomplete data.',
        error: exception.message.split('\n').pop(),
      });
      return;
    }

    super.catch(exception, host);
  }
}
