import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

export async function createApp() {
  const app = await NestFactory.create(AppModule, {
    // Em produção, prefira um logger estruturado (ex: pino) no lugar do
    // logger padrão do Nest.
    logger: ['error', 'warn', 'log'],
  });

  const config = app.get(ConfigService);

  app.use(helmet());
  app.enableCors({
    origin: config.get<string>('CORS_ORIGIN') ?? true,
    credentials: true,
  });

  // Validação centralizada de toda entrada da API: nunca confiar no
  // frontend. whitelist remove campos não esperados do DTO;
  // forbidNonWhitelisted rejeita a requisição se vier campo extra.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.setGlobalPrefix('api/v1');

  return app;
}

async function bootstrap(): Promise<void> {
  const app = await createApp();
  const port = app.get(ConfigService).get<number>('port') ?? 3000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`🚀 Backend rodando em http://localhost:${port}/api/v1`);
}

if (require.main === module) bootstrap();
