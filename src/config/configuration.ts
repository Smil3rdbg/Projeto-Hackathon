/**
 * Configuração centralizada da aplicação.
 * Tudo o que depende de variáveis de ambiente passa por aqui — nenhum módulo
 * deve ler `process.env` diretamente, para manter a configuração testável
 * e fácil de trocar (ex: quando a camada de persistência for adicionada).
 */
export interface AppConfig {
  nodeEnv: string;
  port: number;
  security: {
    argon2: {
      memoryCost: number;
      timeCost: number;
      parallelism: number;
    };
  };
}

export default (): AppConfig => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  security: {
    argon2: {
      memoryCost: parseInt(process.env.ARGON2_MEMORY_COST ?? '19456', 10),
      timeCost: parseInt(process.env.ARGON2_TIME_COST ?? '2', 10),
      parallelism: parseInt(process.env.ARGON2_PARALLELISM ?? '1', 10),
    },
  },
});
