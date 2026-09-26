import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Filtro global de exceções.
 *
 * Objetivos:
 * - Formato de erro consistente em toda a API.
 * - Nunca vazar stack traces, mensagens internas de infraestrutura ou
 *   detalhes de implementação para o cliente.
 * - Logar o erro completo no servidor para investigação.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Erro interno do servidor.';
    let code = 'INTERNAL_ERROR';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const body = exception.getResponse();
      if (typeof body === 'string') {
        message = body;
      } else if (typeof body === 'object' && body !== null) {
        const anyBody = body as Record<string, unknown>;
        message = (anyBody.message as string | string[]) ?? exception.message;
        code = (anyBody.code as string) ?? HttpStatus[status];
      }
    } else {
      // Erro não tratado / inesperado: nunca expor detalhes ao cliente.
      this.logger.error(
        `Erro não tratado em ${request.method} ${request.url}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    response.status(status).json({
      statusCode: status,
      code,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
