import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ProductAlreadyExistsError } from '../../../domain/errors/ProductAlreadyExistsError';
import { ProductNotFoundError } from '../../../domain/errors/ProductNotFoundError';

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const reply = context.getResponse<FastifyReply>();

    if (exception instanceof ProductNotFoundError) {
      return reply.status(404).send({
        statusCode: 404,
        message: exception.message,
        additionalData: exception?.additionalData,
      });
    }

    if (exception instanceof ProductAlreadyExistsError) {
      return reply.status(409).send({
        statusCode: 409,
        message: exception.message,
        additionalData: exception?.additionalData,
      });
    }

    return reply.status(500).send({
      statusCode: 500,
      message: 'Internal server error',
      error: exception.message || exception,
    });
  }
}
