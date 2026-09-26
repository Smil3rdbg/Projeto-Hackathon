import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import {
  IUserRepository,
  USER_REPOSITORY,
} from './interfaces/user-repository.interface';
import { User } from './entities/user.entity';

export interface CreateUserInput {
  username: string;
  displayName: string;
  email: string;
  passwordHash: string;
}

@Injectable()
export class UsersService {
  constructor(
    // Injeta pela INTERFACE (via token), não pela implementação concreta.
    // Isso é o que permite trocar a implementação em memória por uma
    // implementação real de banco sem tocar neste service.
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(input: CreateUserInput): Promise<User> {
    const now = new Date();
    const user: User = {
      id: uuid(),
      username: input.username,
      displayName: input.displayName,
      email: input.email,
      passwordHash: input.passwordHash,
      avatarUrl: null,
      bio: null,
      status: 'offline',
      accountState: 'pending_verification',
      emailVerified: false,
      twoFactorEnabled: false,
      createdAt: now,
      updatedAt: now,
    };

    return this.userRepository.create(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async update(id: string, partial: Partial<User>): Promise<User | null> {
    return this.userRepository.update(id, partial);
  }
}
