import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class UserRegisterDto
  implements
    Omit<User, 'id' | 'resetPasswordToken' | 'failedAttempts' | 'isLocked'>
{
  @ApiProperty()
  @MinLength(3)
  @MaxLength(20)
  firstName: string;

  @ApiProperty()
  @MinLength(3)
  @MaxLength(20)
  lastName: string;

  @ApiProperty()
  dni: number;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @ApiProperty()
  role_name: $Enums.EnumRoles;
}
