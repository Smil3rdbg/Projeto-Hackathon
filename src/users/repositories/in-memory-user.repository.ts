import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { User } from '../entities/user.entity';

/**
 * Implementação TEMPORÁRIA em memória, apenas para desenvolvimento e
 * demonstração enquanto a camada de banco de dados não existe.
 *
 * NÃO usar em produção: os dados são perdidos a cada reinício do processo
 * e não há suporte a múltiplas instâncias.
 *
 * Substituir por uma implementação real de `IUserRepository` quando a
 * persistência for definida (etapa futura).
 */
@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private readonly usersById = new Map<string, User>();

  async create(user: User): Promise<User> {
    this.usersById.set(user.id, user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.usersById.get(id) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalized = email.toLowerCase();
    for (const user of this.usersById.values()) {
      if (user.email.toLowerCase() === normalized) return user;
    }
    return null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const normalized = username.toLowerCase();
    for (const user of this.usersById.values()) {
      if (user.username.toLowerCase() === normalized) return user;
    }
    return null;
  }

  async update(id: string, partial: Partial<User>): Promise<User | null> {
    const existing = this.usersById.get(id);
    if (!existing) return null;
    const updated: User = { ...existing, ...partial, updatedAt: new Date() };
    this.usersById.set(id, updated);
    return updated;
  }
}
