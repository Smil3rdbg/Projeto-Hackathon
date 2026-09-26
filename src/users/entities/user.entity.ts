/**
 * Entidade de domínio do usuário.
 *
 * IMPORTANTE: esta entidade representa o modelo INTERNO, com dados sensíveis
 * (passwordHash). Ela nunca deve ser retornada diretamente pela API — sempre
 * mapeada para um DTO público (ver users/dto/user-response.dto.ts).
 */
export type AccountState = 'pending_verification' | 'active' | 'suspended' | 'banned';

export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  passwordHash: string;
  avatarUrl: string | null;
  bio: string | null;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  accountState: AccountState;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
