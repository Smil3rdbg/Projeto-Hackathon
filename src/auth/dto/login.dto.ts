import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
export class LoginDto {
  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string;
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
