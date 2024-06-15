import { $Enums } from '@prisma/client';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(20)
  password: string;

  @MinLength(3)
  @MaxLength(20)
  username: string;

  @MinLength(3)
  @MaxLength(20)
  fullname: string;

  role_name: $Enums.EnumRoles;
}
