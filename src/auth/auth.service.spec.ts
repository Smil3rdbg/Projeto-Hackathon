import { ConflictException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { USER_REPOSITORY } from '../users/interfaces/user-repository.interface';
import { InMemoryUserRepository } from '../users/repositories/in-memory-user.repository';
import configuration from '../config/configuration';

describe('AuthService.register', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(() => {
    const repo = new InMemoryUserRepository();
    usersService = new UsersService(repo);
    const configService = new ConfigService(configuration());
    authService = new AuthService(usersService, configService as any);
  });

  const validDto = {
    username: 'joao.silva',
    displayName: 'João Silva',
    email: 'joao@example.com',
    password: 'Senha123Forte',
    confirmPassword: 'Senha123Forte',
  };

  it('cria o usuário e retorna apenas dados públicos', async () => {
    const result = await authService.register(validDto as any);

    expect(result.username).toBe('joao.silva');
    expect(result.id).toBeDefined();
    // Garante que campos sensíveis nunca aparecem no DTO de resposta.
    expect((result as any).passwordHash).toBeUndefined();
    expect((result as any).email).toBeUndefined();
  });

  it('faz hash da senha com Argon2id (nunca salva texto puro)', async () => {
    await authService.register(validDto as any);
    const stored = await usersService.findByEmail(validDto.email);

    expect(stored?.passwordHash).toBeDefined();
    expect(stored?.passwordHash).not.toBe(validDto.password);
    expect(stored?.passwordHash.startsWith('$argon2id$')).toBe(true);
  });

  it('rejeita cadastro com e-mail ou username já existentes, sem revelar qual', async () => {
    await authService.register(validDto as any);

    await expect(authService.register(validDto as any)).rejects.toThrow(
      ConflictException,
    );
  });
});
