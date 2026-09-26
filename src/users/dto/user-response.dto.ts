import { Exclude, Expose } from 'class-transformer';
import { User } from '../entities/user.entity';

/**
 * DTO público do usuário.
 *
 * @Exclude() por padrão + @Expose() nos campos permitidos garante que,
 * mesmo que alguém adicione um novo campo sensível à entidade `User` no
 * futuro, ele NÃO vaza automaticamente pela API — é preciso expor
 * explicitamente.
 */
@Exclude()
export class UserResponseDto {
  @Expose() id: string;
  @Expose() username: string;
  @Expose() displayName: string;
  @Expose() avatarUrl: string | null;
  @Expose() bio: string | null;
  @Expose() status: string;
  @Expose() createdAt: Date;

  static fromEntity(user: User): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.username = user.username;
    dto.displayName = user.displayName;
    dto.avatarUrl = user.avatarUrl;
    dto.bio = user.bio;
    dto.status = user.status;
    dto.createdAt = user.createdAt;
    // Note: passwordHash, email, emailVerified, twoFactorEnabled,
    // accountState NÃO são expostos aqui de propósito.
    return dto;
  }
}
