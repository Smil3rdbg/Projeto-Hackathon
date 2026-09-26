import 'reflect-metadata';
import type { IncomingMessage, ServerResponse } from 'http';
import { createApp } from '../src/main';

let server: Promise<(req: IncomingMessage, res: ServerResponse) => void> | undefined;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    server ??= createApp().then(async app => {
      await app.init();
      return app.getHttpAdapter().getInstance();
    }).catch(error => { server = undefined; throw error; });
    (await server)(req, res);
  } catch (error) {
    console.error('Falha ao iniciar a API:', error);
    if (!res.headersSent) { res.statusCode = 500; res.end('Erro ao iniciar a API'); }
  }
}
