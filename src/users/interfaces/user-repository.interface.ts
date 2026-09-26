import { User } from '../entities/user.entity';

/**
 * Contrato de persistência de usuários.
 *
 * >>> PONTO DE EXTENSÃO PARA PERSISTÊNCIA DEFINITIVA <<<
 * Quando o banco de dados for adicionado, crie uma nova classe (ex:
 * `PostgresUserRepository`) que implemente esta interface e substitua o
 * provider no `UsersModule`. Nenhum código de `service`/`controller`
 * precisa mudar.
 */
export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  update(id: string, partial: Partial<User>): Promise<User | null>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
