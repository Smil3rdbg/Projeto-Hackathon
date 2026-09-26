import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'PasswordsMatch', async: false })
class PasswordsMatchConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args?: ValidationArguments): boolean {
    return !!args && confirmPassword === (args.object as RegisterDto).password;
  }
  defaultMessage(): string {
    return 'As senhas não coincidem.';
  }
}

/**
 * Validação de entrada do cadastro.
 * Nunca confiar exclusivamente em validações do frontend — tudo aqui é
 * reforçado no servidor via ValidationPipe global (main.ts).
 */
export class RegisterDto {
  @IsString()
  @MinLength(3, { message: 'O nome de usuário deve ter ao menos 3 caracteres.' })
  @MaxLength(32, { message: 'O nome de usuário deve ter no máximo 32 caracteres.' })
  @Matches(/^[a-z0-9._]+$/i, {
    message: 'O nome de usuário só pode conter letras, números, "." e "_".',
  })
  username: string;

  @IsString()
  @MinLength(1)
  @MaxLength(64)
  displayName: string;

  @IsEmail({}, { message: 'E-mail inválido.' })
  @MaxLength(50)
  email: string;

  @IsString()
  @MinLength(8, { message: 'A senha deve ter ao menos 8 caracteres.' })
  @MaxLength(72)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'A senha deve conter letra maiúscula, minúscula e número.',
  })
  password: string;

  @IsString()
  @Validate(PasswordsMatchConstraint)
  confirmPassword: string;
}
