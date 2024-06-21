import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @ApiProperty()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @ApiProperty()
  @MinLength(3)
  @MaxLength(20)
  fullname: string;

  @ApiProperty()
  role_name: $Enums.EnumRoles;
}
