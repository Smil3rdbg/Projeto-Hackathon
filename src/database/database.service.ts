import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResultRow } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool: Pool;
  constructor(config: ConfigService) {
    this.pool = new Pool({
      connectionString: config.get<string>('DATABASE_URL'),
      host: config.get<string>('DB_HOST') || 'localhost',
      port: Number(config.get<string>('DB_PORT') || 5432),
      database: config.get<string>('DB_NAME') || 'nexa',
      user: config.get<string>('DB_USER') || 'postgres',
      password: config.get<string>('DB_PASSWORD') || 'postgres',
      ssl: config.get<string>('DB_SSL') === 'true' ? { rejectUnauthorized: false } : undefined,
    });
  }
  query<T extends QueryResultRow = any>(text: string, params: any[] = []) { return this.pool.query<T>(text, params); }
  async onModuleDestroy() { await this.pool.end(); }
}
