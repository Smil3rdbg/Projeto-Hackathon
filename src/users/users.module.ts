import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { USER_REPOSITORY } from './interfaces/user-repository.interface';
import { InMemoryUserRepository } from './repositories/in-memory-user.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      // >>> PONTO DE EXTENSÃO <<<
      // Quando a persistência definitiva existir, troque apenas esta linha:
      // useClass: InMemoryUserRepository  →  useClass: PostgresUserRepository
      provide: USER_REPOSITORY,
      useClass: InMemoryUserRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
